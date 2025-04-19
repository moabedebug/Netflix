<h1 align="center">Netflix Clone 🎬</h1>

## ✨ Funcionalidades

- 🔐 **Autenticação** com JWT (cadastro, login, logout)  
- 📱 **UI Responsiva** construída com Tailwind CSS  
- 🎬 **Navegar** pelos filmes e séries em alta (via TMDB)  
- 🔎 **Buscar** atores, filmes e séries  
- 🎥 **Assistir** trailers diretamente no app  
- 🔥 **Histórico de Busca** – salva e exibe suas pesquisas anteriores  
- 🐱‍👤 **Conteúdo Similar** recomendado  
- 💙 **Landing Page** com destaques  
- 🚀 **Build Otimizada** para produção  

---

## 🚀 Stack de Tecnologias

- **Frontend**: React.js, Vite, React Router, Tailwind CSS, Zustand, Axios, React Player, React Hot Toast, Lucide‑React  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt.js, dotenv, cookie-parser, Axios, Nodemon
- **Ferramentas**: Insomnia  

---

## 📸 Capturas de Tela

<p align="center">
  <img src="/Frontend/public/hero-screenshot.png" alt="Página Inicial" width="300" /> &nbsp;
  <img src="/Frontend/public/home-screenshot.png" alt="Tela Principal" width="300" /> &nbsp;
  <img src="/Frontend/public/watch-screenshot.png" alt="Assistir Trailer" width="300" />
</p>

---

## 🏁 Como Iniciar

### Pré‑requisitos

- [Node.js](https://nodejs.org/) v16+  
- [npm](https://npmjs.com/) ou [Yarn](https://yarnpkg.com/)  
- Uma chave de API do [TMDB](https://developers.themoviedb.org/3)

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz (ou em `/backend` e `/frontend`, se estiverem separados) com:

```ini
# Backend
PORT=5000
MONGO_URI=your_mongo_uri
NODE_ENV=development
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key

# Frontend (opcional)
VITE_API_BASE_URL=http://localhost:5000/api