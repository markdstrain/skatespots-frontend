import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { createErrors } from '../actions/errors';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from '../actions/auth';
axios.defaults.withCredentials = true;

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

export function setAuthorizationToken(token) {
    const authAxios = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        }    
    })
    return authAxios;
}



export function authConfig(user) {
    return async function(dispatch){
        try{
            

            const refreshToken = localStorage.getItem('_refreshToken') ? localStorage.getItem('_refreshToken') : null;
            const expires = Cookies.get('expires') ? Cookies.get('expires') : null;
            const now = new Date();

            const authAxios = setAuthorizationToken(refreshToken);

            
            /**
            * If there isn't a refresh Token or Access Token or User in our Storage we want send these people
            * to login.  set an Error to go back with it that states that they must be logged in to access that point.
            */
           if(!refreshToken && !expires){
                return  <Redirect push to = "/login"/>;
            }
            /**
             * If the Access Token is still there and the Refresh Token are there but the user is somehow missing then we want to just 
             * update that info in sessionStorage. Also check if expiration is near get them a new access token
             */
            else if(refreshToken && expires && !user){
                if((expires-now)< 120000){
                    await axios.post(`${BASE_URL}/auth/token`);
                    const refreshTokenInfo = jwtDecode(refreshToken);
                    sessionStorage.setItem('user', refreshTokenInfo.username);
                    return user;       
                }else{
                    const refreshTokenInfo = jwtDecode(refreshToken);
                    sessionStorage.setItem('user', refreshTokenInfo.username);
                    return user;
                }
            }
             /**
              * If there's no access token than we want to get these folks a new 
              * Access token. If there is an refresh Token but it doesn't match the one saved in the Database we're gonna catch that
              * error and redirect to the login
              */
            else if(refreshToken && !expires){
                console.log('Am I making it here')
                await authAxios.post(`${BASE_URL}/auth/token`)

                 return dispatch(setCurrentUser(user));
            }
          
            /** 
            /** If all of them are true then we'll see if the access token is near expiration if it is we'll send a new one and we'll
            * move on.
            */
            else if(refreshToken && expires && user ){
                if((expires-now)< 120000){
                    await axios.post(`${BASE_URL}/auth/token`);
                    return dispatch(setCurrentUser(user))
                }else{
                    return user;
                } 
            }    
        }catch(error){
            if (error){
                createErrors("You're session ended please log in again")
                return <Redirect pust to = "/login"/>
            }
        }
    }    
}

