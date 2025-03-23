Existem 3 tipos de escalonamento no serviço de aplicativo:

<ul>
<li><strong>Manual Scale: </strong>Basicamente escalonamos baseados em um numero de instâncias.</li>
<li><strong>Autoscale: </strong> Deve-se definir regras que controlaram o escalonamento.</li>
<li><strong>Dimensionamento Automático: </strong>O Azure gerencia o escalonamento.</li>
</ul>
<h1>Suporte de escalonamento</h1>
<table>
  <tr>
    <th>Característica</th>
    <th>Manual</th>
    <th>Autoescala</th>
    <th>Dimensionamento automático</th>
  </tr>
  <tr>
    <td>Tipos de preço disponíveis</td>
    <td>Básico e superior</td>
    <td>Standard e superior</td>
    <td>Tipos de preços Premium V2 (P1V2, P2V2, P3V2) e Premium V3 (P0V3, P1V3, P2V3, P3V3, P1MV3, P2MV3, P3MV3, P4MV3, P5MV3)</td>
  </tr>
  <tr>
    <td>Dimensionamento baseado em regras</td>
    <td>Não</td>
    <td>Sim</td>
    <td>Não, a plataforma gerencia a expansão e se baseia no tráfego HTTP.</td>
  </tr>
  <tr>
    <td>Dimensionamento baseado em agendamento</td>
    <td>Não</td>
    <td>Sim</td>
    <td>Não</td>
  </tr>
  <tr>
    <td>Instâncias sempre prontas</td>
    <td>Não, seu aplicativo web é executado no número de instâncias dimensionadas manualmente.</td>
    <td>Não, o seu aplicativo Web é executado em outras instâncias disponíveis durante a operação de expansão, com base no limite definido para regras de dimensionamento automático.</td>
    <td>Sim (mínimo de 1)</td>
  </tr>
  <tr>
    <td>Instâncias pré-aquecidas</td>
    <td>Não</td>
    <td>Não</td>
    <td>Sim (padrão de 1)</td>
  </tr>
  <tr>
    <td>Máximo por aplicativo</td>
    <td>Não</td>
    <td>Não</td>
    <td>Sim</td>
  </tr>
</table>




<h1>Manual Scale</h1>
![[Pasted image 20240722043118.png]]


<h1>Autoscale</h1>
![[Pasted image 20240722043218.png]]

![[Pasted image 20240722043307.png]]

<h1>Escalonamento automatico</h1>
![[Pasted image 20240722043413.png]]
	