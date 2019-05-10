/* eslint-disable react/prop-types */
import { Component } from 'react'
import { openDoor } from './utils'

export default class RequestHOC extends Component {
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
