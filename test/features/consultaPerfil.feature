#language: pt
Funcionalidade: consultar perfis de consumo de um veículo
Endpoint que consulta os perfís de consumo do veículo na seção


Cenário: 1: O usuário consulta TODOS os perfís de consumo do veículo
Dado Quero listar todos os perfís de consumo do veículo atual na seção
E estou autenticado na seção
E meu veículo está na seção
Quando eu enviar a requisição
Então recebo um array com os perfís de consumo disponíveis do veículo, com um código 200 na resposta


Cenário: 2: O usuário consulta perfís de consumo do veículo, filtrando por aspectos
Dado Quero listar os perfís de consumo do veículo atual na seção
E especifiquei um ou mais campos de filtragem na query ?campo=valor
E estou autenticado na seção
E meu veículo está na seção
Quando eu enviar a requisição
Então recebo um array com os perfís de consumo filtrados do veículo, com um código 200 na resposta


Cenário: 3: O usuário TENTA consultar perfís de consumo do veículo
Dado Quero listar perfís de consumo do veículo atual na seção
E estou autenticado na seção
E meu veículo NÃO está na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 400 na resposta


Cenário: 4: O usuário TENTA consultar perfís de consumo do veículo
Dado Quero listar perfís de consumo do veículo atual na seção
E estou autenticado na seção
E o veículo consultado não me pertence
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 403 na resposta


Cenário: 5: O usuário TENTA consultar perfís de consumo do veículo
Dado Quero listar perfís de consumo do veículo atual na seção
E NÃO estou autenticado na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 401 na resposta


