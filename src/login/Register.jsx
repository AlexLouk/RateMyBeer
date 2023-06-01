import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../logos/faceicon.png';
import './styles.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log(email, name, pass);
  }

  return (
    <div className="wrapper">
      <div className='logo'>
        <img src={logo} alt="Beer" className='logo'></img>
      </div>
      <div className='wrapper'>
        <div className="App">
          <div className="auth-form-container">
            <form className="register-form" onSubmit={handleRegisterSubmit}>
              <label>Username</label>
              <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Username" />
              <label htmlFor="email">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="beermail@gmail.com" id="email" name="email" />
              <label htmlFor="password">Password</label>
              <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="" id="password" name="password" />
              <button>Register</button>
            </form>
            <Link to='/login' className="link-btn" onClick={() => console.log("Already have an account?")}>Already have an account?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;