import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthenticationContext } from './AuthContext';
import "./Signup.css"

function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthenticationContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate])

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    nationality: '',
    birthdate: '',
    //foto: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to the backend to register the user using Axios
    try {
      const response = await axios.post('/api/users/register', formData);
      console.log(response.data);
      if (response.status === 200) {
        console.log('Registration successful');
        navigate("/login")
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError("Signup failed. Username or email already used.");
    }
  };

  return (
    <div className="page-container">
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nationality">Nationality:</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="birthdate">Birthdate:</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="foto">Foto:</label>
          <input
            type="file"
            id="foto"
            name="foto"
            accept=".jpg, .jpeg, .png"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Signup;
