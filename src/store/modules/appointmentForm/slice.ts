import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { existedCustomer } from './types';

const initialState = {
    showModal: false,
    appointmentDate: {},
    appointmentFormData: {},
    customerExistedAppointment: {}

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
        sendBookedFinalForm: (state, action: PayloadAction<string>) => {
            state.showModal = false;
            state.appointmentFormData = action.payload;
        },
        sendExistedAppointmentData: (state, action: PayloadAction<existedCustomer>) => {
            state.showModal = false;
            state.customerExistedAppointment = action.payload;
        }
    },
});

export const {
    sendAppointmentDate,
    cancelAppointmentForm,
    sendBookedFinalForm,
    sendExistedAppointmentData
} = appointmentFormData.actions;

export default appointmentFormData.reducer;
