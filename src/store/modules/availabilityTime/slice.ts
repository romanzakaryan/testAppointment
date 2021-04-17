import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAvailabilityTimes } from './operations';
import { availabilityTimesState, availableTimes } from './types';

export const initialState: availabilityTimesState = {
    availableTimesData: {} as availableTimes,
    isLoading: false,
    isLoaded: false
};

export const availabilityTimeSlice = createSlice({
    name: 'availableTime',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAvailabilityTimes.pending, (state) => {
            state.availableTimesData = {} as availableTimes;
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(getAvailabilityTimes.fulfilled, (state, action: PayloadAction<availableTimes>) => (
            {
                ...state,
                availableTimesData: {
                    ...action.payload
                },
                isLoading: false,
                isLoaded: true
            }
        ));
        builder.addCase(getAvailabilityTimes.rejected, (state) => {
            state.availableTimesData = {} as availableTimes;
            state.isLoading = false;
            state.isLoaded = true;
        });
    },
});

export default availabilityTimeSlice.reducer;
