import React from 'react'
import './App.css'
import RequestHOC from './HOC/Request'
import LandingPage from './Components/OpenDoor'
import Loader from './Components/Loader'
import DoneScreen from './Components/DoneView'

function App() {
  return (
    <div className="App">
      <RequestHOC>
        {(openDoor, loading, res) => {
          if (res !== undefined) {
            return <DoneScreen res={res} />
          } else if (loading) {
            return <LandingPage openDoor={openDoor} />
          }
          return <Loader />
        }}
      </RequestHOC>
    </div>
  )
}

export default App
