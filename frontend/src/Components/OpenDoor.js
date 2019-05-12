import React from 'react'
import PropTypes from 'prop-types'

const LandingPage = ({ openDoor }) => {
  return (
    <div className="cover-all clickable" onClick={openDoor}>
      <span className="center">Press anywhere to unlock</span>
    </div>
  )
}

LandingPage.propTypes = {
  openDoor: PropTypes.func.isRequired,
}

export default LandingPage
