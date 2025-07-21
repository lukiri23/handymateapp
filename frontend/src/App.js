import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Domov from "./pages/Domov";
import Tezave from "./pages/Tezave";
import Mojstri from "./pages/Mojstri";
import DodajTezavo from "./pages/DodajTezavo";
import Register from "./pages/Register"; 
import LoginUporabnik from "./pages/LoginUporabnik";
import LoginMojster from "./pages/LoginMojster";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <a href="/">Domov</a> |{" "}
          <a href="/register">Registracija</a> |{" "}
          <a href="/dodaj-tezavo">Dodaj težavo</a> |{" "}
          <a href="/tezave">Težave</a> |{" "}
          <a href="/mojstri">Mojstri</a>
        </nav>
        <Routes>
          <Route path="/" element={<Domov />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dodaj-tezavo" element={<DodajTezavo />} />
          <Route path="/tezave" element={<Tezave />} />
          <Route path="/mojstri" element={<Mojstri />} />
          <Route path="/login-uporabnik" element={<LoginUporabnik />} />
          <Route path="/login-mojster" element={<LoginMojster />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
