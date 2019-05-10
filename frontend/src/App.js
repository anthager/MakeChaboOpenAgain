import React from 'react'
import './App.css'
import RequestHOC from './RequestHOC'

const failMsg = `failed, please dont try again.<br/> <a href="mailto:hej@anton.pizza?subject=the door open shit is broken man&body=>:(" style="font-size:48px" >if you want, tell me it's broken</a>`
const successMsg = `door opened, have a nice day mate :) <br/> <a href="mailto:hej@anton.pizza?subject=you good&body=<3" style="font-size:48px">If you want, tell me im good</a> `

function App() {
  return (
    <div className="App">
      <RequestHOC>
        {(openDoor, loading, res) => {
          if (res) {
            return <span className="center">{successMsg}</span>
          } else if (loading) {
            return <span className="center">Loading</span>
          }
          return (
            <div className="cover-all clickable" onClick={openDoor}>
              <span className="center">Press anywhere to unlock</span>
            </div>
          )
        }}
      </RequestHOC>
    </div>
  )
  // <div className="App clickable" onClick={openDoor}>
  //   <span className="center">Click anywhere to unlock</span>
  // </div>
}

export default App
