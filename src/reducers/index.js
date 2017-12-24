import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions'
import firebase, { auth, provider } from '../firebase'
import { reducer as formReducer } from 'redux-form'
import * as actions from '../actions'

const points = handleActions({
  [actions.fetchPointSuccess](state, { payload }) {
    return payload.items
  },
  [actions.deletePointSuccess](state, { payload}) {
    return payload.items
  }
}, [])

const pointsFetchingState = handleActions({
  [actions.fetchPointRequest]() {
    return 'requested'
  },
  [actions.fetchPointFailure]() {
    return 'failed'
  },
  [actions.fetchPointSuccess]() {
    return 'successed'
  }
}, 'none')

const pointsLoginState = handleActions({
  [actions.fetchLoginRequest]() {
    return 'requested'
  },
  [actions.fetchLoginFailure]() {
    return 'failed'
  },
  [actions.fetchLoginSuccess]() {
    return 'successed'
  }
}, 'none')

const pointDeleteState = handleActions({
  [actions.deletePointRequest]() {
    return 'requested'
  },
  [actions.deletePointFailure]() {
    return 'failed'
  },
  [actions.deletePointSuccess]() {
    return 'successed'
  }
}, 'none')

const pointAddState = handleActions({
  [actions.addPointRequest]() {
    return 'requested'
  },
  [actions.addPointSuccess]() {
    return 'successed'
  },
  [actions.addPointFailure]() {
    return 'failed'
  }
}, 'none')

const user = handleActions({
  [actions.login](state, { }) {
    return state
  },
  [actions.fetchLoginSuccess](state, { payload }){
    return payload.user
  },
  [actions.checkAuthSuccess](state, { payload }){
    return payload
  },
  [actions.logoutSuccess](state,{}) {
    return null
  }
}, null)

const modal = handleActions({
  [actions.togglemodal](state, {}) {
    return { show: !state.show}
  },
  [actions.addPointSuccess](state, {}) {
    return { show: false }
  }
}, { show: false })

export default combineReducers({
  points,
  pointsFetchingState,
  user,
  modal,
  pointAddState,
  form: formReducer,
  pointDeleteState
})