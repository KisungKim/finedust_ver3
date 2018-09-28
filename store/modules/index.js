// combinesReducer()를 할 곳
import { combineReducers } from 'redux'
import latlng from './latlng'
import input from './input'
import parks from './parks'
import { penderReducer } from 'redux-pender'

export default combineReducers({
  latlng, 
  input, 
  parks,
  pender : penderReducer
})