import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VitrineLojas() {
  const [lojas, setLojas] = useState([]);
  const [lojaSelecionada, setLojaSelecionada] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');

  // Busca todas as lojas ao carregar a tela
  useEffect(() => {
    carregarLojas();
  }, []);

  const carregarLojas = async () => {
    try {
      const resposta = await axios.get('http://localhost:3000/lojas');
      setLojas(resposta.data);
    } catch (err) {
      setErro('Erro ao carregar as lojas disponíveis.');
    }
  };

  // Quando o cliente clica em uma loja, busca os produtos dela
  const verProdutosDaLoja = async (loja) => {
    setLojaSelecionada(loja);
    try {
      const resposta = await axios.get(`http://localhost:3000/produtos/loja/${loja.id_loja}`);
      setProdutos(resposta.data);
    } catch (err) {
      setProdutos([]); // Se der erro ou não tiver produtos, limpa a lista
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Cabeçalho da Vitrine */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>🛍️ Vitrine Virtual</h1>
        <Link to="/login" style={{ textDecoration: 'none', backgroundColor: '#0066cc', color: 'white', padding: '8px 16px', borderRadius: '5px', fontWeight: 'bold' }}>
          Área do Comerciante
        </Link>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {/* Controle de Tela: Mostra as lojas OU os produtos de uma loja */}
      {!lojaSelecionada ? (
        <div>
          <h2>Lojas Disponíveis</h2>
          {lojas.length === 0 ? (
            <p>Nenhuma loja cadastrada no momento.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
              {lojas.map(loja => (
                <div key={loja.id_loja} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }} onClick={() => verProdutosDaLoja(loja)}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{loja.nome_fantasia}</h3>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '0.9em' }}>📍 {loja.bairro}</p>
                  <button style={{ marginTop: '15px', padding: '10px', width: '100%', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Ver Catálogo
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Botão de Voltar */}
          <button onClick={() => setLojaSelecionada(null)} style={{ padding: '8px 16px', marginBottom: '20px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff' }}>
            ← Voltar para Lojas
          </button>
          
          {/* Informações da Loja Selecionada */}
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #eee' }}>
            <h2 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>{lojaSelecionada.nome_fantasia}</h2>
            <p style={{ margin: '5px 0' }}><strong>Endereço:</strong> {lojaSelecionada.endereco} - {lojaSelecionada.bairro}</p>
            <p style={{ margin: '5px 0' }}><strong>WhatsApp:</strong> {lojaSelecionada.whatsapp}</p>
          </div>

          {/* Lista de Produtos */}
          <h3>Catálogo de Produtos</h3>
          {produtos.length === 0 ? (
            <p>Esta loja ainda não cadastrou nenhum produto.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
              {produtos.map(produto => (
                <div key={produto.id_produto} style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 10px 0' }}>{produto.nome}</h4>
                    <p style={{ fontSize: '0.9em', color: '#666', minHeight: '40px' }}>{produto.descricao}</p>
                  </div>
                  <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#28a745', margin: '15px 0 0 0' }}>
                    R$ {Number(produto.preco).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VitrineLojas;