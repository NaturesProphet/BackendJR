#language: pt
Funcionalidade: Cadastrar novos veículos de um Usuário

Endpoint que cadastra novos veículos do Usuário

Cenário: Os dados informados são válidos e o usuário está autenticado na seção
Dado Quero registrar um novo veículo na minha frota
E tenho um token válido para me autenticar
E informei dados corretos
Quando eu enviar os dados de registro
Então recebo uma mensagem de confirmação com um código 201 na Resposta


Cenário: Os dados informados NÃO são válidos e o usuário está autenticado na seção
Dado Quero registrar um novo veículo na minha frota
E tenho um token válido para me autenticar
E Informei dados inválidos ou nulos
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 400 na Resposta


Cenário: O usuário NÃO está autenticado na seção
Dado Quero registrar um novo veículo na minha frota
E não tenho um token de acesso ou ele é inválido
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 401 na Resposta
