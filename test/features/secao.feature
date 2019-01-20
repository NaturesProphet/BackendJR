#language: pt
Funcionalidade: Iniciar Seção

Endpoint que define na seção qual é o veículo a ser usado no contexto

Cenário: Usuário apontou uma placa válida de um de seus veículos
Dado Quero apontar qual veículo vou manipular
Quando eu enviar a placa do veículo
Então recebo os dados desse veículo na seção com um código 200 na resposta


Cenário: Usuário apontou uma placa inválida
Dado Quero apontar qual veículo vou manipular
E informei uma placa inválida
Quando eu enviar a placa do veículo
Então recebo uma mensagem de erro e o código 400 na Resposta


Cenário: Usuário apontou uma placa de um veículo que não é dele
Dado Quero apontar qual veículo vou manipular
E informei uma placa que não possuo
Quando eu enviar a placa do veículo
Então recebo uma mensagem de erro e o código 403 na Resposta
