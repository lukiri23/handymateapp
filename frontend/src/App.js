// Glavna komponenta aplikacije HandyMate
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Uvozimo strani aplikacije
import Domov from './pages/Domov';
import Tezave from './pages/Tezave';
import DodajTezavo from './pages/DodajTezavo';
import Mojstri from './pages/Mojstri';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import TezavaPodrobnosti from './pages/TezavaPodrobnosti';

// Glavna funkcijska komponenta aplikacije
function App() {
  return (
    <Router>
      {/* Navigacijska vrstica - vedno prisotna */}
      <Navbar />
      
      {/* Definiramo poti aplikacije */}
      <Routes>
        {/* Javne poti - dostopne vsem */}
        <Route path="/" element={<Domov />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tezave/:id" element={<TezavaPodrobnosti />} />

        {/* Zasebne poti - dostopne le prijavljenim uporabnikom */}
        <Route path="/dodaj-tezavo" element={
          <PrivateRoute><DodajTezavo /></PrivateRoute>
        } />
        <Route path="/tezave" element={
          <PrivateRoute><Tezave /></PrivateRoute>
        } />
        <Route path="/mojstri" element={
          <PrivateRoute><Mojstri /></PrivateRoute>
        } />
        <Route path="/tezave/:id" element={
          <PrivateRoute><TezavaPodrobnosti /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

// Izvozimo komponento za uporabo
export default App;
