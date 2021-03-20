import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import Modal from 'react-bootstrap/Modal'
import messages from '../../App/AutoDismissAlert/messages'

import './SignOut.css'

class SignOut extends Component {
  onCancel = e => {
    e.preventDefault()
    this.props.history.push('/')
  }

  onCheck = e => {
    e.preventDefault()
    this.props.clearUser()
    this.props.msgAlert({
      heading: 'Signed Out Successfully',
      messagE: messages.signOutSuccess,
      variant: 'success'
    })
    this.props.history.push('/')
  }

  render () {
    return (
      <Modal
        show={true}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p>Are you sure you want to exit Expense Tracker? </p>
          <CheckCircleIcon fontSize='large' onClick={this.onCheck} style={{ color: '#0a8d48' }} />
          <CancelIcon fontSize='large' onClick={this.onCancel} style={{ color: '#f48fb0' }} />
        </Modal.Body>
      </Modal>
    )
  }
}

export default withRouter(SignOut)
