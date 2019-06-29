#language: pt
Funcionalidade: Cadastrar novas manutenções de um veículo
Endpoint que cadastra novas manutenções para um veículo

Cenário: 1: Os dados informados são válidos
Dado Quero registrar uma nova manutenção de um veículo
E Tenho um token de acesso válido
Quando eu enviar os dados de registro
Então recebo uma mensagem de confirmação com um código 201 na Resposta

Cenário: 2: Os dados informados NÃO são válidos
Dado Quero registrar uma nova manutenção de um veículo
E Tenho um token de acesso válido
E Esqueci de preencher algum dado ou digitei errado
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 400 na Resposta

Cenário: 3: O Veículo informado não pertence ao usuário que enviou a requisição
Dado Quero registrar uma nova manutenção de um veículo
E Tenho um token de acesso válido
E informei o ID de um veículo que não me pertence
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 403 na Resposta

Cenário: 4: O Veículo informado não existe no banco de dados
Dado Quero registrar uma nova manutenção de um veículo
E Tenho um token de acesso válido
E informei o ID de um veículo que não existe no banco de dados
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 400 na Resposta

Cenário: 5: O usuário não está autenticado
Dado Quero registrar uma nova manutenção de um veículo
E Não possuo um token de acesso válido ou ele já expirou
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 401 na Resposta
