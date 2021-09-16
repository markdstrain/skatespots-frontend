import React, { useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { createErrors } from '../../actions/auth';
import { signupFromAPI } from '../../actions/auth';

function Signup() {
    
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const stateError = useSelector(store => store.error)
    const [error, setError ] = useState('');
    const [loading, setLoading ] =useState(false);
    
    
    
    function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value != 
            passwordConfirmationRef.current.value) {
                return setError('Passwords do not match')
            }
        try {
            setError('');
            setLoading(true);
            
            dispatch(createErrors({}))
            
            dispatch(signupFromAPI(usernameRef.current.value,
                                   passwordRef.current.value,
                                   firstNameRef.current.value,
                                   lastNameRef.current.value,
                                   emailRef.current.value));
            
        }catch(err){
            console.log(err)
        }
    }
   
    if (stateError) {
        return <div>{stateError}</div>
    }

   
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-1">Sign Up</h2>
                    {error && <Alert variant="danger">{ stateError } </Alert> }
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="username">
                            <Form.Label>User Name:</Form.Label>
                            <Form.Control type="username" ref={usernameRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="first-name">
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control type="first-name" ref={firstNameRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="last-name">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type ="last-name" ref={lastNameRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>email:</Form.Label>
                            <Form.Control type ="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type = "password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirmation">
                            <Form.Label>Password Confirmation:</Form.Label>
                            <Form.Control type = "password" ref={passwordConfirmationRef} required></Form.Control>
                        </Form.Group>
                        <Button className="w-100 mt-2" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login" >Log In</Link>
            </div>
        </>
    )
}

export default Signup;