import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAvailabilityDays } from './operations';
import { availableDateState } from './types';

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
            state.availableData = {};
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(getAvailabilityDays.fulfilled, (state, action: PayloadAction<availableDateState>) => (
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
