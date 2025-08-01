import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TezavaPodrobnosti() {
  const { id } = useParams();
  const [tezava, setTezava] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/tezave/${id}`)
      .then((res) => res.json())
      .then((data) => setTezava(data))
      .catch((err) => console.error('Napaka pri pridobivanju podrobnosti:', err));
  }, [id]);

  if (!tezava) {
    return <div>Nalaganje...</div>;
  }

  return (
    <div className="tezava-podrobnosti-container">
      <h2>Podrobnosti težave</h2>
      <p><strong>Opis:</strong> {tezava.opis}</p>
      <p><strong>Kategorija:</strong> {tezava.kategorija}</p>
      <p><strong>Cena:</strong> {tezava.cena} €</p>
      <p><strong>Datum težave:</strong> {new Date(tezava.datum).toLocaleString('sl-SI')}</p>

      <h3>Podatki o uporabniku</h3>
      <p><strong>Ime in priimek:</strong> {tezava.uporabnik_ime} {tezava.uporabnik_priimek}</p>
      <p><strong>GSM:</strong> {tezava.uporabnik_gsm}</p>
      <p><strong>Email:</strong> {tezava.uporabnik_email}</p>
    </div>
  );
}

export default TezavaPodrobnosti;
