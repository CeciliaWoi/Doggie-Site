import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const FILTER_BY_EXISTENCE = "FILTER_BY_EXISTENCE";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT_MIN";
export const POST_DOG = "POST_DOG";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DOG_DETAIL = "CLEAR_DOG_DETAIL";


export function getDogs() {
  return async function (dispatch) {
    var response = await axios("http://localhost:3001/dogs");

    return dispatch({
      type: GET_DOGS,
      payload: response.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var response = await axios("http://localhost:3001/temperaments");

    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: response.data,
    });
  };
}

export function filterByTemps(payload) {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
}

export function filterByExistence(payload) {
  return {
    type: FILTER_BY_EXISTENCE,
    payload,
  };
}

export function searchByName(name) {
  return async function (dispatch) {
    try {
      var response = await axios(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: response.data,
      });
    } catch (err) {
      alert("Dog not found!");
    }
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/dog", payload);
    return response;
  };
}

export function getDetail(id) {
  if (id) {
    return async function (dispatch) {
      try {
        let response = await axios(`http://localhost:3001/dogs/${id}`);

        return dispatch({
          type: GET_DETAIL,
          payload: response.data,
        });
      } catch (err) {
        console.log(err);
      }
    };
  }
  return {
      type: CLEAR_DOG_DETAIL
  }
}
