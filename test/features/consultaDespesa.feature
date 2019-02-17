#language: pt
Funcionalidade: consultar despesas do veículo
Endpoint que lista as despesas do veículo


Cenário: 1: O usuário consulta todas as despesas do veículo
Dado Quero listar todas as despesas do veículo atual na seção
E estou autenticado na seção
E meu veículo está na seção
Quando eu enviar a requisição
Então recebo um array com as despesas do veículo, com um código 200 na resposta


Cenário: 2: O usuário TENTA consultar todas as despesas do veículo
Dado Quero listar todas as despesas do veículo atual na seção
E estou autenticado na seção
E meu veículo NÃO está na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 400 na resposta


Cenário: 3: O usuário TENTA consultar todas as despesas do veículo
Dado Quero listar todas as despesas do veículo atual na seção
E NÃO estou autenticado na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 401 na resposta


