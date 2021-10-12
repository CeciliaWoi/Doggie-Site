import { GET_DOGS, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENT, FILTER_BY_EXISTENCE, SEARCH_BY_NAME, ORDER_BY_NAME, ORDER_BY_WEIGHT, POST_DOG, GET_DETAIL } from "../actions";


const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: []
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
            const todos = state.allDogs;
            const filteredDogs = action.payload === 'All' ?
                state.allDogs :
                    todos.filter((dog) => {
                        return dog.temperaments?.find((d) => {
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
        case ORDER_BY_NAME:
            let sortArr = action.payload === 'asc' ?
                state.dogs.sort(function(a, b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }) :
                    state.dogs.sort(function(a, b) {
                        if(a.name > b.name) {
                            return -1;
                        }
                        if(a.name < b.name) {
                            return 1;
                        }
                        return 0;
                    })
            return {
                ...state,
                dogs: sortArr
            }
        case ORDER_BY_WEIGHT:
            let minArr = action.payload === '1' ?
            state.dogs.sort((a, b) => a.weight_min - b.weight_min) :
            state.dogs.sort((a, b) => b.weight_max - a.weight_max)
            return {
                ...state,
                dogs: minArr
            }
        case POST_DOG:
            return {
                ...state
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;