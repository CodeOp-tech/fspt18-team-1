import { useContext, useEffect, useState } from 'react';
import './App.css'
import NavBar from './components/NavBar';
import DropdownMenu from './components/DropdownMenu';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/Footer/';
import MyTrip from "./pages/MyTrip"
import MyTripAdd from "./pages/MyTripAdd"
import Trips from "./pages/Trips"
import { AuthenticationProvider } from "./components/AuthProvider";


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";



function App() {
  
 
  return (
    <div className=''>
    <BrowserRouter>
    <AuthenticationProvider>
      <NavBar/>
      
      <Routes>
      <Route path="/" element={<Trips />} />
      <Route path="/dropdownmenu" element= {<DropdownMenu />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/login" element={<Login />} />
      </Routes>

     
     <Routes>
      <Route path="/mytripadd" element={<MyTripAdd />} />
      <Route path="/mytripadd/:trip_id" element={<MyTripAdd />} />
      <Route path="/trips/:trip_id" element={<MyTrip />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      </Routes>
     </AuthenticationProvider>

      <Footer/>
    </BrowserRouter>
    </div>
  )
}
export default App;