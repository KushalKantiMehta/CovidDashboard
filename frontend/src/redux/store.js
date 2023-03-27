import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducer } from './reducers/reducers'
import { worldDataWatcher } from './saga/index'
const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const store = createStore(reducer, applyMiddleware(...middleware))
sagaMiddleware.run(worldDataWatcher)
export default store
