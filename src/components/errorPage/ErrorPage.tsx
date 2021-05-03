import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { resetFormInfo } from '../../store/modules/appointmentForm';

import styles from './styles.module.scss';

export const ErrorPage = () => {
    const {text, type} = useSelector((state: RootState) => (state.app.appointmentForm.isError));
    const dispatch = useDispatch();
    const handleReset = useCallback(() => {
        dispatch(resetFormInfo());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.errorHeader}>
                <span>&#9785;</span>&nbsp;<h1>Oops!</h1>
            </div>
            <p className={styles.errorText}>{text}</p>
            <p className={styles.infoText}>Don't panic, just reload the page or click the big button to return home</p>
            <button onClick={handleReset} className={styles.homeButton}>
                <Link to="/home">Home page</Link>
            </button>
        </div>
    )
}
