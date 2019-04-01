#language: pt
Funcionalidade: Cadastrar novos Postos de Combustível
Endpoint que cadastra novos postos de combustível

Cenário: 1: Os dados informados são válidos
Dado Quero registrar um novo posto de combustível
E tenho um token válido para me autenticar
Quando eu enviar os dados de registro
Então recebo uma mensagem de confirmação com um código 201 na Resposta


Cenário: 2: Os dados informados NÃO são válidos.
Dado Quero registrar um novo posto de combustível
E tenho um token válido para me autenticar
E Informei dados inválidos ou nulos
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 400 na Resposta


Cenário: 3: O usuário NÃO está autenticado
Dado Quero registrar um novo posto de combustível
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 401 na Resposta
