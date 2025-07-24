import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Domov from './pages/Domov';
import Tezave from './pages/Tezave';
import DodajTezavo from './pages/DodajTezavo';
import Mojstri from './pages/Mojstri';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Domov />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {}
        <Route path="/dodaj-tezavo" element={
          <PrivateRoute><DodajTezavo /></PrivateRoute>
        } />
        <Route path="/tezave" element={
          <PrivateRoute><Tezave /></PrivateRoute>
        } />
        <Route path="/mojstri" element={
          <PrivateRoute><Mojstri /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
