import { serviceID, locationID, resourceID } from './../constants/appointmentInfo';
const oauthToken = JSON.parse(localStorage.getItem('profile') || '{}').access_token;
const apiBaseUrl = 'https://sandbox-api.onsched.com';
const clientTmz = -new Date().getTimezoneOffset();


export const getSericesAPI = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/consumer/v1/services`, {
            headers: {
                'Authorization': `Bearer ${oauthToken}`,
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'Smth goes wrong');
        }

        return data
    } catch (e) {
        throw e;
    }
}

export const getAvailabilityDaysAPI = async (firstdate: string, lastDate: string) => {
    try {
        const response = await fetch(
            `${apiBaseUrl}/consumer/v1/availability/${serviceID}/${firstdate}/${lastDate}/days?locationId=${locationID}&resourceId=${resourceID}&tzOffset=${clientTmz}&firstDayAvailable=true`,
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

export const getAvailabilityTimesAPI = async (firstdate: string, lastDate: string) => {
    try {
        const response = await fetch(
            `${apiBaseUrl}/consumer/v1/availability/${serviceID}/${firstdate}/${lastDate}/times?locationId=${locationID}&resourceId=${resourceID}&tzOffset=${clientTmz}&firstDayAvailable=true`,
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

export const getToken = async (clientId: string) => {
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
