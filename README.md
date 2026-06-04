# 🎮 EPlay — Loja de games

E-commerce de jogos desenvolvido no módulo de React da EBAC. Uma SPA com catálogo de games, página inicial com banners e destaques, e navegação por categorias — focada em componentização e estilização com CSS-in-JS.

## 🛠️ Tecnologias

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## ✨ Funcionalidades

- 🏠 **Home** com banner e listas de produtos (destaques / em breve)
- 🗂️ **Página de categorias** com listagem de jogos
- 🧩 **Componentes reutilizáveis**: `Banner`, `Button`, `Header`, `Product`, `ProductList`, `Tag`
- 🎨 Estilização com **Styled Components** e tema centralizado
- 🧭 Navegação entre páginas com **React Router**

## 🚀 Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # pré-visualizar a build
```

## 📁 Estrutura

```
src/
├── components/   # Banner, Button, Header, Product, ProductList, Tag
├── pages/        # Home, Categories
├── models/       # tipos/modelos de dados
├── routes.tsx    # rotas da aplicação
└── styles.ts     # estilos globais
```

---

> 📚 Projeto de estudos — módulo React (EBAC).
