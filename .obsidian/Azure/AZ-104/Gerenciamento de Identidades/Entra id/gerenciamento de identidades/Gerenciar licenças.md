
Serviços de nuvem pagos da Microsoft exigem licenças, essas licenças são atribuídas aos usuários. O ID do Microsoft Entra é a infraestrutura que oferece gerenciamento de identidades.

Podemos trabalhar no nível de usuário individual ou podemos trabalhar com licenças a nível de grupos.


**Para usar o gerenciamento de licenças a nível de grupo é necessário o plano Premium P1 ou superior**

É necessário ter o numero de licenças de usuários suficiente a quantidade de pessoas no grupo.

O Microsoft Entra ID gerencia automaticamente as licenças conforme os usuários são adicionados ou removidos do grupo.

Alguns serviços da Microsoft não estão disponíveis em todos os locais. Antes de atribuir uma licença a um usuário, o administrador deve especificar o local de uso no Perfil do Usuário.

Para a atribuição de licenças de grupo, qualquer usuário sem um local de uso especificado herdará o local do diretório.

## Atribuir um licenças a um grupo 

1. Navegue até a página Identidade - Grupos do Centro de administração Microsoft Entra.
    
2. Na navegação à esquerda, em **Grupos**.
    
3. Selecione um dos grupos disponíveis. Por exemplo, Marketing.
    
4. No painel de navegação esquerdo, em **Gerenciar**, selecione **Licenças**.
    
5. Examine as atribuições atuais e, no menu, selecione **+ Atribuições**.

![[Pasted image 20250218022158.png]]


## Resolvendo problemas de atribuições de licenças nos usuários
Quando usamos o terminal para setar uma licença a um usuário quando temos erro ele é automaticamente mostrado, mas quando falamos de atribuição a nível de grupo, cada usuário tem um status próprio da atribuição que não é mostrado automaticamente.

### Para encontrar usuários em um estado de erro em um grupo

1. Abra o grupo em sua página de visão geral e selecione **Licenças**. Uma notificação será exibida se houver usuários em um estado de erro.
![[Pasted image 20250218022607.png]]

2. Selecione a notificação para abrir uma lista de todos os usuários afetados. Você pode selecionar cada usuário individualmente para ver mais detalhes.
![[Pasted image 20250218022642.png]]

   1. Para encontrar todos os grupos que contenham pelo menos um erro, no menu **Microsoft Entra - Identidade - Cobrança** selecione **Licenças** e, em seguida, **Visão Geral**. Uma caixa de informações é exibida quando grupos exigem sua atenção.
![[Pasted image 20250218022742.png]]

Para uma lista de problemas e como resolve-los segue o link: https://learn.microsoft.com/pt-br/training/modules/create-configure-manage-identities/9-exercise-change-group-license-assignments
