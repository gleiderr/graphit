const base_model = {
	nodes: {
		'#0': 'Qualquer texto 0',
		'#1': 'Qualquer texto 1',
		'#2': 'Qualquer texto 2',
		'#3': 'Qualquer texto 3',
		'#4': 'Qualquer texto 4'
	},
	adjacent_lists: {
		'#0': [{ to: '#0', any: ''}, { to: '#1', any: ''}, { to: '#2', any: ''}, { to: '#3', any: ''}, { to: '#4', any: ''}],
		'#1': [],
		'#2': [],
		'#3': [],
		'#4': []
	}
};

/* Manipula propriedades do nodo na base. Fora da base é responsabilidade do
 * usuário da biblioteca
 */
class Node { 

	constructor(id, obj, graphit) { 
		this.id = id;
		this.obj = obj;
		this.graphit = graphit;
	}

	sync() { //Atualiza nodo na base
		return this.graphit.set(this);
	}

	adjacentList() { //Recupera lista de adjacências atualizada
		return this.graphit.adjacentList(this.id);
	}
}

//Define operações com a base
class Graphit {

	constructor(newId, set, get, on_edge) {
		this.f_newId = newId;
		this.f_set = set;
		this.f_get = get;
	}

	//Define dados na base
	set(node) {
		if(!(node instanceof Node)) node = new Node(this.newId(), node, this);
		return this.f_set(node);
	}

	//Recupera nodo da base
	get(id) {
		return this.f_get();
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

/*export class Node {
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

}*/