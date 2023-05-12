import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import logo from '../logos/favicon-32x32.png';
import Home from '../home/Home';
import User from '../user/User';
import Rating from '../rating/Rating';
import About from '../about/About';
import Login from '../login/Login';
import FAQs from '../FAQs/FAQs'
import './NavbarComp.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";




class NavbarComp extends Component {
    render() {
        return (
            <Router>
                <div className='navbar'>
                    <Navbar bg="light" expand="lg" >
                        <Container>
                            <Navbar.Brand as={Link} to={"/"}>
                                <img id='navLogo' src={logo} width='40' height='40'/>
                                RateMyBeer
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to={"/"} >Home</Nav.Link>
                                    <Nav.Link as={Link} to={"/about"} >About</Nav.Link>
                                    <Nav.Link as={Link} to={"/rating"} >Rating</Nav.Link>
                                    <Nav.Link as={Link} to={"/user"}>User</Nav.Link>
                                    <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                                    <Nav.Link as={Link} to={"/FAQs"} >FAQs</Nav.Link>
                                    <div className='logout'>
                                        <Nav.Link as={Link} to={"/logout"}>Logout</Nav.Link>
                                    </div>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/rating" element={<Rating />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/FAQs" element={<FAQs />} />

                    </Routes>
                </div>
            </Router>
        );
    }
}

export default NavbarComp;
