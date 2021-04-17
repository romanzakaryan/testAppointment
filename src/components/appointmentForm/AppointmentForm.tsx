import { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteAppointmentInfo } from '../../store/modules/appointmentForm';
import { getWeekDayText } from '../../utils/date';
import { validateEmail } from '../../utils/form';
import styles from './styles.module.scss';

export const AppointmentForm = () => {
    const dispatch = useDispatch();
    const onSubmit = () => {
        console.log('submit')
    }

    const handleCancel = useCallback(() => {
        dispatch(deleteAppointmentInfo());
    }, [dispatch]);
    
    const {resourceName, serviceName} = useSelector((state: RootState) => state.app.availabilityDate.availableData);

    const formHeader = (
        <div className={styles.AppointmentInfo}>
            {/* <p className={styles.choosedDay}>{getWeekDayText(selectedDate)}</p> */}
            {/* <span className={styles.choosedDate}>{new Date(selectedDate).getDate()}</span> */}
            <p>{serviceName}</p>
            <p>{resourceName}</p>
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
                                    <label>First name<sup>*</sup></label>
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
                                    <label>Last name<sup>*</sup></label>
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
                                    <label>Email<sup>*</sup></label>
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
                                    <label>Phone</label>
                                    <input {...input} type="tel" placeholder="Enter phone number"/>
                                </div>
                            )}
                        </Field>
                        <Field name="customerMessage">
                            {({ input }) => (
                                <div className={`${styles.inputDefault} ${styles.inputMessage}`}>
                                    <label>Customer message</label>
                                    <textarea {...input} placeholder="Send us a message (optional)" />
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