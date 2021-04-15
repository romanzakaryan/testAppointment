import React, { useCallback, useEffect } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { availableDate, getAvailabilityDays } from '../../store/modules/availabilityDate';
import { changeDateFormat, monthLastDay } from '../../utils/date';
import { RootState } from '../../store';
import { getAvailabilityTimes } from '../../store/modules/availabilityTime';

import styles from './styles.module.scss';

export const AppointmentDatePicker = () => {
    const dispatch = useDispatch();
    const getAvailableDate = useCallback((firstDate, lastDate) => {
            dispatch(getAvailabilityDays({firstDate, lastDate}));
    }, [dispatch]);

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const isDaysDataLoading = useSelector((state: RootState) => (state.app.availabilityDate.isLoading));
    const availableDays = useSelector((state: RootState) => (state.app.availabilityDate.availableData as availableDate).availableDays);
    const disableDays = (date: MaterialUiPickersDate) => {
        if(isDaysDataLoading) {
            return true;
        }
        const disabledDaysArr = availableDays.filter(day => !day.available && day.date === changeDateFormat(date as Date));

        return !!disabledDaysArr.length;
    }
    const handleDateChange = (date: MaterialUiPickersDate) => {
        setSelectedDate(date as Date);
    }
    const getAvailableTime = useCallback((firstDate) => {
        dispatch(getAvailabilityTimes(firstDate));
    }, [dispatch]);

    useEffect(() => {
        getAvailableTime(changeDateFormat(selectedDate)) 
    }, [getAvailableTime, selectedDate])

    const handleMonthChange = (date: MaterialUiPickersDate) => {
        const firstDate = changeDateFormat(date as Date);
        const lastDate = monthLastDay(date as Date);
        
        getAvailableDate(firstDate, lastDate);
    };

    return (
        <div className={styles.containerDate}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    variant='static'
                    disablePast={true}
                    shouldDisableDate={disableDays}
                    onMonthChange={handleMonthChange}
                    disableToolbar={true}
                />
            </MuiPickersUtilsProvider>
        </div>
    );
}