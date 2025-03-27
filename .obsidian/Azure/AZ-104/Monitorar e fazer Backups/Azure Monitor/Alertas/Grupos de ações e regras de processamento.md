O Azure Monitor, o Integridade do Serviço do Azure e o Assistente do Azure usam _grupos de ação_ para notificar os usuários sobre o alerta e para executar uma ação quando um alerta é disparado.

O Azure Monitor pode executar as seguintes ações:

- Enviar um email
- Enviar uma mensagem de serviço de mensagens curtas (SMS)
- Criar uma notificação por push do aplicativo do Azure
- Fazer uma chamada de voz para um número
- Chamar uma função do Azure
- Disparar um aplicativo lógico
- Enviar uma notificação para um webhook
- Crie um tíquete de gerenciamento de serviços de TI (ITSM)
- Use um runbook (para reiniciar uma máquina virtual (VM) ou aumentar ou diminuir a escala de uma VM)

Depois de criar um grupo de ação, você pode reutilizá-lo sempre que quiser.

## Regras de processamento de alerta
Use regras de processamento de alerta para substituir o comportamento normal de um alerta disparado adicionando ou suprimindo um grupo de ações.

Você pode controlar quando a regra de processamento de alerta se aplica. Por padrão, a regra está sempre ativa.

![[Pasted image 20250326233318.png]]
