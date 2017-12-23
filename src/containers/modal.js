import { connect } from 'react-redux'
import Component from '../components/modal'
import * as actionCreators from '../actions'

const mapStateToProps = state => {
  const props = {
    modal: state.modal,
    addPointState: state.addPointState
  }
  return props
  
}

export default connect(mapStateToProps, actionCreators)(Component)