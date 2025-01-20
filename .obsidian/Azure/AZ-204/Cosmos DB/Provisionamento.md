
<h1>RU</h1>

Uma RU ou <strong>Unidade de Solicitação</strong> é uma unidade de computação e é a medida que o Cosmos DB utiliza para calcular o Custo.

O Azure cosmos DB estabelece que <strong> 1 RU = 1 ponto de leitura de 1kb </strong>



<h3>O Cosmos DB oferece dois modelos: <strong> taxa de transferência provisionado e modo sem servidor </strong></h3>

<h1>Taxa de transferência provisionada</h1>
Criamos um limite de transferências mensais e esse será o valor cobrado independente se atingimos ou não o valor.

<h1>Modo sem servidor</h1>
Nesse padrão o custo é variável a depender dos RU's usados.


<H1>Hierarquia de recursos</H1>
![[Pasted image 20240630095644.png]]


<h2>Container</h2>
Um contêiner do Azure Cosmos DB é a unidade de escalabilidade para a taxa de transferência provisionada e para o armazenamento.
Os itens que você adiciona ao contêiner são agrupados automaticamente em partições lógicas, que são distribuídas entre partições físicas, com base na chave de partição. A taxa de transferência em um contêiner é distribuída uniformemente entre as partições físicas.

<h3>Modos de taxa de transferência provisionadas</h3>
- **Modo de taxa de transferência provisionada dedicada**: a taxa de transferência provisionada em um contêiner é reservada exclusivamente para esse contêiner e tem o suporte dos SLAs.
- **Modo de taxa de transferência provisionada compartilhada**: estes contêineres compartilham a taxa de transferência provisionada com outros contêineres no mesmo banco de dados.
