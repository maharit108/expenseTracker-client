import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../../api/auth'
import messages from '../../App/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CancelIcon from '@material-ui/icons/Cancel'

import './ChangePassword.css'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      password: '',
      confirmpassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props
    if (this.state.password === this.state.confirmpassword && this.state.password !== '') {
      changePassword(this.state, user)
        .then(() => msgAlert({
          heading: 'Change Password Success',
          message: messages.changePasswordSuccess,
          variant: 'success'
        }))
        .then(() => history.push('/'))
        .catch(error => {
          this.setState({ password: '', confirmpassword: '' })
          msgAlert({
            heading: 'Change Password Failed with error: ' + error.message,
            message: messages.changePasswordFailure,
            variant: 'danger'
          })
        })
    } else {
      msgAlert({
        heading: 'Passwords Don\'t Match',
        message: '',
        variant: 'danger'
      })
    }
  }

  onCancel = e => {
    e.preventDefault()
    this.props.history.push('/')
  }

  render () {
    const { password, confirmpassword } = this.state
    console.log('pwd', this.props.user)
    return (
      <div className="pwdBox">
        <div className="changePassword__wrapper">
          <CancelIcon fontSize='large' onClick={this.onCancel} />
          <h3>Change Password</h3>
          <Form onSubmit={this.onChangePassword}>
            <Form.Group controlId="password">
              <Form.Label>New password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="New Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="confirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                name="confirmpassword"
                value={confirmpassword}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(ChangePassword)
