#language: pt
Funcionalidade: Cadastrar novos Postos de cumbustível
Endpoint que cadastra novos postos de combustível

Cenário: Os dados informados são válidos e o usuário está autenticado na seção
Dado Quero registrar um novo posto de combustível
Quando eu enviar os dados de registro
Então recebo uma mensagem de confirmação com um código 200 na Resposta


Cenário: Os dados informados NÃO são válidos e o usuário está autenticado na seção
Dado Quero registrar um novo posto de combustível
E Informei dados inválidos ou nulos
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 400 na Resposta


Cenário: O usuário NÃO está autenticado na seção
Dado Quero registrar um novo posto de combustível
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 401 na Resposta
