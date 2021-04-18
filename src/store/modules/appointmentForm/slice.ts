import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appointmentPostResponse, existedCustomer, existedCustomerData } from './types';

const initialState = {
    showModal: false,
    appointmentDate: {},
    appointmentFormData: {},
    customerExistedAppointment: {},
    showSuccessPage: false,
    showForm: true
};

const appointmentFormData = createSlice({
    name: 'appointmentForm',
    initialState,
    reducers: {
        sendAppointmentDate: (state, action: PayloadAction<existedCustomerData>) => {
            state.appointmentDate = action.payload;
            state.showModal = true;
            state.showSuccessPage = false;
        },
        cancelAppointmentForm: (state) => {
            state.appointmentDate = {};
            state.showModal = false;
        },
        sendBookedFinalForm: (state, action: PayloadAction<appointmentPostResponse>) => {
            state.showModal = false;
            state.appointmentFormData = action.payload;
            state.showForm = false;
        },
        sendExistedAppointmentData: (state, action: PayloadAction<existedCustomer>) => {
            state.customerExistedAppointment = action.payload;
        },
        showSuccessPage: (state) => {
            state.showForm = false;
            state.showSuccessPage = true;
        },
        resetFormInfo: (state) => ({
            ...state,
            ...initialState
        })
    },
});

export const {
    sendAppointmentDate,
    cancelAppointmentForm,
    sendBookedFinalForm,
    sendExistedAppointmentData,
    showSuccessPage,
    resetFormInfo
} = appointmentFormData.actions;

export default appointmentFormData.reducer;
