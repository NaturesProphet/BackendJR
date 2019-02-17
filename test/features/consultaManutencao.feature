#language: pt
Funcionalidade: consultar registros de manutenção
Endpoint que lista as manutenções do veículo


Cenário: 1: O usuário consulta todas as manutenções do veículo
Dado Quero listar todas as manutencoes do veículo atual na seção
E estou autenticado na seção
E meu veículo está na seção
Quando eu enviar a requisição
Então recebo um array com as manutencoes do veículo, com um código 200 na resposta


Cenário: 2: O usuário TENTA consultar todas as manutencoes do veículo
Dado Quero listar todas as manutencoes do veículo atual na seção
E estou autenticado na seção
E meu veículo NÃO está na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 400 na resposta


Cenário: 3: O usuário TENTA consultar todas as manutencoes do veículo
Dado Quero listar todas as manutencoes do veículo atual na seção
E NÃO estou autenticado na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 401 na resposta


