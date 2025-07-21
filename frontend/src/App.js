import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registracija from './pages/Registracija';
import DodajTezavo from './pages/DodajTezavo';
import Domov from './pages/Domov';
import Tezave from './pages/Tezave';


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Domov</Link> |{" "}
        <Link to="/registracija">Registracija</Link> |{" "}
        <Link to="/dodaj-tezavo">Dodaj težavo</Link> |{" "}
        <Link to="/tezave">Težave</Link>

      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Domov />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/dodaj-tezavo" element={<DodajTezavo />} />
        <Route path="/tezave" element={<Tezave />} />

      </Routes>
    </Router>
  );
}

export default App;
