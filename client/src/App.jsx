import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import './App.css'
import NavBar from './componentes/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import RegistrationForm from './pages/RegistrationForm';
import MyTrip from "./pages/MyTrip"
import Trips from "./pages/Trips"
import RegistrationForm from './pages/RegistrationForm';
import Logout from './components/Logout';

import RegistrationForm from './pages/RegistrationForm';
import Logout from './components/Logout';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <Router>
      <NavBar/>
      <Routes>
      {isLoggedIn ? (
          <Route path="/trips" element={<Trips />} />
        ) : (
          <Route path="/registration-form" element={<RegistrationForm />} />
        )}
      {isLoggedIn ? (
          <Route path="/trips" element={<Trips />} />
        ) : (
          <Route path="/registration-form" element={<RegistrationForm />} />
        )}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} /> 
          <Route path="/trips" element={<Trips />} />
          <Route path="/mytrip" element={<MyTrip />} />
          <Route path="/mytripadd" element={<MyTripAdd />} />
        
        </Routes>

    </Router>
  )
}

export default App;

