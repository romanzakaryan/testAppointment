import { RootState } from './../../index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { availableDate, availabilityAttribute } from './types';
import { getAvailabilityDaysAPI } from '../../../api'; 

export const getAvailabilityDays = createAsyncThunk<availableDate, availabilityAttribute, { state: RootState }>(
    'availability/getAvailability',
    async ({firstDate, lastDate}) => {
        const response = await getAvailabilityDaysAPI(firstDate, lastDate);

        if (!response) {
            throw new Error();
        }

        return response;
    },
);