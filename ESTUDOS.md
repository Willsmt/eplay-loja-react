# 📚 Guia de Estudos — EPlay

Documento de estudo do projeto **EPlay** (loja de games / projeto final do módulo
de React da EBAC). A ideia aqui é registrar **o que foi usado, o que cada coisa faz
e por quê**, para servir de revisão no futuro.

> Dica de leitura: o projeto é uma **SPA** (Single Page Application) em React +
> TypeScript. Tudo roda no navegador, e a navegação entre "páginas" é simulada
> pelo React Router sem recarregar o site.

---

## 1. Visão geral

O EPlay é um e-commerce de jogos com:

- **Home** com banner de destaque + listas de "Promoções" e "Em breve";
- **Categorias** (ação, esportes, luta, RPG, simulação);
- **Página de produto** com descrição, detalhes e galeria de mídia;
- **Carrinho** lateral (drawer) com estado global;
- **Checkout** completo com formulário validado, máscaras, parcelamento e um
  **modo demo** para simular compras (é um site de estudos, sem cobrança real).

---

## 2. Stack / Tecnologias

| Tecnologia | Para que serve no projeto |
|---|---|
| **React 19** | Biblioteca de UI baseada em componentes. |
| **TypeScript** | Tipagem estática — pega erros antes de rodar (ex.: passar o tipo errado num prop). |
| **Vite** | Ferramenta de build e servidor de desenvolvimento (rápido, com hot reload). |
| **React Router DOM** | Roteamento da SPA (troca de páginas sem recarregar). |
| **Redux Toolkit** | Estado global. Aqui guarda o **carrinho**. |
| **RTK Query** | Camada de dados do Redux Toolkit — busca dados na API com cache automático. |
| **React Redux** | "Cola" que conecta o React ao Redux (`useSelector`, `useDispatch`). |
| **styled-components** | CSS-in-JS — escrever CSS dentro do JS, escopado por componente. |
| **Formik** | Gerenciamento de formulários (valores, erros, "campo tocado", submit). |
| **Yup** | Schema de validação usado pelo Formik. |
| **@react-input/mask** | Máscaras de input (CPF, cartão, validade, CVV). Compatível com React 19. |
| **Swiper** | Carrossel das listas de produtos no mobile. |
| **react-spinners** | Spinner de carregamento (`PacmanLoader`). |
| **ESLint + Prettier** | Padronização e checagem de qualidade do código. |

> ⚠️ **Nota de aprendizado:** usávamos `react-input-mask`, mas ele depende do
> `findDOMNode`, que foi **removido no React 19** → quebrava em runtime. Trocamos
> pela **`@react-input/mask`**, que é mantida e compatível. Lição: sempre conferir
> se a lib suporta a versão do React que você usa.

---

## 3. Estrutura de pastas

```
src/
├── assets/         # imagens (logo, ícones, etc.)
├── components/     # componentes reutilizáveis (cada um com index.tsx + styles.ts)
│   ├── Banner/         # destaque do dia (consome a API)
│   ├── BackToTop/      # botão flutuante "voltar ao topo"
│   ├── Button/         # botão polimórfico (button | submit | link)
│   ├── Card/           # cartão branco usado no checkout
│   ├── Cart/           # carrinho lateral (drawer)
│   ├── Footer/         # rodapé
│   ├── Gallery/        # galeria de mídia do produto (com modal acessível)
│   ├── Header/         # cabeçalho + menu mobile (drawer)
│   ├── Hero/           # topo da página de produto
│   ├── Loader/         # spinner de carregamento
│   ├── Message/        # mensagem centralizada (usada em erros)
│   ├── ProductCard/    # card de um jogo
│   ├── ProductList/    # lista/carrossel de jogos
│   ├── ScrollToHash/   # rola até a âncora (#) ao mudar de rota
│   ├── Section/        # seção com título + fundo
│   └── Tag/            # etiqueta (categoria, sistema, preço...)
├── config/         # categoriesConfig.ts (lista de categorias)
├── hooks/          # hooks customizados (useMediaQuery)
├── pages/          # telas roteáveis (Home, Categories, Product, Checkout)
├── services/       # api.ts (RTK Query)
├── store/          # configuração do Redux + reducers (cart)
├── utils/          # funções puras (formatPrice, getGameTags, getTotalPrice)
├── types.d.ts      # tipos globais (Game, GalleryItem)
├── routes.tsx      # mapa de rotas
├── styles.ts       # tema (cores, breakpoints) + CSS global
└── main.tsx        # ponto de entrada (monta o React + Provider do Redux)
```

**Convenção:** cada componente é uma pasta com `index.tsx` (a lógica/JSX) e
`styles.ts` (os styled-components daquele componente). Isso mantém o CSS perto do
componente e fácil de achar.

