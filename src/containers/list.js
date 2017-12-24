import { connect } from 'react-redux'
import Component from '../components/list'
import * as actionCreators from '../actions'
const mapStateToProps = state => {
  const props = {
    points: state.points,
    modal: state.modal,
  }
  return props
}

export default connect(mapStateToProps, actionCreators)(Component)