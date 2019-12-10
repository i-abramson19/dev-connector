import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_MESSAGES,
  CLEAR_MESSAGES,
  SEND_MESSAGE,
  MESSAGE_ERROR
} from './types';

// Get messages
export const getMessages = id => async dispatch => {
  try {
    const res = await axios.get(`/api/messages/${id}`);
    dispatch({
      type: GET_MESSAGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Send message
export const sendMessage = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    console.log(formData);
    const res = await axios.post('/api/messages', formData, config);

    dispatch({
      type: SEND_MESSAGE,
      payload: res.data
    });

    dispatch(setAlert('Message sent', 'success'));
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};