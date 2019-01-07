/* Estrutura padrão da base de dados do Graphit.

const base_model = {
  nodes: {
    '#0': 'Qualquer texto 0',
    '#1': 'Qualquer texto 1',
    '#2': 'Qualquer texto 2',
    '#3': 'Qualquer texto 3',
    '#4': 'Qualquer texto 4'
  },
  adjacency_lists: {
    '#0': [{ to: '#0', data: {}}, { to: '#1', data: {}}, { to: '#2', data: {}}, { to: '#3', data: {}}, { to: '#4', data: {}}],
    '#1': [],
    '#2': [],
    '#3': [],
    '#4': []
  }
};*/

/* Define a estrutura padrão de um Nodo. Somente o [id] e [obj] são gravados 
 * na base de dados;
 */
class GNode {
  constructor(id, obj, graphit) {
    this.id = id;
    this.obj = obj;
    this.graphit = graphit;
  }
}

/* Define a estrutura padrão de uma lista de adjacências. Somente [id] e [list]
 * são gravados na base de dados.
 */
class AdjacencyList {
  constructor(from_id, list, graphit) {
    this.from_id = from_id;
    this.list = list || [];
    this.graphit = graphit;
  }
}