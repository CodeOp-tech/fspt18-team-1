import './App.css'
import NavBar from './componentes/NavBar';
import Login from "./pages/Login"
import MyTrip from "./pages/MyTrip"
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
          <Route path="/trips" element={<Trips />} />
          <Route path="/mytrip" element={<MyTrip />} />
        </Routes>
    </Router>
  )
}

export default App;

