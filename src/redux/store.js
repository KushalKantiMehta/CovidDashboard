import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer } from './reducers/reducers'
import {
  worldDataWatcher,
  indiaDataWatcher,
  indiaDataWatcherNew,
} from './saga/index'
const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const store = createStore(reducer, applyMiddleware(...middleware))
sagaMiddleware.run(worldDataWatcher)
sagaMiddleware.run(indiaDataWatcher)
sagaMiddleware.run(indiaDataWatcherNewNew)
export default store
