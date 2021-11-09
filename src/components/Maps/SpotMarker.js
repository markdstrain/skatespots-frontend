import React, { useState, useCallback, useEffect } from 'react';
import { createErrors } from '../../actions/errors';
import ReactMapGL, {Marker, NavigationControl,Popup } from "react-map-gl";
import Pin from './Pin';
import { Link } from 'react-router-dom';
import {  Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveCoordinates } from '../../actions/spots';
import { getAllSpots } from "../../actions/spots";
import "./SpotMarker.css"


function SpotMarker() {
          
          


          const [ viewport, setViewport ] = useState({
                    latitude: 34.7465,
                    longitude: -92.2896,
                    width: "100vw",
                    height: "100vh",
                    zoom: 10 
          });
          
          const [selectedSpot, setSelectedSpot] = useState(null);
          const dispatch = useDispatch();
          const history = useHistory();
          const stateError = useSelector(store => store.errors);
          const spots = useSelector(state => state.spots.spots);
          
          useEffect(() => {
                    dispatch(getAllSpots());
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[]);

          useEffect(() => {
                    const listener = e => {
                              if (e.key === "Escape"){
                                        setSelectedSpot(null);
                              }
                    };
                    window.addEventListener("keydown", listener);
                    return () => {
                              window.removeEventListener("keydown", listener);
                    }
          }, []);

          
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

          const getDetails = () => {
                    const details = Object.keys(selectedSpot).filter(key => selectedSpot[key] === true)
                    let detailArray = []
                    for(let i =0;  i<details.length; i++){
                              if(details[i] === 'flat_rail'){
                                        detailArray.push("flat rails");
                              }else if(details[i] === 'manny'){
                                        detailArray.push('manual pad')
                              }else if(details[i] === 'mini'){
                                        detailArray.push('mini ramp');
                              }else if(details[i] === 'p_grag'){
                                        detailArray.push('parking garage');
                              }else if(details[i] === 'p_lot'){
                                        detailArray.push('parking lot');
                              }else if(details[i] === 'pool_spot'){
                                        detailArray.push('pool');
                              }else if(details[i] === 'private_spot'){
                                        detailArray.push('private')
                              }else if(details[i] === 'skate_park'){
                                        detailArray.push('skate park')
                               }else if(details[i] === 'vert'){
                                        detailArray.push('vert ramp')
                               }else{
                                         detailArray.push(details[i])
                               }
                    }
                    return detailArray.join(", ")
          }

          return (
                    <div>
                              <div className="text-center fs-5 fw-bold bg-danger ">
                                        Drag GREEN pin onto location(Please be very Specific) and then click "create spot" button
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
                                                  offsetTop={-45}
                                                  offsetLeft={-27}
                                                  draggable={true}
                                                  onDragEnd={onMarkerDragEnd}
                                        >
                                                <Pin size="40px" />
                                               
                                                            
                                        </Marker>

                                        {spots && Object.keys(spots).length > 0 && 
                                                  spots.map(spot => (
                                                            <Marker 
                                                                      key={spot.spot_id}
                                                                      longitude={spot.longitude}
                                                                      latitude={spot.latitude}
                                                                      offsetTop={-45}
                                                                      offsetLeft={-20}
                                                            >
                                                                     <button
                                                                                className="marker-btn"
                                                                                onClick={e => {
                                                                                          e.preventDefault();
                                                                                          setSelectedSpot(spot);
                                                                                }}>
                                                                                <img src="/images/pin.png" alt="pin" className="pin"/>
                                                                      </button>
                                                            </Marker>
                                                  ))
                                         }
                                         {selectedSpot ? (
                                                   <Popup 
                                                                 closeOnClick={false}
                                                                 latitude={selectedSpot.latitude} 
                                                                 longitude={selectedSpot.longitude} 
                                                                 offsetLeft={2}
                                                                 className='popup'
                                                                  onClose={()=> {
                                                                           setSelectedSpot(null);
                                                                      }}
                                                                  >
                                                                      
                                                                     <h4 className="text-center">
                                                                                <Link to={`spot/${selectedSpot.id}`}> {selectedSpot.spot_name}</Link>        
                                                                      </h4>
                                                            
                                                                      <p>{getDetails()}</p>
                                                                      
                                                   </Popup>
                                         ) : null}

                                        
                                        <div className="nav" >
                                                  <NavigationControl/>
                                        </div>
                                        <button value={[marker.latitude, marker.longitude]} onClick={handleChange} className="btn btn-warning spotButton" >
                                                  Create Spot
                                        </button>
                              </ReactMapGL>
          </div>
  )
}

  export default SpotMarker;