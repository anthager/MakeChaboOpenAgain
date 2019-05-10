import React from 'react'
import './App.css'
import RequestHOC from './RequestHOC'

const failMsg = `failed, please dont try again.</a>`
const successMsg = `door opened, have a nice day mate :)`

function App() {
  return (
    <div className="App">
      <RequestHOC>
        {(openDoor, loading, res) => {
          if (res !== undefined) {
            return (
              <div className="center">
                <span className="center">{res ? successMsg : failMsg}</span>
                {res ? (
                  <a className="mail center" href="mailto:hej@anton.pizza?subject=you good&body=<3">
                    If you want, tell me im good
                  </a>
                ) : (
                  <a
                    href="mailto:hej@anton.pizza?subject=the door open shit is broken man&body=>:("
                    style="font-size:48px"
                  >
                    if you want, tell me its broken{' '}
                  </a>
                )}
              </div>
            )
          } else if (loading) {
            return <span className="center">Loading...</span>
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
}

export default App
