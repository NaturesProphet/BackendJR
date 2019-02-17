#language: pt
Funcionalidade: consultar postos de combustível do usuário
Endpoint que lista os postos de combustível registrados pelo usuário


Cenário: 1: O usuário consulta todos os postos de combustível
Dado Quero listar todos os postos de combustível que registrei
E estou autenticado na seção
Quando eu enviar a requisição
Então recebo um array com os postos de combustível, com um código 200 na resposta


Cenário: 2: O usuário TENTA consultar todos os postos de combustível
Dado Quero listar todos os postos de combustível que registrei
E NÃO estou autenticado na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 401 na resposta


