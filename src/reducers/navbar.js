import { SET_NAVBAR } from "../actions/types";



export default function errorReducer(state = {}, action) {
    switch(action.type) {
        case SET_NAVBAR:
            return {
                ...state, navbar: action.payload};
        default: 
            return state;
    }
}