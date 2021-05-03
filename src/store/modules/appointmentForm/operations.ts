import { availableTime } from './../availabilityTime/types';
import {
    deleteAppointmentAPI,
    finalBookingAPI,
    getCurrentUserAppointmentInfo,
    postAppointmentAPI
} from '../../../api';
import { AppThunk, payloadBooking } from './types';
import {
    cancelAppointmentForm,
    sendAppointmentDate,
    sendBookedFinalForm,
    sendExistedAppointmentData,
    showSuccessPage,
    setLoading,
    setError
} from './slice';
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
        dispatch(setLoading());
        const response = await postAppointmentAPI(payload);

        if (!response) {
            throw new Error('Smth goes wrong with sending appointment info');
        }

        dispatch(sendAppointmentDate(response))

        return response;
    } catch (err) {
        dispatch(setError({
            isError: true,
            text: err.toString(),
            type: 'fetchAppointmentInfo'
        }))
    }
};

export const deleteAppointmentInfo = (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const {id: appointmentId} = state.app.appointmentForm.appointmentDate;

    try {
        dispatch(setLoading());
        const response = await deleteAppointmentAPI(appointmentId);

        if (!response) {
            throw new Error('Smth goes wrong with deleting appointment');
        }

        dispatch(cancelAppointmentForm())

        return response;
    } catch (err) {
        dispatch(setError({
            isError: true,
            text: err.toString(),
            type: 'deleteAppointmentInfo'
        }))
    }
};

export const fetchFinalFormBooking = (payload: payloadBooking): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const {id: appointmentId} = state.app.appointmentForm.appointmentDate;
    const {serviceId, resourceId} = state.app.preAppointmentData;
    const {email} = payload;
    const startDate = changeDateFormat(new Date());

    try {
        dispatch(setLoading());
        const existenceResponse = await getCurrentUserAppointmentInfo(email, startDate, serviceId, resourceId);

        if (!existenceResponse) {
            throw new Error('Smth goes wrong with getting appointment existence');
        }      
        dispatch(sendExistedAppointmentData(existenceResponse))

        if(existenceResponse.count){
            dispatch(cancelAppointmentForm());
            dispatch(showSuccessPage());
            return existenceResponse;
        }

        const sendedFormResponse = await finalBookingAPI(appointmentId, payload);

        if (!sendedFormResponse) {
            throw new Error('Smth hoes wrong with final booking');
        }   
        dispatch(sendBookedFinalForm(sendedFormResponse));
        dispatch(showSuccessPage());

        
    } catch (err) {
        dispatch(setError({
            isError: true,
            text: err.toString(),
            type: 'fetchFinalFormBooking'
        }))
    }
};