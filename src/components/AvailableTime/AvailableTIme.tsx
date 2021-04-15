import { RootState } from '../../store';
import { availableTimes } from '../../store/modules/availabilityTime';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

export const AvailableTime = () => {
    const timeButton = (time: string) => {
        return (
            <button className={styles.timeButton} key={time}>
                {time}
            </button>
        )
    }

    const noAvailableTime = (
        <div className={styles.noAvailableTime}>
            <p>
                No times available on this date
            </p>
        </div>
    )

    const availableTimesArr = useSelector((state: RootState) => (state.app.availabilityTime.availableTimesData as availableTimes).availableTimes);
    console.log(availableTimesArr);

    return (
        <div className={styles.container}>
            <div className={styles.containerTime}>
                {availableTimesArr.length
                ? availableTimesArr.map(time => timeButton(time.displayTime))
                : <div className={styles.noAvailableTime}>No times available on this date</div>
                }
                
            </div>
        </div>
    );
}