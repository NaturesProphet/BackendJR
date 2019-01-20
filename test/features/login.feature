#language: pt
Funcionalidade: login

Endpoint que autentica o usuário no sistema e armazena o seu objeto na seção


Cenário: Usuário existe
Dado Quero acessar o sistema via login/senha
Quando eu me autenticar
Então recebo os dados do meu perfil na minha seção com um código 200 na resposta


Cenário: Usuário NÃO existe
Dado Quero acessar o sistema via login/senha
E forneci um login inválido
Quando eu me autenticar
Então recebo uma mensagem de erro com um código 401 na resposta


Cenário: Usuário existe MAS a senha está incorreta
Dado Quero acessar o sistema via login/senha
E forneci uma senha incompatível
Quando eu me autenticar
Então recebo uma mensagem de erro com um código 401 na resposta
