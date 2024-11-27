<h1 align="center">FIAP - Mobile Challenge</h1>

<p align="center">
  <a><img src="https://img.shields.io/badge/React Native-v18.2.0-blue?logo=react"/></a>
  <a><img src="https://img.shields.io/badge/React Navigation-v6.0.2-red?logo=react"/></a>
  <a><img src="https://img.shields.io/badge/Expo-v51.0.28-green?logo=expo"/></a>
  <a><img src="https://img.shields.io/badge/React Dom-v18.2.0-blue"/></a>
  <a><img src="https://img.shields.io/badge/Axios-v1.7.7-orange?logo=axios"/></a>
  <a><img src="https://img.shields.io/badge/Typescript-v5.3.3-blue?logo=typescript"/></a>
</p>

## Objetivo do trabalho

Após o sucesso do desenvolvimento da aplicação de blogging dinâmico
com a implementação do back-end em Node.js e o front-end utilizando React,
chegou a hora de criarmos uma interface gráfica mobile robusta, intuitiva e
eficiente para esta aplicação. Esta atividade focará em desenvolver o front-end
mobile utilizando React Native, proporcionando uma experiência de usuário
excelente tanto para docentes quanto para estudantes.

## Backend

Para rodar esta solução, é preciso primeiro rodar o backend que está em outro repositório do github, mas já containerizado. Para isso, rode no terminal:

```sh
git clone https://github.com/ammtsz/fiap-challenge-backend.git
cd fiap-challenge-backend
npm install
```

Antes de rodar o container com o docker compose, configure um arquivo .env com as variáveis de ambiente conforme sugerido no [repositório do backend](https://github.com/ammtsz/fiap-challenge-backend), ou como o exemplo abaixo:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_DB=challenge
JWT_SECRET=mysecret
```

Por fim, subir a aplicação utilizando docker:

```sh
docker compose up
```

Após esse procedimento, você terá rodando em localhost:
* Instância do PostgreSQL na porta 5432.
* Instância do backend (API) na porta 3000.

## Mobile

Em seguida, para o mobile, abra uma nova instância do terminal e rode:
```sh
git clone https://github.com/dscorzoni/fiap-mobile-challenge.git
cd fiap-mobile-challenge
npm install
npm run start

Caso esteja rodando em um emulador Android pressione 'a' para selecionar a instância do emulador.
Caso esteja rodando em um emulador de IOS como XCode pressione 'r' para selecionar a instância do emulador.
```

Desta forma, o mobile pode ser acessado via emulador Android Studio, XCode ou dispositivo físico.

# Como utilizar a aplicação e Documentação

Logo na tela principal, clique em **"Registre-se"** para criar um usuário. Usuários do tipo ADMIN ou PROFESSOR podem criar/editar posts. Usuários do tipo ALUNO podem apenas visualizar posts. Para a documentação completa, com passo-a-passo para todos os procedimentos, [acesse aqui](https://beryl-sushi-951.notion.site/Documenta-o-Tech-Challenge-Fase-4-144eb6993b4a80508967cb67200b6311).
