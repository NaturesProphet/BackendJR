#language: pt
Funcionalidade: Cadastrar novas manutenções de um veículo
Endpoint que cadastra novas manutenções para o veículo na seção

Cenário: Os dados informados são válidos, o usuário está autenticado e o veículo está na seção.
Dado Quero registrar uma nova manutenção do meu veículo
Quando eu enviar os dados de registro
Então recebo uma mensagem de confirmação com um código 200 na Resposta


Cenário: Os dados informados são válidos, o usuário está autenticado mas o veículo não está na seção.
Dado Quero registrar uma nova manutenção do meu veículo
E ainda não inicializei a seção com um veículo
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 400 na Resposta

Cenário: O usuário está autenticado na seção mas o veículo informado não pertence a ele.
Dado Quero registrar uma nova manutenção para um veículo
E este veículo não me pertence
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 403 na Resposta


Cenário: O usuário NÃO está autenticado na seção
Dado Quero registrar uma nova manutenção do meu veículo
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro com um código 401 na Resposta
