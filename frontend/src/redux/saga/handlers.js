import { getWorldData } from '../../axios/axios'
import { call, put } from 'redux-saga/effects'

export function* worldDataHandler() {
  const response = yield call(getWorldData)
  const { data } = response
  return yield put(setData(data))
}
