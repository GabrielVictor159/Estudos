Uma das funções fornecidas pelo Microsoft Entra é a funcionalidade de Logon Unico, essa funcionalidade implica em um desafio técnico de suporte entre plataformas, principalmente em cenários BYOD (Traga seu próprio dispositivo).

Para proteger os ativos da organização, a equipe de TI precisa primeiro gerenciar as identidades dos dispositivos.


## Dispositivos registrados no Microsoft Entra
A meta dos dispositivos registrados do Microsoft Entra é fornecer suporte para cenários BYOD ou de dispositivos móveis aos seus usuários.

|**Registrado no Microsoft Entra**|**Descrição**|
|---|---|
|Definição|Registrado no Microsoft Entra ID sem exigir que a conta da organização se conecte ao dispositivo|
|Público principal|Aplicável ao BYOD (traga seu próprio dispositivo) e dispositivos móveis|
|Propriedade do dispositivo|Usuário ou organização|
|Sistemas operacionais|Windows 10, Windows 11, iOS, Android, and macOS|
|Opções de entrada do dispositivo|Credenciais locais do usuário final, Senha, Windows Hello, PIN por Biometria|
|Gerenciamento de dispositivo|Gerenciamento de dispositivo móvel (exemplo: Microsoft Intune)|
|Principais recursos|SSO para recursos de nuvem, Acesso Condicional|

![[Pasted image 20250204223645.png]]

Os dispositivos registrados no Microsoft Entra são conectados usando uma conta local como uma conta Microsoft em um dispositivo Windows 10, mas também têm uma conta do Microsoft Entra anexada para acesso a recursos organizacionais.


Você pode configurar os dispositivos ingressados do Microsoft Entra em todos os dispositivos Windows 10, com exceção do Windows 10 Home.

A meta dos dispositivos adicionados ao Microsoft Entra é simplificar:

- As implantações de dispositivos Windows que pertencem à organização
- O acesso a aplicativos e recursos organizacionais de qualquer dispositivo Windows
- Gerenciamento baseado em nuvem de dispositivos empresariais
- Os usuários entram em seus dispositivos com as respectivas contas corporativas ou de estudante do Microsoft Entra ID ou do Active Directory.


## Dispositivos ingressados no Microsoft Entra híbrido
Se o seu ambiente tiver um volume de memória do AD local e você também quiser se beneficiar das funcionalidades fornecidas pelo Microsoft Entra ID, poderá implementar dispositivos ingressados no Microsoft Entra híbrido. Esses dispositivos são dispositivos que estão ingressados no Active Directory local e registrados no seu diretório do Microsoft Entra.

### Cenários para junção híbrida

Use dispositivos ingressados no Microsoft Entra híbrido se:

- Você tem aplicativos Win32 implantados nesses dispositivos que dependem da autenticação de computador do Active Directory.
- Você deseja continuar a usar Política de Grupo para gerenciar a configuração do dispositivo.
- Você deseja continuar a usar soluções de geração de imagens existentes para configurar e implantar dispositivos.
- Você precisa dar suporte a dispositivos Windows 7 e 8.1 de nível inferior, além do Windows 10.

## Write-back de dispositivo

Em uma configuração do Microsoft Entra ID baseada em nuvem, os dispositivos são registrados apenas no Microsoft Entra ID. Seu AD local não tem visibilidade sobre os dispositivos.

O write-back de dispositivos ajuda você a manter um controle dos dispositivos registrados no Microsoft Entra ID no AD. Você terá uma cópia dos objetos do dispositivo no contêiner "Dispositivos Registrados".