---

## 4. Conceitos centrais

### 4.1 Componentes vs Páginas
- **Componentes** (`src/components`): pedaços reutilizáveis de UI (botão, card...).
- **Páginas** (`src/pages`): telas associadas a uma rota. Elas montam componentes.

### 4.2 Tipos globais (`types.d.ts`)
Os tipos `Game` e `GalleryItem` são declarados como **globais** (`declare type`).
Por isso podem ser usados em qualquer arquivo **sem `import`**. É uma escolha de
conveniência; a alternativa comum é exportar/importar os tipos como um módulo.

### 4.3 styled-components + tema
Em vez de arquivos `.css`, o estilo vive no JS:

```ts
export const Title = styled.h2`
  font-size: 36px;
  color: ${colors.white};
`
```

O **tema** fica em `src/styles.ts`:
- `colors` → paleta (`white`, `black`, `gray`, `green`, `red`...);
- `breakpoints` → pontos de quebra responsivos (`tablet`, `mobile`).

Usar o tema evita "números mágicos" e mantém consistência visual.

### 4.4 Roteamento
`routes.tsx` define as rotas com `<Routes>` / `<Route>`. O `ScrollToHash` resolve
algo que o React Router **não** faz sozinho: rolar até uma âncora `#promocoes`
quando a URL tem um hash.

### 4.5 Estado global: Redux Toolkit + RTK Query

São **duas coisas diferentes** dentro do mesmo Redux:

**a) Slice do carrinho (`store/reducers/cart.ts`)** — estado da aplicação que
nós controlamos: lista de itens e se o drawer está aberto. Usa `createSlice`:

```ts
addItem, removeItem, clearCart, openCart, closeCart
```

Lemos com `useSelector` e despachamos ações com `useDispatch`.

**b) RTK Query (`services/api.ts`)** — estado **vindo do servidor**. Você declara
os endpoints e ele gera **hooks** automáticos com cache, loading e erro:

```ts
useGetOnSaleQuery()      // promoções
useGetComingSoonQuery()  // em breve
useGetFeaturedQuery()    // destaque do dia
useGetCategoriesQuery()  // todas as categorias (em paralelo)
useGetGameQuery(id)      // um jogo
usePurchaseMutation()    // POST do checkout
```

Cada hook devolve `{ data, isLoading, isError, ... }`. Isso evita escrever
`fetch` + `useState` + `useEffect` na mão para cada requisição.

### 4.6 Hooks customizados (`hooks/useMediaQuery.ts`)
Detecta se a tela é mobile usando `window.matchMedia`. A implementação usa o
`useSyncExternalStore` — a forma **idiomática** do React de ler um estado que vive
**fora** do React (aqui, o `matchMedia` do navegador) e re-renderizar quando ele muda.

### 4.7 Utils (funções puras)
- `formatPrice(n)` → formata número como `R$ 1.234,56` (via `Intl.NumberFormat`);
- `getTotalPrice(items)` → soma os preços do carrinho;
- `getGameTags(game)` → monta as etiquetas (data, desconto, preço) de um jogo.

São **funções puras**: mesma entrada → mesma saída, sem efeitos colaterais. Fáceis
de testar e reutilizar (o `getTotalPrice` é usado no Cart **e** no Checkout).

---

## 5. O fluxo do Checkout (o coração do projeto)

O `pages/Checkout/index.tsx` reúne quase todos os conceitos. Vale estudar com calma.

### 5.1 Formik
Gerencia o formulário inteiro: valores (`form.values`), erros (`form.errors`),
campos tocados (`form.touched`) e o submit (`form.handleSubmit`). Cada input é
**controlado**: `value={form.values.x}` + `onChange={form.handleChange}`.

### 5.2 Yup + validações condicionais
O `validationSchema` descreve as regras. O pulo do gato são as validações
**condicionais** com `.when()` — os campos do cartão só são obrigatórios quando o
pagamento é no cartão:

```ts
cardNumber: Yup.string().when('payWithCard', {
  is: true,
  then: schema => schema.required('...').test('cardNumber', '...', ...)
})
```

### 5.3 Máscaras (`@react-input/mask`)
A máscara usa `replacement` para dizer quais caracteres são "espaços a preencher":

```tsx
<InputMask mask="___.___.___-__" replacement={{ _: /\d/ }} />  // CPF
```

Como a máscara guarda o valor formatado (`"123.456.789-00"`), a validação conta só
os dígitos (`onlyDigits(value).length === 11`) e o envio à API também remove a
máscara (`onlyDigits(...)`).

