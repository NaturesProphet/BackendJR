#language: pt
Funcionalidade: Cadastrar novos abastecimentos para um veículo
Endpoint que cadastra novos abastecimentos para o veículo na seção


Cenário: 1: O usuário registra um abastecimento.
Dado Quero registrar um novo abastecimento do meu veículo
E estou autenticado na seção
E meu veículo está na seção
E os dados que informei são válidos
E quero gerar estatísticas de consumo do ultimo abastecimento
Quando eu enviar os dados de registro
Então recebo um log com a descrição do que foi feito, mais um código 200 na Resposta


Cenário: 2: O usuário registra um abastecimento.
Dado Quero registrar um novo abastecimento do meu veículo
E estou autenticado na seção
E meu veículo está na seção
E os dados que informei são válidos
E NÃO quero gerar estatísticas de consumo do ultimo abastecimento
Quando eu enviar os dados de registro
Então recebo uma mensagem de confirmação com um código 200 na Resposta


Cenário: 3: O usuário TENTA registrar um abastecimento.
Dado Quero registrar um novo abastecimento do meu veículo
E estou autenticado na seção
E meu veículo está na seção
E os dados que informei NÃO são válidos
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro, com um código 400 na Resposta


Cenário: 4: O usuário TENTA registrar um abastecimento.
Dado Quero registrar um novo abastecimento do meu veículo
E estou autenticado na seção
E meu veículo NÃO está na seção
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro, com um código 400 na Resposta


Cenário: 5: O usuário TENTA registrar um abastecimento.
Dado Quero registrar um novo abastecimento do meu veículo
E NÃO estou autenticado na seção
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro, com um código 401 na Resposta


Cenário: 6: O usuário TENTA registrar um abastecimento.
Dado Quero registrar um novo abastecimento de um veículo
E estou autenticado na seção
E Este veículo NÃO me pertence
Quando eu enviar os dados de registro
Então recebo uma mensagem de erro, com um código 403 na Resposta


