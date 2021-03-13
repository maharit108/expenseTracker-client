import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const options = (
  <Fragment>
    <Nav.Link to="/">Home</Nav.Link>
    <Nav.Link href="#chg-pwd">Change Password</Nav.Link>
    <Nav.Link href="/sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      Your Expense Tracker
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { options }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
