#language: pt
Funcionalidade: Cadastrar novo Usuário
Endpoint sem autenticação que fornece o registro de novos usuários

Cenário: Os dados informados são válidos
Dado Quero registrar um novo usuário no sistema
Quando eu enviar os dados de registro
Entao recebo uma mensagem de confirmação com um código 201 na Resposta


Cenário: Os dados informados NÃO são válidos
Dado Quero registrar um novo usuário no sistema
E digitei dados de registro inválidos ou nulos
Quando eu enviar os dados de registro
Entao recebo uma mensagem de erro com um código 400 na Resposta


Cenário: O Usuário já existe
Dado Quero registrar um novo usuário no sistema
E digitei um nome de login que já existe no sistema
Quando eu enviar os dados de registro
Entao recebo uma mensagem de erro com um código 422 na Resposta
