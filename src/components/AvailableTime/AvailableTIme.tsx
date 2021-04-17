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

    const noAvailableTime = (
        <div className={styles.noAvailableTime}>
            <p>
                No times available on this date
            </p>
        </div>
    )

    const availableTimesArr = useSelector((state: RootState) => (state.app.availabilityTime.availableTimesData as availableTimes).availableTimes);
    console.log('availableTimesArr', availableTimesArr)

    return (
        <div className={styles.container}>
            <div className={styles.containerTime}>
                {availableTimesArr.length
                    ? availableTimesArr.map(time => timeButton(time.displayTime, time.time))
                    : noAvailableTime
                }
                
            </div>
        </div>
    );
}