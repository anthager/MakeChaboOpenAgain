import React from 'react'
import PropTypes from 'prop-types'

const ResultView = props => {
  const { res } = props
  const { success, wait } = res
  if (success) {
    return (
      <div className="center">
        <span className="center">door opened, have a nice day :)</span>
        <a className="mail center" href="mailto:anton.hagermalm@gmail.com?subject=you good&body=<3">
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
        <span className="center">failed, please dont try again.</span>
        <a
          className="center"
          href="mailto:anton.hagermalm@gmail.com?subject=the door open shit is broken man&body=>:("
        >
          tell me its broken
        </a>
      </div>
    )
  }
}

ResultView.propTypes = {
  res: PropTypes.object.isRequired,
}

export default ResultView
