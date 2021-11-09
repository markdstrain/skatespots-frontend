import coordinates from './coordinates';
import auth from './auth'
import errors from './stateError';
import spots from './spots';
import spot from './spot';
import { combineReducers } from "redux";





export default combineReducers({
    coordinates,
    spots,
    spot,
    auth,
    errors
});