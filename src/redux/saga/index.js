import { takeLeading } from 'redux-saga/effects'
import { worldDataHandler, indiaDataHandler } from './handlers'

export function* worldDataWatcher() {
  console.log('World watcher ....')
  yield takeLeading('FETCH_DATA_WORLD', worldDataHandler)
}

export function* indiaDataWatcher() {
  console.log('India watcher ....')
  yield takeLeading('FETCH_DATA_INDIA', indiaDataHandler)
}
