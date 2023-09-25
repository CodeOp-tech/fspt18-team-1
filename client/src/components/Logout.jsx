import React from 'react';

function Logout() {
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/registration-form'; 
  };

  return (
    <div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default Logout;
