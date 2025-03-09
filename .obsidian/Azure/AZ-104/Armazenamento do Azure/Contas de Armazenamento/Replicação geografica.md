O Armazenamento do Azure oferece várias opções de redundância para proteger seus dados contra falhas e desastres. As principais opções são:

1. **Armazenamento com Redundância Local (LRS)**
    
    - **Descrição**: Replica os dados três vezes dentro de um único data center na região primária.
    - **Durabilidade**: 99,999999999% (11 noves) ao ano.
    - **Custo**: Menor custo entre as opções.
    - **Limitações**: Protege contra falhas de unidade e rack, mas não contra desastres no data center.
2. **Armazenamento com Redundância de Zona (ZRS)**
    
    - **Descrição**: Replica os dados de forma síncrona em três zonas de disponibilidade na região primária.
    - **Durabilidade**: 99,9999999999% (12 noves) ao ano.
    - **Benefícios**: Alta disponibilidade e resiliência a falhas de zona.
    - **Recomendações**: Ideal para cargas de trabalho que exigem alta disponibilidade e governança de dados.
3. **Armazenamento com Redundância Geográfica (GRS)**
    
    - **Descrição**: Replica os dados de forma síncrona na região primária e de forma assíncrona para uma região secundária.
    - **Durabilidade**: 99,99999999999999% (16 noves) ao ano.
    - **Benefícios**: Proteção contra desastres regionais.
    - **Limitações**: Acesso aos dados na região secundária somente após failover.
4. **Armazenamento com Redundância de Zona Geográfica (GZRS)**
    
    - **Descrição**: Combina ZRS na região primária com replicação geográfica para uma região secundária.
    - **Durabilidade**: 99,99999999999999% (16 noves) ao ano.
    - **Benefícios**: Alta disponibilidade e proteção contra desastres regionais.
    - **Recomendações**: Ideal para aplicativos que exigem máxima consistência, durabilidade e disponibilidade.


|Nó em um data center indisponível|Data center inteiro indisponível|Interrupção em toda a região|Acesso de leitura durante a interrupção em toda a região|
|---|---|---|---|
|- **LRS**  <br>- **ZRS**  <br>- **GRS**  <br>- **RA-GRS**  <br>- **GZRS**  <br>- **RA-GZRS**|- **ZRS**  <br>- **GRS**  <br>- **RA-GRS**  <br>- **GZRS**  <br>- **RA-GZRS**|- **GRS**  <br>- **RA-GRS**  <br>- **GZRS**  <br>- **RA-GZRS**|- **RA-GRS**  <br>- **RA-GZRS**|
