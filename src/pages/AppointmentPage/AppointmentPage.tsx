import React from 'react';
import { useSelector } from 'react-redux';
import { AppointmentForm } from '../../components/appointmentForm';
import {BookingDate} from '../../components/bookingDate';
import {TestOnSchedJs} from '../../components/test';
import { RootState } from '../../store';

import styles from './styles.module.scss';

export const AppointmentPage = () => {
    const {showModal} = useSelector((state: RootState) => state.app.appointmentForm);
    return (
        <div className={styles.container}>
            {/* <TestOnSchedJs /> */}
            <BookingDate/>
            {showModal && <AppointmentForm/>}           
        </div>
    );
}