import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../logos/faceicon.png';
//TODO Splitt die LoginRegister.css in getrennte .css für Login und Register
import './LoginRegister.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading("Registering...")
      const response = await fetch('http://localhost:3001/user/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: email,
          user_password: pass,
          user_name: name,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        navigate('/login')
        alert("Account created successfully, you can now log in with the account.")
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

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
              <button disabled={loading}>{loading || "Register"}</button>
              <p className="error-tx">{errorMessage}</p>
            </form>
            <Link to='/login' className="link-btn" onClick={() => console.log("Already have an account?")}>Already have an account?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;