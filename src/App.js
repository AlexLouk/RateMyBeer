import logo from './logos/Logo2.png';
import './App.css';
import { ratingView } from './rating/ratingView'
import { useState } from 'react';
import NavbarComp from './components/NavbarComp';


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div>
      <NavbarComp />
    </div>
  );
}

export default App; 