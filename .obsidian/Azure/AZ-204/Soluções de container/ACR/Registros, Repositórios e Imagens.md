![[Pasted image 20240817072105.png]]

<h1>Registro</h1>
Um registro de _contêiner_ é um serviço que armazena e distribui imagens de contêiner e artefatos relacionados. O Docker Hub é um exemplo de um registro de contêiner público que serve como um catálogo geral de imagens de contêiner do Docker.

<h1>Repositório</h1>
Um _repositório_ é uma coleção de imagens de contêiner ou de outros artefatos em um registro que têm o mesmo nome, mas marcas diferentes. Por exemplo, as três imagens a seguir estão no repositório `acr-helloworld`:

- _acr-helloworld:latest_
- _acr-helloworld:v1_
- _acr-helloworld:v2_

Também podem incluir nomes de repositório [namespaces](https://learn.microsoft.com/pt-br/azure/container-registry/container-registry-best-practices#repository-namespaces). Os namespaces permitem que você identifique os repositórios relacionados e a propriedade do artefato em sua organização usando nomes delimitados por barra. No entanto, o registro gerencia todos os repositórios de maneira independente, e não como uma hierarquia. Por exemplo:

- _marketing/campaign10-18/web:v2_
- _marketing/campaign10-18/api:v3_
- _marketing/campaign10-18/email-sender:v2_
- _product-returns/web-submission:20180604_
- _product-returns/legacy-integrator:20180715_

<h1>Artefato</h1>
Uma imagem de contêiner ou de outro artefato dentro de um registro é associada a uma ou mais marcas, possui uma ou mais camadas e é identificada por um manifesto.

<h1>Marcas</h1>
Marcas são as versões das imagens.

<h1>Manifesto</h1>
Cada imagem de contêiner ou artefato enviados para um registro de contêiner é associada a um _manifesto_. O manifesto, gerado pelo registro quando o conteúdo é enviado.

```JSON
{
  "schemaVersion": 2,
  "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
  "config": {
    "mediaType": "application/vnd.docker.container.image.v1+json",
    "size": 1510,
    "digest": "sha256:fbf289e99eb9bca977dae136fbe2a82b6b7d4c372474c9235adc1741675f587e"
  },
  "layers": [
    {
      "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
      "size": 977,
      "digest": "sha256:2c930d010525941c1d56ec53b97bd057a67ae1865eebf042686d2a2d18271ced"
    }
  ]
}
```

```bash
az acr manifest list-metadata --name <repositoryName> --registry <acrName>
```
