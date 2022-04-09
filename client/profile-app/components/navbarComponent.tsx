import React, { Children } from 'react'
import style from '../styles/ProfileCard.module.scss'
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'


export const NavbarComponent = ( ) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/profiles" style={{marginLeft:"1rem"}}>
          <img
            alt=""
            src="/smile.png"
            width="32"
            height="32"
            className="d-inline-block align-top"
            style={{backgroundColor: "white", borderRadius:"99%", padding:"2px", marginRight:'10px', marginTop:'6px'}}
          />{' '}
          <span style={{fontFamily:"monospace", fontSize: '30px'}}>Profile App</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}