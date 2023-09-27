import React, { useState, useEffect } from 'react';
import './App.css'
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import RegistrationForm from './pages/RegistrationForm';
import MyTrip from "./pages/MyTrip"
import MyTripAdd from "./pages/MyTripAdd"
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
    // Verificar la autenticación si hay un token en el almacenamiento local
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  return (
    <Router>
      <NavBar/>
      <Routes>
      {/* {isLoggedIn ? (
          <Route path="/trips" element={<Trips />} />
        ) : (
          <Route path="/registration-form" element={<RegistrationForm />} />
        )} */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} /> 
          <Route path="/trips" element={<Trips />} />
          <Route path="/mytrip" element={<MyTrip />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:trip_id" element={<MyTrip />} />
          <Route path="/mytripadd" element={<MyTripAdd />} />
          <Route path="/mytripadd/:trip_id" element={<MyTripAdd />} />
        </Routes>
    </Router>
  )
}
export default App;