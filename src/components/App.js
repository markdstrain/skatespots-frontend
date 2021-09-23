import React from 'react';
import SkateMap from './Maps/SkateMap';
import { Route, Switch } from "react-router-dom";
import { Container} from 'react-bootstrap';
import './App.css';
import SpotMarker from './Maps/SpotMarker';
import SpotForm from "./Forms/SpotForm";
import Signup from './Forms/Signup';
import Login from './Forms/Login';
import Logout from './Forms/Logout';
import InfoBar from './Navbars/InfoBar';



function App() {
  
  return (
    <div >
      <Route path="/" component={InfoBar}/>
      <Switch>
        <Route exact path="/">
          <SkateMap/>
        </Route>
        <Route exact path="/spotmarker">
          <SpotMarker/>
        </Route>
        <Route exact path="/spotform">
          <Container 
              className="d-flex align-items-center justify-content-center mt-1"
              style={{ maxHeight: "100vh" }}
              >
                <div className="w-100" style={{ maxWidth: '450px'}}>
                  <SpotForm />
                </div>
          </Container>
        </Route>
        <Route exact path="/signup">
          <Container 
            className="d-flex align-items-center justify-content-center mt-1"
            style={{ maxHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: '400px'}}>
                <Signup />
              </div>
          </Container>
        </Route>
        <Route exact path="/login">
          <Container 
            className="d-flex align-items-center justify-content-center mt-1"
            style={{ maxHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: '400px'}}>
                <Login />
              </div>
          </Container>
        </Route>
        <Route exact path = '/logout'>
          <Logout/>
        </Route>
      </Switch>  
      

      
    </div>
  )
}

export default App;
