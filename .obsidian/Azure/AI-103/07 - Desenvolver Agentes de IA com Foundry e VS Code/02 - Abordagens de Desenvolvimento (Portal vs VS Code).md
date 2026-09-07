---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - vs-code
  - fluxo-de-trabalho
  - ferramentas
modulo: 07
---

# Abordagens de Desenvolvimento: Portal vs. VS Code

O Microsoft Foundry oferece flexibilidade total no ciclo de vida de desenvolvimento de agentes, permitindo alternar de forma transparente entre uma experiência visual baseada na web (o **Portal do Microsoft Foundry**) e um ambiente de desenvolvimento integrado de código (o **Visual Studio Code** com a extensão oficial).

Ambas as abordagens operam sobre os mesmos recursos subjacentes na nuvem do Azure.

---

## Comparativo: Portal do Foundry vs. Extensão do VS Code

| Critério | Portal do Microsoft Foundry (Web) | Extensão do VS Code (Código/Local) |
| :--- | :--- | :--- |
| **Público-Alvo** | Product managers, analistas de negócios, prototipagem ágil | Desenvolvedores de software, engenheiros de IA e equipes de DevOps |
| **Estilo de Configuração** | Formulários visuais intuitivos e assistentes passo a passo | Designer visual interativo + Edição direta de arquivos declarativos YAML |
| **Controle de Versão** | Histórico básico de versões gerenciado pelo serviço | Controle granular com Git/GitHub no repositório do projeto |
| **Ambiente de Trabalho** | Sempre online conectado ao portal (`https://ai.azure.com`) | Suporte a edição local offline e simulação com playground local |
| **Integração com Código** | Requer copiar identificadores e chaves para código externo | Geração automática de templates de código e integração no workspace |
| **Casos Ideais** | Provas de conceito, validação rápida com stakeholders, demonstrações | Desenvolvimento colaborativo em equipe, automações CI/CD e agentes complexos |

---

## A Extensão do Microsoft Foundry para Visual Studio Code

A extensão oficial unifica o ecossistema do Microsoft Foundry diretamente dentro do editor de código do desenvolvedor.

![[vs-code-agent.png]]

A interface da extensão é organizada em três seções principais na barra lateral:

### 1. Seção Recursos (*Resources*)
Lista todos os ativos conectados ao seu projeto Foundry ativo:
- **Modelos de Implantação (*Deployment models*):** Modelos de linguagem ativos e prontos para uso (ex: GPT-4o, GPT-4.1).
- **Agentes Declarativos (*Declarative agents*):** Agentes baseados em prompt e fluxos de trabalho gerenciados no workspace.
- **Agentes Hospedados (*Hosted agents*):** Contêineres de agentes com código customizado.
- **Conexões (*Connections*):** Vínculos autenticados com fontes de dados e serviços auxiliares (como Azure AI Search ou Bing).
- **Repositórios de Vetores (*Vector stores*):** Índices vetoriais para pesquisa de documentos em RAG.

### 2. Seção Ferramentas (*Tools*)
Disponibiliza ferramentas interativas para o ciclo de desenvolvimento:
- **Catálogo de Modelos (*Model catalog*):** Exploração e implantação de novos modelos de IA.
- **Playground de Modelo (*Model playground*):** Teste isolado de prompts de modelo único.
- **Playgrounds de Agente (*Agent playgrounds*):** Teste interativo do agente com histórico e chamadas de ferramentas (suporta ambiente remoto no Azure e ambiente simulado local).
- **Visualizador Local (*Local viewer*):** Depuração offline e inspeção detalhada de chamadas de ferramentas e mensagens.
- **Implantar Agente Hospedado (*Deploy hosted agent*):** Assistente de empacotamento e publicação de contêineres.

### 3. Seção Ajuda e Comentários (*Help & Feedback*)
Links diretos para a documentação técnica oficial, fóruns de suporte e relatórios de problemas.

---

## Recursos do Azure Necessários

Para criar e executar agentes de IA com o Foundry, é necessário dispor de uma infraestrutura básica provisionada no Azure:

