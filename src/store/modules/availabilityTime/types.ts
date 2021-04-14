export type availabilityTimesState = {
    availableTimesData: availabilityTimes | {},
    isLoading: boolean,
    isLoaded: boolean
}

export type availabilityTimes = {
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
    availableTimes: availabilityTime[]
}

export type availabilityTime = {
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

export type availabilityAttribute = {
    firstDate: string,
    lastDate: string,
}