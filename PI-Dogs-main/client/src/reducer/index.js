import { GET_DOGS, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENT } from "../actions";


const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: []
}


function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
            const todos = state.dogs;
            const filteredDogs = action.payload === 'All' ?
            state.allDogs :
            todos.filter((dog) => {
                return dog.Temperaments?.find((d) => {
                    return d.name === action.payload
                })
            })
            return {
                ...state, 
                dogs: filteredDogs
            }
            default:
                return state;
    }
}

export default rootReducer;