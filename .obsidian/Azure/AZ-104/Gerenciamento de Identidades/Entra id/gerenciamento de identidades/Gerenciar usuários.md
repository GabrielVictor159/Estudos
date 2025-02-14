
## Exibir usuários
Selecione a aba **Usuários** no grupo **Gerenciar**, isso abrira a aba de **Todos os Usuários**.
![[Pasted image 20250204203045.png]]

Existem 3 tipos de identidades no Entra:
- **Identidades de nuvem**: esses usuários existem apenas no Microsoft Entra ID. São exemplos contas de administrador e usuários que você gerencia por conta própria. Sua origem é o **Microsoft Entra ID** ou o **Diretório externo do Microsoft Entra** se o usuário estiver definido em outra instância do Microsoft Entra, mas precisar acessar os recursos de assinatura controlados por esse diretório. Quando são removidas do diretório primário, essas contas são excluídas.

- **Identidades sincronizadas com o diretório** – esses usuários existem em um Active Directory local. Uma atividade de sincronização que ocorre por meio do **Microsoft Entra Connect** traz esses usuários para o Azure. Sua origem é o **Windows Server AD**.

- **Usuários convidados** – esses usuários existem fora do Azure. São exemplos contas de outros provedores de nuvem e contas da Microsoft, como uma conta do Xbox LIVE. Sua origem é **Usuário convidado**. Esse tipo de conta é útil quando fornecedores externos ou terceirizados precisam acessar seus recursos do Azure. Quando a ajuda deles deixar de ser necessária, você poderá remover a conta e todos os seus acessos.

