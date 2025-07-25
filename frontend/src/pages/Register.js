import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [ime, setIme] = useState('');
  const [priimek, setPriimek] = useState('');
  const [gsm, setGsm] = useState('');
  const [email, setEmail] = useState('');
  const [geslo, setGeslo] = useState('');
  const [tipRacuna, setTipRacuna] = useState('uporabnik');
  const [strokovnosti, setStrokovnosti] = useState([]);
  const [sporocilo, setSporocilo] = useState('');

  const vseStrokovnosti = ['Vodovodar', 'Električar', 'Zidar', 'Slikopleskar'];

  const obdelajCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setStrokovnosti([...strokovnosti, value]);
    } else {
      setStrokovnosti(strokovnosti.filter(item => item !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/register', {

        ime,
        priimek,
        gsm,
        email,
        geslo,
        tip_racuna: tipRacuna,
        strokovnosti: tipRacuna === 'mojster' ? strokovnosti : null
      });
      setSporocilo('Uspešna registracija!');
    } catch (err) {
  console.log("FULL ERROR:", err); 
  console.log("RESPONSE ERROR:", err.response?.data); 

  if (err.response?.status === 409) {
    setSporocilo('Email je že v uporabi.');
  } else {
    setSporocilo('Napaka pri registraciji.');
  }
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ime" value={ime} onChange={(e) => setIme(e.target.value)} /><br />
        <input type="text" placeholder="Priimek" value={priimek} onChange={(e) => setPriimek(e.target.value)} /><br />
        <input type="text" placeholder="GSM" value={gsm} onChange={(e) => setGsm(e.target.value)} /><br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Geslo" value={geslo} onChange={(e) => setGeslo(e.target.value)} /><br />

        <select value={tipRacuna} onChange={(e) => setTipRacuna(e.target.value)}>
          <option value="uporabnik">Uporabnik</option>
          <option value="mojster">Mojster</option>
        </select><br /><br />

        {tipRacuna === 'mojster' && (
          <div>
            <p>Izberi strokovnosti:</p>
            {vseStrokovnosti.map((s, i) => (
              <label key={i}>
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
        <button type="submit">Registriraj se</button>
      </form>
      <p>{sporocilo}</p>
    </div>
  );
}

export default Register;
