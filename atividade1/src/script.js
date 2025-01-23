// Função para converter a entrada de texto em arestas
function processarArestas(input) {
  try {
    return JSON.parse(input); // Converte a entrada para formato de array
  } catch (e) {
    return null; // Se ocorrer erro, retorna null
  }
}

// Função para criar o grafo a partir das arestas fornecidas
function criarGrafo(edges) {
  const grafo = {};

  edges.forEach(([u, v]) => {
    if (!grafo[u]) grafo[u] = [];
    if (!grafo[v]) grafo[v] = [];
    grafo[u].push(v); // Adiciona a aresta de u para v
    grafo[v].push(u); // Adiciona a aresta de v para u (grafo não direcionado)
  });

  return grafo;
}
