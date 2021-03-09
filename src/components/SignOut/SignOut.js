import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import messages from '../AutoDismissAlert/messages'

class SignOut extends Component {
  // componentDidMount () {
  // const { msgAlert, history, clearUser, user } = this.props

  //   signOut(user)
  //     .finally(() => msgAlert({
  //       heading: 'Signed Out Successfully',
  //       messagE: messages.signOutSuccess,
  //       variant: 'success'
  //     }))
  //     .finally(() => history.push('/'))
  //     .finally(() => clearUser())
  // }

  render () {
    return (
      <h1>abc</h1>
    )
  }
}

export default withRouter(SignOut)
