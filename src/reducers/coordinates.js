import {
    FETCH_SPOTS,
    SAVE_COORDINATES
} from "../actions/types";

export default function coordReducer(state = {}, action) {
    switch (action.type) {
        case SAVE_COORDINATES:
                    return { ...state, coordinates: action.payload}
          case FETCH_SPOTS:
                    return { ...state,spots: action.payload}
        
        default:
            return state
    };
    
}