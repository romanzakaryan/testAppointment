import { RootState } from './../../index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { availableTimes } from './types';
import { getAvailabilityTimesAPI } from '../../../api'; 

export const getAvailabilityTimes = createAsyncThunk<availableTimes, string, { state: RootState }>(
    'availability/getAvailabilityTime',
    async (firstDate) => {
        console.log('firstDate', firstDate)
        const response = await getAvailabilityTimesAPI(firstDate);

        if (!response) {
            throw new Error();
        }

        return response;
    },
);