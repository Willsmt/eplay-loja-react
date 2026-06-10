# 🎮 EPlay — Loja de games

> 🧩 **O que este projeto comprova:** React + TypeScript, estado global com Redux
> Toolkit + RTK Query, consumo de API com cache, formulários validados (Formik +
> Yup) e arquitetura de e-commerce com componentização.

E-commerce de jogos desenvolvido no módulo de React da EBAC. Uma **SPA** com
catálogo de games, página inicial com banners e destaques, navegação por
categorias, carrinho de compras e um **checkout completo** com validação, máscaras
e parcelamento.

> 📚 Quer entender o projeto a fundo? Veja o **[Guia de Estudos](./ESTUDOS.md)** —
> explica o que foi usado, o que cada coisa faz e os padrões aplicados.

## 🛠️ Tecnologias

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

| Categoria | Bibliotecas |
|---|---|
| **Base** | React 19, TypeScript, Vite |
| **Estado** | Redux Toolkit, RTK Query, React Redux |
| **Roteamento** | React Router DOM |
| **Estilo** | styled-components (tema centralizado) |
| **Formulários** | Formik, Yup, @react-input/mask |
| **UI** | Swiper (carrossel), react-spinners (loader) |
| **Qualidade** | ESLint, Prettier |

## ✨ Funcionalidades

- 🏠 **Home** com banner de destaque e listas de "Promoções" e "Em breve"
- 🗂️ **Categorias** (ação, esportes, luta, RPG, simulação)
- 🎮 **Página de produto** com descrição, detalhes e **galeria de mídia** (modal acessível)
- 🛒 **Carrinho** lateral (drawer) com estado global (Redux)
- 💳 **Checkout** com Formik + Yup: validações condicionais, máscaras de CPF/cartão,
  parcelamento dinâmico e feedback de erro por campo
- 🧪 **Modo demo**: botão que preenche dados de teste para simular a compra
- 🔄 **Loading e erro** tratados em todas as requisições (RTK Query)
- ♿ Cuidados de **acessibilidade** (navegação por teclado, `aria-label`, etc.)

## 🚀 Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento (hot reload)
npm run build    # checagem de tipos + build de produção
npm run preview  # pré-visualizar a build
npm run lint     # checagem de qualidade (ESLint)
```

> A API consumida é a de estudos da EBAC: `https://api-ebac.vercel.app/api/eplay`.
> Nenhuma cobrança real é feita — o checkout serve para simular o fluxo de compra.

## 📁 Estrutura

```
src/
├── assets/         # imagens e ícones
├── components/     # componentes reutilizáveis (index.tsx + styles.ts)
├── config/         # configuração de categorias
├── hooks/          # hooks customizados (useMediaQuery)
├── pages/          # telas roteáveis (Home, Categories, Product, Checkout)
├── services/       # api.ts (RTK Query)
├── store/          # store do Redux + reducer do carrinho
├── utils/          # funções puras (formatPrice, getTotalPrice, getGameTags)
├── types.d.ts      # tipos globais (Game, GalleryItem)
├── routes.tsx      # rotas da aplicação
├── styles.ts       # tema (cores, breakpoints) + CSS global
└── main.tsx        # ponto de entrada
```

---

> 📚 Projeto de estudos — módulo React (EBAC). Documentação detalhada em
> [`ESTUDOS.md`](./ESTUDOS.md).
