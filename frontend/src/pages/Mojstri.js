import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Mojstri() {
  const [mojstri, setMojstri] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/mojstri')
      .then(res => setMojstri(res.data))
      .catch(err => console.error('Napaka pri pridobivanju mojstrov:', err));
  }, []);

  return (
    <div>
      <h2>Seznam mojstrov</h2>
      <ul>
        {mojstri.map((mojster, index) => (
          <li key={index}>
            {mojster.ime} {mojster.priimek} – {mojster.email}, GSM: {mojster.gsm}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Mojstri;
