import { getWorldData, getIndiaData, getIndiaDataNew } from '../../axios/axios'
import { setDataIndia, setDataIndiaNew, setDataWorld } from '../actions/actions'
import { call, put } from 'redux-saga/effects'

export function* worldDataHandler() {
  const response = yield call(getWorldData)
  const { data } = response
  return yield put(setDataWorld(data))
}

export function* indiaDataHandler() {
  const response = yield call(getIndiaData)
  const { data } = response
  return yield put(setDataIndia(data))
}

export function* indiaDataHandlerNew() {
  const response = yield call(getIndiaDataNew)
  const { data } = response
  return yield put(setDataIndiaNew(data))
}
