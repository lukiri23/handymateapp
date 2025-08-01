import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SeznamTezav() {
  const [tezave, setTezave] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/tezave/vse')
      .then((res) => res.json())
      .then((data) => setTezave(data))
      .catch((err) => console.error('Napaka pri pridobivanju težav:', err));
  }, []);

  return (
    <div>
      <h2>Seznam težav</h2>
      <div className="tezave-grid">
        {tezave.map((t) => (
          <div key={t.id} className="tezava-card">
            <div className="tezava-content">
              <h3 className="tezava-title">{t.kategorija}</h3>
              <p className="tezava-meta"><strong>Opis:</strong> {t.opis}</p>
              <p className="tezava-meta"><strong>Cena:</strong> {t.cena} €</p>
            </div>
            <Link to={`/tezave/${t.id}`} className="btn-details">Podrobnosti</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeznamTezav;
