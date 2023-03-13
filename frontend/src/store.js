import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  IndiaListReducer,
  stateDetailsReducer,
} from './redux/reducers/indiaReducers'

const reducer = combineReducers({
  IndiaDetailList: IndiaListReducer,
  stateDetailsList: stateDetailsReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
