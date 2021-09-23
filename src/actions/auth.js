import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setAuthorizationToken } from '../utils/authConfig';
import { SET_CURRENT_USER,
        } from './types';
import { createErrors } from './errors';
import Cookies from 'js-cookie';
import { authConfig } from '../utils/authConfig';
import { Redirect } from 'react-router';
axios.defaults.withCredentials = true;

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}
export function logoutOfAPI(username) {
    return async function (dispatch) {
        try{
            await axios.post(`${BASE_URL}/auth/logout`,{
            username
            });

            Cookies.remove('_skateSpotToken');
            localStorage.removeItem('_refreshToken');
            sessionStorage.removeItem("user");
        
            setAuthorizationToken(false);
            return dispatch(setCurrentUser({}));
        }catch(error){
            return dispatch(createErrors(error))
        }
    }
}

export function loginToAPI(username, password) {
   return async function (dispatch) {
        try{
            const res = await axios.post(`${BASE_URL}/auth/login`, {
                username,
                password
            });
            const _refreshToken = res.data._refreshToken;
            const refreshTokenInfo = jwtDecode(_refreshToken);
            window.sessionStorage.setItem("user", refreshTokenInfo.username);
            localStorage.setItem('_refreshToken', _refreshToken);

            
            setAuthorizationToken(_refreshToken);
            authConfig();
            return dispatch(setCurrentUser(jwtDecode(_refreshToken)));
      }catch(error){
          return dispatch(createErrors(error.response.data.message));
      }      
   };
    
}

export function signupFromAPI(username, password, firstName, lastName, email) {
    return async function (dispatch) {
        try{ 
                const res = await axios.post(`${BASE_URL}/auth/register`, {
                    username,
                    password,
                    firstName,
                    lastName,
                    email
                });
            

            const _refreshToken = res.data._refreshToken;
            const refreshTokenInfo = jwtDecode(_refreshToken);
            window.sessionStorage.setItem("user", refreshTokenInfo.username);
            localStorage.setItem('_refreshToken', _refreshToken);

            setAuthorizationToken(_refreshToken);
            return dispatch(setCurrentUser(jwtDecode(_refreshToken)));
        
        }catch(error){
            return await dispatch(createErrors(error.response.data.message));
        }
    }
};




