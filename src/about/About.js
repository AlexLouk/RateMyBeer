import React, { Component } from 'react';
import './About.css';
import logo from '../logos/Logo2.png';
import Card from 'react-bootstrap/Card';


class About extends Component {
    render() {
        return (
            <div className='about-container'>
                <div className='upperinfo'>
                    <div className='infoleft'><p className='bigp'><span style={{ color: '#55555' }}>At RateMyBeer,</span> <span style={{ color: '#a5673f' }}> it's all about the passion for beer</span></p></div>
                    <div className='inforight'><p className='smallp'>Discover a variety of beer styles from around the world, rate your favorites, and get recommendations from fellow members. Our forum provides a space for discussion and exchange about all things beer.</p></div>
                </div>
                <div className='member'>
                    <Card style={{ width: '15rem', margin: '15px', border: 'none', backgroundColor: 'rgb(251, 155, 42, 255)'}}>
                        <Card.Img variant="top" src="https://media.licdn.com/dms/image/C4E03AQEjJkz5DtyjTA/profile-displayphoto-shrink_800_800/0/1656281739258?e=2147483647&v=beta&t=jtjJz6g2ZPiEGmLz1J-CF4On5_xAMmdFtvv9SPhY5b4" />
                        <Card.Body>
                        <Card.Title>Taner Görgün</Card.Title>
                            <Card.Text style={{ marginTop: '0.5rem' }}>
                                CEO of RMBeer & Facebook
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '15rem', margin: '15px', border: 'none', backgroundColor: 'rgb(251, 155, 42, 255)'}}>
                        <Card.Img variant="top" src="https://profile-images.xing.com/images/0ca32c464d901114ebbde8733b175172-2/robin-zeiler.1024x1024.jpg" />
                        <Card.Body>
                            <Card.Title>Robin Zeiler</Card.Title>
                            <Card.Text style={{ marginTop: '0.5rem' }}>
                                PR-Manager
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '15rem', margin: '15px', border: 'none', backgroundColor: 'rgb(251, 155, 42, 255)'}}>
                        <Card.Img variant="top" src="https://profile-images.xing.com/images/b130cfe7181d45d0739033aea73a08bd-3/alexandros-loukaridis.1024x1024.jpg" />
                        <Card.Body>
                            <Card.Title>Alexandros Loukaridis</Card.Title>
                            <Card.Text style={{ marginTop: '0.5rem' }}>
                                Softwareentwickler
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '15rem', margin: '15px', border: 'none', backgroundColor: 'rgb(251, 155, 42, 255)'}}>
                        <Card.Img variant="top" src="https://media.licdn.com/dms/image/C5603AQHXNeK3n4B8JA/profile-displayphoto-shrink_800_800/0/1517475356789?e=2147483647&v=beta&t=t0yJSp0jyfM5zdMjSwu1C92GCLUylRjCVmZOGshYj9E" />
                        <Card.Body>
                            <Card.Title>Valentin Franco</Card.Title>
                            <Card.Text style={{ marginTop: '0.5rem' }}>
                                Azubi & Beer Expert
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <hr className='hr-style-about' />
                <div className='bottinfo'>
                    <div className='infoleft'><p className='bigp'>Cheers!</p></div>
                    <div className='inforightbott'>
                        <h4>Do you have any questions, suggestions, or would like to provide us with feedback? We would love to hear from you!</h4>
                        <p className='smallp'>You can reach us via email at info@ratemybeer.com or use the contact form on this page. Our team will get back to you as soon as possible to assist you.</p>
                    </div>
                </div>
                <hr></hr>
            </div>
        );
    }
}

export default About;