import { takeLeading } from 'redux-saga/effects'
import {
  worldDataHandler,
  indiaDataHandler,
  indiaDataHandlerNew,
} from './handlers'

export function* worldDataWatcher() {
  console.log('World watcher ....')
  yield takeLeading('FETCH_DATA_WORLD', worldDataHandler)
}

export function* indiaDataWatcher() {
  console.log('India watcher ....')
  yield takeLeading('FETCH_DATA_INDIA', indiaDataHandler)
}

export function* indiaDataWatcherNew() {
  console.log('India watcher ....')
  yield takeLeading('FETCH_DATA_INDIA_NEW', indiaDataHandlerNew)
}
