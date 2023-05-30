import React, { useState } from "react";
import logo from '../logos/faceicon.png';
import './styles.css';

export const Login = () => {
  const [currentForm, setCurrentForm] = useState('login');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const toggleForm = (formName) => {
  setCurrentForm(formName);
  }

  const handleLoginSubmit = (e) => {
  e.preventDefault();
  console.log(email)
  }

  const handleRegisterSubmit = (e) => {
  e.preventDefault();
  console.log(email, name, pass)
  }

  if (currentForm === 'login') {
    return (
      <div className="wrapper">
        <div className='logo'>
          <img src={logo} alt="Beer" className='logo'></img>
        </div>
        <div className='wrapper'>
          <div className="App">
            <div className="auth-form-container">
              <form className="login-form" onSubmit={handleLoginSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="beermail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="" id="password" name="password" />
                <button>Log In</button>
              </form>
              <button className="link-btn" onClick={() => toggleForm('register')}>Don't have an account? Register here!</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <div className='logo'>
          <img src={logo} alt="Beer" className='logo'></img>
        </div>
        <div className='wrapper'>
          <div className="App">
            <div className="auth-form-container">
              <form className="register-form" onSubmit={handleRegisterSubmit}>
                <label>Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Full Name" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="beermail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="" id="password" name="password" />
                <button>Register</button>
              </form>
              <button className="link-btn" onClick={() => toggleForm('login')}>Already have an account? Login here!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;