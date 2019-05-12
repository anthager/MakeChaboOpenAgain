import { Component } from 'react'
import { openDoor } from '../utils'
import { PropTypes } from 'prop-types'

export default class RequestHOC extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }
  state = {
    loading: false,
  }
  _openDoor = async () => {
    this.setState({ loading: true })
    const res = await openDoor()
    this.setState({ loading: false, res })
  }

  render() {
    const { loading, res } = this.state
    return this.props.children(this._openDoor, loading, res)
  }
}
