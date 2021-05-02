import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appointmentPostResponse, existedCustomer, existedCustomerData } from './types';

const initialState = {
    showForm: false,
    appointmentDate: {},
    appointmentFormData: {},
    customerExistedAppointment: {},
    showSuccessPage: false,
    showDateSelect: true,
    isLoading: false
};

const appointmentFormData = createSlice({
    name: 'appointmentForm',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
            state.showForm = false;
            state.showDateSelect = false;
        },
        sendAppointmentDate: (state, action: PayloadAction<existedCustomerData>) => {
            state.appointmentDate = action.payload;
            state.showForm = true;
            state.showSuccessPage = false;
            state.isLoading = false;
        },
        cancelAppointmentForm: (state) => {
            state.appointmentDate = {};
            state.showDateSelect = true;
            state.showForm = false;
            state.isLoading = false;
        },
        sendBookedFinalForm: (state, action: PayloadAction<appointmentPostResponse>) => {
            state.showForm = false;
            state.appointmentFormData = action.payload;
            state.showDateSelect = false;
            state.isLoading = false;
        },
        sendExistedAppointmentData: (state, action: PayloadAction<existedCustomer>) => {
            state.customerExistedAppointment = action.payload;
        },
        showSuccessPage: (state) => {
            state.showDateSelect = false;
            state.showSuccessPage = true;
        },
        resetFormInfo: (state) => ({
            ...state,
            ...initialState
        })
    },
});

export const {
    setLoading,
    sendAppointmentDate,
    cancelAppointmentForm,
    sendBookedFinalForm,
    sendExistedAppointmentData,
    showSuccessPage,
    resetFormInfo
} = appointmentFormData.actions;

export default appointmentFormData.reducer;
