import { RootState } from './../../index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { availableTimes } from './types';
import { getAvailabilityTimesAPI } from '../../../api'; 

export const getAvailabilityTimes = createAsyncThunk<availableTimes, string, { state: RootState }>(
    'availability/getAvailabilityTime',
    async (firstDate, {getState}) => {
        const state = getState();
        const {serviceId, resourceId, locationId} = state.app.preAppointmentData;
        const response = await getAvailabilityTimesAPI(firstDate, serviceId, resourceId, locationId);

        if (!response) {
            throw new Error();
        }

        return response;
    },
);