O Domain Services é uma solução para a migração de serviços de autenticação do AD local que implementam politicas de grupo e desejam migrar esses serviços para o Azure, a solução de Domain Services que atua na camada P1 ou P2 fornece serviços de domínio, como gerenciamento de politica de grupo, ingresso no domínio e autenticação Kerberos.

![[Pasted image 20250131224314.png]]

O Microsoft Entra Domain Services fornece vários benefícios para as organizações, como:

- Os administradores não precisam gerenciar, atualizar e monitorar controladores de domínio.
- Os administradores não precisam implantar e gerenciar a replicação do Active Directory.
- Não é necessário ter administradores de domínio ou grupos de administradores de empresa para domínios que o Microsoft Entra ID gerencia.

Se optar por implementar Microsoft Entra Domain Services, você precisará estar ciente das limitações atuais do serviço. Estão incluídos:

- Há suporte apenas para o objeto do Active Directory do computador de base.
- É possível estender o esquema para o domínio do Microsoft Entra Domain Services.
- A estrutura da UO (unidade organizacional) é simples e não há suporte para UOs aninhadas no momento.
- Há um GPO (objeto Política de Grupo) interno e ele existe para contas de computador e usuário.
- Não é possível direcionar UOs com GPOs internos. Além disso, você não pode usar filtros de Instrumentação de Gerenciamento do Windows, nem filtragem de grupo de segurança.