import {
          FETCH_SPOTS
      } from "../actions/types";
      
      export default function spotsReducer(state = {}, action) {
          switch (action.type) {
                case FETCH_SPOTS:
                          return { ...state, spots: action.spots}
              default:
                  return state
          };
          
      }