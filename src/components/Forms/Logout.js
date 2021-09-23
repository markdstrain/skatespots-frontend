import React from 'react';
import jwtDecode from 'jwt-decode';
import { logoutOfAPI, setCurrentUser } from "../../actions/auth";
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Logout(){
    
    console.log("logging out")
    const dispatch = useDispatch();
    const token = (localStorage.getItem('_refreshToken')) ? localStorage.getItem('_refreshToken') : null;
    const result = (token) ? jwtDecode(token) : null;
    const username = (result) ? result.username : null;
    const stateUser = useSelector(store => store.auth.user);
    

   if (username){
       if(stateUser && Object.keys(stateUser).length === 0) {
            dispatch(logoutOfAPI(username));
            localStorage.removeItem('_refreshToken');
            return <Redirect push to ="/"/> 
        }
   }
    return (
        <>
        </>
    )

}
 export default Logout;
