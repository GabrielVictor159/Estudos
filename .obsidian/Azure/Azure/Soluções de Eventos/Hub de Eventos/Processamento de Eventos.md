No .NET utilizamos o EventProcessorClient para processar os eventos, ele é um cliente auto configurado para cenários de balanceamento de cargas, nesse cenário cada processador de eventos recebe um ID 
único, dessa forma cada processador se comunica com o repositório de ponto de verificação para atualizar o seu status.

## Ponto de verificação
_Pontos de verificação_ é um processo pelo qual um processador de eventos marca ou confirma a posição do último evento processado com êxito em uma partição, dessa forma se um processador se desconectar da partição, poderá retornar de onde parou.

Na pratica o ponto de verificação utiliza o deslocamento do evento e o número da sequencia do evento para registrar o ultimo evento processado.


## Processamento de fluxo sem código com o Azure Stream Analytics
Existe uma ferramenta que possibilita criar um processador de eventos sem códigos usando apenas a interface gráfica do portal do Azure.

![[Pasted image 20241230022754.png]]

![[Pasted image 20241230022819.png]]
![[Pasted image 20241230022839.png]]
