import axios from 'axios';
import { GET_TEMPERAMENTS } from '.';


export function getTemperaments() {
    return async function(dispatch) {
        var response = await axios("http://localhost:3001/temperaments")
        
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: response.data
        })
    }
}