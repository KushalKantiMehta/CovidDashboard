import {
  FETCH_DATA_INDIA,
  FETCH_DATA_WORLD,
  SET_DATA_INDIA,
  SET_DATA_WORLD,
} from '../constants/constants.js'

export const getDataIndia = () => {
  return {
    type: FETCH_DATA_INDIA,
  }
}

export const setDataIndia = () => {
  return {
    type: SET_DATA_INDIA,
    payload: data,
  }
}

export const getDataWorld = () => {
  return {
    type: FETCH_DATA_WORLD,
  }
}

export const setDataWorld = () => {
  return {
    type: SET_DATA_WORLD,
    payload: data,
  }
}
