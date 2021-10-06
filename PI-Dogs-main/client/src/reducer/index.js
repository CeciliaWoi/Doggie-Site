import { GET_DOGS, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENT, FILTER_BY_EXISTENCE, SEARCH_BY_NAME } from "../actions";


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
            // console.log(action.payload)
            const todos = state.dogs;
            // console.log(state.dogs)
            const filteredDogs = action.payload === 'All' ?
            state.allDogs :
            todos.filter((dog) => {
                return dog.temperament?.find((d) => {
                    console.log(d)
                    return d.name === action.payload
                })
            })
            return {
                ...state, 
                dogs: filteredDogs
            }
        case FILTER_BY_EXISTENCE:
            const createdFilter =
                action.payload === 'Created' ? 
                state.allDogs.filter((d) => d.createdInDb) : 
                state.allDogs.filter((d) => !d.createdInDb);
                return {
                    ...state,
                    dogs: action.payload === "All" ? state.allDogs: createdFilter,
                }
        case SEARCH_BY_NAME:
                return {
                    ...state,
                    dogs: action.payload
                }
            default:
                return state;
    }
}

export default rootReducer;