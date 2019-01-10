//Define operações com o database do Firebase
class Graphit_Firebase {

  constructor(database, reference) {
    this.database = database;
    this.nodesRef = database.ref(reference).child('nodes');
    this.adjRef = database.ref(reference).child('adjacent_lists');

    this.retrieve_val = (id) => this.retrieve(id, this.nodesRef);
    this.retrieve_list = (id) => this.retrieve(id, this.adjRef);
    this.set_val = ({ id, obj }) => this.set({ id, obj }, this.nodesRef);
    this.set_list = ({ from_id, list }) => this.set({ id: from_id, obj: list }, this.adjRef);
    this.new_id = () => this.nodesRef.push().key;
  }

  retrieve(id, ref) {
    return new Promise((resolve, reject) => {
      this.nodesRef.child(id).on('value',
        (snapshot) => resolve(snapshot.val()),
        (error) => reject(error));
    });
  }

  set({ id, obj }, ref) {
    return ref.child(id).set(obj);
  }

  //Remove objeto e lista de adjacência referenciados por [id].
  remove(id) {
    let aux = {};
    aux['/' + this.nodesRef.key + '/' + id] = null;
    aux['/' + this.adjRef.key + '/' + id] = null;

    this.database.ref().update(aux);
  }
}

module.exports.Graphit_Firebase = Graphit_Firebase;