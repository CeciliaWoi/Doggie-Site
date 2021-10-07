import { GET_DOGS, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENT, FILTER_BY_EXISTENCE, SEARCH_BY_NAME, ORDER_BY_NAME, ORDER_BY_WEIGHT_MIN} from "../actions";


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
            const todos = state.allDogs;
            // console.log(state.dogs)
            const filteredDogs = action.payload === 'All' ?
            state.allDogs :
            todos.filter((dog) => {
                return dog.temperament?.find((d) => {
                    // console.log(d)
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
            case ORDER_BY_WEIGHT_MIN:
                let minArr = action.payload === '1' ?
                state.dogs.sort(function(a, b) {
                    if(a.weight_min > b.weight_min) {
                        return 1;
                    }
                    if(a.weight_min < b.weight_min) {
                        return -1;
                    }
                    return 0;
                }) :
                state.dogs.sort(function(a, b) {
                    if(a.weight_min > b.weight_min) {
                        return -1;
                    }
                    if(a.weight_min < b.weight_min) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    dogs: minArr
                }
            default:
                return state;
    }
}

export default rootReducer;