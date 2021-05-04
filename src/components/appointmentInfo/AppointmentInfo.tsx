import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { dateLine } from '../../utils/date'

import styles from './styles.module.scss';

export const AppointmentInfo = () => {
    const {
        resourceName,
        serviceName,
        duration,
        startDateTime,
        time
    } = useSelector((state: RootState) => state.app.appointmentForm.appointmentDate);

    const appointmentInfoArray = [
        {
            text: 'Date & time',
            value: dateLine(startDateTime, time)
        },
        {
            text: 'Service name',
            value: serviceName
        },
        {
            text: 'Duration',
            value: `${duration} min`
        },
        {
            text: 'Doctor',
            value: resourceName
        }
    ]

    const eachInfoRender = (text:string, value: string) => {
        return (
            <div className={styles.row} key={text}>
                <div className={styles.columnFirst}>{text}</div>
                <div className={styles.columnSecond}>{value}</div>
            </div>
        )
    }

    return (
        <div className={styles.appointmentInfo}>
            {appointmentInfoArray.map(item => eachInfoRender(item.text, item.value))}
        </div>
    )
}