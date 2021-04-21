import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { availableTimes } from '../../store/modules/availabilityTime';
import { fetchAppointmentInfo } from '../../store/modules/appointmentForm';

import styles from './styles.module.scss';

export const AvailableTime = () => {
    const dispatch = useDispatch();
    const handleTimeClick = (event: MouseEvent) => {
        dispatch(fetchAppointmentInfo((event.target as HTMLInputElement).value))
    };
    const availableTimesArr = useSelector(
        (state: RootState) => (
            state.app.availabilityTime.availableTimesData as availableTimes
        ).availableTimes
    );
    const morningArr = availableTimesArr?.filter(item => item?.time < 1300 && item?.time >= 100);
    const eveningArr = availableTimesArr?.filter(item => item?.time >= 1300 || item?.time < 100);

    const timeButton = (displayedtime: string, time: number) => (
        <button
            className={styles.timeButton}
            key={displayedtime}
            value={time}
            onClick={handleTimeClick}
        >
            {displayedtime}
        </button>
    );

    const buttonsBlock = (
        <div className={styles.buttonsBlock}>
            {morningArr?.length
                ? (
                    <div className={styles.periodBlock}>
                        <p>Morning</p>
                        <div className={styles.buttons}>
                            {morningArr.map(time => timeButton(time.displayTime, time.time))}
                        </div>
                    </div>
                ) : undefined
            }
            {eveningArr?.length 
                ? (
                    <div className={styles.periodBlock}>
                        <p>Evening</p>
                        <div className={styles.buttons}>
                            {eveningArr.map(time => timeButton(time.displayTime, time.time))}
                        </div>
                    </div>
                ) : undefined
            }
        </div>
    )

    const noAvailableTime = (
        <div className={styles.noAvailableTime}>
            <p>
                No times available on this date
            </p>
        </div>
    )


    return (
        <div className={styles.container}>
            <div className={styles.containerTime}>
                {availableTimesArr?.length
                    ? buttonsBlock
                    : noAvailableTime
                }
                
            </div>
        </div>
    );
}