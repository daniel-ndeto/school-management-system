import axios from 'axios'; // Importing axios for making HTTP requests
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './complainSlice'; // Importing Redux actions from complainSlice

// Function to fetch all complaints based on an ID and address
export const getAllComplains = (id, address) => async (dispatch) => {
    dispatch(getRequest()); // Dispatching an action to indicate the request has started

    try {
        // Making a GET request to fetch complaints
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}List/${id}`);
        
        // Checking if the response contains a message indicating failure
        if (result.data.message) {
            dispatch(getFailed(result.data.message)); // Dispatching failure action with the error message
        } else {
            dispatch(getSuccess(result.data)); // Dispatching success action with the fetched data
        }
    } catch (error) {
        dispatch(getError(error)); // Dispatching error action with the caught error
    }
}