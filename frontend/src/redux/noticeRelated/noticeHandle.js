import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './noticeSlice';

// Fetches notices for a specific ID and address, dispatching Redux actions to track request state
export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest()); // Signal request start to update loading state

    try {
        // Make API call to fetch notices using environment variable base URL
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        
        if (result.data.message) {
            dispatch(getFailed(result.data.message)); // Handle API error response
        } else {
            dispatch(getSuccess(result.data)); // Update store with successful response data
        }
    } catch (error) {
        dispatch(getError(error)); // Handle network or unexpected errors
    }
}
