Se tratando de dados <strong>não estruturados</strong> o Cosmos DB não faz diferenciação dos dados presentes separando por schemas por exemplo, dois documentos no mesmo conjunto podem ter estruturas completamente diferentes.
![[Pasted image 20240630014936.png]]

Nesse sentido a estrutura padrão de Itens na API NoSL são documentos no formato JSON:
![[Pasted image 20240703051843.png]]

Perceba que todas as propriedades começadas com underline foram adicionadas automaticamente pelo Cosmos DB.

<h4>rid</h4>
É o id da linha.
<h4>ts</h4>
É o carimbo de data e hora.



