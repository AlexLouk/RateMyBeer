import React, { Component, useEffect, useState } from 'react'
import './FAQs.css'
import logo from '../logos/Logo2.png'
import Accordion from 'react-bootstrap/Accordion';


function FAQs() {
  const [faqs, setFaqs] = useState(false)

  const loadFAQs = async () => {
    if (faqs) return

    const response = await fetch('http://localhost:3001/faqs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      setFaqs(data)
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData);
    }
  }

  useEffect(() => {
    loadFAQs()
  }, [])

  return (
    <div className="faqs-container">
      <div className='upperinfo'>
        <div className='infoleft'><p className='bigp'><span style={{ color: '#55555' }}>Hello,</span> <span style={{ color: '#a5673f' }}> how can we help you?</span></p></div>
        <div className='topright'><p className='smallp'>Our FAQ page provides answers to frequently asked questions about Rate My Beer, including information about how the platform works, how to rate beer, and how to add your own beer varieties.</p></div>
      </div>
      <div className='body'>
        <div className='accordion'>
          <Accordion defaultActiveKey="0" flush>
            {faqs ? faqs.map(faq => {
              return <Accordion.Item eventKey={"" + (faq.faq_id - 1)} key={faq.faq_id}>
                <Accordion.Header>{faq.faq_title}</Accordion.Header>
                <Accordion.Body>
                  {faq.faq_text}
                </Accordion.Body>
              </Accordion.Item>

            }) : "Loading FAQs"}
          </Accordion>

          <p>
            Hast du noch weitere Fragen? Zögere nicht, uns zu kontaktieren! Prost und viel Spaß beim Erkunden der Welt der Biere auf RateMyBeer!
          </p>
          <p>
            Das RateMyBeer-Team
          </p>
        </div>
      </div>
    </div>
  )
}
export default FAQs;
