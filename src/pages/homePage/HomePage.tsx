import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetFormInfo } from '../../store/modules/appointmentForm';
import styles from './styles.module.scss';

export const HomePage = () => {
    const dispatch = useDispatch();
    const resetForm = useCallback(() => {
        dispatch(resetFormInfo());
    }, [dispatch]);
    useEffect(() => {
        resetForm();
    }, []);

    return (
        <div className={styles.container}>
            <h1>You are on imaginary Home Page</h1>
            <button className={styles.appointmentButton}>
                <Link to="/appointment">Appointment page</Link>
            </button>
        </div>
    )
};