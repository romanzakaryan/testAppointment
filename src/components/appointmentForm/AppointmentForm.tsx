import { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteAppointmentInfo, fetchFinalFormBooking, payloadBooking } from '../../store/modules/appointmentForm';
import { validateEmail } from '../../utils/form';
import { AppointmentInfo } from '../appointmentInfo';

import styles from './styles.module.scss';

export const AppointmentForm = () => {
    const dispatch = useDispatch();
    const onSubmit = useCallback((values: payloadBooking) => {
        dispatch(fetchFinalFormBooking(values));
    }, [dispatch]);

    const handleCancel = useCallback(() => {
        dispatch(deleteAppointmentInfo());
    }, [dispatch]);

    const {
        resourceName,
        serviceName,
        duration,
        startDateTime,
        time
    } = useSelector((state: RootState) => state.app.appointmentForm.appointmentDate);

    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}>
                <h1>Book your appointment</h1>
                <AppointmentInfo 
                    resourceName={resourceName}
                    serviceName={serviceName}
                    duration={duration}
                    startDateTime={startDateTime}
                    time={time}
                />
            </div>
            <Form
                onSubmit={onSubmit}
                validate={values => {
                    const errors: Record<string, string> = {}
                    if (!values.firstName) {
                        errors.firstName = 'Required'
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Required'
                    }
                    if (!values.email) {
                        errors.email = 'Required'
                    }else if (!validateEmail(values.email)) {
                        errors.email = 'Incorrect email format'
                    }
                    
                    return errors
                }}
                render={({ handleSubmit, form, submitting, values }) => (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Field name="firstName">
                            {({ input, meta }) => (
                                <div className={styles.inputDefault}>
                                    <input
                                        {...input}
                                        type="text"
                                        placeholder="First name&#42;"
                                        className={(meta.error && meta.touched) ? styles.error : undefined}
                                    />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="lastName">
                            {({ input, meta }) => (
                                <div className={styles.inputDefault}>
                                    <input
                                        {...input}
                                        type="text"
                                        placeholder="Last name&#42;"
                                        className={(meta.error && meta.touched) ? styles.error : undefined}
                                    />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="email">
                            {({ input, meta }) => (
                                <div className={styles.inputDefault}>
                                    <input
                                        {...input}
                                        type="text"
                                        placeholder="Email&#42;"
                                        className={(meta.error && meta.touched) ? styles.error : undefined}
                                    />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="phone">
                            {({ input }) => (
                                <div className={styles.inputDefault}>
                                    <input {...input} type="tel" placeholder="Phone"/>
                                </div>
                            )}
                        </Field>
                        <Field name="customerMessage">
                            {({ input }) => (
                                <div className={`${styles.inputDefault} ${styles.inputMessage}`}>
                                    <textarea {...input} placeholder="Customer message"/>
                                </div>
                            )}
                        </Field>
                        <div className={styles.buttons}>
                            <button
                                className={styles.cancelButton}
                                type="button"
                                onClick={handleCancel}
                                disabled={submitting}
                            >
                                Cancel
                            </button>
                            <button
                                className={styles.submitButton}
                                type="submit"
                                disabled={submitting}
                            >
                                Complete Booking
                            </button>
                        </div>
                    </form>
                )}
            />
        </div>
    )
}