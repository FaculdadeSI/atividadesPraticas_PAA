const {
  processarArestas,
  criarGrafo,
  contarComponentesConexos,
  verificarCaminhoFechado,
  verificarEuleriano,
  verificarCompleto,
  verificarBipartido,
  verificarGrafoValido,
  verificarIsomorfismo,
} = require("../script");

describe("Funções de manipulação e validação de grafos", () => {
  test("processarArestas deve converter entrada válida corretamente", () => {
    const input = "[[1, 2], [2, 3], [3, 1]]";
    const expected = [
      [1, 2],
      [2, 3],
      [3, 1],
    ];
    expect(processarArestas(input)).toEqual(expected);
  });

  test("processarArestas deve retornar null para entrada inválida", () => {
    const input = "[[1, 2], [2, 3, 4]]";
    expect(processarArestas(input)).toBeNull();
  });

  test("criarGrafo deve construir grafo corretamente", () => {
    const edges = [
      [1, 2],
      [2, 3],
      [3, 1],
    ];
    const expected = { 1: [2, 3], 2: [1, 3], 3: [2, 1] };
    expect(criarGrafo(edges)).toEqual(expected);
  });

  test("contarComponentesConexos deve retornar o número correto de componentes", () => {
    const grafo = { 1: [2], 2: [1, 3], 3: [2], 4: [] };
    expect(contarComponentesConexos(grafo)).toBe(2);
  });

  test("verificarCaminhoFechado deve detectar ciclos no grafo", () => {
    const grafoComCiclo = { 1: [2], 2: [1, 3], 3: [2, 1] };
    expect(verificarCaminhoFechado(grafoComCiclo)).toBe(true);

    const grafoSemCiclo = { 1: [2], 2: [1, 3], 3: [2] };
    expect(verificarCaminhoFechado(grafoSemCiclo)).toBe(false);
  });

  test("verificarEuleriano deve verificar se o grafo é Euleriano", () => {
    const grafoEuleriano = { 1: [2, 3], 2: [1, 3], 3: [1, 2] };
    expect(verificarEuleriano(grafoEuleriano)).toBe(true);

    const grafoNaoEuleriano = { 1: [2], 2: [1, 3], 3: [2] };
    expect(verificarEuleriano(grafoNaoEuleriano)).toBe(false);
  });

  test("verificarCompleto deve verificar se o grafo é completo", () => {
    const grafoCompleto = { 1: [2, 3], 2: [1, 3], 3: [1, 2] };
    expect(verificarCompleto(grafoCompleto)).toBe(true);

    const grafoNaoCompleto = { 1: [2], 2: [1, 3], 3: [2] };
    expect(verificarCompleto(grafoNaoCompleto)).toBe(false);
  });

  test("verificarBipartido deve verificar se o grafo é bipartido", () => {
    const grafoBipartido = { 1: [2], 2: [1, 3], 3: [2] };
    expect(verificarBipartido(grafoBipartido)).toBe(true);

    const grafoNaoBipartido = { 1: [2, 3], 2: [1, 3], 3: [1, 2] };
    expect(verificarBipartido(grafoNaoBipartido)).toBe(false);
  });

  test("verificarGrafoValido deve validar corretamente as arestas", () => {
    const edgesValidas = [
      [1, 2],
      [2, 3],
      [3, 1],
    ];
    expect(verificarGrafoValido(edgesValidas)).toEqual({
      valido: true,
      motivo: "",
    });

    const edgesComLoop = [
      [1, 1],
      [2, 3],
    ];
    expect(verificarGrafoValido(edgesComLoop)).toEqual({
      valido: false,
      motivo: "O grafo não pode ter laços",
    });

    const edgesDuplicadas = [
      [1, 2],
      [2, 3],
      [1, 2],
    ];
    expect(verificarGrafoValido(edgesDuplicadas)).toEqual({
      valido: false,
      motivo: "O grafo não pode ter arestas duplicadas",
    });
  });

  test("verificarIsomorfismo deve detectar isomorfismo entre grafos", () => {
    const grafoA = { 1: [2], 2: [1, 3], 3: [2] };
    const grafoB = { 4: [5], 5: [4, 6], 6: [5] };
    expect(verificarIsomorfismo(grafoA, grafoB)).toBe(true);

    const grafoNaoIsomorfico = { 1: [2], 2: [1, 3], 3: [2, 4], 4: [3] };
    expect(verificarIsomorfismo(grafoA, grafoNaoIsomorfico)).toBe(false);
  });
});
