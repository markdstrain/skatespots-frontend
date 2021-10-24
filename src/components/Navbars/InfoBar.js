import React from "react";
import jwtDecode from 'jwt-decode';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';


function InfoBar(){

  const token = (localStorage.getItem("token")) ? localStorage.getItem("token") : null;
  const tokenInfo = (token) ? jwtDecode(token) : null;
  const user = (tokenInfo) ? tokenInfo.username : null
  
  if(tokenInfo && (tokenInfo.isAdmin)){
      
      return (
        <>
          <Navbar bg="dark" variant="dark" className="navbar">
            <Navbar.Brand as ={Link} to="/" className="image">
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
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
              <Nav.Link as ={Link} to="/spots">
                Spots
              </Nav.Link>
              <Nav.Link as = {Link} className="text-nowrap" to="/spotmarker">
                Create Spot
              </Nav.Link>
            </Nav>
            <Container>
              <Nav className="nav-bar right">
                <Nav.Link href="/logout">
                  Logout
                </Nav.Link>
              </Nav> 
            </Container>
          </Navbar>
        </>
      );
  }else if(token && (tokenInfo.username === user) ){
    return(
      <>
        <Navbar bg="dark" variant="dark" className="navbar">
          <Navbar.Brand as ={Link} to="/" className="image">
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
            <Nav.Link as ={Link} to="/spotmarker" className="text-nowrap" >
              Create Spot
            </Nav.Link>
          </Nav>
          <Container>
            <Nav className="nav-bar right">
              <Nav.Link href="/logout" >
                Log Out
              </Nav.Link>
            </Nav> 
          </Container>
        </Navbar>
      </>
    )
  } else{
    return(
      <>
        <Navbar bg="dark" variant="dark" className="navbar">
          <Navbar.Brand as ={Link} to="/" className="image">
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
          </Nav>
          <Container>
            <Nav className="nav-bar right">
              <Nav.Link as ={Link} to="/signup">
                Sign Up
              </Nav.Link>
              <Nav.Link as ={Link} to="/login">
                Log In
              </Nav.Link>
            </Nav> 
          </Container>
        </Navbar>
      </>
    )
  }    
};

export default InfoBar;