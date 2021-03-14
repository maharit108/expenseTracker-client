import React, { Component } from 'react'

import logo from '../../static/logo.jpg'
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
          <img src={logo} alt='login' />
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
