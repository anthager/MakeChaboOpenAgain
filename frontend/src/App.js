import React from 'react'
import './App.css'
import RequestHOC from './RequestHOC'
import LandingPage from './Components/LandingPage'
import Loader from './Components/Loader'
import DoneScreen from './Components/DoneScreen'

function App() {
  return (
    <div className="App">
      <RequestHOC>
        {(openDoor, loading, res) => {
          if (res !== undefined) {
            return <DoneScreen res={res} />
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
