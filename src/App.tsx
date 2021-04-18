import React, { useEffect, useCallback } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { AppointmentPage } from './pages/appointmentPage';
import { getToken } from './api/api';
import { HomePage } from './pages/homePage';
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
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/home">
                        <HomePage />
                    </Route>
                    <Route path="/appointment">
                        <AppointmentPage />
                    </Route>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Redirect to="/appointment" />
                        )}
                    />
                </Switch>
            </div>
        </Router>
    );
}