export type availableDays = {
    object: string,
    date: string,
    closed: boolean,
    available: boolean,
    reasonCode: number,
    reason: string,
    bookingLimit: number,
    bookingCount: number
}

export type availableData = {
    url: string,
    object: string,
    businessName: string,
    locationId: string,
    serviceId: string,
    serviceName: string,
    serviceDescription: string,
    serviceDuration: number,
    startDate: string,
    endDate: string,
    resourceId: string,
    resourceName: string,
    resourceDescription: string,
    calendarId: string,
    calendarResourceGroupId: string,
    tzRequested: number,
    firstAvailableDate: string,
    availableDays: availableDays[] | [],
    availableTime: []
}

export type availableDateState = {
    availableData: availableData | {},
    isLoading: boolean,
    isLoaded: boolean
}

export type availabilityAttribute = {
    firstDate: string,
    lastDate: string,
}