import { useEffect, useState } from 'react';

function Tezave() {
  const [tezave, setTezave] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/tezave/vse')
      .then(res => res.json())
      .then(data => setTezave(data))
      .catch(err => console.error('Napaka pri pridobivanju težav:', err));
  }, []);

  return (
    <div>
      <h2>Seznam težav</h2>
      {tezave.length === 0 ? (
        <p>Ni dodanih težav.</p>
      ) : (
        <ul>
          {tezave.map(t => (
            <li key={t.id}>
              <strong>{t.kategorija}</strong>: {t.opis} ({t.cena} €)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tezave;
