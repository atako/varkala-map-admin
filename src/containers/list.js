import { connect } from 'react-redux'
import Component from '../components/list'

const mapStateToProps = state => {
  const props = {
    points: state.points
  }
  console.log(props)
  return props
}

export default connect(mapStateToProps)(Component)