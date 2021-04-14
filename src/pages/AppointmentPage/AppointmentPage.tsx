import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BookingDate} from '../../components/BookingDate';
import {TestOnSchedJs} from '../../components/test';
import { RootState } from '../../store';
import { getAvailabilityDays } from '../../store/modules/availabilityDate';
import { changeDateFormat, monthLastDay } from '../../utils';

import styles from './styles.module.scss';

export const AppointmentPage = () => {
    const today = changeDateFormat(new Date());
    const lastDate = monthLastDay(new Date());
    const dispatch = useDispatch();
    const getAvailableDate = useCallback((firstDate, lastDate) => {
        dispatch(getAvailabilityDays({firstDate, lastDate}));
    }, [dispatch]);

    useEffect(() => {
        getAvailableDate(today, lastDate);
    }, []);

    const availableDaysLoaded = useSelector((state: RootState) => state.app.availability.isLoaded);

    return (
        <div className={styles.container}>
            <TestOnSchedJs />
            {availableDaysLoaded && <BookingDate today={today} thisMonthlastDate={lastDate}/>}
        </div>
    );
}