import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../logos/faceicon.png';
//TODO Splitt die LoginRegister.css in getrennte .css für Login und Register
import './LoginRegister.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

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
            <Link to='/register' className="link-btn" onClick={() => console.log("Don't have an account yet?")}>Don't have an account yet?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;






