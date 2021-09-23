import coordinates from './coordinates';
import auth from './auth'
import errors from './stateError';
import { combineReducers } from "redux";




export default combineReducers({
    coordinates,
    auth,
    errors
});