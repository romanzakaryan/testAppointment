import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { appointmentPostResponse, existedCustomer, resetFormInfo } from '../../store/modules/appointmentForm';
import successImage from '../../images/success.jpeg'
import apologyImage from '../../images/apology.jpeg'
import { AppointmentInfo } from '../appointmentInfo';

import styles from './styles.module.scss';

export const SuccessPage = () => {
    const dispatch = useDispatch();
    const handleReset = useCallback(() => {
        dispatch(resetFormInfo());
    }, [dispatch]);
    const newAppointmentData = useSelector((state: RootState) => state.app.appointmentForm.appointmentFormData as appointmentPostResponse);
    const [existedAppointmentData] = useSelector((state: RootState) => (state.app.appointmentForm.customerExistedAppointment as existedCustomer).data);
    const isAppointmentExisted = Boolean(useSelector((state: RootState) => (state.app.appointmentForm.customerExistedAppointment as existedCustomer).count));

    const finalAppointmentInfo = isAppointmentExisted ? existedAppointmentData : newAppointmentData;
    const {
        startDateTime,
        time,
        name,
        serviceName,
        duration,
        resourceName,
        confirmationNumber
    } = finalAppointmentInfo;

    return (
        <div className={styles.container}>
            <div className={styles.successHeader}>
                {isAppointmentExisted
                    ? <div className={styles.text}>
                        <img className={styles.image} src={apologyImage} alt='apology'/>
                        <h4>Sorry, but you already have a confirmed appointment {name}.</h4>
                    </div>
                    : <div className={styles.text}>
                        <img className={styles.image} src={successImage} alt='success'/>
                        <h4>Your appointment has been confirmed {name}.</h4>
                        <p>You will receive an email booking confirmation shortly</p>
                    </div>
                }
                
            </div>
            <div className={styles.appointmentInfo}>
                <AppointmentInfo 
                    resourceName={resourceName}
                    serviceName={serviceName}
                    duration={duration}
                    startDateTime={startDateTime}
                    time={time}
                />
            </div>
            <hr />
            <div className={styles.confirmationInfo}>
                <div className={styles.row}>
                    <div className={styles.columnFirst}>Confirmation#</div>
                    <div className={styles.columnSecond}>{confirmationNumber}</div>
                </div>
            </div>
            <button onClick={handleReset} className={styles.homeButton}>
                <Link to="/home">Home page</Link>
            </button>
        </div>
    );
}