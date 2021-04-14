import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import {createBrowserHistory, History} from 'history';
import availabilityReducer from './modules/availabilityDate';

const history = createBrowserHistory();

const appReducer = combineReducers({
    availability: availabilityReducer
});

const rootReducer = (history: History) => combineReducers({
    app: appReducer,
    router: connectRouter(history),
});

const initialState = {
    app: {}
};

const store = configureStore({
    reducer: rootReducer(history),
    middleware: getDefaultMiddleware(),
    preloadedState: initialState,
});

export type AppState = ReturnType<typeof appReducer>;
export type RootState = ReturnType<typeof store.getState>

export default store;