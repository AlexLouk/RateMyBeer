import './App.css';
import Navigation from './components/Navbar';
import Home from './home/Home';
import News from './home/News';
import User from './user/User';
import Beers from './beers/Beers';
import Rating from './rating/Rating';
import About from './about/About';
import Login from './login/Login';
import Register from './login/Register';
import FAQs from './FAQs/FAQs';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AppContext } from './AppContext';
import { useEffect, useState } from 'react';
import Admin from './admin/Admin';
import ViewBeer from './beers/ViewBeer';
import Game from './game/Game';


function App() {
  const defaultLoginInfo = {
    user_id: null,
    user_name: null,
    user_email: null,
    token: null
  }
  const [loginInfo, setLoginInfo] = useState(JSON.parse(localStorage.getItem("rmb_user_data") || "false") || defaultLoginInfo)

  useEffect(() => {
    if (loginInfo.token == null) return

    (async () => {
      const response = await fetch('http://localhost:3001/login/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: loginInfo.token
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.valid ? "Token valid" : "Token Invalid")

        if (!data.valid) {
          localStorage.removeItem('rmb_user_data')
          setLoginInfo(defaultLoginInfo)
          alert("Session expired, please log in again.")
        }
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    })()
  }, [])

  return (
    <Router>
      <div>
        <AppContext.Provider value={{
          loginInfo, setLoginInfo, defaultLoginInfo
        }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/user" element={<User />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/beers" element={<Beers />} />
            <Route path="/beers/:beerId" element={<ViewBeer />} />
            <Route path="/news/:newsId" element={<News />} />
            <Route path="/FAQs" element={<FAQs />} />\
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </AppContext.Provider>
      </div>
    </Router>
  );
}

export default App; 