import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { AppointmentForm } from '../../components/appointmentForm';
import {BookingDate} from '../../components/bookingDate';
import { SuccessPage } from '../../components/successPage';
import { RootState } from '../../store';

import styles from './styles.module.scss';

export const AppointmentPage = () => {
    const {showForm, showSuccessPage, showDateSelect, isLoading} = useSelector((state: RootState) => state.app.appointmentForm);
    return (
        <div className={styles.container}>
            {isLoading && 
                <div className={styles.loaderContainer}>
                    <CircularProgress 
                        size={80}
                    />
                </div>
            }
            {showDateSelect  && <BookingDate/>}
            {showForm && <AppointmentForm/>}
            {showSuccessPage && <SuccessPage />}
        </div>
    );
}