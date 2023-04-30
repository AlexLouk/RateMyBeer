import React, { Component } from 'react';
import './styles.css';
import logo from '../logos/Logo2.png';

class About extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="faqs-container">
                    <img src={logo} alt="RateMyBeer logo" className="logo" />
                    <h1>About RateMyBeer</h1>
                    <p>RateMyBeer is a community-driven platform for beer enthusiasts to share and discover new beers.</p>
                    <p>Our mission is to help beer lovers find their next favorite beer and connect with others who share their passion.</p>
                    <h2>Our Team</h2>
                    <ul>
                        <li>John Doe - Founder and CEO</li>
                        <li>Jane Smith - Lead Developer</li>
                        <li>Mark Johnson - Marketing Manager</li>
                    </ul>
                    <p>Feel free to contact us at info@ratemybeer.com if you have any questions or feedback.</p>
                </div>
            </div>
        );
    }
}

export default About;
