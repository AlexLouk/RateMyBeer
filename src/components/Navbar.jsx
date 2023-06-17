import React, { Component, useContext, useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../logos/favicon-32x32.png';
import './Navbar.css'
import { AppContext } from '../AppContext';
import SearchBar from './SearchBar';

const Navigation = (props) => {
    const { loginInfo } = useContext(AppContext)

    // TODO muss später aus dem backend kommen damit man den User in der Navigationsleiste sieht sonst ist er immer ausgeblendet!
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(loginInfo.token != null)
    }, [loginInfo])

    return (
        <div bg="light" className='nav-groups'>

            <div>
                <Navbar.Brand className='ml-auto' as={Link} to={'/'}>
                    <img id='navLogo' alt='' src={logo} width='50' height='50' />
                    RateMyBeer
                </Navbar.Brand>
                <div className='nav-menu'>
                    <Nav.Link className='nav-link-mid' as={Link} to={'/'}>Home</Nav.Link>
                    {isLoggedIn && <Nav.Link className='nav-link-mid' as={Link} to={'/beers'}>Beers</Nav.Link>}
                    <Nav.Link className='nav-link-mid' as={Link} to={'/rating'}>Rating</Nav.Link>
                    <Nav.Link className='nav-link-mid' as={Link} to={'/about'} >About</Nav.Link>
                    <Nav.Link className='nav-link-mid' as={Link} to={'/faqs'}>FAQs</Nav.Link>
                    <Nav.Link className='nav-link-mid' as={Link} to={'/game'}>Quiz</Nav.Link>
                </div>
            </div>
            <div>
                <div className='nav-menu'>
                    <SearchBar />
                    {loginInfo.user_is_admin && <Nav.Link className='nav-link-right' as={Link} to={'/admin'}>Admin Panel</Nav.Link>}
                    {isLoggedIn ? <Nav.Link className='nav-link-mid' as={Link} to={'/user'}>{loginInfo.user_name}</Nav.Link>
                        : <><Nav.Link className='nav-link-right' as={Link} to={'/login'}>Login</Nav.Link>
                            <Nav.Link className='nav-link-right' as={Link} to={'/register'}>Register</Nav.Link></>
                    }
                </div>
            </div>
        </div>
    );
}

export default Navigation;











