import { FILTER_BY_TEMPERAMENT } from ".";


export function filterByTemps(payload) {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}