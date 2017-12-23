import { connect } from 'react-redux'
import Component from '../components/menu'
import * as actionCreators from '../actions'
const mapStateToProps = state => {
  const props = {
    user: state.user
  }
  return props
}

export default connect(mapStateToProps, actionCreators)(Component)