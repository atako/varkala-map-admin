import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

const points = handleActions({
  [actions.fetchPointSuccess](state, { payload: data}) {
    console.log(data)
    return data.data
  }
}, [])

export default combineReducers({
  points
})