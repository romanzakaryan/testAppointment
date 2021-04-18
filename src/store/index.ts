import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import {createBrowserHistory, History} from 'history';
import availabilityDateReducer from './modules/availabilityDate';
import availabilityTimeReducer from './modules/availabilityTime';
import appointmentFormReducer from './modules/appointmentForm';
import preAppointmentDataReducer from './modules/preAppointmentData';

const history = createBrowserHistory();

const appReducer = combineReducers({
    availabilityDate: availabilityDateReducer,
    availabilityTime: availabilityTimeReducer,
    appointmentForm:  appointmentFormReducer,
    preAppointmentData: preAppointmentDataReducer
});

const rootReducer = (history: History) => combineReducers({
    app: appReducer,
    router: connectRouter(history)
});

const store = configureStore({
    reducer: rootReducer(history),
    middleware: getDefaultMiddleware(),
});

export type AppState = ReturnType<typeof appReducer>;
export type RootState = ReturnType<typeof store.getState>

export default store;