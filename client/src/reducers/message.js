import {
    GET_MESSAGES,
    CLEAR_MESSAGES,
    MESSAGE_ERROR,
} from '../actions/types';

const initialState = {
    messages: [],
    message: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: payload,
                loading: false
            };
        case CLEAR_MESSAGES:
            return {
                ...state,
                messages: [],
                loading: false
            }
        case MESSAGE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}