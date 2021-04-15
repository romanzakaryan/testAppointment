import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAvailabilityDays } from './operations';
import { availableDate, availableDateState } from './types';

export const initialState: availableDateState = {
    availableData: {},
    isLoading: false,
    isLoaded: false
};

export const availabilitySlice = createSlice({
    name: 'availableDate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAvailabilityDays.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAvailabilityDays.fulfilled, (state, action: PayloadAction<availableDate>) => (
            {
                ...state,
                availableData: {
                    ...action.payload
                },
                isLoading: false,
                isLoaded: true
            }
        ));
        builder.addCase(getAvailabilityDays.rejected, (state) => {
            state.availableData = {};
            state.isLoading = false;
            state.isLoaded = true;
        });
    },
});

export default availabilitySlice.reducer;
