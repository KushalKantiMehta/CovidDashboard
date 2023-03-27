import { takeLeading } from 'redux-saga/effects'
import { worldDataHandler } from './handlers'

export function* worldDataWatcher() {
  console.log('World watcher ....')
  yield takeLeading('FETCH_DATA_WORLD', worldDataHandler)
}
