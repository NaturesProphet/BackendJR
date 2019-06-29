#language: pt
Funcionalidade: consultar registros de manutenção
Endpoint que lista as manutenções de um veículo

Cenário: 1: O usuário consulta todas as manutenções de um veículo
Dado Quero listar todas as manutencoes de um veículo
E Tenho um token de acesso válido
Quando eu enviar a requisição
Então recebo um array com as manutencoes do veículo, com um código 200 na resposta

Cenário: 2: O veículo consultado NÃO pertence ao usuário
Dado Quero listar todas as manutencoes de um veículo
E Tenho um token de acesso válido
E informei um ID de um veículo que NÃO me pertence
Quando eu enviar a requisição
Então recebo uma mensagem de erro, com o código 403 na resposta

Cenário: 3: O veículo consultado não existe
Dado Quero listar todas as manutencoes de um veículo
E Tenho um token de acesso válido
E informei um ID de um veículo que não existe no banco de dados
Quando eu enviar a requisição
Então recebo uma mensagem de erro, com o código 400 na resposta

Cenário: 4: O Usuário não está autenticado
Dado Quero listar todas as manutencoes de um veículo
E NÃO tenho um token de acesso válido
Quando eu enviar a requisição
Então recebo uma mensagem de erro, com o código 401 na resposta