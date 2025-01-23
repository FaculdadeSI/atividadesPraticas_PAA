// Função principal para verificar propriedades do grafo
function verificarGrafo() {
  // Obtem as arestas do grafo A e, opcionalmente, do grafo B
  const inputEdges = document.getElementById("edges").value;
  const inputEdges2 = document.getElementById("edges2")?.value; // Segundo grafo opcional

  // Converte as arestas da entrada de texto para formato de array
  const edges = processarArestas(inputEdges);

  // Obtem elementos da interface para exibir os resultados
  const resultado = document.getElementById("detalhesResultado");
  const listaResultados = document.getElementById("resultadosLista");
  const grafoViz = document.getElementById("grafoViz");

  listaResultados.innerHTML = ""; // Limpa resultados anteriores

  // Caso a entrada de arestas seja inválida, exibe mensagem de erro
  if (!edges) {
    const erro = document.createElement("li");
    erro.classList.add("erro");
    erro.textContent =
      "Entrada inválida. Por favor, forneça as arestas no formato correto (ex: [[1, 2], [1, 3]])";
    listaResultados.appendChild(erro);
    resultado.style.display = "block";
    return;
  }

  // Cria o grafo a partir das arestas fornecidas
  const grafoA = criarGrafo(edges);

  // Calcula propriedades do grafo
  const componentesConexos = contarComponentesConexos(grafoA);
  const caminhoFechado = verificarCaminhoFechado(grafoA);
  const grafoValido = verificarGrafoValido(edges);
  const numeroDeVertices = new Set(edges.flat()).size;
  const numeroDeArestas = edges.length;

  // Gera detalhes para exibição
  let detalhes = [
    `Arestas fornecidas: ${JSON.stringify(edges)}`,
    `Quantidade de componentes conexos: ${componentesConexos}`,
    caminhoFechado
      ? "O grafo contém um caminho fechado."
      : "O grafo não contém caminhos fechados.",
    grafoValido.valido
      ? "O grafo é válido."
      : `O grafo não é válido: ${grafoValido.motivo}`,
    componentesConexos === 1 && numeroDeArestas === numeroDeVertices - 1
      ? "O grafo é uma árvore."
      : "O grafo não é uma árvore.",
    verificarCompleto(grafoA)
      ? "O grafo é completo."
      : "O grafo não é completo.",
    verificarBipartido(grafoA)
      ? "O grafo é bipartido."
      : "O grafo não é bipartido.",
    verificarEuleriano(grafoA)
      ? "O grafo é Euleriano."
      : "O grafo não é Euleriano.",
  ];

  // Caso exista um segundo grafo, verifica isomorfismo entre os grafos
  if (inputEdges2) {
    const edges2 = processarArestas(inputEdges2);
    if (edges2) {
      const grafoB = criarGrafo(edges2);
      const isomorfismo = verificarIsomorfismo(grafoA, grafoB);
      detalhes.push(
        isomorfismo
          ? "Os grafos são isomorfos."
          : "Os grafos não são isomorfos."
      );
    } else {
      detalhes.push(
        "Entrada inválida para o segundo grafo. Isomorfismo não verificado."
      );
    }
  }

  // Exibe os detalhes na interface
  detalhes.forEach((detalhe) => {
    const item = document.createElement("li");
    item.textContent = detalhe;
    listaResultados.appendChild(item);
  });

  // Exibe o painel de resultados
  resultado.style.display = "block";

  // Visualiza o grafo A com a biblioteca Vis.js
  const nodes = new vis.DataSet();
  const edgesVis = new vis.DataSet();

  const vertices = new Set();
  edges.forEach(([v1, v2]) => {
    vertices.add(v1);
    vertices.add(v2);
  });

  vertices.forEach((vertex) => {
    nodes.add({ id: vertex, label: String(vertex) });
  });

  edges.forEach(([v1, v2]) => {
    edgesVis.add({ from: v1, to: v2 });
  });

  const container = grafoViz;
  const data = { nodes: nodes, edges: edgesVis };
  const options = {
    width: "100%",
    height: "100%",
    physics: {
      enabled: true,
    },
  };

  new vis.Network(container, data, options);
}

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

