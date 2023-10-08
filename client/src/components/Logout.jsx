import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from './AuthContext';

function Logout() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthenticationContext);

  const handleLogout = () => {
    if (isAuthenticated) {
    logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
    <p>Are you sure?</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Logout;
