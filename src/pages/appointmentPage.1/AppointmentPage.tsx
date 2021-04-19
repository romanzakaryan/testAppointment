import React from 'react';
import { useSelector } from 'react-redux';
import { AppointmentForm } from '../../components/appointmentForm';
import {BookingDate} from '../../components/bookingDate';
import { SuccessPage } from '../../components/successPage';
import { RootState } from '../../store';

import styles from './styles.module.scss';

export const AppointmentPage = () => {
    const {showModal, showSuccessPage, showForm} = useSelector((state: RootState) => state.app.appointmentForm);
    return (
        <div className={styles.container}>
            {showForm && <BookingDate/>}
            {showModal && <AppointmentForm/>}
            {showSuccessPage && <SuccessPage />}
        </div>
    );
}