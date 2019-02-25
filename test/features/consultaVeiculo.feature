#language: pt
Funcionalidade: consultar os veículos do usuário
Endpoint que lista os veículos registrados do usuário


Cenário: 1: O usuário consulta todos os veículos
Dado Quero listar todos os veículos que registrei
E tenho um token de autenticação válido
Quando eu enviar a requisição
Então recebo um array com os veículos, com um código 200 na resposta


Cenário: 2: O usuário TENTA consultar todos os veículos
Dado Quero listar todos os veículos que registrei
E NÃO tenho um token de autenticação válido na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 401 na resposta


