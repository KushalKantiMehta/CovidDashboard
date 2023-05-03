import {
  SET_DATA_INDIA,
  SET_DATA_INDIA_NEW,
  SET_DATA_WORLD,
} from '../constants/constants.js'

const initialState = {
  india: {},
  world: {},
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_INDIA_NEW: {
      return { ...state, indiaNew: action?.payload }
    }
    case SET_DATA_INDIA: {
      return { ...state, india: action?.payload }
    }
    case SET_DATA_WORLD: {
      return { ...state, world: action?.payload }
    }
    default:
      return state
  }
}
