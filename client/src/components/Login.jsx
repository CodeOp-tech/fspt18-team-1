import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";

const HOSTNAME = "/api";

function Login(props) {
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

  // const navigate = useNavigate();
  //const navigate = useNavigate();

  const login = async () => {
    try {
      const { data } = await axios(`${HOSTNAME}/users/login`, {
        method: "POST",
        data: credentials,
      });
      localStorage.setItem("token", data.token);
      props.getUser();
      console.log(data.message, data.token);
      navigate('/trips');
    } catch (error) {
      console.log(error);
    }
  };
  console.log(props);
  return (
    <div className="login-container">
      <h1 className="pt-14 pb-20">Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}></form>
        <label htmlFor="name">User name</label>
        <input 
        
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
        />
        <p></p>
        <label htmlFor="email">Password</label>
        <input 
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
        />
        <p></p>
        <button onClick={login} type="submit" className="login-fieldset-submit">
          Log in
        </button>
        <div></div>
        <Link to="/signup"> 
        Don't have an account?
        </Link>
        </div>
  );
}

export default Login;
