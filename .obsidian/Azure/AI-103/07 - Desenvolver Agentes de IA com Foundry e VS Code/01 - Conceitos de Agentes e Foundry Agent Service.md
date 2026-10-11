---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - agentes
  - agent-service
  - arquitetura
  - seguranca
modulo: 07
---

# Conceitos de Agentes e Foundry Agent Service

Um **Agente de IA** é um serviço de software autônomo que emprega IA generativa para compreender o contexto, tomar decisões e executar ações direcionadas a metas específicas em nome de usuários ou outros sistemas. 

Ao contrário de aplicações tradicionais baseadas em fluxos rígidos de regras condicionais (`if/else`) ou chatbots puramente conversacionais que apenas geram texto, os agentes combinam o raciocínio de grandes modelos de linguagem (LLMs) com **ferramentas externas** para agir no mundo real.

![[m07-arquitetura-agente-service.jpg]]

---

## Por que os Agentes de IA são Transformadores?

| Benefício | Descrição |
| :--- | :--- |
| **Automação de tarefas de rotina** | Libera colaboradores humanos de processos repetitivos para trabalhos criativos e estratégicos. |
| **Tomada de decisão aprimorada** | Processa dados analíticos em tempo real em múltiplos sistemas para orientar decisões complexas. |
| **Escalabilidade operacional** | Atende milhares de usuários simultaneamente sem aumento proporcional de custos ou equipe. |
| **Disponibilidade contínua** | Opera ininterruptamente 24 horas por dia, 7 dias por semana. |

### Casos de Uso Mais Comuns

- **Produtividade pessoal:** Agendamento inteligente, triagem de caixas de correio e síntese de reuniões.
- **Pesquisa e análise:** Consulta e agregação de documentos corporativos, busca na web e geração de relatórios de tendências.
- **Vendas e marketing:** Qualificação automática de leads, recomendação hiperpersonalizada de produtos e elaboração de propostas comerciais.
- **Atendimento ao cliente:** Solução autônoma de chamados de suporte técnico, consultas de saldo/pedidos e cancelamentos com triagem contextual.
- **Desenvolvimento de software:** Geração e revisão de código, automação de testes unitários e depuração assistida.

---

## Tipos de Agentes no Microsoft Foundry

O Microsoft Foundry classifica os agentes em duas categorias estruturais:

```
                          Tipos de Agentes no Foundry
                                      |
         ┌────────────────────────────┴────────────────────────────┐
         |                                                         |
  1. AGENTES DECLARATIVOS                                   2. AGENTES HOSPEDADOS
  (Configurados sem infraestrutura)                         (Código personalizado em containers)
         |
    ┌────┴──────────────────────────────┐
    |                                   |
  Baseados em Prompt (Prompt-based)   De Fluxo de Trabalho (Workflow Agents)
  - Agente único                      - Múltiplos agentes colaborativos
  - Instruções + Modelo + Ferramentas - Orquestração multi-agente via YAML
```

### 1. Agentes Declarativos (*Declarative Agents*)
Definidos inteiramente por meio de metadados e arquivos de configuração declarativa, sem a necessidade de provisionar servidores ou empacotar contêineres:
- **Baseados em Prompt (*Prompt-based*):** Agente único configurado por instruções de sistema, seleção de modelo, hiperparâmetros e ferramentas anexadas. É o formato padrão e mais comum.
- **De Fluxo de Trabalho (*Workflow Agents*):** Orquestrações de múltiplos agentes especializados que cooperam para resolver fluxos complexos de negócio, definidos de forma declarativa em YAML.

