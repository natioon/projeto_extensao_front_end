import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function CadastroComerciante() {
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault(); 
    setErro('');
    setSucesso('');

    try {
      await axios.post('http://localhost:3000/auth/cadastrar', {
        nome: nome,
        cpf_cnpj: cpfCnpj,
        email: email,
        senha: senha
      });

      setSucesso('Cadastro realizado com sucesso! Redirecionando...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErro(error.response.data.error);
      } else {
        setErro('Erro ao conectar com o servidor para cadastro.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '350px', margin: '0 auto' }}>
      <h2>Cadastro de Comerciante</h2>

      <form onSubmit={handleCadastro}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nome Completo / Empresa:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>CPF ou CNPJ:</label>
          <input 
            type="text" 
            value={cpfCnpj} 
            onChange={(e) => setCpfCnpj(e.target.value)} 
            required 
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>E-mail:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
            style={{ width: '100%' }}
          />
        </div>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}

        <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
          Cadastrar
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Já tem uma conta? <Link to="/login">Faça login aqui</Link>
      </p>
    </div>
  );
}

export default CadastroComerciante;