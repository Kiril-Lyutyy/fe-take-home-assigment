import axios from 'axios';
import {
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_STARTED,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_FAILURE,
    SUBMIT_FORM_STARTED,
} from './types';
import { sortArrFunc } from '../helpers/helpers';

const url = 'https://jsonplaceholder.typicode.com';

export function fetchDataSuccess(users) {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: users,
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
        axios
            .all([
                axios.get(`${url}/users/`),
                axios.get(`${url}/posts/`)
            ])
            .then(axios.spread((...responses) => {
                const users = responses[0].data;
                const posts = responses[1].data;
                const usersWithPosts = users
                    .sort(sortArrFunc)
                    .map(user => {
                        user.posts = posts
                            .filter(post => post.userId === user.id)
                            .sort(sortArrFunc);
                        return user;
                    });
                dispatch(fetchDataSuccess(usersWithPosts));
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