import React from 'react'
import PropTypes from 'prop-types'

const DoneScreen = props => {
  const { res } = props
  const { success, wait } = res
  if (success) {
    return (
      <div className="center">
        <span className="center">Welcome home Olivia, Queen and empress of Chabo</span>
        <a
          className="mail center"
          href="mailto:gabrielwallin09@gmail.com?subject=Älskar dig&body=<3"
        >
          tell me im good
        </a>
        <img src="\olivia.JPG" className="olivia" />
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
        <span className="center">failed, please dont try again.</span>
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
