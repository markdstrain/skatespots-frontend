import React, { useEffect, useState } from 'react';
import ReactMapGL from "react-map-gl";
import { useData } from "../Hooks/hooks";



function SkateMap() {

          const [spots, getSpots, isLoading] = useData();

          useEffect(() => {
                    getSpots();
                    console.log(spots)
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[]);
          

  const [ viewport, setViewport ] = useState({
    latitude: 34.7465,
    longitude: -92.2896,
    width: "100vw",
    height: "100vh",
    zoom: 3
  });
  
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
          <div>        
            {viewport.latitude},{"   "}
            {viewport.longitude} 
         </div>
         <div>
          
         </div>
      </ReactMapGL>

    </div>
  )
}

  export default SkateMap;