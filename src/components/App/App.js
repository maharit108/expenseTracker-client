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
              <main className="container">
                <AuthenticatedRoute user={user} path='/sign-out' render={() => (
                  <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
                )} />
                <AuthenticatedRoute user={user} path='/change-password' render={() => (
                  <ChangePassword msgAlert={this.msgAlert} user={user} />
                )} />
              </main>
            </div>
          )
        )} />
        <Route path='/sign-up' render={() => (
          <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
        )} />
        <Route path='/sign-in' render={() => (
          <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
        )} />
      </Fragment>
    )
  }
}

export default App
