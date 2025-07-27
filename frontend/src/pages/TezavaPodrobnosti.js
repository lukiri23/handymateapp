import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TezavaPodrobnosti() {
  const { id } = useParams();
  const [tezava, setTezava] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/tezave/${id}`)
      .then(res => res.json())
      .then(data => setTezava(data))
      .catch(err => console.error('Napaka pri pridobivanju podrobnosti:', err));
  }, [id]);

  if (!tezava) {
    return <div>Nalaganje...</div>;
  }

  return (
    <div>
      <h2>{tezava.kategorija.toUpperCase()}</h2>
      <p>Opis: {tezava.opis}</p>
      <p>Cena: ({tezava.cena} €)</p>
    </div>
  );
}

export default TezavaPodrobnosti;
