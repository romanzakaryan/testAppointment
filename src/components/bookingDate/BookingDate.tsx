import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppointmentDatePicker } from '../datePicker';
import { RootState } from '../../store';
import { AvailableTime } from '../availableTime';
import { changeDateFormat, monthLastDay } from '../../utils/date';
import { getAvailabilityDays } from '../../store/modules/availabilityDate';

import styles from './styles.module.scss';

export const BookingDate = () => {
    const today = changeDateFormat(new Date());
    const thisMonthlastDate = monthLastDay(new Date());
    const dispatch = useDispatch();
    const availableDaysLoaded = useSelector((state: RootState) => state.app.availabilityDate.isLoaded);
    const {isLoaded: availableTimesLoaded, isLoading: availableTimesLoading} = useSelector((state: RootState) => state.app.availabilityTime);
    const {isLoading: availableDaysLoading} = useSelector((state: RootState) => state.app.availabilityDate);
    const getAvailableDate = useCallback((firstDate, lastDate) => {
        dispatch(getAvailabilityDays({firstDate, lastDate}));
    }, [dispatch]);

    useEffect(() => {
        getAvailableDate(today, thisMonthlastDate);
    }, []);

    return (
        <div className={styles.container}>
            <h1>Select a Date & Time</h1>
            <div className={styles.contentContainer}>
                { availableDaysLoaded &&
                    <AppointmentDatePicker/>
                }
                { availableTimesLoaded &&
                    <AvailableTime />
                }
                {availableTimesLoading &&
                    <div className={styles.loaderContainer}>
                        <CircularProgress 
                            size={80}
                        />
                    </div>
                }
            </div>
        </div>
    );
}