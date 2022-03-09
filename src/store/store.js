import { createStore,combineReducers, compose, applyMiddleware } from 'redux';
import { authReducer } from '../reducer/authReducer';
import thunk from 'redux-thunk';
import { uiReducer } from '../reducer/uiReducer';
import { notesReducer } from '../reducer/notesReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})

export const store= createStore(
    reducer,
    composeEnhancers(

        applyMiddleware(thunk)
    )
    );