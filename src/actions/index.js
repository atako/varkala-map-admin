import { createAction } from 'redux-actions'
import firebase, { auth, provider } from '../firebase'
import uuid from 'uuid/v4'
import { reset } from 'redux-form'

export const fetchPointSuccess = createAction('POINTS_FETCH_SUCCESS')
export const fetchPointRequest = createAction('POINTS_FETCH_REQUEST')
export const fetchPointFailure = createAction('POINTS_FETCH_FAILURE')

export const fetchPoints = () => async(dispatch) => {
  try {
    const itemsRef = firebase.database().ref('points')
    itemsRef.on('value', (snapshot) => {
      dispatch(fetchPointRequest())
      const items = Object.values(snapshot.val())
      dispatch(fetchPointSuccess({ items }))
    })
  } catch (e) {
    dispatch(fetchPointFailure())
  }
}

export const fetchLoginRequest = createAction('LOGIN_FETCH_REQUEST')
export const fetchLoginSuccess = createAction('LOGIN_FETCH_SUCCESS')
export const fetchLoginFailure = createAction('LOGIN_FETCH_FAILURE')

export const login = () => async(dispatch) => {
  try {
    dispatch(fetchLoginRequest())
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user
        dispatch(fetchLoginSuccess({ user }))
      }).catch(function (error) { 
        dispatch(fetchLoginFailure())
      })
  } catch (e) {
    dispatch(fetchLoginFailure())
  }
}

export const checkAuthSuccess = createAction('AUTHCHECK_SUCCESS')

export const checkAuth = () => async(dispatch) => {
  try {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(checkAuthSuccess(user))
      }
    })
  } catch (e) {

  }
}


export const logoutSuccess = createAction('LOGOUT_SUCCESS')
export const logout = () => async(dispatch) => {
  try {
    auth.signOut()
      .then(() => {
        dispatch(logoutSuccess())
      })
  } catch (e) {

  }
}


export const togglemodal = createAction('MODAL_TOGGLE')

export const addPointRequest = createAction('POINT_ADD_REQUEST')
export const addPointSuccess = createAction('POINT_ADD_SUCCESS')
export const addPointFailure = createAction('POINT_ADD_FAILURE')

export const addPoint = (values) => async(dispatch) => {
  dispatch(addPointRequest())
  const id = uuid()
  values.visible = true
  values.color = '#A4459A'
  values.id = id
  const description = values.description ? values.description : 'No description'
  const objectItem = { title: values.title, description: description, img: values.img }
  try {
    const pointsRef = firebase.database().ref('points')
    pointsRef.child(id).set({ ...values })
    const objectsRef = firebase.database().ref('objects')
    objectsRef.child(id).set({ ...objectItem })
    dispatch(reset('newPoint'))
    dispatch(addPointSuccess())
  } catch (e) {
    dispatch(addPointFailure())
  }
}



export const deletePointRequest = createAction('POINT_DELETE_REQUEST')
export const deletePointSuccess = createAction('POINT_DELETE_SUCCESS')
export const deletePointFailure = createAction('POINT_DELETE_FAILURE')

export const deletePoint = (pointId) => async(dispatch) => {
  dispatch(deletePointRequest())
  try {
    const pointRef = firebase.database().ref(`/points/${pointId}`)
    pointRef.remove()
    dispatch(deletePointSuccess())
  } catch (e) {

  }
}

export const editPointRequest = createAction('POINT_UPDATE_REQUEST')
export const editPointSuccess  = createAction('POINT_UPDATE_SUCCESS')
export const editPointFailure = createAction('POINT_UPDATE_FAILURE')
export const toggleEdit = createAction('POINT_TOGGLE_EDIT')

export const editPoint = (pointValues) => async(dispatch) => {
  // dispatch(editPointRequest())
  try {
    const pointRef = firebase.database().ref(`points/${pointValues.id}`)
    const objectRef = firebase.database().ref(`objects/${pointValues.id}`)
    pointRef.update(pointValues)
    objectRef.update({ title: pointValues.title, description: pointValues.description, en_title: pointValues.en_title})
    dispatch(toggleEdit())
  } catch (e) {

  }
}

