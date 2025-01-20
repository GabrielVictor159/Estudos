A maneira como o Key Vault replica seus dados depende da região específica em que o cofre está.

Para a maioria das regiões do Azure emparelhadas com outra região, o conteúdo do cofre de chaves é replicado tanto na região quanto na região emparelhada.

Para [regiões do Azure não emparelhadas](https://learn.microsoft.com/pt-br/azure/reliability/cross-region-replication-azure#regions-with-availability-zones-and-no-region-pair) e as regiões Sul e Oeste dos EUA 3 do Brasil, o Azure Key Vault utiliza o ZRS (armazenamento redundante de zona) para replicar os seus dados três vezes dentro da região, através de zonas de disponibilidade independentes. Para o Azure Key Vault Premium, duas das três zonas são usadas para replicar as chaves HSM (módulo de segurança de hardware).


