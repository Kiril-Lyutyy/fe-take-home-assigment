import {
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_STARTED,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_FAILURE,
    SUBMIT_FORM_STARTED,
} from './types';

const initialState = {
    users: [],
    posts: [],
    loading: false,
    error: '',
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_STARTED:
            return {
                ...state,
                loading: true,
                error: '',
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                users: action.payload[0].data,
                posts: action.payload[1].data,
                loading: false,
                error: '',
            };
        case SUBMIT_FORM_STARTED:
            return {
                ...state,
                loading: true,
            };
        case SUBMIT_FORM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case SUBMIT_FORM_SUCCESS:
            return {
                ...state,
                users: [ ...state.users, action.payload ],
                loading: false,
                error: '',
            };
        default:
            return state;
    }
};