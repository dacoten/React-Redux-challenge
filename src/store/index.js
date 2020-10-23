import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

const logger = createLogger();

const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(reduxThunk, logger)
);

export default store;