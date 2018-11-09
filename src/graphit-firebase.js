//Define operações com a base
class Graphit_Firebase {

	constructor(firebase) {
		this.database = firebase.database();
		this.nodesRef = firebase.database().ref('nodes');
		this.adjRef = firebase.database().ref('adjacent_lists');
	}

	node({id, obj} = {}) {
		const g = this;
		return new Promise((resolve, reject) => {
			if(id == undefined) {
				id = this.nodesRef.push().key; //define novo id na base
			}

			if(obj == undefined) { //recupera obj da base
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

	adj({from_id, list}) {
		const g = this;
		return new Promise((resolve, reject) => {
			if(from_id == undefined) {
				reject(new Error('Defina from_id antes lista de adjacência!'));
			}

			if(list == undefined) { //recupera list da base
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

	//Remove dados da base
	remove(id) {
		let aux = {};
		aux['/' + this.nodesRef.key + '/' + id] = null;
		aux['/' + this.adjRef.key + '/' + id] = null;

		//aux[this.nodesRef.key][id] = null;
		//aux[this.adjRef.key][id] = null;
				
		this.database.ref().update(aux);
	}	
}