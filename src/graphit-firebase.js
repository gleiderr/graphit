//Define operações com o database do Firebase
class Graphit_Firebase {

  constructor(database) {
    this.database = database;
    this.nodesRef = database.ref('nodes');
    this.adjRef = database.ref('adjacent_lists');
  }

  /* Recebe objeto {id, obj} que é persistido no Firebase e retorna uma 
  [Promise] que resolve em uma nova instância de GNode em caso de sucesso. Se 
  [id] for [undefined], é criada uma nova id onde [obj] será gravado ou de onde 
  será recuperado. Se [obj] for [undefined], será recuperado o conteúdo
  referenciado por [id], caso contrário [obj] será atribuido ao conteúdo 
  referenciado por [id].
  */
  node({ id, obj } = {}) {
    const g = this;
    return new Promise((resolve, reject) => {
      if (id == undefined) {
        id = this.nodesRef.push().key; //define novo id na base
      }

      if (obj == undefined) { //recupera obj da base
        this.nodesRef.child(id).on('value',
          (snapshot) => resolve(new GNode(id, snapshot.val(), g)),
          (error) => reject(error));
      } else { //atribui obj na base
        this.nodesRef.child(id).set(obj)
          .then(() => resolve(new GNode(id, obj, g)))
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
    const g = this;
    return new Promise((resolve, reject) => {
      if (from_id == undefined) {
        reject(new Error('Defina from_id antes lista de adjacência!'));
      }

      if (list == undefined) { //recupera list da base
        this.adjRef.child(from_id).on('value',
          (snapshot) => {
            resolve(new AdjacencyList(from_id, snapshot.val(), g));
          },
          (error) => {
            reject(error);
          });
      } else { //atribui list na base
        this.adjRef.child(from_id).set(list)
          .then(() => resolve(new AdjacencyList(from_id, list, g)))
          .catch((error) => reject(error));
      }
    });
  }

  //Remove objeto e lista de adjacência referenciados por [id].
  remove(id) {
    let aux = {};
    aux['/' + this.nodesRef.key + '/' + id] = null;
    aux['/' + this.adjRef.key + '/' + id] = null;

    this.database.ref().update(aux);
  }
}