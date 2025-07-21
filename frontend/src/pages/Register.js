import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [ime, setIme] = useState("");
  const [priimek, setPriimek] = useState("");
  const [gsm, setGsm] = useState("");
  const [email, setEmail] = useState("");
  const [geslo, setGeslo] = useState("");
  const [tipRacuna, setTipRacuna] = useState("uporabnik");
  const [sporocilo, setSporocilo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/register", {
        ime,
        priimek,
        gsm,
        email,
        geslo,
        tip_racuna: tipRacuna,
      });
      setSporocilo("Uspešna registracija!");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setSporocilo("Email je že v uporabi.");
      } else {
        setSporocilo("Napaka pri registraciji.");
      }
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Ime" value={ime} onChange={(e) => setIme(e.target.value)} /><br />
        <input placeholder="Priimek" value={priimek} onChange={(e) => setPriimek(e.target.value)} /><br />
        <input placeholder="GSM" value={gsm} onChange={(e) => setGsm(e.target.value)} /><br />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Geslo" value={geslo} onChange={(e) => setGeslo(e.target.value)} /><br />
        <select value={tipRacuna} onChange={(e) => setTipRacuna(e.target.value)}>
          <option value="uporabnik">Uporabnik</option>
          <option value="mojster">Mojster</option>
        </select><br />
        <button type="submit">Registriraj se</button>
      </form>
      {sporocilo && <p>{sporocilo}</p>}
    </div>
  );
}

export default Register;
