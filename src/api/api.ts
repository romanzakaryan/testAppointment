import {
    appointmentPostResponse,
    existedCustomer,
    existedCustomerData,
    payloadBooking,
    postAppointmentData
} from '../store/modules/appointmentForm';
import { availableDate } from '../store/modules/availabilityDate';
import { availableTimes } from '../store/modules/availabilityTime';
import { serviceID, locationID, resourceID } from './../constants/appointmentInfo';
import { clientId } from './constants/oauth';

const oauthToken = JSON.parse(localStorage.getItem('profile') || '{}').access_token;
const apiBaseUrl = 'https://sandbox-api.onsched.com';
const clientTmz = -new Date().getTimezoneOffset();

export const getToken = async (): Promise<string | never> => {
    try {
        const url = "https://sandbox-js.onsched.com/auth/initialize";
        const scope = "OnSchedApi";
        const payload = { "clientId": clientId, "scope": scope };
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            mode: 'cors',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        });
        const data = await response.json().catch(function (error) {
            console.log(error);
        });

        if (!response.ok) {
            throw new Error(data.message || 'Authorization failed');
        }
        localStorage.setItem('profile', JSON.stringify(data));

        return data.access_token;
    } catch(e) {
        throw e;
    }
}

export const getAvailabilityDaysAPI = async (firstdate: string, lastDate: string): Promise<availableDate | never> => {
    try {
        const response = await fetch(
            `${apiBaseUrl}/consumer/v1/availability/${serviceID}/${firstdate}/${lastDate}/days?locationId=${locationID}&resourceId=${resourceID}&tzOffset=${clientTmz}`,
        {
            headers: {
                'Authorization': `Bearer ${oauthToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'Smth goes wrong');
        }

        return data
    } catch (e) {
        throw e;
    }
}

export const getAvailabilityTimesAPI = async (firstdate: string): Promise<availableTimes | never> => {
    try {
        const response = await fetch(
            `${apiBaseUrl}/consumer/v1/availability/${serviceID}/${firstdate}/${firstdate}/times?locationId=${locationID}&resourceId=${resourceID}&tzOffset=${clientTmz}`,
        {
            headers: {
                'Authorization': `Bearer ${oauthToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'Smth goes wrong');
        }

        return data
    } catch (e) {
        throw e;
    }
}

export const postAppointmentAPI = async (payload: postAppointmentData): Promise<existedCustomerData | never> => {
    try {
        const response = await fetch(
            `${apiBaseUrl}/consumer/v1/appointments`,
            {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Authorization': `Bearer ${oauthToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'Smth goes wrong');
        }

        return data
    } catch (e) {
        throw e;
    }
}

export const finalBookingAPI = async (id: string, payload: payloadBooking): Promise<appointmentPostResponse | never> => {
    try {
        const response = await fetch(
            `${apiBaseUrl}/consumer/v1/appointments/${id}/book`,
            {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Authorization': `Bearer ${oauthToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        const data = await response.json();
        
        if(!response.ok){
            throw new Error(data.message || 'Smth goes wrong');
        }
        
        return data
    } catch (e) {
        throw e;
    }
}
    
export const deleteAppointmentAPI = async (id: string): Promise<string | never> => {
    try {
        const response = await fetch(
            `${apiBaseUrl}/consumer/v1/appointments/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${oauthToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'Smth goes wrong');
        }

        return data
    } catch (e) {
        throw e;
    }
}

export const getCurrentUserAppointmentInfo = async (email: string, startDate: string): Promise<existedCustomer | never> => {
    try {
        const response = await fetch(
            `${apiBaseUrl}/consumer/v1/appointments/?email=${email}&serviceId=${serviceID}&resourceId=${resourceID}startDate=${startDate}`,
        {
            headers: {
                'Authorization': `Bearer ${oauthToken}`,
                'Content-Type': 'application/json; charset=utf-8',
            }
        });
               
        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'Smth goes wrong');
        }

        return data
    } catch (e) {
        throw e;
    }
}