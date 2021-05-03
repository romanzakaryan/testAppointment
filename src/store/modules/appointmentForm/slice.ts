import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appointmentPostResponse, errorState, existedCustomer, existedCustomerData, formState } from './types';

const initialState: formState = {
    showForm: false,
    appointmentDate: {} as existedCustomerData,
    appointmentFormData: {} as appointmentPostResponse,
    customerExistedAppointment: {} as existedCustomer,
    showSuccessPage: false,
    showDateSelect: true,
    isLoading: false,
    isError: {
        isError: false,
        text: '',
        type: ''
    }
};

const appointmentFormData = createSlice({
    name: 'appointmentForm',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
            state.showForm = false;
            state.showDateSelect = false;
            state.isError = {
                isError: false,
                text: '',
                type: ''
            };
        },
        sendAppointmentDate: (state, action: PayloadAction<existedCustomerData>) => {
            state.appointmentDate = action.payload;
            state.showForm = true;
            state.showSuccessPage = false;
            state.isLoading = false;
            state.isError = {
                isError: false,
                text: '',
                type: ''
            };
        },
        cancelAppointmentForm: (state) => {
            state.appointmentDate = {} as existedCustomerData;
            state.showDateSelect = true;
            state.showForm = false;
            state.isLoading = false;
            state.isError = {
                isError: false,
                text: '',
                type: ''
            };
        },
        sendBookedFinalForm: (state, action: PayloadAction<appointmentPostResponse>) => {
            state.showForm = false;
            state.appointmentFormData = action.payload;
            state.showDateSelect = false;
            state.isLoading = false;
            state.isError = {
                isError: false,
                text: '',
                type: ''
            };
        },
        sendExistedAppointmentData: (state, action: PayloadAction<existedCustomer>) => {
            state.customerExistedAppointment = action.payload;
        },
        showSuccessPage: (state) => {
            state.showForm = false;
            state.showDateSelect = false;
            state.showSuccessPage = true;
            state.isError = {
                isError: false,
                text: '',
                type: ''
            };
        },
        resetFormInfo: (state) => ({
            ...state,
            ...initialState
        }),
        setError: (state, action: PayloadAction<errorState>) => {
            state.showDateSelect = false;
            state.showSuccessPage = false;
            state.showForm = false;
            state.isLoading = false;
            state.isError = {
                ...action.payload
            }
        }
    },
});

export const {
    setLoading,
    sendAppointmentDate,
    cancelAppointmentForm,
    sendBookedFinalForm,
    sendExistedAppointmentData,
    showSuccessPage,
    resetFormInfo,
    setError
} = appointmentFormData.actions;

export default appointmentFormData.reducer;
