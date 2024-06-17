<h1 align="center">
<a href="https://www.ucs.br/bit-bus/">
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
  <a href="#"><img src="  https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/></a>
    <a href="#"><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/></a>
</p>

<p align="center">
  <a href="https://www.ucs.br/bit-bus/" target="_blank">
    <img src="https://github.com/matregnago/bit-bus/blob/master/public/logo-bitbus.png?raw=true" alt="Logo" width="200"/>
  </a>
</p>

## O que é o Bit Bus?

O **[Bit Bus](https://www.ucs.br/bit-bus/)** caracteriza-se como um espaço científico-cultural itinerante voltada à divulgação científica e tecnológica no interior e no entorno de um veículo automotor do tipo ônibus. Por isso, sua denominação une as palavras bit, em referência ao dígito binário, a menor parcela de informação processada por um computador, e bus, sufixo de ônibus, geralmente caracterizado como um veículo de uso coletivo e temporário por um grande número de pessoas.
A sua missão é promover a formação das pessoas, por meio da construção do conhecimento, com ênfase na área da ciência e tecnologia.

## Propósito do sistema

O sistema foi desenvolvido para que os funcionários do Bit Bus possam controlar o cotidiano do museu. Essa aplicação oferece opções de controle de acervo, eventos e feedbacks. Esse controle é feito a partir de cadastramento e exclusão de elementos, além de modos de visualização adequados para o modelo de dados proposto para cada elemento.

## Instalação do projeto

### 1. Clone esse repositório usando:

```bash
git clone https://github.com/matregnago/bit-bus.git
```

```bash
cd bit-bus
```

### 2. Instalação

### Pré-requisitos básicos

- Instalar o **[Node.js](https://nodejs.org/)**
- Instalar o **[Docker](https://www.docker.com/)**

### Verifique as instalações

- Verifique se o NodeJS e o Docker estão corretamente instalados e rodando:

```bash
node -v
```

```bash
docker -v
```

### Iniciando o container do banco de dados

- Inicie o servidor PostgreSQL no Docker, ao executar o seguinte comando no diretório do projeto:

```bash
docker compose up -d
```

### Instalando as dependências

- Instale os pacotes necessários para o funcionamento do projeto:

```bash
npm install
```

### Variáveis de ambiente

- Copie o arquivo `.env.example` para um novo arquivo chamado `.env` no diretório raiz do projeto:

```bash
cp .env.example .env
```

- Você pode utilizar também `.env.local` ou `.env.development.local`

### Adicionando tabelas no banco de dados

- Adicione as tabelas declaradas no arquivo **[schema.prisma](https://github.com/matregnago/bit-bus/blob/master/prisma/schema.prisma)** no banco de dados

```bash
npx prisma db push
```

### 3. Inicie o servidor

- Rode no modo de desenvolvedor

```bash
npm run dev
```

Depois de iniciar, para acessar o projeto, basta acessar
[http://localhost:3000](http://localhost:3000).

### 4. Comandos extras

### Prisma Studio

- Para iniciar o Prisma Studio (visualizar todos os dados do banco), execute o comando:

```bash
npx prisma studio
```

- O Prisma Studio estará rodando no endereço [http://localhost:5555](http://localhost:5555).

### Nova migração (Alteração nas tabelas)

- Para atualizar o banco de dados com a nova versão do arquivo **[schema.prisma](https://github.com/matregnago/bit-bus/blob/master/prisma/schema.prisma)**, execute comando:

```bash
npx prisma migrate dev --name nome-da-migracao
```

## Autores

<img width="80" src="https://contrib.rocks/image?repo=matregnago/bit-bus" />

<p>Matheus Augusto Tregnago e Guilherme Augusto Gilioli</p>
