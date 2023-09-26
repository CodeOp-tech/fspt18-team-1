import React, { useState } from 'react';
import Login from '../components/Login'; 
import Signup from '../components/Signup';

function RegistrationForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      {isLogin ? <Login /> : <Signup />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Don\'t have an account? Sign up' : '¿Have an account? Sign in'}
      </button>
    </div>
  );
}

export default RegistrationForm;
