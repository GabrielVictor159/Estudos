## Escopo da distribuição da SSPR

Há três configurações para a propriedade **Redefinição de senha por autoatendimento habilitada**:

- **Nenhum**: Nenhum usuário na organização do Microsoft Entra pode usar o SSPR. Esse valor é o padrão.
- **Selecionado**: somente os membros do grupo de segurança especificado podem usar a SSPR. Você pode usar essa opção para habilitar o SSPR para um grupo de usuários de destino, que pode testá-lo e verificar se funciona conforme esperado. Quando estiver pronto para distribuir em grande escala, defina a propriedade como **Habilitada** para que todos os usuários tenham acesso à SSPR.
- **Todos**: Todos os usuários na organização do Microsoft Entra podem usar o SSPR.

## Configurar a SSPR

Estas são as etapas de alto nível para configurar o SSPR:

1. Vá para o [portal do Azure](https://portal.azure.com/), depois para **Microsoft Entra ID**>**Gerenciar**>**Redefinir senha**.
    
2. **Propriedades**:
    - Habilite a SSPR.
    - Você pode habilitá-la para todos os usuários na organização do Microsoft Entra ou para usuários selecionados.
    - Para habilitar para usuários selecionados, você precisa especificar o grupo de segurança. Os membros desse grupo podem usar a SSPR.
    ![[Pasted image 20250222112502.png]]
    
3. **Métodos de autenticação**:
	- Escolha se deseja exigir um ou dois métodos de autenticação.
	- Escolha os métodos de autenticação que os usuários podem usar.
	![[Pasted image 20250222112734.png]]
	

4. **Registro**:
	- Especifique se os usuários precisarão se registrar na SSPR na próxima vez em que se conectarem.
	- Especifique com que frequência os usuários precisam reconfirmar as próprias informações de autenticação.
	![[Pasted image 20250222112801.png]]
	

5. **Notificações**: Escolha se deseja notificar os usuários e os administradores sobre redefinições de senha.
	![[Pasted image 20250222112909.png]]

6. **Personalização**: Forneça um endereço de email ou uma URL de página da Web em que os usuários podem obter ajuda.
	![[Pasted image 20250222112946.png]]
