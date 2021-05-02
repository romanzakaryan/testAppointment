import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { appointmentPostResponse, existedCustomer, resetFormInfo } from '../../store/modules/appointmentForm';
import { dateLine } from '../../utils/date';

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
        businessName,
        name,
        serviceName,
        duration,
        resourceName,
        confirmationNumber
    } = finalAppointmentInfo;

    return (
        <div className={styles.container}>
            <div className={styles.successHeader}>
                <h4>{businessName}</h4>
                {isAppointmentExisted
                    ? <div className={`${styles.text} ${styles.apologyText}`}>
                        <span>&#9888;</span>
                        &nbsp;
                        <p>Sorry, but you already have a confirmed appointment {name}.</p>
                    </div>
                    : <div className={`${styles.text} ${styles.successText}`}>
                        <span>&#10003;</span>
                        &nbsp;
                        <p>Your appointment has been confirmed {name}.</p>
                    </div>
                }
                
            </div>
            <div className={styles.appointmentInfo}>
                <p>{dateLine(startDateTime, time)}</p>
                <p>{serviceName}, {duration} min - {resourceName}</p>
                <p>Confirmation#: {confirmationNumber}</p>
            </div>
            {!isAppointmentExisted &&
                <p className={styles.mailInfo}>You will receive an email booking confirmation shortly</p>
            }
            <button onClick={handleReset} className={styles.homeButton}>
                <Link to="/home">Home page</Link>
            </button>
        </div>
    );
}