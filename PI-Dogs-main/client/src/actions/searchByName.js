import axios from "axios";
import { SEARCH_BY_NAME  } from ".";


export function searchByName(name) {
    return async function(dispatch) {
        try {
        var response = await axios(`http://localhost:3001/dogs?name=${name}`)
        return dispatch({
            type: SEARCH_BY_NAME,
            payload: response.data
        });
        } catch(err) {
            alert('Dog not found!')
        }
    }
}

