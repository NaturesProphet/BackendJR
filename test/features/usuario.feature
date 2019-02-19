Feature: Cadastrar novo Usuário
    Endpoint sem autenticação que fornece o registro de novos usuários

    Scenario: Os dados informados são válidos
        Given Quero registrar um novo usuário no sistema
        When eu enviar os dados de registro
        Then recebo uma mensagem de confirmação com um código 201 na Resposta


    Scenario: Os dados informados NÃO são válidos
        Given Quero registrar um novo usuário no sistema
        And enviei dados de registro inválidos ou nulos
        When eu enviar os dados de registro
        Then recebo uma mensagem de erro com um código 400 na Resposta


    Scenario: O Usuário já existe
        Given Quero registrar um novo usuário no sistema
        And enviei um nome de login que já existe no sistema
        When eu enviar os dados de registro
        Then recebo uma mensagem de erro com um código 422 na Resposta