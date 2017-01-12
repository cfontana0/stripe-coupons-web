import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import _ from 'lodash';

const STATE = {list: [], showModal: false, form: {amount_off: '', max_redemptions: '', expiration_date: ''}, msg: ''};

const coupons = (state = STATE, action) => {
    switch (action.type) {
        case types.ADD_COUPON:
            return {...state, list: state.list};
        case types.UPDATE_LIST:
            const list = action.payload.coupons;
            return {...state, list };
        case types.SHOW_MODAL:
            return {...state, showModal: true };
        case types.HIDE_MODAL:
            return {...state, showModal: false, form: {amount_off: '', max_redemptions: '', expiration_date: ''} };
        case types.UPDATE_FORM:
            const newForm = Object.assign({}, state.form);
            if (action.payload.field.amount_off) {
                newForm.amount_off = action.payload.field.amount_off;
            } else if (action.payload.field.max_redemptions) {
                newForm.max_redemptions = action.payload.field.max_redemptions;
            } else if (action.payload.field.expiration_date) {
                newForm.expiration_date = action.payload.field.expiration_date;
            }
            return {...state, form: newForm };
        case types.DISPLAY_ERROR:
            return {...state, msg: action.payload.msg };
        case types.NEW_COUPON:
            const newList = state.list.slice();
            newList.push(action.payload.coupon);
            return {...state, msg: '', form: {amount_off: '', max_redemptions: '', expiration_date: ''}, showModal: false, list: newList };
        case types.DELETE_COUPON:
            const nList = _.remove(state.list.slice(), (c) => {
                return c.id !== action.payload.id;
            });
            return {...state, list: nList };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    coupons,
    routing
});

export default rootReducer;
