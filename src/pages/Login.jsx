import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setErro(''); 

    try {
      const resposta = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        senha: senha
      });

      const token = resposta.data.token;
      localStorage.setItem('token', token); 
      
      alert('Login feito com sucesso!');
      navigate('/dashboard'); 
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErro('Email ou senha inválidos.');
      } else {
        setErro('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <h2>Login do Comerciante</h2>
      
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>

        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          Entrar
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link>
      </p>

    </div> 
  );
}

export default Login;