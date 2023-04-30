import { useState } from "react";
import logo from '../logos/Logo2.png'
import { Login } from "./Login";
import { Register } from "./Register";
import './styles.css'

function LoginView() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="wrapper">
      <div className='logo'>
        <img src={logo} alt="Beer" className='logo'></img>
      </div>
      <div className='wrapper'>
        <div className="App">
          {currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
        </div>

      </div>


    </div>

  );
}

export default LoginView; 