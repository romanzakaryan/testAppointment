import { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteAppointmentInfo, existedCustomerData, fetchFinalFormBooking, payloadBooking } from '../../store/modules/appointmentForm';
import { dateLine } from '../../utils/date';
import { validateEmail } from '../../utils/form';

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
        businessName,
        resourceName,
        serviceName,
        duration,
        startDateTime,
        time
    } = useSelector((state: RootState) => state.app.appointmentForm.appointmentDate as existedCustomerData);

    const formHeader = (
        <div className={styles.AppointmentInfo}>
            <h4>{businessName}</h4>
            <p>{serviceName}</p>
            <p>{duration} min - {resourceName}</p>
            <p className={styles.choosedDay}>{dateLine(startDateTime, time)}</p>
        </div>
    )

    return (
        <div className={styles.container}>
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
                        <div className={styles.containerHeader}>
                            {formHeader}
                        </div>
                        <Field name="firstName">
                            {({ input, meta }) => (
                                <div className={styles.inputDefault}>
                                    <label>First name</label>
                                    <input
                                        {...input}
                                        type="text"
                                        placeholder="Enter first name"
                                        className={(meta.error && meta.touched) ? styles.error : undefined}
                                    />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="lastName">
                            {({ input, meta }) => (
                                <div className={styles.inputDefault}>
                                    <label>Last name</label>
                                    <input
                                        {...input}
                                        type="text"
                                        placeholder="Enter last name"
                                        className={(meta.error && meta.touched) ? styles.error : undefined}
                                    />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="email">
                            {({ input, meta }) => (
                                <div className={styles.inputDefault}>
                                    <label>Email</label>
                                    <input
                                        {...input}
                                        type="text"
                                        placeholder="Enter valid email address"
                                        className={(meta.error && meta.touched) ? styles.error : undefined}
                                    />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="phone">
                            {({ input }) => (
                                <div className={styles.inputDefault}>
                                    <label>Phone<span className={styles.optionalField}>&nbsp;- Optional</span></label>
                                    <input {...input} type="tel" placeholder="Enter phone number"/>
                                </div>
                            )}
                        </Field>
                        <Field name="customerMessage">
                            {({ input }) => (
                                <div className={`${styles.inputDefault} ${styles.inputMessage}`}>
                                    <label>Customer message<span className={styles.optionalField}>&nbsp;- Optional</span></label>
                                    <textarea {...input} placeholder="Send us a message" />
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