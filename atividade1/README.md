Claro, agora vou ajustar a parte das funções e adicionar instruções de como rodar o projeto, explicando as lógicas utilizadas nas verificações. Veja a versão atualizada abaixo:

---

# Projeto de Análise de Grafos

Este projeto tem como objetivo fornecer uma interface interativa para a análise de grafos, permitindo a inserção de arestas e a verificação de várias propriedades do grafo, como ciclos, eulerianismo, completude, bipartição, entre outros.

## Funcionalidades

O sistema permite que o usuário insira as arestas de um grafo em formato JSON e visualize as seguintes propriedades:

- **Componentes Conexos**: Número de componentes conexos no grafo.
- **Ciclo**: Verificação de presença de ciclos no grafo.
- **Árvore**: Verificação se o grafo é uma árvore.
- **Grafo Completo**: Verificação se o grafo é completo (todos os vértices estão conectados).
- **Grafo Bipartido**: Verificação se o grafo é bipartido (pode ser dividido em dois conjuntos disjuntos).
- **Grafo Euleriano**: Verificação se o grafo é Euleriano (todos os vértices possuem grau par).
- **Validade do Grafo**: Validação das arestas para garantir que não há laços ou arestas duplicadas.

Além disso, o grafo pode ser visualizado de forma interativa utilizando a biblioteca `Vis.js`.

## Como Usar

1. **Interface Web**:

   - Insira as arestas do grafo no campo de texto no formato JSON (exemplo: `[[1, 2], [2, 3]]`).
   - Clique em "Verificar Grafo" para visualizar as propriedades do grafo e o grafo em si.

2. **Exemplo de Entrada**:

   ```json
   [
     [1, 2],
     [2, 3],
     [3, 1]
   ]
   ```

3. **Resultado**:
   - As propriedades do grafo serão listadas à esquerda.
   - O grafo será exibido à direita com a ajuda da biblioteca `Vis.js`.

## Como Rodar o Projeto Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/projeto-de-grafos.git
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd projeto-de-grafos
   ```

3. Instale as dependências necessárias:

   ```bash
   npm install
   ```

4. Abra o arquivo `index.html` em seu navegador para acessar a interface.

## Como Executar os Testes

Para executar os testes, é necessário ter o `Node.js` instalado. Após clonar o repositório, siga os passos abaixo:

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Execute os testes:

   ```bash
   npm test
   ```

## Estrutura do Projeto

- **HTML**: Estrutura básica da interface com o campo de entrada de arestas e a área de resultados.
- **CSS**: Estilos para a interface, com uma aparência limpa e moderna.
- **JavaScript**: Funções que realizam a análise do grafo e geram a visualização. Além disso, utiliza a biblioteca `Vis.js` para a visualização interativa.
- **Testes Automatizados**: Utiliza `Jest` para validar as funções principais do código, como a criação de grafos e a verificação de suas propriedades.

## Funções Implementadas

### 1. **Função `processarArestas`**

A lógica dessa função é verificar se a entrada fornecida pelo usuário está no formato JSON válido e convertê-la em um array de arestas. A função tenta analisar a entrada usando `JSON.parse()`. Caso o formato esteja correto, retorna as arestas como um array. Caso contrário, retorna `null` para indicar erro na entrada.

### 2. **Função `criarGrafo`**

Esta função recebe as arestas fornecidas e cria um grafo na forma de um objeto de adjacência, onde cada vértice é uma chave do objeto e as arestas são armazenadas como valores em arrays. A lógica é iterar pelas arestas e para cada vértice, adicionar o outro vértice da aresta como um vizinho.

### 3. **Função `contarComponentesConexos`**

A lógica desta função consiste em realizar uma busca em profundidade para contar quantos componentes conexos o grafo possui. Um componente conexo é um conjunto de vértices que estão interligados por arestas, e não há nenhuma aresta que os conecte a vértices fora desse conjunto. A função percorre todos os vértices e, para cada vértice não visitado, realiza uma busca em profundidade para marcar todos os vértices do componente. A contagem de componentes é incrementada toda vez que uma nova busca é iniciada.

### 4. **Função `verificarCiclo`**

A função verifica a presença de ciclos no grafo utilizando uma busca em profundidade. O ciclo é detectado quando um vértice é visitado novamente durante a busca, exceto se for o vértice pai da iteração atual. Caso isso aconteça, a função retorna `true` indicando a presença de um ciclo; caso contrário, retorna `false`.

### 5. **Função `verificarEuleriano`**

Para que um grafo seja Euleriano, ele deve ser conexo e todos os seus vértices devem ter grau par. A lógica da função é verificar primeiro se o grafo é conexo (utilizando uma busca em profundidade) e depois verificar se todos os vértices possuem grau par. Se ambas as condições forem atendidas, o grafo é Euleriano.

### 6. **Função `verificarCompleto`**

A função verifica se o grafo é completo, ou seja, se todos os vértices estão conectados uns aos outros. Para isso, a função percorre todos os vértices e verifica se cada vértice tem arestas para todos os outros vértices. A verificação é realizada comparando a lista de vizinhos de cada vértice com o conjunto de todos os vértices.

### 7. **Função `verificarBipartido`**

A lógica para verificar se o grafo é bipartido é baseada em tentar colorir o grafo usando duas cores de forma que vértices adjacentes tenham cores diferentes. A função realiza uma BFS (Busca em Largura) e tenta atribuir uma cor alternada para os vértices adjacentes. Se em algum momento for impossível atribuir cores distintas a vértices adjacentes, o grafo não é bipartido.

### 8. **Função `verificarGrafoValido`**

A função verifica a validade das arestas inseridas, garantindo que o grafo não contenha laços (arestas que conectam um vértice a si mesmo) ou arestas duplicadas (duas arestas entre os mesmos dois vértices). Para isso, ela percorre todas as arestas e verifica se algum vértice está conectado a si mesmo ou se já existe uma aresta entre os dois vértices envolvidos.

## Testes Automatizados

O projeto inclui testes automatizados utilizando `Jest`. Estes testes validam as principais funções, como a criação do grafo e a verificação de suas propriedades.

### Principais Casos de Teste:

- **Função `processarArestas`**: Verifica se a entrada JSON é convertida corretamente em um `array` de arestas.
- **Função `criarGrafo`**: Testa a criação de um grafo a partir das arestas fornecidas.
- **Função `contarComponentesConexos`**: Valida o cálculo correto do número de componentes conexos.
- **Funções `verificarCiclo`, `verificarEuleriano`, `verificarCompleto`, `verificarBipartido`**: Validam a detecção correta dessas propriedades.
- **Função `verificarGrafoValido`**: Testa a detecção de laços e arestas duplicadas.
