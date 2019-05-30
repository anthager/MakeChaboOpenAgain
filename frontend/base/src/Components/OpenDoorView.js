import React from 'react'
import PropTypes from 'prop-types'

const OpenDoorView = ({ openDoor }) => {
  return (
    <div className="cover-all clickable" onClick={openDoor}>
      <span className="center">Press anywhere to unlock</span>
    </div>
  )
}

OpenDoorView.propTypes = {
  openDoor: PropTypes.func.isRequired,
}

export default OpenDoorView
