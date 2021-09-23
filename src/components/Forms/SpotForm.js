import React, { useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";




function SpotForm() {
    
    const dispatch = useDispatch();
    const [error, setError] = useState('')
    const detail = [];
    const titleRef = useRef();
    const commentRef = useRef();
    const stateError = useSelector(store => store.errors);
    
    
    
   function handleChange(e) {
       console.log(detail);
       const target = e.target;
       const value = target.value;

      
        
       if(target.checked){ 
           detail.push(value)
       }else{
           let index = detail.indexOf(value);
           if (index !== -1){
               detail.splice(index, 1);
           }
       }
       console.log(detail);
   }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        try {
            
            setError('')
            if (detail.length <= 0){
                return setError('Please Select at least one detail')
            }else{
                console.log(titleRef.current.value);
                console.log(detail);

            }

    
            
            
        }catch(err){
            console.log(err)
        }
    }
   
    
   
    // if(stateUser && Object.keys(stateUser).length !== 0) {
    //     return <Redirect push to ="/"/>
    // }
    return (
        <>
            <Container>
                <div className="text-center display-5 text-bold">
                    New Spot
                </div>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-1">Spot Details:</h2>
                        {error && <Alert className ="text-center" variant="danger">{ error} </Alert> }
                        {/* {stateError.errors && Object.keys(stateError.errors).length !== 0 && <Alert variant="danger">{ stateError.errors } </Alert> } */}
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
                                                <Form.Check value = "Public" type = "checkbox"  label="Public" onChange={handleChange} />
                                                <Form.Check value = "Private" type = "checkbox" label="Private" onChange={handleChange}/>
                                                <Form.Check value = "Skate Park" type = "checkbox" label="Skate Park" onChange={handleChange}/>
                                                <Form.Check value = "Stairs" type = "checkbox" label="Stairs" onChange={handleChange}/>
                                                <Form.Check value = "HandRails" type = "checkbox" label="Handrails" onChange={handleChange}/>
                                                <Form.Check value = "Curbs" type = "checkbox" label="Curbs" onChange={handleChange}/>
                                            </Col> 
                                            <Col> 
                                                <Form.Check value = "Flat Rail" type = "checkbox" label="Flat Rail" onChange={handleChange} />
                                                <Form.Check value = "Hubbas" type = "checkbox" label="Hubbas" onChange={handleChange}/>
                                                <Form.Check value = "Transition" type = "checkbox" label="Transition" onChange={handleChange}/>
                                                <Form.Check value = "Street" type = "checkbox" label="Street" onChange={handleChange}/>
                                                <Form.Check value = "Pool" type = "checkbox" label="Pool" onChange={handleChange}/>
                                                <Form.Check value = "Bowl" type = "checkbox" label="Bowl" onChange={handleChange}/>
                                            </Col> 
                                            <Col> 
                                                <Form.Check value = "Vert Ramp" type = "checkbox" label="Vert Ramp" onChange={handleChange}/>
                                                <Form.Check value = "DIY" type = "checkbox" label="DIY" />
                                                <Form.Check value = "Mini Ramp" type = "checkbox" label="Mini Ramp" onChange={handleChange}/>
                                                <Form.Check value = "Manny Pad" type = "checkbox" label="Manny Pad" onChange={handleChange}/>
                                                <Form.Check value = "Prkng Grag" type = "checkbox" label="Prkng Grag" onChange={handleChange}/>
                                                <Form.Check value = "Prkng Lot" type = "checkbox" label="Prkng Lot" onChange={handleChange}/>
                                            </Col>
                                        </Row>
                                    </Container>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-2">Additional Comments:</Form.Label>
                                <Form.Control as="textarea" rows={3}></Form.Control>
                            </Form.Group>


                            <Button className="w-100 mt-2" type="submit">Create Spot</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default SpotForm;