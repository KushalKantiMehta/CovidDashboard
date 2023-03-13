import {
  FETCH_DATA_INDIA,
  FETCH_DATA_INDIA_FAILED,
  FETCH_DATA_INDIA_SUCCESS,
  FETCH_DATA_STATE,
  FETCH_DATA_STATE_FAILED,
  FETCH_DATA_STATE_SUCCESS,
} from '../constants/IndiaConstants.js'

export const IndiaListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FETCH_DATA_INDIA:
      return { loading: true }
    case FETCH_DATA_INDIA_SUCCESS:
      return { loading: false, products: action.payload }
    case FETCH_DATA_INDIA_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const stateDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case FETCH_DATA_STATE:
      return { loading: true }
    case FETCH_DATA_STATE_SUCCESS:
      return { loading: false, product: action.payload }
    case FETCH_DATA_STATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
