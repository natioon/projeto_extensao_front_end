import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function GerenciarProdutos() {
  const [lojas, setLojas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]); // 👈 Estado das categorias
  
  const [idLojaSelecionada, setIdLojaSelecionada] = useState('');
  const [idCategoriaSelecionada, setIdCategoriaSelecionada] = useState(''); // 👈 Categoria selecionada
  
  const [nomeProduto, setNomeProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    carregarLojasDoComerciante();
    carregarCategorias(); // 👈 Busca as categorias ao abrir a tela
  }, [token, navigate]);

  useEffect(() => {
    if (idLojaSelecionada) {
      carregarProdutosDaLoja(idLojaSelecionada);
    }
  }, [idLojaSelecionada]);

  const carregarLojasDoComerciante = async () => {
    try {
      const resposta = await axios.get('http://localhost:3000/lojas/minhas-lojas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLojas(resposta.data);
      if (resposta.data.length > 0) {
        setIdLojaSelecionada(resposta.data[0].id_loja);
      }
    } catch (err) {
      setErro('Erro ao carregar lojas.');
    }
  };

  const carregarCategorias = async () => {
    try {
      const resposta = await axios.get('http://localhost:3000/categorias'); 
      setCategorias(resposta.data);
      if (resposta.data.length > 0) {
        setIdCategoriaSelecionada(resposta.data[0].id_categoria);
      }
    } catch (err) {
      console.log('Erro ao carregar categorias', err);
    }
  };

  const carregarProdutosDaLoja = async (id_loja) => {
    try {
      const resposta = await axios.get(`http://localhost:3000/produtos/loja/${id_loja}`);
      setProdutos(resposta.data);
    } catch (err) {
      setProdutos([]);
    }
  };

  const handleCriarProduto = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    try {
      await axios.post(
        `http://localhost:3000/produtos/loja/${idLojaSelecionada}`,
        {
          id_categoria: idCategoriaSelecionada, // 👈 Agora enviamos a categoria pro back-end!
          nome: nomeProduto,
          preco: preco,
          descricao: descricao
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMensagem('Produto cadastrado com sucesso!');
      setNomeProduto('');
      setPreco('');
      setDescricao('');
      carregarProdutosDaLoja(idLojaSelecionada); 
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar produto.');
    }
  };

  const handleDeletarProduto = async (id_produto) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    try {
      await axios.delete(`http://localhost:3000/produtos/${id_produto}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      carregarProdutosDaLoja(idLojaSelecionada);
    } catch (err) {
      alert('Erro ao excluir produto.');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <Link to="/dashboard" style={{ textDecoration: 'none', color: '#0066cc' }}>← Voltar ao Painel</Link>
      <h2>Gerenciar Meus Produtos</h2>

      <form onSubmit={handleCriarProduto} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', marginBottom: '30px' }}>
        <h3>Cadastrar Novo Produto</h3>

        <div style={{ marginBottom: '10px' }}>
          <label>Selecione a Loja: </label>
          <select value={idLojaSelecionada} onChange={(e) => setIdLojaSelecionada(e.target.value)} style={{ width: '100%', padding: '5px' }}>
            {lojas.map((loja) => (
              <option key={loja.id_loja} value={loja.id_loja}>{loja.nome_fantasia}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Categoria: </label>
          <select value={idCategoriaSelecionada} onChange={(e) => setIdCategoriaSelecionada(e.target.value)} style={{ width: '100%', padding: '5px' }}>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nome_categoria}</option>
            ))}
          </select>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Nome do Produto: </label>
          <input type="text" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Preço (R$): </label>
          <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Descrição: </label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} style={{ width: '100%', height: '60px' }} />
        </div>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}

        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Salvar Produto</button>
      </form>

      <h3>Produtos da Loja Selecionada</h3>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado nesta loja.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {produtos.map((produto) => (
            <li key={produto.id_produto} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{produto.nome}</strong> — R$ {Number(produto.preco).toFixed(2)}
                <br />
                <small>{produto.descricao}</small>
              </div>
              <button onClick={() => handleDeletarProduto(produto.id_produto)} style={{ color: 'red', cursor: 'pointer', padding: '5px 10px' }}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GerenciarProdutos;