import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Domov from './pages/Domov';
import Tezave from './pages/Tezave';
import DodajTezavo from './pages/DodajTezavo';
import Mojstri from './pages/Mojstri';
import Register from './pages/Register'; 

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Domov</Link> |{' '}
        <Link to="/register">Registracija</Link> |{' '}
        <Link to="/dodaj-tezavo">Dodaj težavo</Link> |{' '}
        <Link to="/tezave">Težave</Link> |{' '}
        <Link to="/mojstri">Mojstri</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Domov />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dodaj-tezavo" element={<DodajTezavo />} />
        <Route path="/tezave" element={<Tezave />} />
        <Route path="/mojstri" element={<Mojstri />} />
      </Routes>
    </Router>
  );
}

export default App;
