import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { createErrors } from "../actions/errors";

function ProtectedRoute({  isUser, component: Component, ...rest}) {
    const dispatch = useDispatch();
    return(
        <Route
            {...rest}
            render={(props) => {
                const token= localStorage.getItem("token") ? 
                    localStorage.getItem("token") : null
                if (token) {
                    return <Component />;
                }else {
                    dispatch(createErrors("must be logged in to access"))
                    return <Redirect to={{pathname: "/login", state: { from: props.location } }}/>
                }
            }}
        />
    );
}

export default ProtectedRoute