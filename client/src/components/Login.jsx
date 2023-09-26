import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HOSTNAME = "http://localhost:5000";

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

      const login = async () => {
        try {
          const { data } = await axios(`${HOSTNAME}/users/login`, {
            method: "POST",
            data: credentials,
          });
          localStorage.setItem("token", data.token);
          console.log(data.message, data.token);
        } catch (error) {
          console.log(error);
        }
      };
  const login = async () => {
    try {
      const { data } = await axios(`${HOSTNAME}/users/login`, {
        method: "POST",
        data: credentials,
      });
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
      
    } catch (error) {
      console.log(error);
    }
  };

      return(
        <div>
            <div>
                <input
                    value={username}
                    onChange={handleChange}
                    name="username"
                    type="text"
                    className=""
                />
                <input
                    value={password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className=""
                />
                <button className="" onClick={login}>
                    Log in
                </button>
                <Link to="/signup">Registrarse</Link>
                </div>
        </div>
      )
    
}
export default Login;