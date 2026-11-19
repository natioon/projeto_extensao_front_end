import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CadastroComerciante from './pages/CadastroComerciante';
import Dashboard from './pages/Dashboard'; 
import GerenciarLojas from './pages/GerenciarLojas';
import GerenciarProdutos from './pages/GerenciarProdutos';
import VitrineLojas from './pages/VitrineLojas'; // Importação da Vitrine

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública inicial */}
        <Route path="/" element={<VitrineLojas />} /> 
        
        {/* Rotas de autenticação */}
        <Route path="/cadastro" element={<CadastroComerciante />} /> 
        <Route path="/login" element={<Login />} />
        
        {/* Rotas privadas do comerciante */}
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/lojas" element={<GerenciarLojas />} />
        <Route path="/produtos" element={<GerenciarProdutos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;