import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../logos/faceicon.png';
//TODO Splitt die LoginRegister.css in getrennte .css für Login und Register
import './LoginRegister.css';
import { AppContext } from "../AppContext";

const Login = () => {
  const { loginInfo, setLoginInfo } = useContext(AppContext);

  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (loginInfo.token != null) navigate('/user')
  }, [loginInfo])

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading("Logging in...")
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: email,
          user_password: pass,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Logged in: ', data);
        
        localStorage.setItem('rmb_user_data', JSON.stringify(data));
        setLoginInfo(data);
        // navigate('/user')
        
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        console.error('Error logging in:', errorData);
        setErrorMessage(errorData.error)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message)
    }
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
              <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="beermail@gmail.com" id="email" name="email" />
              <label htmlFor="password">Password</label>
              <input required value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="" id="password" name="password" />
              <button disabled={loading}>{loading || "Log in"}</button>
              <p className="error-tx">{errorMessage}</p>
            </form>
            <Link to='/register' className="link-btn" onClick={() => console.log("Don't have an account yet?")}>Don't have an account yet?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;






