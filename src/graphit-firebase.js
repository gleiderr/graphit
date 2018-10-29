//Define operações com a base
class Graphit_Firebase {

	constructor(firebase) {
		this.nodesRef = firebase.database().ref('nodes');
		this.adjListsRef = firebase.database().ref('adjacent_lists');
	}

	newId() {
		return this.nodesRef.push().key;
	}

	//Define dados na base
	setNode(node) {
		if(!(node instanceof Node)) {
			node = new Node(this.newId(), node, this);
		}

		return this.nodesRef.child(node.id).set(node.obj);
	}

	setAdjacentList(adj, from) {
		if(!(adj instanceof Adjacent_List)) {
			adj = new Adjacent_List(from, adj, this);
		}

		return this.adjListsRef.child(adj.from).set(adj.list);
	}

	//Recupera nodo da base
	get(id, on) {
		return this.nodesRef.child(id).on('value', on);
	}

	//Remove dados da base
	remove(node) {
		return this.nodesRef.child(node.id).remove();
		return this.adjListsRef.child(node.id).remove();
	}	
}