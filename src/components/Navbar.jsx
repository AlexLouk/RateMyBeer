import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../logos/favicon-32x32.png';
import './Navbar.css'





class Navigation extends Component {

    // TODO muss später aus dem backend kommen damit man den User in der Navigationsleiste sieht sonst ist er immer ausgeblendet!
    state = {
        isLoggedIn: false, 
      };

    render() {

        const { isLoggedIn } = this.state;

        return (
            <Navbar bg="light" >
                <Navbar.Brand className='ml-auto' as={Link} to={'/'}>
                    <img id='navLogo' alt='' src={logo} width='50' height='50' />
                    RateMyBeer
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className='midBlock'>
                        <Nav className="ms-auto">
                            <Nav.Link className='nav-link-mid' as={Link} to={'/'}>Home</Nav.Link>
                            <Nav.Link className='nav-link-mid' as={Link} to={'/rating'}>Rating</Nav.Link>
                            <Nav.Link className='nav-link-mid' as={Link} to={'/about'} >About</Nav.Link>
                            <Nav.Link className='nav-link-mid' as={Link} to={'/faqs'}>FAQs</Nav.Link>
                            {isLoggedIn && <Nav.Link className='nav-link-mid' as={Link} to={'/user'}>User</Nav.Link>}
                        </Nav>
                    </div>
                    <div className='rightBlock'>
                    <Nav className="ms-auto">
                        <Nav.Link className='nav-link-right' as={Link} to={'/login'}>Login</Nav.Link>
                        <Nav.Link className='nav-link-right' as={Link} to={'/register'}>Register</Nav.Link>
                    </Nav>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
