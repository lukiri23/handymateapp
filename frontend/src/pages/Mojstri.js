import { useEffect, useState } from 'react';

function Mojstri() {
  const [mojstri, setMojstri] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/mojstri/vsi')
      .then(res => res.json())
      .then(data => setMojstri(data))
      .catch(err => console.error('Napaka pri pridobivanju mojstrov:', err));
  }, []);

  return (
    <div>
      <h2>Seznam mojstrov</h2>
      {mojstri.length === 0 ? (
        <p>Ni registriranih mojstrov.</p>
      ) : (
        <ul>
          {mojstri.map(m => (
            <li key={m.id}>
              {m.ime} {m.priimek} – {m.strokovnost}, GSM: {m.gsm}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Mojstri;
