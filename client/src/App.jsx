import { useEffect, useState } from 'react';
import './App.css'
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/Footer/';
import MyTrip from "./pages/MyTrip"
import MyTripAdd from "./pages/MyTripAdd"
import Trips from "./pages/Trips"
import PrivateRoute from './components/PrivateRoute'
// import AuthProvider from "./components/AuthProvider";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  
  const [user, setUser] = useState(null);

  const getUser = () => {
    fetch ('http://localhost:5000/api/users/profile/', {
      headers: {authorization:`Bearer ${localStorage.getItem("token")}`}
    })
        .then((response) => response.json())
        .then((data) => {
            setUser(data);
        })
        .catch(() => {
            console.log("Oops! Something went wrong")
        });

}

useEffect(() => {
  getUser();
}, [])
console.log(user); 
  
  return (
    <div className=''>
    <BrowserRouter>
    {/* <AuthProvider> */}
      <NavBar/>
      <Routes>
      <Route path="/" element={<Trips />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/trips/:trip_id" element={<MyTrip />} />
      <Route path="/login" element={<Login getUser={getUser}/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
  
      <Route 
      path='/private'
      element={
        <PrivateRoute>
          <Route path="/mytripadd" element={<MyTripAdd />} />
          <Route path="/mytripadd/:trip_id" element={<MyTripAdd />} />
        </PrivateRoute>
      }
      />
        </Routes>
        <Footer/>
      {/* </AuthProvider> */}
    </BrowserRouter>
    </div>
  )
}
export default App;