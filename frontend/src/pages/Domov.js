import { useNavigate } from 'react-router-dom';

function Domov() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Dobrodošli v aplikaciji HandyMate</h2>
      <p>Izberi, kdo si:</p>
      <button onClick={() => navigate('/login-uporabnik')} style={{ padding: '10px 20px', margin: '10px' }}>
        Sem uporabnik
      </button>
      <button onClick={() => navigate('/login-mojster')} style={{ padding: '10px 20px', margin: '10px' }}>
        Sem mojster
      </button>
    </div>
  );
}

export default Domov;
