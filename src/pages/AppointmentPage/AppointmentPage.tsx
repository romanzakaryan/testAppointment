import React from 'react';
import {BookingDate} from '../../components/BookingDate';
import {TestOnSchedJs} from '../../components/test';

import styles from './styles.module.scss';

export const AppointmentPage = () => {
    return (
        <div className={styles.container}>
            {/* <TestOnSchedJs /> */}
            <BookingDate/>
        </div>
    );
}