// Navigacijska komponenta aplikacije
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  // Pridobimo podatke o prijavljenem uporabniku
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // Funkcija za odjavo uporabnika
  const handleLogout = () => {
    localStorage.removeItem('user'); // Odstranimo podatke uporabnika
    navigate('/'); // Preusmerimo na domačo stran
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      {/* Logotip aplikacije */}
      <div>
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '20px', textDecoration: 'none', color: 'purple' }}>
          HandyMate
        </Link>
      </div>
      
      {/* Navigacijski meni - odvisno od stanja prijave */}
      <div>
        {/* Če uporabnik ni prijavljen - prikažemo prijavo in registracijo */}
        {!user && (
          <>
            <Link to="/login" style={{ marginRight: '10px' }}>Prijava</Link>
            <Link to="/register">Registracija</Link>
          </>
        )}

        {/* Meni za prijavljene uporabnike */}
        {user && user.tip_racuna === 'uporabnik' && (
          <>
            <Link to="/dodaj-tezavo" style={{ marginRight: '10px' }}>Dodaj težavo</Link>
            <Link to="/tezave" style={{ marginRight: '10px' }}>Težave</Link>
            <Link to="/mojstri" style={{ marginRight: '10px' }}>Mojstri</Link>
            <span style={{ marginRight: '10px' }}>Pozdravljen, {user.ime}</span>
            <button onClick={handleLogout}>Odjava</button>
          </>
        )}

        {/* Meni za prijavljene mojstre */}
        {user && user.tip_racuna === 'mojster' && (
          <>
            <Link to="/tezave" style={{ marginRight: '10px' }}>Težave</Link>
            <Link to="/mojstri" style={{ marginRight: '10px' }}>Mojstri</Link>
            <span style={{ marginRight: '10px' }}>Pozdravljen, {user.ime}</span>
            <button onClick={handleLogout}>Odjava</button>
          </>
        )}
      </div>
    </nav>
  );
}

// Izvozimo komponento
export default Navbar;
