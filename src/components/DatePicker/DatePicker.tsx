import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { getAvailabilityDays } from '../../store/modules/availabilityDate';
import { changeDateFormat, monthLastDay } from '../../utils/date';
import { RootState } from '../../store';
import { getAvailabilityTimes } from '../../store/modules/availabilityTime';
import { getWeekDayText } from '../../utils/date';

import styles from './styles.module.scss';

export const AppointmentDatePicker = () => {
    const dispatch = useDispatch();
    const getAvailableDate = useCallback((firstDate, lastDate) => {
            dispatch(getAvailabilityDays({firstDate, lastDate}));
    }, [dispatch]);

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const {isLoading} = useSelector((state: RootState) => (state.app.availabilityDate));
    const {resourceName, availableDays, serviceName} = useSelector((state: RootState) => state.app.availabilityDate.availableData);
    const disableDays = (date: MaterialUiPickersDate) => {
        if(isLoading) {
            return true;
        }
        const disabledDaysArr = availableDays?.filter(day => !day.available && day.date === changeDateFormat(date as Date));

        return !!disabledDaysArr?.length;
    }
    const handleDateChange = (date: MaterialUiPickersDate) => {
        setSelectedDate(date as Date);
    }
    const getAvailableTime = useCallback((selectedDate) => {
        dispatch(getAvailabilityTimes(selectedDate));
    }, [dispatch]);

    useEffect(() => {
        getAvailableTime(changeDateFormat(selectedDate)) 
    }, [getAvailableTime, selectedDate])

    const handleMonthChange = (date: MaterialUiPickersDate) => {
        const firstDate = changeDateFormat(date as Date);
        const lastDate = monthLastDay(date as Date);
        
        getAvailableDate(firstDate, lastDate);
    };


    const datePickerHeader = (
        <div className={styles.headerContainer}>
            <div className={styles.dateInfo}>
                <p className={styles.choosedDay}>{getWeekDayText(selectedDate).slice(0,3)}</p>
                <span className={styles.choosedDate}>{new Date(selectedDate).getDate()}</span>
            </div>
            <div className={styles.appointmentInfo}>
                <h4>Select a Date & Time</h4>
                <p>{serviceName}</p>
                <p>{resourceName}</p>
            </div>
        </div>
    );

    return (
        <div className={styles.containerDate}>
            {datePickerHeader}
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