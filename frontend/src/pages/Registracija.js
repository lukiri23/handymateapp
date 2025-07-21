import { useState } from 'react';

function Registracija() {
  const [ime, setIme] = useState('');
  const [priimek, setPriimek] = useState('');
  const [gsm, setGsm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ime, priimek, gsm })
    });
    const data = await res.json();
    setMessage(data.message || 'Napaka pri registraciji.');
  };

  return (
    <div>
      <h2>Registracija uporabnika</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ime" value={ime} onChange={(e) => setIme(e.target.value)} /><br />
        <input type="text" placeholder="Priimek" value={priimek} onChange={(e) => setPriimek(e.target.value)} /><br />
        <input type="text" placeholder="GSM" value={gsm} onChange={(e) => setGsm(e.target.value)} /><br />
        <button type="submit">Registriraj se</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Registracija;
