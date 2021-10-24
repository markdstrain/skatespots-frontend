import { useState } from 'react';
import { getAllSpots } from '../../actions/spots';

const useData = () => {
          const [data,loadData] = useState()
          const [isLoading,changeLoading] = useState(true)
          
          const getData =async() => {
                    const data = await getAllSpots;
                              
                    loadData(() => data);
                    changeLoading(false);
          }
                     
          return [data, getData, isLoading];            
          
          
}

export {useData};
