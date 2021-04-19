import {
    appointmentPostResponse,
    existedCustomer,
    existedCustomerData,
    payloadBooking,
    postAppointmentData
} from '../store/modules/appointmentForm';
import { availableDate } from '../store/modules/availabilityDate';
import { availableTimes } from '../store/modules/availabilityTime';
import { clientId } from './constants/oauth';

const oauthToken = JSON.parse(localStorage.getItem('profile') || '{}').access_token;
const apiBaseUrl = 'https://sandbox-api.onsched.com';
const clientTmz = -new Date().getTimezoneOffset();

export async function requestApi(url: string, method = 'GET', body: any = null, headers:Record<string, string> = {}){
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      headers['Authorization'] = `Bearer ${oauthToken}`;

      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Smth goes wrong')
      }

      return data
    } catch (e) {
      throw e
    }
}

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

export const getAvailabilityDaysAPI = (
    firstdate: string,
    lastDate: string,
    serviceId: string,
    resourceId: string,
    locationId: string
): Promise<availableDate | never> => requestApi(`${apiBaseUrl}/consumer/v1/availability/${serviceId}/${firstdate}/${lastDate}/days?locationId=${locationId}&resourceId=${resourceId}&tzOffset=${clientTmz}`);


export const getAvailabilityTimesAPI = (
    firstdate: string,
    serviceId: string,
    resourceId: string,
    locationId: string
): Promise<availableTimes | never> => requestApi(`${apiBaseUrl}/consumer/v1/availability/${serviceId}/${firstdate}/${firstdate}/times?locationId=${locationId}&resourceId=${resourceId}&tzOffset=${clientTmz}`);

export const postAppointmentAPI = (
    payload: postAppointmentData
): Promise<existedCustomerData | never> => requestApi(`${apiBaseUrl}/consumer/v1/appointments`, 'POST', payload);

export const finalBookingAPI = (
    id: string, payload: payloadBooking
): Promise<appointmentPostResponse | never> => requestApi(`${apiBaseUrl}/consumer/v1/appointments/${id}/book`, 'PUT', payload);
    
export const deleteAppointmentAPI = (
    id: string
): Promise<string | never> => requestApi(`${apiBaseUrl}/consumer/v1/appointments/${id}`, 'DELETE');

export const getCurrentUserAppointmentInfo = async (
    email: string,
    startDate: string,
    serviceId: string,
    resourceId: string,
): Promise<existedCustomer | never> => requestApi(`${apiBaseUrl}/consumer/v1/appointments/?email=${email}&serviceId=${serviceId}&resourceId=${resourceId}startDate=${startDate}`);