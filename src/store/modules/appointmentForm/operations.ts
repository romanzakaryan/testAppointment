import { availableTime } from './../availabilityTime/types';
import { deleteAppointmentAPI, finalBookingAPI, getCurrentUserAppointmentInfo, postAppointmentAPI } from '../../../api';
import { appointmentPostResponse, AppThunk, existedCustomer, payloadBooking } from './types';
import { serviceID, locationID, resourceID } from '../../../constants/appointmentInfo';
import { cancelAppointmentForm, sendAppointmentDate, sendBookedFinalForm, sendExistedAppointmentData } from './slice';
import { changeDateFormat } from '../../../utils/date';

export const fetchAppointmentInfo = (time: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const availableTimeData = state.app.availabilityTime.availableTimesData.availableTimes.find(item => item.time === Number(time));
    const {endDateTime, startDateTime} = availableTimeData as availableTime;

    const payload = {
        startDateTime,
        endDateTime,
        serviceID,
        locationID,
        resourceID
    };

    try {
        const response = await postAppointmentAPI(payload);

        if (!response) {
            throw new Error();
        }

        dispatch(sendAppointmentDate(response))

        return response;
    } catch (err) {
        console.log(err);
    }
};

export const deleteAppointmentInfo = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const {id: appointmentId} = state.app.appointmentForm.appointmentDate as appointmentPostResponse;

    try {
        const response = await deleteAppointmentAPI(appointmentId);

        if (!response) {
            throw new Error();
        }

        dispatch(cancelAppointmentForm())

        return response;
    } catch (err) {
        console.log(err);
    }
};

export const fetchFinalFormBooking = (payload: payloadBooking): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const {id: appointmentId, startDateTime} = state.app.appointmentForm.appointmentDate as appointmentPostResponse;
    const {email} = payload;
    const startDate = changeDateFormat(new Date(startDateTime));

    try {
        const existenceResponse = await getCurrentUserAppointmentInfo(email, startDate);

        if (!existenceResponse) {
            throw new Error();
        }      
        dispatch(sendExistedAppointmentData(existenceResponse))

        console.log('resp', existenceResponse)

        if(existenceResponse.count){
            return existenceResponse;
        }

        const sendedFormResponse = await finalBookingAPI(appointmentId, payload);

        if (!sendedFormResponse) {
            throw new Error();
        }   
        dispatch(sendBookedFinalForm(sendedFormResponse))

        
    } catch (err) {
        console.log(err);
    }
};