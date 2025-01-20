O Cache do Azure para Redis possui uma configuração de TTL que elimina as chaves com o tempo.
- As expirações podem ser definidas usando a precisão de segundos ou milissegundos.
- A resolução de tempo de expiração é sempre de 1 milissegundo.
- As informações sobre as expirações são replicadas e persistidas no disco e o tempo passa virtualmente enquanto seu servidor Redis permanece parado (isso significa que o Redis salva a data na qual uma chave expirará).
