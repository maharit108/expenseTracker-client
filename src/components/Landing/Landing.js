import React, { Component } from 'react'
import './Landing.css'
import { Button } from '@material-ui/core'

import { withRouter } from 'react-router-dom'

class Landing extends Component {
  signIn = (e) => {
    e.preventDefault()
    this.props.history.push('/sign-in')
  }
  signUp = (e) => {
    e.preventDefault()
    this.props.history.push('/sign-up')
  }

  render () {
    return (
      <div className='landing'>
        <div className='landing__wrapper'>
          <img src='https://images.unsplash.com/photo-1553905346-3b6e399115b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80' alt='login' />
          <h2>Expense Tracker</h2>
          <p>Keep your finances up to date</p>
          <div className='landing__buttons'>
            <Button onClick={this.signIn}>Sign In</Button>
            <Button onClick={this.signUp}>Register</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Landing)
