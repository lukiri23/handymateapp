import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <div>
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '20px', textDecoration: 'none' }}>
          HandyMate
        </Link>
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '10px' }}>Pozdravljen, {user.ime}</span>
            <button onClick={handleLogout}>Odjava</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '10px' }}>Prijava</Link>
            <Link to="/register">Registracija</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
