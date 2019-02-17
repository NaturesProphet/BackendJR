#language: pt
Funcionalidade: consultar registros de consumo
Endpoint que lista os registros de consumo do veículo


Cenário: 1: O usuário consulta todos os registros de consumo do veículo
Dado Quero listar todos os registros de consumo do veículo atual na seção
E estou autenticado na seção
E meu veículo está na seção
Quando eu enviar a requisição
Então recebo um array com os registros de consumo, com um código 200 na resposta


Cenário: 2: O usuário TENTA consultar todos os registros de consumo
Dado Quero listar todos os registros de consumo atual na seção
E estou autenticado na seção
E meu veículo NÃO está na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 400 na resposta


Cenário: 3: O usuário TENTA consultar todos os registros de consumo
Dado Quero listar todos os registros de consumo atual na seção
E NÃO estou autenticado na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 401 na resposta


