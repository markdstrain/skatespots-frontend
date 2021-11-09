import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Link } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from "../../actions/spots";
import "./SpotMarker.css"



function SkateMap() {
          const dispatch = useDispatch();
          const spots = useSelector(state => state.spots.spots);
          const [selectedSpot, setSelectedSpot] = useState(null);
          


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
          
          const [ viewport, setViewport ] = useState({
                    latitude: 34.7465,
                    longitude: -92.2896,
                    width: "100vw",
                    height: "100vh",
                    zoom: 10
          });

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
                              <ReactMapGL 
                                        {...viewport}
                                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                                        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
                                        onViewportChange={viewport => {
                                                  setViewport(viewport);
                                        }} 
      
                              >         
                                        {spots && Object.keys(spots).length > 0 && 
                                                  spots.map(spot => (
                                                            <Marker 
                                                                      key={spot.spot_id}
                                                                      longitude={spot.longitude}
                                                                      latitude={spot.latitude}
                                                                      offsetTop={-45}
                                                                      offsetLeft={-27}
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
                                                                                <Link to = {`spot/${selectedSpot.id}`} > {selectedSpot.spot_name}</Link>        
                                                                      </h4>
                                                            
                                                                      <p>{getDetails()}</p>
                                                                      
                                                   </Popup>
                                         ) : null}
                                         
                                       
                              </ReactMapGL>

                    </div>
          )
}

  export default SkateMap;