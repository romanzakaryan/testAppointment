export type availabilityTimesState = {
    availableTimesData: availableTimes,
    isLoading: boolean,
    isLoaded: boolean
}

export type availableTimes = {
    url: string,
    object: string,
    businessName: string,
    serviceId: string,
    serviceName: string,
    serviceDescription: string,
    serviceDuration: number,
    resourceId: string,
    resourceName: string,
    resourceDescription: string,
    resourceIds: string,
    tzRequested: number,
    firstAvailableDate: string,
    availableDays: [],
    availableTimes: availableTime[]
}

export type availableTime = {
    startDateTime: string,
    endDateTime: string,
    date: string,
    time: number,
    displayTime: string,
    duration: number,
    allowableBookings: number,
    availableBookings: number,
    resourceId: string,
    resourceIds: null,
    travelTimeMins: number,
    travelAppointmentId: string
}