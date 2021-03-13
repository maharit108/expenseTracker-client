import React, { Component, Fragment } from 'react'
import './Landing.css'
import { Button } from '@material-ui/core'

import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import { withRouter } from 'react-router-dom'

class Landing extends Component {
  constructor () {
    super()
    this.state = {
      showSignIn: false,
      showSignUp: false
    }
  }
  signIn = (e) => {
    e.preventDefault()
    this.setState({ showSignIn: true })
  }
  signUp = (e) => {
    e.preventDefault()
    this.setState({ showSignUp: true })
  }
  onCancel = e => {
    e.preventDefault()
    console.log('ppppp')
    this.setState({ showSignUp: false, showSignIn: false })
  }

  render () {
    const { showSignIn, showSignUp } = this.state
    return (
      <Fragment>
        { showSignIn ? (
          <div className='landing'>
            <SignIn msgAlert={this.props.msgAlert} setUser={this.props.setUser} onCancel={this.onCancel} />
          </div>
        ) : showSignUp ? (
          <div className='landing'>
            <SignUp msgAlert={this.props.msgAlert} setUser={this.props.setUser} onCancel={this.onCancel} />
          </div>
        ) : (
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
      </Fragment>
    )
  }
}

export default withRouter(Landing)
