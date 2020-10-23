import { SEARCH_EMAILS } from '../constants/actionTypes';

const doFilterEmailsByDateRange = (startDate, endDate) => ({
    type: SEARCH_EMAILS,
    payload: { startDate: startDate, endDate: endDate },
});

export { doFilterEmailsByDateRange };
