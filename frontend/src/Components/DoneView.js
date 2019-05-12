import React from 'react'
import PropTypes from 'prop-types'

const failMsg = `failed, please dont try again.</a>`
const successMsg = `door opened, have a nice day mate :)`

const DoneScreen = props => {
  const { res } = props
  return (
    <div className="center">
      <span className="center">{res ? successMsg : failMsg}</span>
      {res ? (
        <a className="mail center" href="mailto:hej@anton.pizza?subject=you good&body=<3">
          tell me im good
        </a>
      ) : (
        <a
          className="center"
          href="mailto:hej@anton.pizza?subject=the door open shit is broken man&body=>:("
        >
          tell me its broken
        </a>
      )}
    </div>
  )
}

DoneScreen.propTypes = {
  res: PropTypes.bool.isRequired,
}

export default DoneScreen
