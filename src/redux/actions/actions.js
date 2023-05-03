import {
  FETCH_DATA_INDIA,
  FETCH_DATA_WORLD,
  SET_DATA_INDIA,
  SET_DATA_WORLD,
  SET_DATA_INDIA_NEW,
  FETCH_DATA_INDIA_NEW,
} from '../constants/constants.js'

export const getDataIndia = () => {
  return {
    type: FETCH_DATA_INDIA,
  }
}

export const setDataIndia = (data) => {
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

export const setDataWorld = (data) => {
  return {
    type: SET_DATA_WORLD,
    payload: data,
  }
}

export const getDataIndiaNew = () => {
  return {
    type: FETCH_DATA_INDIA_NEW,
  }
}

export const setDataIndiaNew = (data) => {
  return {
    type: SET_DATA_INDIA_NEW,
    payload: data,
  }
}
