import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { loginToAPI } from '../../actions/auth';

function Login() {
   
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const passwordRef = useRef();
   
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(loginToAPI(usernameRef.current.value, passwordRef.current.value));
        
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-1">Log In</h2>
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