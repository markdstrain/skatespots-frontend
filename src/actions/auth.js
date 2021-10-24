import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER,
        } from './types';
import { createErrors } from './errors';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const axiosInterceptor = axios.create();



export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        id: user.username,
        user
    };
}


export function logoutOfAPI(username) {
    return async function (dispatch) {
        try{
            await axios.post(`${BASE_URL}/auth/logout`,{
            username
            });
            
            
            localStorage.removeItem('token');
            sessionStorage.removeItem("user");
        
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

            const token = res.data.token;
            const tokenInfo = jwtDecode(token);
            window.sessionStorage.setItem("user", tokenInfo.username);
            localStorage.setItem('token', token);

            return dispatch(setCurrentUser(jwtDecode(token)));
      }catch(error){
          return dispatch(createErrors(error.response));
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
            
            const token = res.data.token;
            const refreshTokenInfo = jwtDecode(token);
            window.sessionStorage.setItem("user", token.username);
            localStorage.setItem('token', token);

            
            return dispatch(setCurrentUser(jwtDecode(token)));
        
        }catch(error){
            return  dispatch(createErrors(error.response.data.message));
        }
    }
};
   






