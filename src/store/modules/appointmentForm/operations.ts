import { availableTime } from './../availabilityTime/types';
import { deleteAppointmentAPI, finalBookingAPI, getCurrentUserAppointmentInfo, postAppointmentAPI } from '../../../api';
import { appointmentPostResponse, AppThunk, payloadBooking } from './types';
import { cancelAppointmentForm, sendAppointmentDate, sendBookedFinalForm, sendExistedAppointmentData, showSuccessPage } from './slice';
import { changeDateFormat } from '../../../utils/date';

export const fetchAppointmentInfo = (time: string): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const availableTimeData = state.app.availabilityTime.availableTimesData.availableTimes.find(item => item.time === Number(time));
    const {serviceId, resourceId, locationId} = state.app.preAppointmentData;
    const {endDateTime, startDateTime} = availableTimeData as availableTime;

    const payload = {
        startDateTime,
        endDateTime,
        serviceId,
        resourceId,
        locationId
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
    const {id: appointmentId} = state.app.appointmentForm.appointmentDate as appointmentPostResponse;
    const {serviceId, resourceId} = state.app.preAppointmentData;
    const {email} = payload;
    const startDate = changeDateFormat(new Date());

    try {
        const existenceResponse = await getCurrentUserAppointmentInfo(email, startDate, serviceId, resourceId);

        if (!existenceResponse) {
            throw new Error();
        }      
        dispatch(sendExistedAppointmentData(existenceResponse))

        if(existenceResponse.count){
            dispatch(cancelAppointmentForm());
            dispatch(showSuccessPage());
            return existenceResponse;
        }

        const sendedFormResponse = await finalBookingAPI(appointmentId, payload);

        if (!sendedFormResponse) {
            throw new Error();
        }   
        dispatch(sendBookedFinalForm(sendedFormResponse));
        dispatch(showSuccessPage());

        
    } catch (err) {
        console.log(err);
    }
};