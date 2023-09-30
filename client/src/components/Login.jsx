import React, { useState, useNavigate } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Login.css";

const HOSTNAME = "/api";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const login = async () => {
    try {
      const { data } = await axios(`${HOSTNAME}/users/login`, {
        method: "POST",
        data: credentials,
      });
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
      navigate('/trips');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
    <div className='flex flex-col items-center'>
      <h1 className="pt-14 pb-20">Login</h1>
      <form className="flex flex-col items-start" onSubmit={(e) => handleSubmit(e)}></form>
        <label className="w-36 inline-flex" htmlFor="name">User name</label>
        <input className="w-80"
        
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
        />
        <p></p>
        <label className="w-36 inline-flex" htmlFor="email">Password</label>
        <input className="w-80"
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
        />
        <p></p>
        <button onClick={login} type="submit" className="login-fieldset-submit">
          Log in
        </button>
        <Link to="/signup"> Don't have an account?</Link>
      </div>
</div>
  );
}

export default Login;