### Recursos Obrigatórios
1. **Recurso de Projeto do Microsoft Foundry:** Workspace central que agrupa os modelos, agentes, índices, conexões e configurações de segurança da sua solução.
2. **Implantações de Modelos (*Model Deployments*):** Ao menos um modelo de linguagem generativa implantado no projeto com capacidade adequada (ex.: `gpt-4o`, `gpt-4.1`).

### Recursos Opcionais (Conforme o Caso de Uso)
- **Azure AI Search:** Obrigatório para cenários de RAG corporativo de grande escala com pesquisa híbrida (palavra-chave + semântica + vetor).
- **Azure Blob Storage:** Armazenamento de documentos, arquivos de log, dados brutos e suporte a BYOS (*Bring Your Own Storage*).
- **Azure Key Vault:** Armazenamento seguro de segredos, chaves de API externas e credenciais de conexão corporativas.
- **Azure Functions:** Para expor lógica de código proprietário em endpoints que podem ser chamados pelo agente como ferramentas personalizadas.

---

## O Fluxo de Trabalho de Desenvolvimento em 8 Etapas

O desenvolvimento profissional de agentes segue um ciclo iterativo bem definido:

```
 1. CONECTAR ──────> 2. CRIAR ──────> 3. CONFIGURAR ──────> 4. ADICIONAR FERRAMENTAS
 (Projeto Foundry)   (Nome/Propósito)  (System Prompt/Params) (Code/File/Bing/MCP)
                                                                    │
 8. INTEGRAR <────── 7. PUBLICAR <────── 6. ITERAR <────── 5. TESTAR
 (App Client/SDK)   (Agent App Endpoint) (Refinar Instruções)  (Playground Multi-turn)
```

1. **Conectar (*Connect*):** Estabelecer autenticação segura no VS Code e apontar para a assinatura e o projeto Foundry pretendido.
2. **Criar (*Create*):** Inicializar o novo agente declarativo, definindo identificador, nome e objetivo de negócio.
3. **Configurar (*Configure*):** Definir as instruções de sistema (*system prompt*), selecionar a implantação do modelo base e calibrar os hiperparâmetros (como temperatura e top_p).
4. **Adicionar Ferramentas (*Add Tools*):** Acoplar os recursos que conferem capacidades práticas ao agente (interpretador Python, pesquisa de arquivo, APIs REST, etc.).
5. **Testar (*Test*):** Interagir no playground integrado, submetendo prompts para validar se o agente raciocina e aciona as ferramentas corretas.
6. **Iterar (*Iterate*):** Analisar saídas indesejadas ou erros, ajustando as instruções de sistema e as restrições comportamentais.
7. **Implantar / Publicar (*Deploy / Publish*):** Gravar a versão estável no projeto ou promovê-la como um *Aplicativo de Agente* dedicado com endpoint de produção.
8. **Integrar (*Integrate*):** Consumir o agente em aplicações web, móveis ou bots de atendimento via SDK ou chamadas HTTP REST.

---

## Pontos que Costumam Confundir

> [!NOTE]
> **Modificação Bidirecional:** Qualquer alteração efetuada e publicada no arquivo YAML via VS Code reflete imediatamente no Portal do Foundry, e vice-versa, pois ambos operam sobre o mesmo registro central no Azure.

> [!TIP]
> **Edição Lado a Lado no VS Code:** No VS Code, você pode abrir dois agentes declarativos em abas divididas (`split editor`) para comparar e sincronizar instruções de sistema, o que é inviável no portal web.

> [!IMPORTANT]
> **Extensão Requer Autenticação do Azure:** A extensão do Microsoft Foundry depende do login ativo via extensão oficial *Azure Account* no VS Code.

---

## Aprofundar na Documentação

- [Explorar abordagens de desenvolvimento no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/develop-ai-agents-azure-vs-code/3-explore-development-approaches)
- [Configurar Visual Studio Code para desenvolvimento de agentes](https://learn.microsoft.com/pt-br/training/modules/develop-ai-agents-azure-vs-code/5-set-up-vs-code)
- Página anterior: [[01 - Conceitos de Agentes e Foundry Agent Service]]
- Próxima página: [[03 - Configuração e Estrutura YAML de Agentes]]
