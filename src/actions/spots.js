import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';


import { 
          FETCH_SPOTS,
          SAVE_COORDINATES
          } from './types';
import { createErrors } from './errors';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

export function setSpots(spots) {
          return {
              type: FETCH_SPOTS,
              id: spots.id,
              
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
                        const res = await axios.get(`${BASE_URL}/spots`)
            
                        console.log(res);
            
                        
                  }catch(error){
                      return dispatch(createErrors(error.response));
                  }      
               };
}

                

//        export function saveSpotToAPI(username, password) {
//           return async function (dispatch) {
//                try{
//                    const res = await axios.post(`${BASE_URL}/spots`, {
                       
//                    });
//                    const _refreshToken = res.data._refreshToken;
//                    const refreshTokenInfo = jwtDecode(_refreshToken);
//                    window.sessionStorage.setItem("user", refreshTokenInfo.username);
//                    localStorage.setItem('_refreshToken', _refreshToken);
       
//                    setAuthorizationToken(_refreshToken);
//                    authConfig();
//                    return dispatch(setCurrentUser(jwtDecode(_refreshToken)));
//              }catch(error){
//                  return dispatch(createErrors(error.response.data.message));
//              }      
//           };
           
//        }