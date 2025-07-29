import { useState } from 'react';

function DodajTezavo() {
  const [opis, setOpis] = useState('');
  const [kategorija, setKategorija] = useState('');
  const [cena, setCena] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/tezave/dodaj', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opis, kategorija, cena })
    });
    const data = await res.json();
    setMessage(data.message || 'Napaka pri dodajanju težave.');
  };

  return (
    <div>
      <h2>Dodaj težavo</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Opis" value={opis} onChange={(e) => setOpis(e.target.value)} /><br />
        <input type="text" placeholder="Kategorija" value={kategorija} onChange={(e) => setKategorija(e.target.value)} /><br />
        <input type="number" placeholder="Cena" value={cena} onChange={(e) => setCena(e.target.value)} /><br />
        <button className='center-btn' type="submit">Dodaj</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default DodajTezavo;
