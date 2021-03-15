import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'

import Landing from '../Landing/Landing'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import Header from '../Header/Header'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Expenses from '../Expenses/Expenses'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state
    console.log('app', user)
    return (
      <Fragment>
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <Route exact path='/' render={() => (
          !user ? (
            <Landing msgAlert={this.msgAlert} setUser={this.setUser}/>
          ) : (
            <div>
              <Header user={user} />
              <Expenses user={user} />
            </div>
          )
        )} />
        <Route exact path='/sign-up' render={() => (
          <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
        )} />
        <Route exact path='/sign-in' render={() => (
          <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
        )} />
        <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
          <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} />
        )} />
        <AuthenticatedRoute user={user} exact path='/chg-pwd' render={() => (
          <ChangePassword msgAlert={this.msgAlert} user={user} />
        )} />
      </Fragment>
    )
  }
}

export default App
