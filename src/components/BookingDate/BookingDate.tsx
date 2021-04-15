import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppointmentDatePicker } from '../DatePicker';
import { RootState } from '../../store';
import { AvailableTime } from '../AvailableTime';
import { changeDateFormat, monthLastDay } from '../../utils/date';
import { getAvailabilityDays } from '../../store/modules/availabilityDate';

import styles from './styles.module.scss';

export const BookingDate = () => {
    const today = changeDateFormat(new Date());
    const thisMonthlastDate = monthLastDay(new Date());
    const dispatch = useDispatch();
    const availableDaysLoaded = useSelector((state: RootState) => state.app.availabilityDate.isLoaded);
    const availableTimesLoaded = useSelector((state: RootState) => state.app.availabilityTime.isLoaded);
    const getAvailableDate = useCallback((firstDate, lastDate) => {
        dispatch(getAvailabilityDays({firstDate, lastDate}));
    }, [dispatch]);

    useEffect(() => {
        getAvailableDate(today, thisMonthlastDate);
    }, []);

    return (
        <div className={styles.container}>
            { availableDaysLoaded &&
                <AppointmentDatePicker/>
            }
            { availableTimesLoaded &&
                <AvailableTime />
            }
        </div>
    );
}