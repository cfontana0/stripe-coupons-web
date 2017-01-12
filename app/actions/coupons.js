import * as types from './types';
import { SERVER_URL } from './';
import moment from 'moment';

export const updateList = (coupons) => {
    return {
        type: types.UPDATE_LIST,
        payload: { coupons }
    };
};

export const getAll = () => {
    const request = new Request(`${SERVER_URL}/coupon`, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'GET'
    });

    return (dispatch) => {
        fetch(request).then((response) =>  {
            if (response.status === 200) {
                return response.json();
            }
        }).then((body) => {
            if(!body.error) {
                dispatch(updateList(body.data.coupons));
            }
        });
    };
};

export const openModal = () => {
    return (dispatch) => {
        dispatch({type: types.SHOW_MODAL});
    };
};

export const closeModal = () => {
    return (dispatch) => {
        dispatch({type: types.HIDE_MODAL});
    };
};

export const updateForm = (field) => {
    return {
        type: types.UPDATE_FORM,
        payload: { field }
    };
};

export const submit = (amount_off, max_redemptions, expiration_date) => {
    return (dispatch) => {
        const date = moment(expiration_date, 'YYYY-MM-DD');
        if (!amount_off || !amount_off.replace(/\s/g, '').length || isNaN(amount_off)) return dispatch({type: types.DISPLAY_ERROR, payload: {msg: 'Amount is not valid'}});
        if (!max_redemptions || !max_redemptions.replace(/\s/g, '').length || isNaN(max_redemptions)) return dispatch({type: types.DISPLAY_ERROR, payload: {msg: 'Number of redemptions is not valid'}});
        if (!date.isValid()) return dispatch({type: types.DISPLAY_ERROR, payload: {msg: 'Expiration date is not valid'}});
        const request = new Request(`${SERVER_URL}/coupon`, {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            method: 'POST',
            body: JSON.stringify({expiration_date: date.format('YYYY.MM.DD'), amount_off, max_redemptions })
        });
        fetch(request).then((response) =>  {
            if (response.status === 200) {
                return response.json();
            }
        }).then((body) => {
            if(!body.error) {
                return dispatch({type: types.NEW_COUPON, payload: {coupon: body.data.coupon }});
            }
        });
    };
};

export const deleteCoupon = (id) => {
    return (dispatch) => {
        const request = new Request(`${SERVER_URL}/coupon/${id}`, {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            method: 'DELETE'
        });
        fetch(request).then((response) =>  {
            if (response.status === 200) {
                return response.json();
            }
        }).then((body) => {
            if(!body.error) {
                return dispatch({type: types.DELETE_COUPON, payload: {id}});
            }
        });
    };
};
