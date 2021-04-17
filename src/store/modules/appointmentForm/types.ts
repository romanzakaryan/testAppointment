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
    locationID: string,
    resourceID: string,
    serviceID: string
}

export type appointmentPostResponse = {
    object: string,
    id: string,
    locationId: string,
    businessName: string,
    calendarId: string,
    serviceId: string,
    serviceName: string,
    serviceImageUrl: null,
    resourceId: string,
    resourceName: string,
    resourceGroupId: null,
    resourceGroupName: null,
    resourceImageUrl: null,
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