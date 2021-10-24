import React from 'react';
import SkateMap from './Maps/SkateMap';
import { Route, Switch } from "react-router-dom";
import SpotMarker from './Maps/SpotMarker';
import SpotForm from "./Forms/SpotForm";
import Signup from './Forms/Signup';
import Login from './Forms/Login';
import Logout from './Forms/Logout';
import InfoBar from './Navbars/InfoBar';
import ProtectedRoute from './ProtectedRoute';


function Root() {
  
  return (
    <div >
          <Route path="/" component={InfoBar}/>
          <Switch>
                    <Route exact path="/">
                              <SkateMap/>
                    </Route>
                    <ProtectedRoute exact path ="/spotmarker" component={SpotMarker}/>
                    <ProtectedRoute exact path="/spotform" component={SpotForm}/>
                    <Route exact path="/signup">
                              <Signup />
                    </Route>
                    <Route exact path="/login">
                              <Login/>
                    </Route>
                    <Route exact path = '/logout'>
                              <Logout/>
                    </Route>
          </Switch>  
    </div>
  )
}

export default Root;