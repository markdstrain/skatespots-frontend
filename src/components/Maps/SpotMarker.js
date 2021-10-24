import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { createErrors } from '../../actions/errors';
import ReactMapGL, {Marker, NavigationControl } from "react-map-gl";
import {  Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveCoordinates } from '../../actions/spots';
import Pin from "./Pin";
import "./SpotMarker.css"


function SpotMarker() {

          const [ viewport, setViewport ] = useState({
                    latitude: 34.7465,
                    longitude: -92.2896,
                    width: "100vw",
                    height: "100vh",
                    zoom: 4 
          });

          const dispatch = useDispatch();
          const history = useHistory();
          const stateError = useSelector(store => store.errors);
 
  
          const handleChange = (e) => {
                    const coordinates = [marker.latitude, marker.longitude];
                    dispatch(saveCoordinates(coordinates));
                    dispatch(createErrors(''));
                    history.push('/spotform');
          };

          const [ marker, setMarker ] = useState({
                    latitude: 34.7465,
                    longitude: -92.2896,
          });

          const onMarkerDragEnd = useCallback(event => {
                    setMarker({
                              longitude: event.lngLat[0],
                              latitude: event.lngLat[1]
                    });
          }, []);

  // if(stateUser && Object.keys(stateUser).length !== 0) {
  //   return <Redirect push to ="/"/>
  // }

          return (
                    <div>
                              <div className="text-center fs-5 fw-bold bg-danger ">
                                        Drag pin onto location(Please be very Specific) and then click "create spot" button
                              </div>   
                              {stateError.errors && stateError.errors ==="Your Spot Location was lost. Please re-select your coordinates."&& 
                                        <Alert variant="danger">{ stateError.errors } </Alert> }

                              <ReactMapGL 
                                        {...viewport}
                                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                                        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
                                        onViewportChange={viewport => {
                                                  setViewport(viewport);
                                        }} 
                              >
                                        <Marker
                                                  longitude={marker.longitude}
                                                  latitude={marker.latitude}
                                                  offsetTop={-20}
                                                  offsetLeft={-10}
                                                  draggable
                                                  onDragEnd={onMarkerDragEnd}
                                        >
                                                  <Pin size={20}/>
                                                            {marker.latitude}
                                                            <br/>
                                                            {marker.longitude}
                                        </Marker>
                                        {viewport.latitude}
                                        <br/>
                                        {viewport.longitude}
                                        <div className="nav" >
                                                  <NavigationControl/>
                                        </div>
                                        <a value={[marker.latitude, marker.longitude]} onClick={handleChange} className="btn btn-info spotButton" >
                                                  Create Spot
                                        </a>
                              </ReactMapGL>
          </div>
  )
}

  export default SpotMarker;