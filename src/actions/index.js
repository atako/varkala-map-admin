import { createAction } from 'redux-actions'
import firebase, { auth, provider } from '../firebase'

export const fetchPointSuccess = createAction('POINTS_FETCH_SUCCESS')

export const fetchPoints = () => async(dispatch) => {
  const itemsRef = firebase.database().ref('points')
  itemsRef.on('value', (snapshot) => {
    const items = snapshot.val()
    dispatch(fetchPointSuccess({ data: items }))
    // this.setState({
    //   items: items
    // })
  })
}
