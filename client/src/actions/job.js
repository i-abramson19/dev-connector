import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_JOBS,
  CLEAR_JOBS,
  JOB_ERROR
} from './types';


export const getJobs = () => async dispatch => {
  dispatch({ type: CLEAR_JOBS });
  try {
    const res = await axios.get('/api/jobs');
    dispatch({
      type: GET_JOBS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Search for job
export const searchJob = (description = '',
                          location = 'San Francisco, CA') => async dispatch => {

  try {
    dispatch({ type: CLEAR_JOBS });

    const res = await axios.get('/api/jobs/search', {
      params: {
        description: description,
        location: location
      }
    });

    dispatch({
      type: GET_JOBS,
      payload: res.data
    });

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};