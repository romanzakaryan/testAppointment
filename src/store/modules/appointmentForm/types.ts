import { RootState } from './../../index';
import { Action, ThunkAction } from "@reduxjs/toolkit";

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export type postAppointmentData = {
    startDateTime: string,
    endDateTime: string,
    locationId: string,
    resourceId: string,
    serviceId: string
}

export type appointmentPostResponse = {
    object: string,
    id: string,
    locationId: string,
    businessName: string,
    calendarId: string,
    serviceId: string,
    serviceName: string,
    serviceImageUrl: string,
    resourceId: string,
    resourceName: string,
    resourceGroupId: string,
    resourceGroupName: string,
    resourceImageUrl: string,
    customerId: string,
    serviceAllocationId: string,
    rescheduledId: string,
    createDate: string,
    startDateTime: string,
    endDateTime: string,
    dateInternational: string,
    date: string,
    time: number,
    duration: number,
    timezone: number,
    timezoneId: string,
    timezoneIana: string,
    ipAddress: string,
    status: string,
    confirmationNumber: string,
    downloadIcsUrl: string,
    bookedBy: string,
    onlineBooking: boolean,
    confirmed: boolean,
    email: string,
    name: string,
    lastname: string,
    firstname: string,
    phone: string,
    phoneType: string,
    phoneExt: string,
    customerMessage: string,
    notes: null,
    groupSize: number,
    lastModifiedOn: string,
    lastModifiedBy: string,
    emailConfirmationSent: string,
    emailReminderSent: string,
    smsConfirmationSent: string,
    smsReminderSent: string,
    location: string,
    latitude: string,
    longitude: string,
    stripeChargeId: string,
    stripeRefundId: string,
    paymentStatus: number,
    resources: [],
    customFields: {},
    auditTrail: [],
    appointmentBookingFields: [],
    customerBookingFields: []
}

export type payloadBooking = {
    email: string,
    firstName: string,
    lastName: string,
    phone?: string
    customerMessage?: string
}

export type existedCustomer = {
    object: string,
    url: string,
    hasMore: boolean,
    count: number,
    total: number,
    data: existedCustomerData[] | [];
}

export type existedCustomerData = {
    object: string,
    id: string,
    locationId: string,
    businessName: string,
    calendarId: string,
    serviceId: string,
    serviceName: string,
    serviceImageUrl: string,
    resourceId: string,
    resourceName: string,
    resourceGroupId: string,
    resourceGroupName: string,
    resourceImageUrl: string,
    customerId: string,
    serviceAllocationId: string,
    rescheduledId: string
    createDate: string,
    startDateTime: string,
    endDateTime: string,
    dateInternational: string,
    date: string,
    time: number,
    duration: number,
    timezone: number,
    timezoneId: string,
    timezoneIana: string,
    ipAddress: string,
    status: string,
    confirmationNumber: string,
    downloadIcsUrl: string,
    bookedBy: string,
    onlineBooking: boolean,
    confirmed: boolean,
    email: string,
    name: string,
    lastname: string,
    firstname:string,
    phone: string,
    phoneType: string,
    phoneExt: string,
    customerMessage: string,
    notes: string,
    groupSize: number,
    lastModifiedOn: string,
    lastModifiedBy: string,
    emailConfirmationSent: string,
    emailReminderSent: string,
    smsConfirmationSent: string,
    smsReminderSent: string,
    location: string,
    latitude: string,
    longitude: string,
    stripeChargeId: string,
    stripeRefundId: string,
    paymentStatus: number,
    resources: string,
    customFields: {},
    auditTrail: auditTrail[]
}

export type auditTrail = {
    id: string,
    appointmentId: string,
    modifiedOn: string,
    modifiedBy: string,
    modificationType: string,
    statusBefore: string,
    statusAfter: string,
    notesBefore: string,
    notesAfter: string
}

export type formState = {
    showForm: boolean,
    appointmentDate: existedCustomerData,
    appointmentFormData: appointmentPostResponse,
    customerExistedAppointment: existedCustomer,
    showSuccessPage: boolean,
    showDateSelect: boolean,
    isLoading: boolean,
    isError: errorState,
}

export type errorState = {
    isError: boolean,
    text: string,
    type: string
}