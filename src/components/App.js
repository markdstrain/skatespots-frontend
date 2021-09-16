import React from 'react';
import SkateMap from './Maps/SkateMap';
import { Route, Switch } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import SpotMarker from './Maps/SpotMarker';
import NewSpot from './NewSpot';
import Signup from './Forms/Signup';
import Login from './Forms/Login';



function App() {
  
  return (
    <div >
      <Navbar bg="dark" variant="dark" className="navbar">
          
          <Navbar.Brand href="/" className="image">
            <img
              alt=""
              src="https://canary.contestimg.wish.com/api/webimage/5e0af0b04d3a496dc7cbd0fb-large.jpg?cache_buster=69fca7e4177fdf4efad3f9806a7cd75d"
              width="30"
              height="30"
              className="d-inline-block align-top logo"
            />{' '}
          Skate Spots
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/spots">
              Spots
            </Nav.Link>
          </Nav>
          <Container>
            <Nav className="nav-bar right">
              <Nav.Link href="/signup">
                Sign Up
              </Nav.Link>
              <Nav.Link href="/login">
                Log In
              </Nav.Link>
              
            </Nav> 
          </Container>
      </Navbar>

      <Switch>
        <Route exact path="/spots">
          <SkateMap/>
        </Route>
        <Route exact path="/spotmarker">
          <SpotMarker/>
        </Route>
        <Route exact path="/spotform">
          <NewSpot/>
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
      </Switch>  
      

      
    </div>
  )
}

export default App;
