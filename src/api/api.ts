const {oauthToken} = require('../constants/oauth.json');


export const getSericesAPI = async () => {
    try {
        const response = await fetch('https://sandbox-api.onsched.com/consumer/v1/services', {
            headers: {
                'Authorization': `Bearer ${oauthToken}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Smth goes wrong');
        }

        return data
    } catch (e) {
        throw e;
    }
}