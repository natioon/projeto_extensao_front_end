import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const buscarPerfil = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const resposta = await axios.get('http://localhost:3000/auth/perfil', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsuario(resposta.data);
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setCarregando(false);
            }
        };
        buscarPerfil();
    }, [navigate]); 
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    if (carregando) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Carregando dados...</p>;
  }
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <h2>Painel do Comerciante</h2>
        <button onClick={handleLogout} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          Sair
        </button>
      </header>

      <main style={{ marginTop: '20px' }}>
        <p>Olá, <strong>{usuario?.nome || 'Comerciante'}</strong>!</p>
        <p>Email: {usuario?.email}</p>

        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
          
          <button onClick={() => navigate('/lojas')} style={{ padding: '10px 15px', cursor: 'pointer' }}>
            Minhas Lojas
          </button>

          <button onClick={() => navigate('/produtos')} style={{ padding: '10px 15px', cursor: 'pointer' }}>
            Meus Produtos
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
