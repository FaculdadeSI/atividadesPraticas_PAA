function verificarGrafo() {
  const inputEdges = document.getElementById("edges").value;
  const edges = parseEdges(inputEdges);

  const resultado = document.getElementById("detalhesResultado");
  resultado.innerHTML = ""; // Limpar resultados anteriores

  if (!edges) {
    resultado.innerHTML =
      "Entrada inválida. Por favor, forneça as arestas no formato correto (ex: [[1, 2], [1, 3]])";
    return;
  }

  const grafo = criarGrafo(edges);
  const componentesConexos = contarComponentesConexos(grafo);
  const ciclo = verificarCiclo(grafo);
  const grafoValido = verificarGrafoValido(edges);

  let detalhes = `Arestas fornecidas: ${JSON.stringify(edges)}\n\n`;
  detalhes += `Quantidade de componentes conexos: ${componentesConexos}\n`;
  detalhes += ciclo
    ? "O grafo contém um ciclo.\n"
    : "O grafo não contém ciclos.\n";

  if (grafoValido.valido) {
    detalhes += "O grafo é válido.\n";
  } else {
    detalhes += `O grafo não é válido: ${grafoValido.motivo}\n`;
  }

  resultado.innerHTML = detalhes;
}

function parseEdges(input) {
  try {
    return JSON.parse(input);
  } catch (e) {
    return null;
  }
}

function criarGrafo(edges) {
  const grafo = {};

  edges.forEach(([u, v]) => {
    if (!grafo[u]) grafo[u] = [];
    if (!grafo[v]) grafo[v] = [];
    grafo[u].push(v);
    grafo[v].push(u);
  });

  return grafo;
}

function contarComponentesConexos(grafo) {
  const visitado = new Set();
  let componentesConexos = 0;

  for (const nodo in grafo) {
    if (!visitado.has(Number(nodo))) {
      dfs(grafo, Number(nodo), visitado);
      componentesConexos++;
    }
  }

  return componentesConexos;
}

function dfs(grafo, nodo, visitado) {
  visitado.add(nodo);

  grafo[nodo].forEach((v) => {
    if (!visitado.has(v)) {
      dfs(grafo, v, visitado);
    }
  });
}

function verificarCiclo(grafo) {
  const visitado = new Set();
  const recursaoVisitada = new Set();

  for (const nodo in grafo) {
    if (!visitado.has(Number(nodo))) {
      if (detectaCiclo(grafo, Number(nodo), visitado, recursaoVisitada)) {
        return true;
      }
    }
  }

  return false;
}

function detectaCiclo(grafo, nodo, visitado, recursaoVisitada) {
  visitado.add(nodo);
  recursaoVisitada.add(nodo);

  for (const vizinho of grafo[nodo]) {
    if (!visitado.has(vizinho)) {
      if (detectaCiclo(grafo, vizinho, visitado, recursaoVisitada)) {
        return true;
      }
    } else if (recursaoVisitada.has(vizinho)) {
      return true;
    }
  }

  recursaoVisitada.delete(nodo);
  return false;
}

function verificarGrafoValido(edges) {
  // Verifica se as arestas estão no formato correto e sem laços
  for (let edge of edges) {
    if (!Array.isArray(edge) || edge.length !== 2) {
      return {
        valido: false,
        motivo: "As arestas devem ser pares de vértices",
      };
    }
    const [u, v] = edge;
    if (u === v) {
      return {
        valido: false,
        motivo:
          "O grafo não pode ter laços (arestas que conectam um vértice a si mesmo)",
      };
    }
  }

  // Verifica se as arestas estão repetidas
  const arestasSet = new Set();
  for (let edge of edges) {
    const sortedEdge = JSON.stringify(edge.sort()); // Ordena para evitar duplicatas
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
