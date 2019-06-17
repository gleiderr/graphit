/*eslint-env node*/
const Graphit = require('../../src/graphit').Graphit;

let g;

//Mockup de banco de dados
class Database {
  constructor() {
    this.db = {};
    this.list = {};
    this.lastId = 0;
  }
  new_id() { return this.lastId++; }

  retrieve_val(id) { 
    return Promise.resolve(this.db[id]); 
  }

  set_val({ id, data }) {
    this.db[id] = data;
    return Promise.resolve({id, data}); 
  }

  retrieve_list(from_id) { 
    return Promise.resolve(this.list[from_id]); 
  }
  
  set_list({ from_id, list }) {
    this.list[from_id] = list;
    return Promise.resolve(this.list[from_id]); 
  }

  remove(id) { 
    delete this.db[id];
    delete this.list[id];
    return Promise.resolve(); 
  }
}

describe('Graphit puro:', function() {
  beforeAll(function() {
    g = new Graphit(new Database());
  });
  
  it('Graphit.node(), deve retornar instância de GNode com novo [id] definido e [obj] indefinido.', function() {
    return g.node({})
      .then(node => {
        expect(node.id).toEqual(jasmine.anything());
        expect(node.data).toBeUndefined();
      })
      .catch((error) => fail(error));
  });

  it('Graphit.node({data: 1}), GNode { id: any, data: 1}', function() {
    const data = 'teste';
    return g.node({ data })
      .then(node => {
        expect(node.id).toEqual(jasmine.anything());
        expect(node.data).toEqual(data);
      })
      .catch((error) => fail(error));
  });

  it('Graphit.node({id: 0}) (id existente na base), deve retornar GNode { id: 0, data}, [id] igual ao existente na base.', async function() {
    //Pré inserção na base
    const data = Math.random();
    const new_obj = await g.node({ data });

    return g.node({ id: new_obj.id })
      .then(node => {
        expect(node.id).toEqual(new_obj.id);
      })
      .catch((error) => fail(error));
  });

  it('Graphit.node({id: 0}) (id existente na base), deve retornar GNode { id: 0, data}, [data] igual ao existente na base.', async function() {
    //Pré inserção na base
    const data = Math.random();
    const new_obj = await g.node({ data });

    return g.node({ id: new_obj.id })
      .then(node => {
        expect(node.data).toEqual(data);
      })
      .catch((error) => fail(error));
  });

  it('Graphit.node({id}) (id não existente na base), deve retornar instância de GNode com [id] igual ao informado e [obj] indefinido.', async function() {
    let new_obj, id;
    do {
      id = Math.ceil(Math.random() * 1000);
      new_obj = await g.node({ id });
    } while (new_obj.data != undefined);

    return g.node({ id })
      .then(obj => {
        expect(obj.id).toEqual(id);
        expect(obj.data).toBeUndefined();
      })
      .catch((error) => fail(error));
  });

  it('Graphit.node({id, data}), deve retornar instância de GNode com [id] e [obj] iguais aos informados.', function() {
    const data = Math.random();
    id = 0;
    return g.node({ id, data })
      .then(node => {
        expect(node.id).toEqual(id);
        expect(node.data).toEqual(data);
      })
      .catch((error) => fail(error));
  });

  it('Graphit.adj(), não informado [from_id], deve lançar erro.', function() {
    return g.adj({ list: [1] })
      .then(() => fail('Inserção indevida concluída com sucesso!'))
      .catch((error) => expect(() => { throw error; }).toThrowError());
  });

  it('Graphit.adj({from_id, list}), deve retornar AdjacencyList com [from_id] e [list] iguais aos informados.', () => {
    let from_id = 0;
    let list = [1, 2, 3];
    return g.adj({ from_id, list })
      .then(adj => {
        expect(adj.from_id).toEqual(from_id);
        expect(adj.list).toEqual(list);
      })
      .catch(error => fail(error));
  });

  it('Graphit.adj({from_id}), [from_id] inexistente, deve retornar AdjacencyList com [from_id] igual ao informado e list indefinida.', async () => {
    let from_id = 0;
    await g.remove(from_id);
    return g.adj({ from_id })
      .then((adj) => {
        expect(adj.from_id).toEqual(from_id);
        expect(adj.list).toBeUndefined();
      });
  });

  it('Graphit.adj({from_id}), [from_id] existente, deve retornar AdjacencyList com [from_id] e [list] iguais à base.', async () => {
    let from_id = 0;
    const list = [1, 2, 3];
    const adj = await g.adj({ from_id, list });

    return g.adj({ from_id })
      .then(adj => {
        expect(adj.from_id).toEqual(from_id);
        expect(adj.list).toEqual(list);
      })
      .catch(error => fail(error));
  });

  it('Graphit.remove() deve garantir inexistência de [id] na base após a remoção.', () => {
    let id, data, list;
    (async () => {
      data = Math.random();
      id = 0;
      list = [0, 1, 2];

      await g.node({ id, data });
      await g.adj({ from_id: id, list });
    })();
    return g.remove(id)
      .then(async () => {
        const node = await g.node({ id });
        expect(node.data).toBeUndefined();
      })
      .catch(error => fail(error));
  });
});