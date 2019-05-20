import React from 'react'
import './App.css'
import RequestHOC from './HOC/Request'
import OpenDoorView from './Components/OpenDoorView'
import LoaderView from './Components/LoaderView'
import ResultView from './Components/ResultView'

function App() {
  return (
    <div className="cover-all">
      <RequestHOC>
        {(openDoor, loading, res) => {
          if (res !== undefined) {
            return <ResultView res={res} />
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
