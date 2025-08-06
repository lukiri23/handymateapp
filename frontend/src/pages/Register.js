// Komponenta za registracijo novega uporabnika ali mojstra
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function Register() {
  // State spremenljivke za obrazec
  const [ime, setIme] = useState('');
  const [priimek, setPriimek] = useState('');
  const [gsm, setGsm] = useState('');
  const [email, setEmail] = useState('');
  const [geslo, setGeslo] = useState('');
  const [tipRacuna, setTipRacuna] = useState('uporabnik');
  const [strokovnosti, setStrokovnosti] = useState([]);
  const [sporocilo, setSporocilo] = useState('');
  const navigate = useNavigate();

  // Seznam dostopnih strokovnosti za mojstre
  const vseStrokovnosti = ['Vodovodar', 'Električar', 'Zidar', 'Slikopleskar'];

  // Funkcija za upravljanje checkbox-ov strokovnosti
  const obdelajCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setStrokovnosti([...strokovnosti, value]); // Dodaj strokovnost
    } else {
      setStrokovnosti(strokovnosti.filter(item => item !== value)); // Odstrani strokovnost
    }
  };

  // Funkcija za obdelavo oddaje obrazca
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preprečimo privzeto oddajo obrazca
    try {
      // 1. Registriramo novega uporabnika
      await axios.post(`${config.API_BASE_URL}/api/register`, {
        ime,
        priimek,
        gsm,
        email,
        geslo,
        tip_racuna: tipRacuna,
        strokovnosti: tipRacuna === 'mojster' ? strokovnosti : null
      });

      // 2. Po uspešni registraciji se takoj prijavimo
      const loginResponse = await axios.post(`${config.API_BASE_URL}/api/login`, {
        email,
        geslo
      });

      // 3. Shranimo podatke uporabnika v localStorage
      localStorage.setItem('user', JSON.stringify(loginResponse.data));

      // 4. Preusmerimo na domačo stran
      navigate('/');
    } catch (err) {
      console.log("CELOTNA NAPAKA:", err);
      console.log("NAPAKA ODGOVORA:", err.response?.data);

      // Obdelamo različne vrste napak
      if (err.response?.status === 409) {
        setSporocilo('Email je že v uporabi.');
      } else {
        setSporocilo('Napaka pri registraciji!');
      }
    }
  };

  // Prikaz registracijskega obrazca
  return (
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        {/* Osnovni podatki uporabnika */}
        <div>
          <input type="text" placeholder="Ime" value={ime} onChange={(e) => setIme(e.target.value)} /><br />
          <input type="text" placeholder="Priimek" value={priimek} onChange={(e) => setPriimek(e.target.value)} /><br />
          <input type="text" placeholder="GSM" value={gsm} onChange={(e) => setGsm(e.target.value)} /><br />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
          <input type="password" placeholder="Geslo" value={geslo} onChange={(e) => setGeslo(e.target.value)} /><br />
        </div>

        {/* Izbira tipa računa */}
        <div>
          <select value={tipRacuna} onChange={(e) => setTipRacuna(e.target.value)}>
            <option value="uporabnik">Uporabnik</option>
            <option value="mojster">Mojster</option>
          </select>
        </div>
        <br />

        {/* Dodatne možnosti za mojstre */}
        {tipRacuna === 'mojster' && (
          <div>
            <p>Izberi strokovnosti:</p>
            {vseStrokovnosti.map((s, i) => (
              <label key={i} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  value={s}
                  checked={strokovnosti.includes(s)}
                  onChange={obdelajCheckbox}
                />
                {s}
              </label>
            ))}
          </div>
        )}

        <br />
        <button className="center-btn" type="submit">Registriraj se</button>
      </form>
      {/* Prikaz sporočil o napakah */}
      <p>{sporocilo}</p>
    </div>
  );
}

// Izvozimo komponento
export default Register;
