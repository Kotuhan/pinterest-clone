import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import categories from './categories'
import items from './items'



export default combineReducers({
  routing: routerReducer,
  categories:  categories,
  items: items
})
