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

  const login = async () => {
    try {
      const { data } = await axios.post(`${HOSTNAME}/users/login`, credentials);
      localStorage.setItem("token", data.token);
      props.getUser();
      console.log(data.message, data.token);
      navigate('/trips');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  };

  const navigate = useNavigate();



  return (
    <div className="login-container">
      <div className='flex flex-col items-center'>
        <h1 className="pt-14 pb-20"> Login </h1>
        <form className="flex flex-col items-start" onSubmit={handleSubmit}>
            <div>
              <label className="w-36 inline-flex" htmlFor="username">User name</label>
              <input
                className="w-80"
                value={username}
                onChange={handleChange}
                name="username"
                type="text"
              />
            </div>
            <div>
              <label className="w-36 inline-flex" htmlFor="password">Password</label>
              <input
                className="w-80"
                value={password}
                onChange={handleChange}
                name="password"
                type="password"
              />
            </div>
          <Link to={"/signup"}>
          Don t have an account? Sign up
        </Link>
          <button type="submit" className="login-fieldset-submit">
        Login
      </button>
        </form>
        
      </div>
      
    </div>
  );
}

export default Login;
