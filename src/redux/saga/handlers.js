import { getWorldData, getIndiaData } from '../../axios/axios'
import { setDataWorld } from '../actions/actions'
import { call, put } from 'redux-saga/effects'

export function* worldDataHandler() {
  const response = yield call(getWorldData)
  const { data } = response
  return yield put(setDataWorld(data))
}

export function* indiaDataHandler() {
  const response = yield call(getIndiaData)
  const { data } = response
  return yield put(setDataWorld(data))
}
