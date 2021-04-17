/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    showModal: false,
    appointmentDate: {},
    appointmentForm: {}
};

const appointmentFormData = createSlice({
    name: 'appointmentForm',
    initialState,
    reducers: {
        sendAppointmentDate: (state, action: PayloadAction<string>) => {
            state.appointmentDate = action.payload;
            state.showModal = true;
        },
        cancelAppointmentForm: (state) => {
            state.appointmentDate = {};
            state.showModal = false;
        },
    },
});

export const { sendAppointmentDate, cancelAppointmentForm } = appointmentFormData.actions;

export default appointmentFormData.reducer;
