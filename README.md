# 🖥️ Front-End - Vitrine Virtual e Gestão de Lojas

Interface web desenvolvida em **React** com **Vite** para a plataforma de vitrine virtual e gestão de catálogos de comércios locais. Permite que clientes naveguem pelas lojas e visualizem catálogos de produtos, enquanto comerciantes gerenciam suas lojas e itens após autenticação.

> 🔗 **Repositório do Back-End (API e Banco de Dados):**  
> A parte de servidor, autenticação e banco de dados deste projeto está disponível em: [https://github.com/natioon/projeto_extensao_back_end](https://github.com/natioon/projeto_extensao_back_end)

---

## 🛠️ Tecnologias Utilizadas
* **React 18** (`react`, `react-dom`)
* **Vite** (`vite`, `@vitejs/plugin-react`)
* **React Router DOM** (`react-router-dom`) para navegação entre rotas públicas e privadas
* **Axios** (`axios`) para comunicação com a API REST

## 📂 Estrutura de Páginas (`src/pages/`)
* `/` (`VitrineLojas.jsx`) — Vitrine pública com listagem de lojas e visualização de produtos por loja.
* `/cadastro` (`CadastroComerciante.jsx`) — Formulário de cadastro de novos comerciantes.
* `/login` (`Login.jsx`) — Autenticação de comerciantes com armazenamento do token JWT no `localStorage`.
* `/dashboard` (`Dashboard.jsx`) — Painel principal autenticado do comerciante.
* `/lojas` (`GerenciarLojas.jsx`) — Cadastro e exclusão de lojas vinculadas ao comerciante logado.
* `/produtos` (`GerenciarProdutos.jsx`) — Cadastro e exclusão de produtos por loja e categoria.

---

## ⚙️ Como executar o projeto na sua máquina

### Pré-requisito Obrigatório
Esta aplicação consome a API em `http://localhost:3000`. Antes de iniciar o front-end, certifique-se de que o **Back-End e o banco PostgreSQL estejam configurados e em execução** seguindo o guia do repositório da API:  
👉 [Instruções de instalação do Back-End](https://github.com/natioon/projeto_extensao_back_end)

### Passo a passo do Front-End

1. **Clone este repositório:**
   ```bash
   git clone [https://github.com/natioon/projeto_extensao_front_end.git](https://github.com/natioon/projeto_extensao_front_end.git)
   cd projeto_extensao_front_end
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   - Abra o endereço local exibido no terminal (por padrão, `http://localhost:5173`).

---
**Autor:** Antônio Carlos