export class Node {
	static set json(json) {
		Node.prototype.obj = json;
	}

	static get json() {
		return Node.prototype.obj;
	}

	constructor (id) {
		this.id = id;
		this.node = this.obj[id] || (this.obj[id] = {});
	}

	get data() {
		return this.node.data;
	}

	set data(data) {
		this.node.data = data;
	}

	get nContent() {
		return (this.node.content && this.node.content.length) || 0;
	}

	content(idx) {
		return idx >= 0 && idx < this.nContent ? new Node(this.node.content[idx], this.obj) : null;
	}

	insert(node, idx = this.nContent) {
		//[this.node] contains [node]
		this.node.content = this.node.content || [];
		this.node.content.splice(idx, 0, node.id);

		//[node] is content_of [this.node]
		this.obj[node.id].content_of = this.obj[node.id].content_of || [];
		this.obj[node.id].content_of.push(this.id);
	}

	delete(idx) {
		const deleted_id = this.obj[this.id].content.splice(idx, 1)[0];
		
		const content_of = this.obj[deleted_id].content_of;
		content_of.splice(content_of.indexOf(this.id), 1);
	}

}

/* Manipula propriedades do nodo na base. Fora da base é responsabilidade do
 * usuário da biblioteca
 */
class Node { 

	constructor(id, graphit) { 
		this.id = id;
		this.graphit = graphit;
		this.obj = graphit.get(id);
	}

	set(field, value) { //Ao atribuir valor sincronizar com base
		this.obj[field] = value;
		return this.graphit.set(this.obj, this.id);
	}

	get(field) { //A base é responsável por manter os valores sincronizados
		return Promise.resolve(this.obj[field]);
	}

	ref(edge, node, idx = this.obj[edge].length || 0) {
		return this.graphit.set(this.obj, this.id);
	}
}

//Define operações com a base
class Graphit {

	constructor(objson_newId, on_get, on_set, on_edge) {
		this.newId = newId;
	}

	//Recupera nodo da base
	get(id) {
		return Promise.resolve(new Node(id, this));
	}

	//Define dados na base
	set(obj, id = Graphit.newId()) {
		return Promise.resolve();
	}

	//Remove dados da base
	delete(id) {
		return Promise.resolve();
	}

	exist(id) { //Verifica se existe id na base
		return Promise.resolve();
	}

	set_edge(from, to, edge, idx) { //Aresta deve ser desenvolvida como um nodo enrustido

	}

	remove_edge()
}