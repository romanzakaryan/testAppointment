import { RootState } from './../../index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { availableDate, availabilityAttribute } from './types';
import { getAvailabilityDaysAPI } from '../../../api'; 

export const getAvailabilityDays = createAsyncThunk<availableDate, availabilityAttribute, { state: RootState }>(
    'availability/getAvailability',
    async ({firstDate, lastDate}, {getState}) => {
        const state = getState();
        const {resourceId, serviceId, locationId} = state.app.preAppointmentData;
        const response = await getAvailabilityDaysAPI(firstDate, lastDate, serviceId, resourceId, locationId);

        if (!response) {
            throw new Error();
        }

        return response;
    },
);