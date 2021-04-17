import { availableTime } from './../availabilityTime/types';
import { deleteAppointmentAPI, postAppointmentAPI } from '../../../api';
import { appointmentPostResponse, AppThunk } from './types';
import { serviceID, locationID, resourceID } from '../../../constants/appointmentInfo';
import { cancelAppointmentForm, sendAppointmentDate } from './slice';

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
    }

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