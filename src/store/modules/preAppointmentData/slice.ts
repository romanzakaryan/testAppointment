import { createSlice } from "@reduxjs/toolkit";
import { preAppointmentData } from "./types";

export const initialState: preAppointmentData = {
    serviceId: '119708',
    locationId: '83a4fea3-e69f-448b-a96e-1ff394b1f6e3',
    resourceId: '98865'
};

const preAppointmentDataSlice = createSlice({
    name: 'preAppointmentData',
    initialState,
    reducers: {}
});

export default preAppointmentDataSlice.reducer;