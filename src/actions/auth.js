import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER,
         SET_STATE_ERRORS
        } from './types';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}
export const createErrors = (errors) => ({
    type: SET_STATE_ERRORS,
    payload: errors,
})

export function logoutOfAPI() {
    return async function (dispatch) {
        
        const token = localStorage.getItem('_refreshToken');
        const result = jwtDecode(token);
        const username = result.username
        
        await axios.post(`${BASE_URL}/auth/logout`,{
            username
        });

        Cookies.remove('_skateSpotToken');
        localStorage.removeItem('_refreshToken');
        
        setAuthorizationToken(false);
        return dispatch(setCurrentUser({}));
    }
}

export function loginToAPI(username, password) {
   return async function (dispatch) {
       const res = await axios.post(`${BASE_URL}/auth/login`, {
           username,
           password
       });
       const _refreshToken = res.data._refreshToken;
       localStorage.setItem('_refreshToken', _refreshToken);
       
       
       setAuthorizationToken(_refreshToken);
       return dispatch(setCurrentUser(jwtDecode(_refreshToken)));
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
            localStorage.setItem('_refreshToken', _refreshToken);

            setAuthorizationToken(_refreshToken);
            return dispatch(setCurrentUser(jwtDecode(_refreshToken)));
        
    }catch(error){
        return await dispatch(createErrors(error.response.data.message));
    }
}};

