import React, { useState } from 'react';
import Login from './Login'; // Importa el componente de inicio de sesión
import Signup from './Signup'; // Importa el componente de registro

function RegistrationForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      {isLogin ? <Login /> : <Signup />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia Sesión'}
      </button>
    </div>
  );
}

export default RegistrationForm;
