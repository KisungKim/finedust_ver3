import { createAction, handleActions } from "redux-actions";
import {pender} from 'redux-pender'
import axios from 'axios'

function getParkAPI(){
  return axios.get('https://api.myjson.com/bins/l9qow')
}

const GET_PARK = 'GET_PARK'

export const getPark = createAction(GET_PARK, getParkAPI)

const initialState ={
  parks : []
}

// 2개를 매개변수로 받으니까 action.payload에 객체로 (lat,lng 가진) 넘겨줘야 겠네
export default handleActions({
  ...pender({
    type : GET_PARK,
    onSuccess : (state,action) =>{
      return {
        parks : action.payload.data
      }
    }
  })
},initialState);
