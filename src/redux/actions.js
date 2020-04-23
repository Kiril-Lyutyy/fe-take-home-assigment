import axios from 'axios';
import {
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_STARTED,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_FAILURE,
    SUBMIT_FORM_STARTED,
} from './types';

const url = 'https://jsonplaceholder.typicode.com';

export function fetchDataSuccess(data) {
    const storedData = localStorage.getItem('fetchedData');
    if (!storedData) localStorage.setItem('fetchedData', JSON.stringify(data));
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data,
    }
}

export function fetchDataFailure(err) {
    return {
        type: FETCH_DATA_FAILURE,
        payload: err,
    }
}

export function fetchDataStarted() {
    return {
        type: FETCH_DATA_STARTED,
    }
}

export function getUsers() {
    return dispatch => {
        dispatch(fetchDataStarted());
        const storedData = localStorage.getItem('fetchedData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            dispatch(fetchDataSuccess(parsedData));
            return;
        }
        axios
            .all([
                axios.get(`${url}/users/`),
                axios.get(`${url}/posts/`)
            ])
            .then(axios.spread((...responses) => {
                dispatch(fetchDataSuccess(responses));
            }))
            .catch(err => {
                dispatch(fetchDataFailure('Error fetching data...'));
            })
    }
}

export function submitFormData(userName) {
    return dispatch => {
        dispatch(submitFormStarted());
        axios
            .post(`${url}/users/`, {
                userName,
            })
            .then(res => {
                dispatch(submitFormSuccess({
                    id: res.data.id,
                    name: res.data.userName,
                }));
            })
            .catch(err => {
                dispatch(submitFormFailure('Error submitting form...'));
            })
    }
}

export function submitFormSuccess(user) {
    const storedData = localStorage.getItem('fetchedData');
    const data = JSON.parse(storedData);
    data[0].data = [user, ...data[0].data];
    localStorage.setItem('fetchedData', JSON.stringify(data));
    return {
        type: SUBMIT_FORM_SUCCESS,
        payload: user,
    }
}

export function submitFormFailure(err) {
    return {
        type: SUBMIT_FORM_FAILURE,
        payload: err,
    }
}

export function submitFormStarted() {
    return {
        type: SUBMIT_FORM_STARTED,
    }
}