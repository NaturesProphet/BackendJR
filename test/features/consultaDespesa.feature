#language: pt
Funcionalidade: consultar despesas do veículo
Endpoint que lista as despesas do veículo


Cenário: 1: O veículo consultado pertence ao usuário
Dado Quero listar todas as despesas de um dos meus veículos
E possuo um token de acesso válido
E informei um ID de um veículo que me pertence
Quando eu enviar a requisição
Então recebo um array com as despesas do veículo, com um código 200 na resposta

Cenário: 2: O veículo consultado NÃO pertence ao usuário
Dado Quero listar todas as despesas de um dos meus veículos
E possuo um token de acesso válido
E informei um ID de um veículo que NÃO me pertence
Quando eu enviar a requisição
Então recebo uma mensagem de erro com um código 403 na resposta

Cenário: 3: Não estou autenticado
Dado Quero listar todas as despesas de um dos meus veículos
E NÃO possuo um token de acesso válido
Quando eu enviar a requisição
Então recebo uma mensagem de erro com um código 401 na resposta
