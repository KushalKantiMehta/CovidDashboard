import { takeLatest } from 'redux-saga/effects'
import { worldDataHandler } from './handlers'

export function* worldDataWatcher() {
  console.log('World watcher ....')
  yield takeLatest('FETCH_DATA_WORLD', worldDataHandler)
}
