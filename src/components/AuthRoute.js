import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { createErrors } from "../actions/errors";
import jwtDecode from 'jwt-decode';

function AuthRoute({ isUser: isUser, component: Component, ...rest}) {
    const dispatch = useDispatch();
    return(
        <Route
            {...rest}
            render={(props) => {
                const refreshToken = localStorage.getItem("_refreshToken") ? 
                    localStorage.getItem("_refreshToken") : null;
                const refreshTokenInfo = refreshToken ? jwtDecode(refreshToken) : null;
                const isAdmin = refreshToken ? refreshToken.isAdmin : null;
                if (refreshToken && isAdmin) {
                    return <Component />;
                }else {
                    dispatch(createErrors("must be logged in and corrct credentials"))
                    return <Redirect to={{pathname: "/login", state: { from: props.location } }}/>
                }
            }}
        />
    );
}

export default AuthRoute