<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">
   Uma aplicação desenvolvida em <a href="https://github.com/Microsoft/TypeScript">Typescript</a> usando <a href="http://nestjs.com/">Nestjs Framework</a>
</p>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

# JuliusReport Web-API

## Descrição

Aplicação de controle financeiro veicular, alimentado pela entrada de dados do usuário.

## Requisitos mínimos do sistema

<a href="https://nodejs.org/en/">Nodejs 8.11.3</a> ou superior  
<a href="https://nodejs.org/en/">npm 6.5.0</a> ou superior  
 <a href="https://www.docker.com/get-started">Docker 18</a> ou superior (apenas em desenvolvimento, para o banco de dados)

## Instalação das dependências

```bash
$ npm install
```

## Executando o serviço

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Testes automatizados

```bash
# Testes Unitários (testa os métodos em geral)
$ npm run test

# Testes e2e (testa as rotas)
$ npm run test:e2e

# Testa a cobertura total de testes no projeto
$ npm run test:cov
```
