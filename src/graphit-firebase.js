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
		return new Promise((resolve, reject) => {
			if(!(node instanceof Node)) {
				node = new Node(this.newId(), node, this);
			}
			
			this.nodesRef.child(node.id).set(node.obj)
				.then(() => resolve(node))
				.catch((error) => reject(error));
		});
	}

	//Define dados na base
	setAdjacencyList(adj, from) {
		return new Promise((resolve, reject) => {
			if(!(adj instanceof Adjacent_List)) {
				adj = new Adjacent_List(from, adj, this);
			}

			this.adjListsRef.child(adj.from).set(adj.list)
				.then(() => resolve(adj))
				.catch((error) => reject(error));
		});
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