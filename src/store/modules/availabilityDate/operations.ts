import { RootState } from './../../index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { availableDateState, availabilityAttribute } from './types';
import { getAvailabilityDaysAPI } from '../../../api'; 

export const getAvailabilityDays = createAsyncThunk<availableDateState, availabilityAttribute, { state: RootState }>(
    'availability/getAvailability',
    async ({firstDate, lastDate}, { getState }) => {
        const state = getState();
        const response = await getAvailabilityDaysAPI(firstDate, lastDate);

        if (!response) {
            throw new Error();
        }

        return response;
    },
);