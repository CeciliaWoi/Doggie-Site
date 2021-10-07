import { ORDER_BY_WEIGHT_MIN } from '.';


export function orderByWeightMin(payload) {
    return {
        type: ORDER_BY_WEIGHT_MIN,
        payload
    }
}