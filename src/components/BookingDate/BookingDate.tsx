import React, { useState, useCallback, useEffect } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DateFnsUtils from '@date-io/date-fns'
import { useDispatch, useSelector } from 'react-redux';
import { availableData, getAvailabilityDays } from '../../store/modules/availabilityDate';
import { changeDateFormat, monthLastDay } from '../../utils';

import styles from './styles.module.scss';
import { RootState } from '../../store';

type Props = {
    today: string;
    thisMonthlastDate: string
}

export const BookingDate: React.FC<Props> = (props) => {
    // const {today , thisMonthlastDate} = props;
    // const dispatch = useDispatch();
    // const getAvailableDate = useCallback((firstDate, lastDate) => {
    //         dispatch(getAvailabilityDays({firstDate, lastDate}));
    // }, [dispatch]);
    // const [selectedMonthFirstDay, setSelectedMonthFirstDay] = React.useState(today);
    // const [selectedMonthLastDay, setSelectedMonthLastDay] = React.useState(thisMonthlastDate);


    // useEffect(() => {
    //     if(today !== selectedMonthFirstDay) {
    //         getAvailableDate(selectedMonthFirstDay, selectedMonthLastDay);
    //     }
    // }, [selectedMonthFirstDay]);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const availableDays = useSelector((state: RootState) => (state.app.availability.availableData as availableData).availableDays);

    const disableDays = (date: MaterialUiPickersDate) => {
        const disabledDaysArr = availableDays.filter(day => !day.available && day.date === changeDateFormat(date as Date));

        return !!disabledDaysArr.length;
    }

    const handleDateChange = (date: MaterialUiPickersDate) => {
        setSelectedDate(date as Date);
    };

    const handleMonthChange = (date: MaterialUiPickersDate) => {
        // const firstDate = changeDateFormat(date as Date);
        // const lastDate = monthLastDay(date as Date);

        // setSelectedMonthFirstDay(firstDate);
        // setSelectedMonthLastDay(lastDate);
    };

    return (
        <div className={styles.container}>
            <div className={styles.containerDate}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        variant='static'
                        disablePast={true}
                        shouldDisableDate={disableDays}
                        onMonthChange={handleMonthChange}
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div className={styles.containerTime}>
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        variant='static'
                        disablePast={true}
                        shouldDisableDate={disableDays}
                        onMonthChange={handleMonthChange}
                    />
                </MuiPickersUtilsProvider> */}
            </div>
        </div>
    );
}