### 5.4 Feedback de erro (duas funções)
- `checkInputHasError(field)` → **booleano**, usado na borda vermelha (`className`);
- `getErrorMessage(field, msg)` → **texto**, usado no `<small>` abaixo do campo.

Ambas só mostram erro depois que o campo foi **tocado** (`form.touched`), para não
gritar erro antes da pessoa interagir.

### 5.5 Estado derivado com `useMemo` (parcelas)
As parcelas (1x a 6x) são **derivadas** do total. Não precisam de `useState` +
`useEffect` — são calculadas direto:

```ts
const installments = useMemo(() => { /* monta 1x..6x */ }, [totalPrice])
```

> 🧠 **Regra de ouro:** se um valor pode ser **calculado** a partir de outros, ele
> é estado derivado → use `useMemo` (ou só uma variável), **não** `useState`.
> Guardar isso em estado e sincronizar com `useEffect` é um anti-pattern que causa
> renders em cascata (o ESLint inclusive avisa: `react-hooks/set-state-in-effect`).

### 5.6 Rules of Hooks (por que o `return` vem depois)
Hooks (`useState`, `useEffect`, `useMemo`...) precisam rodar **sempre na mesma ordem,
em todo render**. Por isso o "guard" de carrinho vazio fica **depois** de todos os
hooks:

```ts
const installments = useMemo(...)   // hooks primeiro
useEffect(...)                      // ...
if (items.length === 0 && !isSuccess) return <Navigate to="/" />  // só então o return
```

Se um `return` aparecesse no meio dos hooks, o React lançaria
*"Rendered fewer hooks than expected"*.

### 5.7 Modo demo
O botão **"Preencher com dados de teste"** chama `form.setValues(...)` com dados
válidos (cartão de teste `4111 1111 1111 1111`, que passa no algoritmo de Luhn).
Assim qualquer pessoa simula a compra sem digitar dados reais. É **opcional** —
quem quiser pode preencher na mão para testar máscaras e validações.

### 5.8 Payload e integração com a API
No `onSubmit`, montamos o objeto que vai para `usePurchaseMutation`:
- `products` → mapeia o **carrinho real** (`items`);
- `installments` → a parcela escolhida;
- `card` é **condicional**: no boleto envia só `{ active: false }`;
- ano do cartão é digitado em 2 dígitos (YY) e convertido para 4 (`2000 + ano`).

Ao concluir (`isSuccess`), um `useEffect` despacha `clearCart()` e a tela de
agradecimento aparece.

---

## 6. Padrões e boas práticas aplicados

- **Loading e erro em toda requisição:** as telas tratam `isLoading` (mostram
  `Loader`) **e** `isError` (mostram `Message`). Sem isso, uma falha de rede
  deixaria um spinner girando para sempre.
- **Acessibilidade:** itens da galeria operáveis por teclado (`role`, `tabIndex`,
  `onKeyDown`, Esc para fechar o modal); botões reais em vez de `<img onClick>`;
  `alt=""` em imagens decorativas.
- **Nomenclatura consistente** em inglês para identificadores; textos da UI em
  português (é uma loja BR). Comentários em PT explicando o **porquê**.
- **Componentes pequenos e reutilizáveis** (`Loader`, `Message`, `Button`...).

---

## 7. Scripts e ferramentas

```bash
npm run dev      # servidor de desenvolvimento (Vite + hot reload)
npm run build    # checagem de tipos (tsc) + build de produção (Vite)
npm run preview  # serve a build de produção localmente
npm run lint     # roda o ESLint no projeto
```

- **`tsc`** (TypeScript) → garante que os tipos batem; roda no `build`.
- **ESLint + Prettier** → estilo e qualidade de código consistentes.
- **`npm audit`** → checa vulnerabilidades nas dependências (boa prática antes de
  publicar).

---

## 8. Glossário rápido

- **SPA**: app de página única; a navegação não recarrega o site.
- **Componente controlado**: input cujo valor é controlado pelo estado do React.
- **Estado derivado**: valor calculado a partir de outro estado (não se guarda).
- **Hook**: função `use...` que adiciona estado/efeitos a um componente.
- **Slice (Redux)**: pedaço do estado global com seus reducers.
- **Mutation (RTK Query)**: operação que altera dados no servidor (ex.: `POST`).
- **Máscara**: formatação visual de um input (CPF, cartão...).
- **Luhn**: algoritmo que valida números de cartão de crédito.

---

> 📌 Este projeto está com `tsc`, `eslint` e `build` limpos e **0 vulnerabilidades**.
> Próximos passos opcionais de estudo: **code-splitting** com `React.lazy` (deixar o
> bundle mais leve) e **testes** (ex.: Vitest + Testing Library).
