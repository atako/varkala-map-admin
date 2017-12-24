import { connect } from 'react-redux'
import Component from '../components/modal'
import * as actionCreators from '../actions'

const mapStateToProps = state => {
  // console.log(state.initialValues)
  const props = {
    modal: state.modal,
    addPointState: state.addPointState,
    initialValues: state.initialValues
  }
  return props
  
}

export default connect(mapStateToProps, actionCreators)(Component)