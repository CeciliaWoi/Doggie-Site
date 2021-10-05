import { FILTER_BY_EXISTENCE } from ".";

export function filterByExistence(payload) {
    return {
        type: FILTER_BY_EXISTENCE,
        payload
    }
}