import { ORDER_BY_NAME } from ".";


export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}