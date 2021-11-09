import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getASpot } from '../../actions/spots';
import { useParams} from 'react-router-dom';
import "./SpotPage.css"


function SpotPage(){
          const { id } = useParams();
          const dispatch = useDispatch();
          const spot = useSelector(state => state.spot.spot)
          const [ active, setActive ] = useState('');
          
          useEffect(() => {
                   dispatch(getASpot(id));
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[]);
          
         
          
          
          
          function toggle(e)  {
                    try{
                              if(active === e.target.parentElement.attributes[1].textContent){
                                        console.log(e.type)
                                        setActive(e.type)
                              }else{
                                        setActive(e.target.parentElement.attributes[1].textContent)
                              }
                              
                    }catch(error){
                              return;
                    }
          }
         
          
          return (
                    <>
                     {spot && Object.keys(spot).length !== 0 && 
                            
                              <div className="panels">
                                        <div className= {active === 'panel1' ? "panel panel1 open open-active": "panel panel1"}
                                                  onClick={toggle}
                                                  key="panel1"
                                                  name="panel1">
                                                  <h2>Photos</h2>
                                                  {active ==='panel1' ? 
                                                  <div>
                                                            shit
                                                  </div> 
                                                  : <p>Photos</p> }
                                                  <div>Photos</div>
                                        </div>
                                        <div className= {active === 'panel2' ? "panel panel2 open open-active": "panel panel2"}
                                                  value="panel2"
                                                  onClick={toggle}>
                                                  <h2 className="top">
                                                            {spot.spot_name}
                                                  </h2>                              
                                                  {active ==='panel2' ? 
                                                  <div className="comments">
                                                           Comments Coming Soon 
                                                  </div> 
                                                  : <p>{spot.spot_name}</p> }
                                                  <div>
                                                            Details
                                                  </div>
                                        </div>
                                        <div className= {active === 'panel3' ? "panel panel3 open open-active": "panel panel1"}
                                                  value="panel3"
                                                  onClick={toggle}>
                                                  <h2>Directions</h2>
                                                  {active ==='panel3' ? 
                                                  <div>
                                                            Coming Soon
                                                  </div> 
                                                  : <p>Directions</p> }
                                                  <div>Directions</div>
                                        </div>
                              </div>}
                    </>
          )

}
export default SpotPage;