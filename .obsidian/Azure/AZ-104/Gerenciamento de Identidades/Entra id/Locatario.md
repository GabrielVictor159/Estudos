Ao contrário do AD DS, o Microsoft Entra ID é multilocatário por design e é implementado especificamente para garantir o isolamento entre suas instâncias de diretório individuais.

Cada locatário do Microsoft Entra recebe o nome de domínio DNS (Sistema de Nomes de Domínio) padrão que consiste em um prefixo exclusivo.

{prefix}. **onmicrosoft.com**

Um locatário serve como um container de usuários, grupos e aplicativos podendo dar suporte a várias assinaturas do Azure.

O Microsoft Entra ID não inclui a classe UO (unidade organizacional), o que significa que você não pode organizar os objetos em uma hierarquia de contêineres personalizados, que é usada com frequência em implantações do AD DS local.

