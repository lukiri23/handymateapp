// Domača stran aplikacije HandyMate
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Domov() {
  // Preverjamo, ali je uporabnik prijavljen (podatki v localStorage)
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // Funkcija za odjavo uporabnika
  const handleLogout = () => {
    localStorage.removeItem('user'); // Odstranimo podatke iz localStorage
    navigate('/'); // Preusmerimo na domačo stran
  };

  // Če je uporabnik prijavljen, prikažemo pozdravno sporočilo
  if (user) {
    return (
      <div>
        <h2>Dobrodošel nazaj, {user.ime} {user.priimek}!</h2>
        <p>Prijavljen si kot: <strong>{user.tip_racuna}</strong></p>
        <button className='center-btn' onClick={handleLogout}>Odjava</button>
      </div>
    );
  }

  // Če uporabnik ni prijavljen, prikažemo registracijske možnosti
  return (
    <div>
      <h2>Dobrodošli v aplikaciji HandyMate</h2>
      <p>Izberi, kdo si:</p>
      <button className='center-btn' onClick={() => navigate('/register')}>Sem uporabnik</button>
      <button className='center-btn' onClick={() => navigate('/register')}>Sem mojster</button>
    </div>
  );
}

// Izvozimo komponento
export default Domov;
