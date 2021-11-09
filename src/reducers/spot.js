import {
          FETCH_SPOT
      } from "../actions/types";
      
      export default function spotReducer(state = {}, action) {
          switch (action.type) {
                 case FETCH_SPOT:
                           return { ...state, spot: action.spot}
              default:
                  return state
          };
          
      }