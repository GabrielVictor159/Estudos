![[Pasted image 20240713041105.png]]

<h1>Forte</h1>
Nessa consistência garantimos que 3 em cada 4 replicações terão a versão mais recente e sempre na ordem correta, essa consistência é mais lenta e tende a ter um throughput menor.

![[Pasted image 20240713142235.png]]

<h1>Desatualização limitada</h1>
Nessa consistência é possível determinar uma quantidade de período aceitável para a desatualização dos itens.
![[Pasted image 20240713142427.png]]

<h1>Sessão</h1>
Nessa consistência estabelecemos uma sessão de usuário em que os dados do usuário nessa sessão estarão sempre atualizados., mesmo que ainda não tenham sido replicados.
![[Pasted image 20240713142739.png]]


<h1>Prefixo Consistente</h1>
Nessa consistência a única garantia que temos é que os dados sempre estarão em ordem mas não há garantias de atualização.

![[Pasted image 20240713142933.png]]

<h1>Eventual</h1>
Nessa consistência não há garantias da ordem dos itens ou sobre as suas atualizações.
![[Pasted image 20240713143115.png]]

