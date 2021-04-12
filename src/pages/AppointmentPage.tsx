import React, {useEffect, useCallback} from 'react';
import {getSericesAPI} from '../api/api';

export const AppointmentPage = () => {

    const getAppointmentsInfo = useCallback(() => {
        getSericesAPI();
    }, []);

    useEffect(() => {
        getAppointmentsInfo();
    }, []);

    return (
        <div className="container">
            AppointmentPage
        </div>
    );
}