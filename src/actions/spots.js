import axios from 'axios';
import { 
    FETCH_COORDINATES,
    SAVE_COORDINATES
} from './types';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001"

function getCoordinates(spots){
    return {
        type: FETCH_COORDINATES,
        spots,
    };
}

export const saveCoordinates = (coordinates) => ({
    type: SAVE_COORDINATES,
    payload: coordinates,
})
