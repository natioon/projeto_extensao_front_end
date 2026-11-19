import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function GerenciarLojas() {
  const [lojas, setLojas] = useState([]);
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    carregarMinhasLojas();
  }, [token, navigate]);

  const carregarMinhasLojas = async () => {
    try {
      const resposta = await axios.get('http://localhost:3000/lojas/minhas-lojas', {
        headers: { Authorization: `Bearer ${token}` } }); setLojas(resposta.data); } catch (err) { setErro('Erro ao carregar suas lojas.'); } };  const handleCriarLoja = async (e) => { e.preventDefault(); setErro(''); setMensagem('');  try { await axios.post( 'http://localhost:3000/lojas', { nome_fantasia: nomeFantasia, whatsapp: whatsapp, bairro: bairro, endereco: endereco }, { headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMensagem('Loja cadastrada com sucesso!');
      setNomeFantasia('');
      setWhatsapp('');
      setBairro('');
      setEndereco('');
      carregarMinhasLojas();
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar loja.');
    }
  };

  const handleDeletarLoja = async (id_loja) => {
    if (!window.confirm('Tem certeza que deseja excluir esta loja?')) return;
    try {
      await axios.delete(`http://localhost:3000/lojas/${id_loja}`, { headers: { Authorization: `Bearer ${token}` }
      });
      carregarMinhasLojas();
    } catch (err) {
      alert('Erro ao excluir loja.');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <Link to="/dashboard" style={{ textDecoration: 'none', color: '#0066cc' }}>← Voltar ao Painel</Link>
      <h2>Gerenciar Minhas Lojas</h2>

      <form onSubmit={handleCriarLoja} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', marginBottom: '30px' }}>
        <h3>Cadastrar Nova Loja</h3>

        <div style={{ marginBottom: '10px' }}>
          <label>Nome Fantasia: </label>
          <input type="text" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>WhatsApp: </label>
          <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Bairro: </label>
          <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Endereço: </label>
          <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} required style={{ width: '100%' }} />
        </div>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}

        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Salvar Loja</button>
      </form>

      <h3>Minhas Lojas Cadastradas</h3>
      {lojas.length === 0 ? (
        <p>Você ainda não possui nenhuma loja cadastrada.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {lojas.map((loja) => (
            <li key={loja.id_loja} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{loja.nome_fantasia}</strong> — {loja.bairro}
                <br />
                <small>{loja.endereco} | WhatsApp: {loja.whatsapp}</small>
              </div>
              <button onClick={() => handleDeletarLoja(loja.id_loja)} style={{ color: 'red', cursor: 'pointer', padding: '5px 10px' }}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GerenciarLojas;