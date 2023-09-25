import './App.css'
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from "./pages/Login"
import MyTrip from "./pages/MyTrip"
import MyTripAdd from "./pages/MyTripAdd"
import Trips from "./pages/Trips"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:trip_id" element={<MyTrip />} />
          <Route path="/mytripadd" element={<MyTripAdd />} />
          <Route path="/mytripadd/:trip_id" element={<MyTripAdd />} />
        </Routes>
    </Router>
  )
}
export default App;