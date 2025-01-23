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

// Função para contar o número de componentes conexos no grafo
function contarComponentesConexos(grafo) {
  const visitado = new Set();
  let componentesConexos = 0;

  for (const nodo in grafo) {
    if (!visitado.has(Number(nodo))) {
      buscaProfundidade(grafo, Number(nodo), visitado); // Realiza busca por profundidade para marcar todos os nodos conectados
      componentesConexos++; // Incrementa o contador de componentes conexos
    }
  }

  return componentesConexos;
}

// Função auxiliar para realizar busca por profundidade
function buscaProfundidade(grafo, nodo, visitado) {
  if (!grafo[nodo]) {
    return; // Se o nó não estiver no grafo, retorna
  }

  visitado.add(nodo); // Marca o nó como visitado

  grafo[nodo].forEach((v) => {
    if (!visitado.has(v)) {
      buscaProfundidade(grafo, v, visitado); // Recursão para os vizinhos
    }
  });
}

// Função para verificar se o grafo é completo
function verificarCompleto(grafo) {
  const vertices = Object.keys(grafo);
  const n = vertices.length;

  for (const vertice of vertices) {
    if (grafo[vertice].length !== n - 1) {
      return false; // Se algum vértice não estiver conectado a todos os outros, não é completo
    }
  }

  return true;
}

// Função para verificar a presença de um caminho fechado (ciclo)
function verificarCaminhoFechado(grafo) {
  const visitado = new Set();
  const recursaoVisitada = new Set();

  for (const nodo in grafo) {
    if (!visitado.has(Number(nodo))) {
      if (detectaCiclo(grafo, Number(nodo), visitado, recursaoVisitada, null)) {
        return true; // Se encontrar um ciclo, retorna true
      }
    }
  }

  return false; // Se não encontrar nenhum ciclo
}

// Função auxiliar para detectar ciclos na busca por profundidade
function detectaCiclo(grafo, nodo, visitado, recursaoVisitada, pai) {
  if (!grafo[nodo]) {
    return false; // Se o nó não estiver no grafo, retorna false
  }

  visitado.add(nodo);
  recursaoVisitada.add(nodo);

  for (const vizinho of grafo[nodo]) {
    if (!visitado.has(vizinho)) {
      if (detectaCiclo(grafo, vizinho, visitado, recursaoVisitada, nodo)) {
        return true; // Ciclo encontrado
      }
    } else if (vizinho !== pai && recursaoVisitada.has(vizinho)) {
      return true; // Ciclo encontrado
    }
  }

  recursaoVisitada.delete(nodo); // Remove o nó da recursão
  return false; // Sem ciclo
}
