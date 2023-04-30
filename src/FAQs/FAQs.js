import React, { Component } from 'react'
import './styles.css'
import logo from '../logos/Logo2.png'

class FAQs extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="faqs-container">
          <img src={logo} alt="RateMyBeer logo" className="logo" />
          <h1>FAQs for RateMyBeer</h1>

          <h2>How can I rate a beer?</h2>
          <p>To rate a beer, search for it on the RateMyBeer homepage and click the "Rate" button. Then, enter your rating and comment and click "Submit".</p>

          <h2>How can I add a new beer to the database?</h2>
          <p>If the beer you're looking for isn't in our database, you can add it by clicking the "Add New Beer" button on the homepage. Then, enter the name, style, and a brief description of the beer.</p>

          <h2>How can I edit my profile?</h2>
          <p>To edit your profile, click on your username in the top right corner of the page and select "Edit Profile" from the dropdown menu. Here, you can edit your information, settings, and preferences.</p>

          <h2>How can I log out?</h2>
          <p>To log out, click on your username in the top right corner of the page and select "Log Out" from the dropdown menu.</p>
        </div>
      </div>
    )
  }
}

export default FAQs;

