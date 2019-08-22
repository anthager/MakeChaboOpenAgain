import React from 'react'
import './App.css'
import RequestHOC from './HOC/Request'
import OpenDoorView from './Components/OpenDoorView'
import LoaderView from './Components/LoaderView'
import OliviaResultView from './Components/OliviaResultView'

function App() {
  return (
    <div className="cover-all">
      <RequestHOC>
        {(openDoor, loading, res) => {
          if (res !== undefined) {
            return <OliviaResultView res={res} />
          } else if (loading) {
            return <LoaderView />
          }
          return <OpenDoorView openDoor={openDoor} />
        }}
      </RequestHOC>
    </div>
  )
}

export default App
