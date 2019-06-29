#language: pt
Funcionalidade: Cadastrar novas despesas para um veículo
Endpoint que cadastra novas despesas para um veículo

Cenário: 1: Os dados informados são válidos
Dado Quero registrar uma nova despesa do meu veículo
E possuo um token de acesso válido
Quando eu enviar os dados de registro
Então recebo uma mensagem de confirmação com um código 201 na Resposta

Cenário: 2: Os dados informados NÃO são válidos.
Dado Quero registrar uma nova despesa do meu veículo
E possuo um token de acesso válido
E Digitei algum valor inválido no cadastro
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 400 na Resposta

Cenário: 3: O veículo informado não pertence ao usuário autenticado.
Dado Quero registrar uma nova despesa de um veículo
E possuo um token de acesso válido
E este veículo não me pertence
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 403 na Resposta

Cenário: 4: O veículo informado não existe
Dado Quero registrar uma nova despesa de um veículo
E possuo um token de acesso válido
E este veículo não foi encontrado no banco de dados
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 400 na Resposta

Cenário: 5: O usuário NÃO está autenticado
Dado Quero registrar uma nova despesa do meu veículo
E não possuo um token de acesso válido
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 401 na Resposta