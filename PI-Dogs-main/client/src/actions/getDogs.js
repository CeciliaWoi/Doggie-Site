import axios from 'axios';
import { GET_DOGS } from '.';


export function getDogs() {
    return async function(dispatch) {
        var response = await axios("http://localhost:3001/dogs")
        
        return dispatch({
            type: GET_DOGS,
            payload: response.data
        })
    }
}