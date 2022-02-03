import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import fileReducers from './fileReducers';
import userReducers from './userReducers';


const rootReducer = combineReducers({
    user: userReducers,
    file: fileReducers,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))