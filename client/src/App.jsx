import React from 'react';
import './App.css'
import NavBar from './components/NavBar';
import DropdownMenu from './components/DropdownMenu';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/Footer/';
import RegistrationForm from './pages/RegistrationForm';
import MyTrip from "./pages/MyTrip"
import MyTripAdd from "./pages/MyTripAdd"
import Trips from "./pages/Trips"
import PrivateRoute from './components/PrivateRoute'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {

  return (
    <div className=''>
    <BrowserRouter>
    <NavBar />
      <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/dropdownmenu" element= {<DropdownMenu />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/trips/:trip_id" element={<MyTrip />} />
      <Route path="/mytripadd" element={<MyTripAdd />} />
      <Route path="/mytripadd/:trip_id" element={<MyTripAdd />} />
      <Route 
      path='/private'
      element={
        <PrivateRoute>
          <Route path="/mytrip" element={<MyTrip />} />
        </PrivateRoute>
      }
      />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  )
}
export default App;