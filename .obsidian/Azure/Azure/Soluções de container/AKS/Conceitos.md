
O AKS é um serviço gerenciado do Kubernetes que simplifica a implantação, o gerenciamento e o escalonamento de aplicativos em contêineres usando o Kubernetes.


<h1>Componentes</h1>
- **Painel de controle**: o painel de controle oferece os principais serviços do Kubernetes e realiza a orquestração das cargas de trabalho dos aplicativos.
- **Nós**: os nós são as máquinas virtuais (VMs) que executam seus aplicativos.
![[Pasted image 20240825172708.png]]

<h1>Componentes Painel de Controle</h1>
<table>
  <thead>
    <tr>
      <th>Componente</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>kube-apiserver</td>
      <td>O servidor de API (kube-apiserver) disponibiliza a API do Kubernetes, permitindo solicitações ao cluster de forma interna e externa.</td>
    </tr>
    <tr>
      <td>etcd</td>
      <td>O etcd é um repositório de chave-valor altamente disponível que ajuda a manter o estado do cluster e da configuração do Kubernetes.</td>
    </tr>
    <tr>
      <td>kube-scheduler</td>
      <td>O agendador (kube-scheduler) auxilia nas decisões de agendamento, identificando novos pods que ainda não têm um nó atribuído e escolhendo um nó para que sejam executados.</td>
    </tr>
    <tr>
      <td>kube-controller-manager</td>
      <td>O gerenciador de controladores (kube-controller-manager) executa processos de controle, como detectar e responder a falhas nos nós.</td>
    </tr>
    <tr>
      <td>cloud-controller-manager</td>
      <td>O gerenciador de controladores da nuvem (cloud-controller-manager) integra a lógica de controle específica para nuvem, executando controladores específicos para o provedor de nuvem.</td>
    </tr>
  </tbody>
</table>


<h1>Componentes Nós</h1>
<table>
  <thead>
    <tr>
      <th>Componente</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>kubelet</td>
      <td>O kubelet garante que os contêineres estejam em execução dentro de um pod.</td>
    </tr>
    <tr>
      <td>kube-proxy</td>
      <td>O kube-proxy atua como um proxy de rede que mantém as regras de rede nos nós.</td>
    </tr>
    <tr>
      <td>Tempo de execução de contêiner</td>
      <td>O runtime de contêiner administra a execução e o ciclo de vida dos contêineres.</td>
    </tr>
  </tbody>
</table>

![[Pasted image 20240825173244.png]]
