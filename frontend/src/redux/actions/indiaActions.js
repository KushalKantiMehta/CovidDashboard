import {
  FETCH_DATA_INDIA,
  FETCH_DATA_INDIA_FAILED,
  FETCH_DATA_INDIA_SUCCESS,
  FETCH_DATA_STATE,
  FETCH_DATA_STATE_FAILED,
  FETCH_DATA_STATE_SUCCESS,
} from '../constants/IndiaConstants.js'

import axios from 'axios'

export const indiaListDetails = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DATA_INDIA })
    const { data } = await axios.get('/api/products')
    console.log(data)
    dispatch({
      type: FETCH_DATA_INDIA_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FETCH_DATA_INDIA_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const stateDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DATA_STATE })
    const { data } = await axios.get(`/api/products/${id}`)
    console.log(data)
    dispatch({
      type: FETCH_DATA_STATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FETCH_DATA_STATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
