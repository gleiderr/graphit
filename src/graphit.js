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
  constructor(id, data, graphit) {
    this.id = id;
    this.data = data;
  }
}

/* Define a estrutura padrão de uma lista de adjacências. Somente [id] e [list]
 * são gravados na base de dados.
 */
class AdjacencyList {
  constructor(from_id, list, graphit) {
    this.from_id = from_id;
    this.list = list || [];
  }
}

//Define operações com o database
class Graphit {

  constructor(database) {
    this.database = database;
  }

  /* Recebe objeto {id, data} que é persistido no Firebase e retorna uma 
  [Promise] que resolve em uma nova instância de GNode em caso de sucesso. Se 
  [id] for [undefined], é criada uma nova id onde [data] será gravado ou de onde 
  será recuperado. Se [data] for [undefined], será recuperado o conteúdo
  referenciado por [id], caso contrário [data] será atribuido ao conteúdo 
  referenciado por [id].
  */
  node({ id, data } = {}) {
    return new Promise((resolve, reject) => {
      if (id == undefined) {
        id = this.database.new_id(); //define novo id na base
        if (data == undefined) {
          resolve(new GNode(id, data));
        }
      }

      if (data == undefined) { //recupera data da base
        this.database.retrieve_val(id)
          .then(data => resolve(new GNode(id, data)))
          .catch(error => reject(error));
      } else { //atribui data na base
        this.database.set_val({ id, data })
          .then(() => resolve(new GNode(id, data)))
          .catch((error) => reject(error));
      }
    });
  }

  /* Recebe objeto { from_id, list } que é persistido no Firebase e retorna uma
  [Promise] que resolve em uma instância de AdjacencyList em caso de sucesso. 
  [from_id] já deve ser informado. Se [list] for [undefined] será recuperada a
  lista referenciada por [id], caso contrário [list] será atribuido ao conteúdo 
  referenciado por [from_id];
  */
  adj({ from_id, list }) {
    return new Promise((resolve, reject) => {
      if (from_id == undefined) {
        reject(new Error('from_id indefinido!'));
      }

      if (list == undefined) { //recupera list da base
        this.database.retrieve_list(from_id)
          .then(list => resolve(new AdjacencyList(from_id, list)))
          .catch(error => reject(error));
      } else { //atribui list na base
        this.database.set_list({ from_id, list })
          .then(() => resolve(new AdjacencyList(from_id, list)))
          .catch((error) => reject(error));
      }
    });
  }

  //Remove objeto e lista de adjacência referenciados por [id].
  remove(id) {
    return this.database.remove(id);
  }
}

module.exports.Graphit = Graphit;