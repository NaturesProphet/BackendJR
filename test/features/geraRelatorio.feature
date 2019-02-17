#language: pt
Funcionalidade: Gerar o relatório de custos
Endpoint que gera um relatório de custos detalhado do veículo


Cenário: 1: O usuário requer o relatório de custos
Dado Quero obter um relatório de custos detalhado do meu veículo
E estou autenticado na seção
E meu veículo está na seção
Quando eu enviar a requisição
Então recebo um objeto JSON contendo dados detalhados dos custos do veículo


Cenário: 2: O usuário TENTA requerer o relatório de custos
Dado Quero obter um relatório de custos detalhado do meu veículo
E estou autenticado na seção
E meu veículo NÃO está na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 400 na resposta


Cenário: 3: O usuário TENTA requerer o relatório de custos
Dado Quero obter um relatório de custos detalhado do meu veículo
E NÃO estou autenticado na seção
Quando eu enviar a requisição
Então recebo uma mensagem de erro com o código 401 na resposta