### 2. Agentes Hospedados (*Hosted Agents*)
Agentes conteinerizados criados diretamente com linguagens de programação (como Python ou C#). O desenvolvedor tem controle total sobre a lógica, o runtime e as bibliotecas, enquanto o Microsoft Foundry gerencia a orquestração e a hospedagem dos contêineres na nuvem.

---

## Principais Recursos do Microsoft Foundry Agent Service

O **Microsoft Foundry Agent Service** é uma oferta totalmente gerenciada para desenvolvimento, teste e publicação de agentes corporativos.

1. **Invocação Automática de Ferramentas (*Automatic Tool Calling*):** O serviço orquestra todo o fluxo: quando o modelo detecta a necessidade de uma ferramenta, ele gera a chamada, o serviço executa a ferramenta na infraestrutura segura e reinjeta o retorno no contexto do modelo para formular a resposta final ao usuário.
2. **Gerenciamento Seguro de Estado:** A persistência de turnos e contexto conversacional é gerenciada nativamente pela **API de Respostas (*Responses API*)**, dispensando bancos de dados externos para gerenciar o histórico de chat da sessão.
3. **Catálogo Unificado de Ferramentas:** Acesso imediato a interpretador Python, pesquisa em arquivos vetoriais, Bing Grounding, Azure AI Search, APIs corporativas via OpenAPI e servidores MCP.
4. **Segurança Corporativa:** Integração com o *Microsoft Entra ID*, controle de acesso baseado em função (RBAC) e barreiras automáticas de proteção contra conteúdo abusivo via *Azure AI Content Safety* e *Prompt Shields*.
5. **Armazenamento Flexível:** Permite usar o armazenamento gerenciado da plataforma ou integrar o seu próprio armazenamento corporativo (*Bring Your Own Storage - BYOS*) com Azure Blob Storage.
6. **Observabilidade e Rastreabilidade (*Tracing*):** Registro granular de cada turno, chamada de ferramenta, latência e custo em tokens para auditoria e melhoria contínua.

---

## Matriz de Riscos de Segurança e Estratégias de Mitigação

A autonomia conferida aos agentes exige governança rigorosa. A tabela abaixo sintetiza a matriz oficial de segurança cobrada no exame:

| Área de Risco | Descrição do Risco | Exemplo Prático | Estratégia de Mitigação |
| :--- | :--- | :--- | :--- |
| **Vazamento de dados e privacidade** | Exposição inadvertida de informações confidenciais em respostas geradas. | Agente resume relatórios internos e expõe salários para clientes externos. | Políticas estritas de RBAC, isolamento de dados e filtros de saída. |
| **Injeção de comandos (*Prompt Injection*)** | Entradas manipuladas por usuários maliciosos que sobrescrevem as regras do sistema. | Mensagem de entrada com instrução oculta que força o agente a revelar segredos. | Camadas de validação e filtros de prompt (*Prompt Shields*) na entrada e saída. |
| **Acesso não autorizado e escalonamento** | Controles fracos permitindo que o agente execute ações além do seu escopo. | Agente com credencial de leitura e escrita executa exclusão em massa no CRM. | Princípio do menor privilégio (*Least Privilege*) e autenticação granular. |
| **Envenenamento de dados (*Data Poisoning*)** | Modificação de dados de contexto ou treinamento que corrompem as decisões do agente. | Documento corporativo adulterado instrui o suporte a orientar procedimentos perigosos. | Validação, versionamento e auditoria contínua das fontes de dados. |
| **Vulnerabilidades de cadeia de suprimentos** | Falhas em APIs, bibliotecas ou plugins de terceiros consumidos pelo agente. | Plugin externo comprometido executa código arbitrário no ambiente do agente. | Auditoria de dependências, uso de sandboxes e aprovação prévia de ferramentas. |
| **Dependência excessiva de autonomia** | Ações críticas executadas automaticamente sem supervisão humana. | Agente financeiro emite ordens de pagamento incorretas sem confirmação prévia. | Inclusão de aprovação humana (*Human-in-the-loop*) para operações sensíveis. |
| **Auditabilidade e logs inadequados** | Incapacidade de rastrear o histórico de decisões e execuções de ferramentas. | Impossibilidade de investigar um incidente de vazamento de dados ocorrido há dias. | Habilitação de telemetria completa, auditoria centralizada e tracing de chamadas. |
| **Inversão de modelo e vazamento de saída** | Inferência de dados privados do treinamento por meio de consultas repetidas e engenharia reversa. | Usuário extrai trechos de dados confidenciais usados no ajuste fino (*fine-tuning*). | Limitação de taxa de requisições (*rate limiting*) e técnicas de privacidade diferencial. |

---

## Pontos que Costumam Confundir

> [!NOTE]
> **Agente de IA ≠ Modelo de Linguagem (LLM):** O LLM é o "cérebro" de processamento textual; o Agente é o "sistema completo" que envolve o modelo com memória de conversação, regras de sistema, permissões de segurança e ferramentas executáveis.

> [!WARNING]
> **Acesso Irrestrito Nunca é Boa Prática:** Questões de prova frequentemente colocam como opção "conceder acesso irrestrito aos dados corporativos para maximizar a precisão do agente". Essa é **sempre a alternativa errada**! A regra é menor privilégio (*least privilege*) e controle via RBAC.

> [!IMPORTANT]
> **Chamada Automática de Ferramentas:** No Foundry Agent Service, o agente decide quando acionar a ferramenta e a executa automaticamente na infraestrutura segura do Azure, ao contrário da API de Chat Completions tradicional, onde o aplicativo cliente precisava executar o código e devolver os resultados manualmente.

---

## Aprofundar na Documentação

- [Entender os agentes de IA e o Serviço do Microsoft Foundry Agent](https://learn.microsoft.com/pt-br/training/modules/develop-ai-agents-azure-vs-code/2-understand-ai-agents-foundry)
- Voltar ao [[AI-103/07 - Desenvolver Agentes de IA com Foundry e VS Code/00 - Índice do Módulo 07]]
- Próxima página: [[02 - Abordagens de Desenvolvimento (Portal vs VS Code)]]
