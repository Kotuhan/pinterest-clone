import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './incrementing'


export default combineReducers({
  routing: routerReducer,
  counter
})
