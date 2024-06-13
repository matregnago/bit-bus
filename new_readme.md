<h1 align="center">
<a href="https://elyzen.vercel.app">
Bit Bus
</a>
</h1>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=%23ffffff"/></a>
  <a href="#"><img src="https://img.shields.io/badge/shadcn/UI-%23ffffff.svg?style=for-the-badge&logo=shadcnui&logoColor=black"/></a>
  <a href="#"><img src="https://img.shields.io/badge/nextjs-%2320232a.svg?style=for-the-badge&logo=nextdotjs&logoColor=white"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/></a>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=node.js&logoColor=white"/></a>
    <a href="#"><img src="https://img.shields.io/badge/Bun.js-febbd0.svg?style=for-the-badge&logo=bun&logoColor=f9f1e1"/></a>
  <a href="#"><img src="  https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/></a>
    <a href="#"><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/></a>
</p>

<p align="center">
  <a href="https://elyzen.vercel.app" target="_blank">
    <img src="https://github.com/matregnago/bit-bus/blob/master/public/logo-bitbus.png?raw=true" alt="Logo" width="200"/>
  </a>
</p>

## O que é o Bit Bus?

O **[Bit Bus](https://www.ucs.br/bit-bus/)** caracteriza-se como um espaço científico-cultural itinerante voltada à divulgação científica e tecnológica no interior e no entorno de um veículo automotor do tipo ônibus. Por isso, sua denominação une as palavras bit, em referência ao dígito binário, a menor parcela de informação processada por um computador, e bus, sufixo de ônibus, geralmente caracterizado como um veículo de uso coletivo e temporário por um grande número de pessoas.
A sua missão é promover a formação das pessoas, por meio da construção do conhecimento, com ênfase na área da ciência e tecnologia.

## Propósito do sistema

O sistema foi desenvolvido para que os funcionários do Bit Bus possam controlar o cotidiano do museu. Essa aplicação oferece opções de controle de acervo, eventos e feedbacks. Esse controle é feito a partir de cadastramento e exclusão de elementos, além de modos de visualização adequados para o modelo de dados proposto para cada elemento.

## Installation and Local Development 💻

### 1. Clone this repository using

```bash
git clone https://github.com/matregnago/bit-bus.git
```

```bash
cd bit-bus
```

### 2. Installation

### Basic Pre-Requisites

> [!TIP]
> This platform is built on [Node.js](https://nodejs.org/) and utilizes [Bun](https://bun.sh/) to ensure the quickest response times achievable. While `npm` can also be used, the commands for npm would mirror those of Bun, simply substituting the specific commands accordingly.

> Bun is now available on **Windows**, **Linux**, and **macOS**. Below are the installation commands for each operating system.

### Install Bun

- Linux & macOS

```bash
curl -fsSL https://bun.sh/install | bash
```

- Windows

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### Instalando o banco de dados

- Instale o **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**
- Rode o comando

```bash
docker compose up
```

### Verify installations

- Check that both Node.js and Bun are correctly installed by running.

```bash
node -v
bun -v
```

### Install Dependencies

- You can use Bun to install dependencies quickly. If you prefer, `npm` can also be used with equivalent commands.

```bash
bun install
```

### Copy `.env.example` into `.env.local` in the root folder

- `.env.local` & `.env` are both viable options, you can also set
  `.env.test.local`,
  `.env.development.local` or
  `.env.production.local`

```bash
cp .env.example .env.local
```

### 3. Run on development &/or production (npm also works)

- Run on development mode

```bash
bun run dev
```

- Run on production mode

```bash
bun start
```

## Autores

<img width="80" src="https://contrib.rocks/image?repo=matregnago/bit-bus" />

<p>Matheus Augusto Tregnago e Guilherme Augusto Gilioli</p>
