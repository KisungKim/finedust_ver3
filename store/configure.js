// make store
import {createStore, applyMiddleware} from 'redux'
import modules from "./modules"
import penderMiddleware from 'redux-pender'

// 미들웨어를 여기다가 처리
const configure = () =>{
  const store = createStore(modules, applyMiddleware(penderMiddleware()))
  return store
}

export default configure