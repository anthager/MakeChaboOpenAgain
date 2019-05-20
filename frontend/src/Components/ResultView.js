import React from 'react'
import PropTypes from 'prop-types'

const failMsg = `failed, please dont try again.</a>`
const successMsg = `door opened, have a nice day mate :)`

const DoneScreen = props => {
  const { res } = props
  const { success, wait } = res
  if (success) {
    return (
      <div className="center">
        <span className="center">{successMsg}</span>
        <a className="mail center" href="mailto:hej@anton.pizza?subject=you good&body=<3">
          tell me im good
        </a>
      </div>
    )
  } else if (wait) {
    return (
      <div className="center">
        <span className="center">{`The door has been opened very recently, wait for ${wait} seconds`}</span>
      </div>
    )
  } else {
    return (
      <div className="center">
        <span className="center">{failMsg}</span>
        <a
          className="center"
          href="mailto:hej@anton.pizza?subject=the door open shit is broken man&body=>:("
        >
          tell me its broken
        </a>
      </div>
    )
  }
}

DoneScreen.propTypes = {
  res: PropTypes.object.isRequired,
}

export default DoneScreen
