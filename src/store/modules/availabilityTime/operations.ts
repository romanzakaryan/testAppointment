import { RootState } from './../../index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { availabilityAttribute, availabilityTimesState } from './types';
import { getAvailabilityTimesAPI } from '../../../api'; 

export const getAvailabilityTimes = createAsyncThunk<availabilityTimesState, availabilityAttribute, { state: RootState }>(
    'availability/getAvailabilityTime',
    async ({firstDate, lastDate}, { getState }) => {
        const state = getState();
        const response = await getAvailabilityTimesAPI(firstDate, lastDate);

        if (!response) {
            throw new Error();
        }

        return response;
    },
);