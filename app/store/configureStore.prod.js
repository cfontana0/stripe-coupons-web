import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(thunk, promise)
    );

    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
}
