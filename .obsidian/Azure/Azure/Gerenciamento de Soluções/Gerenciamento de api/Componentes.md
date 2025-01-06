
O Gerenciamento de API do Azure é composto por um _gateway de API_, um _plano de gerenciamento_ e um _portal do desenvolvedor_.

- O **gateway de API** é o ponto de extremidade que:
    
    - Aceita chamadas à API e as direciona para o back-end apropriado
    - Verifica chaves de API e outras credenciais apresentadas com solicitações
    - Impõe o uso de cotas e limites de taxa
    - Transforma solicitações e respostas especificadas em instruções de política
    - Armazena em cache as respostas para melhorar a latência de resposta e minimizar a carga nos serviços de back-end
    - Emite logs, métricas e rastreamentos para monitoramento, relatórios e solução de problemas
- O **plano de gerenciamento** é a interface administrativa na qual você configura seu programa de API. Use-o para:
    
    - Provisionar e definir o Gerenciamento de API de configurações de serviço
    - Definir ou importar esquemas de API
    - Empacotar APIs em produtos
    - Políticas de configuração como cotas ou transformações em APIs
    - Obter insights por meio de análises
    - Gerenciar usuários
- O **portal do desenvolvedor** é um site gerado automaticamente e totalmente personalizável com a documentação das suas APIs. Ao usar o portal do desenvolvedor, os desenvolvedores podem:
    
    - Ler a documentação da API
    - Experimentar uma API por meio do console interativo
    - Criar uma conta e fazer uma assinatura para obter chaves de API
    - Acessar a análise do seu próprio uso.
    - Baixar definições de API
    - Gerenciar chaves de API


## Grupos

Os grupos são usados para gerenciar a visibilidade dos produtos para os desenvolvedores. O Gerenciamento de API tem os grupos de sistema imutáveis a seguir:

- **Administradores** – Gerenciam instâncias de serviço de Gerenciamento de API e criam as APIs, operações e produtos que são usados pelos desenvolvedores. Os administradores de assinatura do Azure são membros desse grupo.
- **Desenvolvedores** – usuários autenticados do portal do desenvolvedor que cria aplicativos usando suas APIs. Os desenvolvedores têm acesso ao portal do desenvolvedor e criam aplicativos que chamam as operações de uma API.
- **Convidados** – Usuários do portal do desenvolvedor não autenticados. Eles podem receber certos acessos somente leitura, como a capacidade de exibir APIs, mas não de chamá-las.

Além desses grupos de sistemas, os administradores podem criar grupos personalizados ou usar grupos externos em locatários associados do Microsoft Entra.

