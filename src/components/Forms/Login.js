import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { loginToAPI } from '../../actions/auth';
import { createErrors } from '../../actions/errors';

function Login() {
   
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const stateError = useSelector(store => store.errors);
    const stateUser = useSelector(store => store.auth.user);
    
   
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(createErrors({}));
        
        dispatch(loginToAPI(usernameRef.current.value, passwordRef.current.value));
        
    }
    if(stateUser && Object.keys(stateUser).length !== 0) {
        return <Redirect push to ="/"/>
   }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-1">Log In</h2>
                    {stateError.errors && Object.keys(stateError.errors).length !== 0 && <Alert variant="danger">{ stateError.errors } </Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="username">
                            <Form.Label>User Name:</Form.Label>
                            <Form.Control type="username" ref={usernameRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type = "password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button className="w-100 mt-2" type="submit">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't Have an Account? <Link to="/signup" >Sign Up</Link>
            </div>
        </>
    )
}

export default Login;