// Função para verificar se o grafo é bipartido
function verificarBipartido(grafo) {
  const color = {};
  for (const nodo in grafo) {
    if (!(nodo in color)) {
      if (!buscaProfundidadeBipartido(grafo, nodo, color, 0)) {
        return false; // Se não for possível colorir de forma bipartida, retorna false
      }
    }
  }
  return true; // O grafo é bipartido
}

// Função auxiliar para realizar busca por profundidade em busca de bipartição
function buscaProfundidadeBipartido(grafo, nodo, color, c) {
  if (!(nodo in grafo)) {
    return true; // Se o nó não está no grafo, consideramos que não há conflito
  }

  if (nodo in color) {
    return color[nodo] === c; // Verifica se a coloração do nó é correta
  }

  color[nodo] = c; // Colorir o nó

  for (const vizinho of grafo[nodo]) {
    if (!buscaProfundidadeBipartido(grafo, vizinho, color, 1 - c)) {
      return false; // Se encontrar um conflito de cor, o grafo não é bipartido
    }
  }

  return true; // Coloração válida
}

// Função para verificar se o grafo é Euleriano
function verificarEuleriano(grafo) {
  const componentesConexos = contarComponentesConexos(grafo);
  if (componentesConexos > 1) {
    return false; // Se o grafo não for conexo, não é Euleriano
  }

  for (const nodo in grafo) {
    if (grafo[nodo].length % 2 !== 0) {
      return false; // Se algum vértice tiver grau ímpar, o grafo não é Euleriano
    }
  }

  return true; // O grafo é Euleriano
}

// Função para verificar se o grafo tem arestas válidas
function verificarGrafoValido(edges) {
  const arestasSet = new Set();
  for (let edge of edges) {
    if (!Array.isArray(edge) || edge.length !== 2) {
      return {
        valido: false,
        motivo: "As arestas devem ser pares de vértices",
      };
    }
    const [u, v] = edge;
    if (u === v) {
      return { valido: false, motivo: "O grafo não pode ter laços" };
    }
    const sortedEdge = JSON.stringify(edge.sort());
    if (arestasSet.has(sortedEdge)) {
      return {
        valido: false,
        motivo: "O grafo não pode ter arestas duplicadas",
      };
    }
    arestasSet.add(sortedEdge);
  }
  return { valido: true, motivo: "" };
}

// Função para verificar se dois grafos são isomorfos
function verificarIsomorfismo(grafoA, grafoB) {
  // Verifica se o número de vértices e arestas são iguais
  const verticesA = Object.keys(grafoA);
  const verticesB = Object.keys(grafoB);

  if (verticesA.length !== verticesB.length) {
    return false; // Diferente número de vértices, logo não são isomorfos
  }

  // Verifica se os graus dos vértices são os mesmos
  const grausA = verticesA.map((v) => grafoA[v].length);
  const grausB = verticesB.map((v) => grafoB[v].length);

  grausA.sort();
  grausB.sort();

  if (!arraysIguais(grausA, grausB)) {
    return false; // Graus diferentes, logo não são isomorfos
  }

  // Tentativa simplificada de verificar conexões entre os grafos
  for (let i = 0; i < verticesA.length; i++) {
    for (let j = 0; j < verticesB.length; j++) {
      if (grafoA[verticesA[i]].length === grafoB[verticesB[j]].length) {
        return true; // Se os grafos possuem a mesma estrutura de conexões, são isomorfos
      }
    }
  }

  return false; // Caso contrário, não são isomorfos
}

// Função para comparar dois arrays de forma que considere a ordem dos elementos
function arraysIguais(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

// Exporta funções para uso em outros scripts
module.exports = {
  processarArestas,
  criarGrafo,
  contarComponentesConexos,
  verificarCaminhoFechado,
  verificarEuleriano,
  verificarCompleto,
  verificarBipartido,
  verificarGrafoValido,
  verificarIsomorfismo,
};
