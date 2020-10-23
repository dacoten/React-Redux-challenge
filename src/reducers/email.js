import initialData from '../api/initialData.json';
import { SEARCH_EMAILS } from '../constants/actionTypes';

const INITIAL_STATE = {
    initialData: initialData,
    emails: []
};

function emailReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SEARCH_EMAILS:
            return {
                ...state,
                emails: applyFilterEmailsByDateRange(state.initialData, action.payload),
            };
        default:
            return state;
    }
};

const applyFilterEmailsByDateRange = (emails, dates) => {
    const { startDate, endDate } = dates;

    if (startDate.length === 0 || endDate.length === 0) {
        return emails;
    }

    return emails.filter(email => {
        const createdDate = new Date(email.createdDate);
        return (createdDate >= new Date(startDate) && createdDate <= new Date(endDate));
    });
};

export default emailReducer;