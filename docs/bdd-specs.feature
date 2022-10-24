Feature: Jogo

 Como um usuário anonimo
Quero que o sistema me leve da pagina inicial para o jogo
 Para eu poder dar inicio ao jogo

Scenario: Inicio de jogo

  Dado que o usuário não iniciou um jogo
Quando o usuário clicar no botão `iniciar`
 Então o sistema deve iniciar o jogo

  Dado que o usuário iniciou o jogo
 Então o sistema deve adicionar `69` jogadores aleatórios

  Dado que o usuário iniciou o jogo
 Então o sistema deve exibir fundo do prêmio com o valor de `$0.00`

  Dado que o usuário iniciou o jogo
 Então o sistema deve exibir o round como `1`

  Dado que o usuário iniciou o jogo
 Então o sistema deve exibir a lista de jogadores remanescentes com `69 nomes`

  Dado que o usuário iniciou o jogo
 Então o sistema deve exibir a lista de jogadores eliminados vazia

  Dado que o usuário iniciou o jogo
 Então o sistema deve exibir os votos para o fim do jogo no total de `0`


Scenario: Fim de Round

  Dado que o round chegou ao fim
 Então o sistema deve exibir uma lista de jogadores menor que `69`

  Dado que o round chegou ao fim
 Então o sistema deve exibir round como `2`

  Dado que o round chegou ao fim
 Então o sistema deve exibir fundo do prêmio com o valor maior que `$0.00`

  Dado que o round chegou ao fim
 Então o sistema deve exibir os votos para o fim do jogo no total maior que `0`

  Dado que o round chegou ao fim
 Então o sistema deve exibir a lista de jogadores remanescentes com menos que `69 nomes`

  Dado que o round chegou ao fim
 Então o sistema deve exibir a lista de jogadores eliminados com mais que `1` nome

  Dado que o round chegou ao fim
     E a lista de votos para o fim do jogo é maior ou igual a `50%` da lista de remanescentes
 Então o sistema deve finalizar o jogo

Scenario: Fim do jogo

  Dado que o jogo chegou ao fim
 Então o sistema deve adicionar `69` jogadores aleatórios

  Dado que o jogo chegou ao fim
 Então o sistema deve exibir fundo do prêmio com o valor maior que `$0.00`

  Dado que o jogo chegou ao fim
 Então o sistema deve exibir o round maior que `1`

  Dado que o jogo chegou ao fim
 Então o sistema deve exibir a lista de jogadores remanescentes com menos que `69` nomes

  Dado que o jogo chegou ao fim
 Então o sistema deve exibir a lista de jogadores eliminados com mais que `1` nome

  Dado que o jogo chegou ao fim
 Então o sistema deve exibir os votos para o fim do jogo no total igual ou maior que `50%` do numero de jogadores remanescentes

  Dado que o jogo chegou ao fim
 Então o sistema deve exibir o valor total ganho por cada jogar remanescente