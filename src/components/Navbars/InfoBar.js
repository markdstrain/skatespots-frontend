import React from "react";
import jwtDecode from 'jwt-decode';
import { Container, Nav, Navbar } from 'react-bootstrap';


function InfoBar(){

  const refreshToken = (localStorage.getItem("_refreshToken")) ? localStorage.getItem("_refreshToken") : null;
  const refreshTokenInfo = (refreshToken) ? jwtDecode(refreshToken) : null;
  const user = (refreshTokenInfo) ? refreshTokenInfo.username : null
  
  if(refreshTokenInfo && (refreshTokenInfo.isAdmin)){
      
      return (
        <>
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
                Users
              </Nav.Link>
              <Nav.Link href="/spots">
                Spots
              </Nav.Link>
              <Nav.Link  className="text-nowrap" href="/spotmarker">
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
  }else if(refreshToken && (refreshTokenInfo.username === user) ){
    return(
      <>
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
            <Nav.Link className="text-nowrap" href="/spotmarker">
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
      </>
    )
  }    
};

export default InfoBar;