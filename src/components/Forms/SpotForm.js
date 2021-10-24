import React, { useRef, useState, useEffect } from 'react';
import {  Redirect } from 'react-router-dom';
import { saveCoordinatsToAPI } from '../../actions/spots';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { createErrors } from '../../actions/errors';


function SpotForm() {
    
          const dispatch = useDispatch();
          const [error, setError] = useState('')
          const titleRef = useRef();
          const commentRef = useRef();
          const stateError = useSelector(store => store.errors);
          const coords = useSelector(state => state.coordinates.coordinates)
          const details = {};
        
          //handle the change on our detail array
          function handleChange(e) {
                    //figure out the target of our detail
                    const target = e.target;
                    const value = target.value;
                    //if our target is checked add to our detail array if unchecked remove it
                    if(target.checked){ 
                              details[value]=true;
                    }else{
                              delete details[value];
                    }
                    console.log(details);
          }
         
          //handle submit make sure we meet the credentials and we have current access token then make api call
          function handleSubmit(e) {
                    e.preventDefault();
                    try {
                              // Set error if there is no detail selected.
                              setError('')
                              if (Object.keys(details).length <= 0){
                                        return setError('Please Select at least one detail');
                              }else{      

                                        if(!coords){
                                        //set in state that will send us back a page to SpotMarker.
                                                  return   dispatch(createErrors("Your Spot Location was lost. Pleas re-select your coordinates."))          
                                        }else{
                                                  //set here we'll use our auth config to see if our user is elligable to make an api call to post
                                                  //create a hook that checks if  
                                                  //a spot if it successful we'll make the api call
                                                  
                                                  const user = sessionStorage.getItem('user');
                                                  dispatch(saveCoordinatsToAPI(
                                                                      titleRef.current.value,
                                                                      coords,
                                                                      user,
                                                                      details,
                                                                      commentRef.current.value));
                                                  
                                        }                 
                              }
                    }catch(err){
                              console.log(err)
                    }
          }
          
                    //We need to set redux error so that we can display it on the spotmarker page that lets the user know what happened
                    if(stateError && stateError.errors === "Your Spot Location was lost. Please re-select your coordinates."){
                              return <Redirect push to ="/spotmarker" />
                    };
                    if(stateError && stateError.errors === "You must be logged in to access this! 😐"){
                              return <Redirect push to ="/login" />
                    };
                    
   
  //html for Spot Detail Form Gets Spot Name Sets Detail and any additional Comment you want to make.
           return (
                    <>
                               <Container className="d-flex align-items-center justify-content-center mt-1"
                                        style={{ maxHeight: "100vh" }}>
                                        <div className="w-100" style={{ maxWidth: '450px'}}>
                                                  <Card>
                                                            <Card.Body>
                                                                      <h2 className="text-center mb-1">Spot Details:</h2>

                                                                      {error && <Alert className ="text-center" variant="danger">{ error} </Alert> }
                                                                      {stateError.errors && Object.keys(stateError.errors).length !== 0 && 
                                                                      <Alert variant="danger">{ stateError.errors } </Alert> }

                                                                      <Form onSubmit={ handleSubmit }>
                                                                                 <Form.Group id="username">
                                                                                          <Form.Label>Spot Name:</Form.Label>
                                                                                          <Form.Control type="title" ref={titleRef} required></Form.Control>
                                                                                </Form.Group>
                                                                                <Form.Group id="spotDetails">
                                                                                          <Form.Label className="mt-2">Details:</Form.Label>
                                                                                          <Container>
                                                                                                    <Row>
                                                                                                               <Col>
                                                                                                                        <Form.Check value = "public" type = "checkbox"  label="Public" onChange={handleChange} />
                                                                                                                         <Form.Check value = "privateSpot" type = "checkbox" label="Private" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "skatePark" type = "checkbox" label="Skate Park" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "stairs" type = "checkbox" label="Stairs" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "handrails" type = "checkbox" label="Handrails" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "curbs" type = "checkbox" label="Curbs" onChange={handleChange}/>
                                                                                                              </Col> 
                                                                                                              <Col> 
                                                                                                                        <Form.Check value = "flatRail" type = "checkbox" label="Flat Rail" onChange={handleChange} />
                                                                                                                        <Form.Check value = "hubbas" type = "checkbox" label="Hubbas" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "transition" type = "checkbox" label="Transition" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "street" type = "checkbox" label="Street" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "poolSpot" type = "checkbox" label="Pool" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "bowl" type = "checkbox" label="Bowl" onChange={handleChange}/>
                                                                                                               </Col> 
                                                                                                              <Col> 
                                                                                                                        <Form.Check value = "vert" type = "checkbox" label="Vert Ramp" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "diy" type = "checkbox" label="DIY" onChange={handleChange} />
                                                                                                                        <Form.Check value = "mini" type = "checkbox" label="Mini Ramp" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "manny" type = "checkbox" label="Manny Pad" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "pGrag" type = "checkbox" label="Prkng Grag" onChange={handleChange}/>
                                                                                                                        <Form.Check value = "pLot" type = "checkbox" label="Prkng Lot" onChange={handleChange}/>
                                                                                                              </Col>
                                                                                                    </Row>
                                                                                          </Container>
                                                                                </Form.Group>
                                                                                <Form.Group>
                                                                                          <Form.Label className="mt-2">Additional Comments:</Form.Label>
                                                                                          <Form.Control ref={ commentRef } as="textarea" rows={3}  type="title"></Form.Control>
                                                                                </Form.Group>
                                                                                <Button className="w-100 mt-2" type="submit">Create Spot</Button>
                                                                      </Form>
                                                            </Card.Body>
                                                  </Card>
                                        </div>
                              </Container>
                    </>
          )
}

export default SpotForm;