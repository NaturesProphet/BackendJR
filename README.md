<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">
   Uma aplicação desenvolvida em <a href="https://github.com/Microsoft/TypeScript">Typescript</a> usando <a href="http://nestjs.com/">Nestjs Framework</a>
</p>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Build Status](https://travis-ci.org/NaturesProphet/BackendJR.svg?branch=DEV)](https://travis-ci.org/NaturesProphet/BackendJR)

# JuliusReport Web-API

## Descrição

Aplicação de controle financeiro veicular, alimentado pela entrada de dados do usuário.

## Requisitos mínimos do sistema

<a href="https://nodejs.org/en/">Nodejs 8.11.3</a> ou superior  
<a href="https://nodejs.org/en/">npm 6.5.0</a> ou superior  
 <a href="https://www.docker.com/get-started">Docker 18</a> ou superior (apenas em desenvolvimento, para o banco de dados)

## Variáveis de ambiente para produção

```bash
DB_HOST             # Endereço do servidor postgresql. Default localhost
DB_PORT             # Porta utilizada na conexão ao servidor psotgresql. Default 5432
DB_USER             # Usuário do banco de dados. Default julius
DB_PASSWORD         # senha do banco de dados. Default juliuspass
DB_SCHEMA           # Nome do banco de dados. Default juliusreport
DB_ORM_SYNC         # Liga ou desliga o sync do orm. Default false
NODE_ENV            # Ambiente de execução. Ajuste para 'production' em produção
PORT                # Porta onde a API vai ouvir. Default 3000
BISCOITO            # chave do cookie
```

## Instalação das dependências

```bash
$ npm install
```

## Executando o serviço
### Banco de dados
Utilize o script pré configurado no package. Ele levanta um banco de dados Postgresql já configurado para funcionar com a aplicação em ambiente de desenvolvimento.  

```bash
npm run postgre:test
```
### Subindo a aplicação
```bash
# development
$ npm run start
```

## Documentação em Swagger
Acesse a rota /docs para conferir a documentação da api no Swagger


## Testes automatizados

```bash
# Testes Unitários (testa os métodos em geral)
$ npm run test

# Testes e2e (testa as rotas)
$ npm run test:e2e

# Testa a cobertura total de testes no projeto
$ npm run test:cov
```
