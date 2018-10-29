const base_model = {
	nodes: {
		'#0': 'Qualquer texto 0',
		'#1': 'Qualquer texto 1',
		'#2': 'Qualquer texto 2',
		'#3': 'Qualquer texto 3',
		'#4': 'Qualquer texto 4'
	},
	adjacent_lists: {
		'#0': [{ to: '#0', data: {}}, { to: '#1', data: {}}, { to: '#2', data: {}}, { to: '#3', data: {}}, { to: '#4', data: {}}],
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
		return this.graphit.setNode(this);
	}

	get adjacentList() { //Recupera lista de [Edges] atualizada
		return this.graphit.adjacentList(this.id);
	}
}

//O usuário define o formato da aresta
class Adjacent_List {

	constructor(from, list, graphit) {
		this.from = from;
		this.list = list;
		this.graphit = graphit;
	}

	//Atualiza lista na base
	sync() { return this.graphit.setAdjacentList(this); }

	insert(node, data, idx) {
		this.list.splice(idx, 0, { to: node.id, data});
	}

	remove(idx) {
		return this.list.splice(idx, 1)[0];
	}
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