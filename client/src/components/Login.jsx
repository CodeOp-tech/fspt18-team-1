import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthenticationContext } from "./AuthContext";
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { loginContext } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginContext(credentials);
    navigate("/trips")
  };

  return (
    <div className="page-container">
    <div className="login-container">
      <div className='flex flex-col items-center'>
        <h1 className="pt-14 pb-20"> Login </h1>
        <form className="flex flex-col items-start" onSubmit={handleSubmit}>
            <div>
              <label className="w-36 inline-flex" htmlFor="username">User name</label>
              <input
                className="w-80"
                value={credentials.username}
                onChange={handleChange}
                name="username"
                type="text"
              />
            </div>
            <div>
              <label className="w-36 inline-flex" htmlFor="password">Password</label>
              <input
                className="w-80"
                value={credentials.password}
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
    </div>
  );
}

export default Login;