import './App.css';
import Navbar from './components/Navbar';
import Home from './home/Home';
import User from './user/User';
import Rating from './rating/Rating';
import About from './about/About';
import Login from './login/Login';
import FAQs from './FAQs/FAQs';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<User />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/login" element={<Login />} />
          <Route path="/FAQs" element={<FAQs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 