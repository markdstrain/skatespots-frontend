import axiosInstance from '../utils/axiosInstance';
import { createErrors } from './errors';
import { 
          FETCH_SPOTS,
          SAVE_COORDINATES,
          FETCH_SPOT
          } from './types';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';


export function setSpots(spots) {
          return {
              type: FETCH_SPOTS,
              spots: spots,
              
          };
      }
export function setSpot(spot) {
          return {
                    type: FETCH_SPOT,
                    spot: spot
          };
}


export const saveCoordinates = (coordinates) => ({
    type: SAVE_COORDINATES,
    payload: coordinates,
})

export function saveCoordinatsToAPI(title,coordinates,user,details,comment ) {
         
          return async function (dispatch) {
               try{
                    const res = await axiosInstance.post(`${BASE_URL}/spots`, {
                              title,
                              coordinates, 
                              user,
                              details,
                              comment
                          });
                    console.log(res)

                    
                   
             }catch(error){
                 return dispatch(createErrors(error.response.data.message));
                    
            }      
          };
}

export function getAllSpots(){
          return async function (dispatch) {
                    try{
                        const res = await axiosInstance.get(`${BASE_URL}/spots`)
                       const spots = res.data.spots
                       
                       
                       return dispatch(setSpots(spots));
                    //     return dispatch(setSpots(res.data.spots));
            
                        
                  }catch(error){
                      return dispatch(createErrors(error.response));
                  }      
               };
}

export function getASpot(id){
          return async function (dispatch) {
                    try{
                              console.log('madeit')
                        const res = await axiosInstance.get(`${BASE_URL}/spots/${id}`)
                       const spot = res.data
                       
                       return dispatch(setSpot(spot.spot));
                    //     return dispatch(setSpots(res.data.spots));
            
                        
                  }catch(error){
                      return dispatch(createErrors(error.response));
                  }      
               };
}              

