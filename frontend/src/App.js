import React from 'react'
import './App.css'
import RequestHOC from './HOC/Request'
import LandingPage from './Components/OpenDoor'
import Loader from './Components/Loader'
import DoneView from './Components/DoneView'

function App() {
  return (
    <div className="App">
      <RequestHOC>
        {(openDoor, loading, res) => {
          if (res !== undefined) {
            return <DoneView res={res} />
          } else if (loading) {
            return <Loader />
          }
          return <LandingPage openDoor={openDoor} />
        }}
      </RequestHOC>
    </div>
  )
}

export default App
