import React, { useEffect, useCallback } from 'react';
import { AppointmentPage } from './pages/appointmentPage';
import { getToken } from './api/api';
import './App.css';

export const App = () => {
    const { clientId } = require('./constants/oauth.json')
    const tokenExpirationDateMs: number = JSON.parse(localStorage.getItem('profile') || '{}').expires_at * 1000;
    const tokenExpired = Date.now() > tokenExpirationDateMs;

    const getAccessToken = useCallback(() => {
        getToken(clientId);
    }, [clientId]);

    useEffect(() => {
        getAccessToken();
    }, [getAccessToken, tokenExpired]);

    return (
        <div className="App">
            <AppointmentPage />
        </div>
    );
}