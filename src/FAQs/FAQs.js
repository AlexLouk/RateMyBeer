import React, { Component } from 'react'
import './FAQs.css'
import logo from '../logos/Logo2.png'
import Accordion from 'react-bootstrap/Accordion';


class FAQs extends Component {
  render() {
    return (
        <div className="faqs-container">
          <div className='upperinfo'>
            <div className='infoleft'><p className='bigp'><span style={{ color: '#55555' }}>Hello,</span> <span style={{ color: '#a5673f' }}> how can we help you?</span></p></div>
            <div className='topright'><p className='smallp'>Our FAQ page provides answers to frequently asked questions about Rate My Beer, including information about how the platform works, how to rate beer, and how to add your own beer varieties.</p></div>
          </div>
          <div className='body'>
            <div className='accordion'>
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>How can I rate a beer?</Accordion.Header>
                  <Accordion.Body>
                  To rate a beer, search for it on the RateMyBeer homepage
                   and click the "Rate" button. Then, enter your rating and 
                   comment and click "Submit".
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>How can I add a new beer to the database?</Accordion.Header>
                  <Accordion.Body>
                  If the beer you're looking for isn't in our database, 
                  you can add it by clicking the "Add New Beer" button on the homepage.
                   Then, enter the name, style, and a brief description of the beer.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>How can I edit my profile?</Accordion.Header>
                  <Accordion.Body>
                  To edit your profile, click on your username in 
                  the top right corner of the page and select "Edit Profile" 
                  from the dropdown menu. Here, you can edit your information, settings, and preferences.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>How can I log out?</Accordion.Header>
                  <Accordion.Body>
                  To log out, click on your username in the top right
                   corner of the page and select "Log Out" from the dropdown menu.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>How can I find beers that have been highly rated by other users?</Accordion.Header>
                  <Accordion.Body>
                  You can discover beers that have been highly 
                  rated by other users on our Ratings page. This page 
                  showcases the most popular and top-rated beers. You can 
                  browse the list, apply filters based on specific criteria,
                   and read reviews from other users to find inspiring and high-quality beers.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>Are there any restrictions or guidelines for publishing reviews?</Accordion.Header>
                  <Accordion.Body>
                  Yes, at Rate My Beer, we have
                   guidelines for publishing reviews. All submissions 
                   undergo a review process before being published to ensure
                    they are fair, objective, and respectful. If a review violates our 
                    guidelines, it will not be approved and will not appear on the website.
                     We are committed to creating a positive and trustworthy environment for all users.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
    )
  }
}

export default FAQs;

