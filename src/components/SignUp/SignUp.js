import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CancelIcon from '@material-ui/icons/Cancel'

import './SignUp.css'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      name: '',
      nickName: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props
    if (this.state.password === this.state.passwordConfirmation && this.state.password !== '') {
      signUp(this.state)
      // .then(() => signIn(this.state))
        .then(res => {
          console.log(res.data)
          setUser(res.data)
        })
        .then(() => msgAlert({
          heading: 'Sign Up Success',
          message: messages.signUpSuccess,
          variant: 'success'
        }))
        .then(() => history.push('/'))
        .catch(error => {
          this.setState({ email: '', password: '', passwordConfirmation: '', name: '', nickName: '' })
          msgAlert({
            heading: 'Sign Up Failed with error: ' + error.message,
            message: messages.signUpFailure,
            variant: 'danger'
          })
        })
    } else {
      this.setState({ email: '', password: '', passwordConfirmation: '', name: '', nickName: '' })
      msgAlert({
        heading: 'Sign Up Failed',
        message: 'Check your password again',
        variant: 'danger'
      })
    }
  }

  render () {
    const { email, password, passwordConfirmation, name, nickName } = this.state

    return (
      <div className="signUp__wrapper">
        <CancelIcon fontSize='large' onClick={this.props.onCancel} />
        <h3>Sign Up</h3>
        <Form onSubmit={this.onSignUp}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              name="name"
              value={name}
              type="text"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="nickName">
            <Form.Label>Preferred Name</Form.Label>
            <Form.Control
              name="nickName"
              value={nickName}
              type="text"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              value={password}
              type="password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="passwordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              required
              name="passwordConfirmation"
              value={passwordConfirmation}
              type="password"
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
    )
  }
}

export default withRouter(SignUp)
