import { combineReducers } from 'redux';
import emailReducer from './email';

const rootReducer = combineReducers({
    emailState: emailReducer,
});

export default rootReducer;