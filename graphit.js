export class Node {
	constructor (id, obj) {
		this.id = id;
		this.obj = obj;
		this.node = obj[id];
	}

	get children() {
		let a = [];
		if(this.node.content) {
			for(const id of this.node.content)
				a.push(new Node(id, this.obj));
		}
		return a;
	}

	get neighborhood() {
		let es = [];
		if (this.node.edges){
			for (let edge of this.node.edges) {
				let edge_text = edge[0];
				let node = new Node(edge[1], this.obj);
				es.push({edge_text, node});
			}
		}
		return es;
	}

	get edges() {
		let es = [];
		const edges = this.node.edges;
		if (edges) {
			for (let i = 0; i < edges.length; i++) {
				es.push(new Edge(this.id, edges[i][1], i, this.obj));
			}
		}
		return es;
	}

	get data() {
		return this.node.data;
	}

	set data(data) {
		this.node.data = data;
	}

	hasContent() {
		return Boolean(this.node.content && this.node.content.length);
	}

	hasEdges() {
		return Boolean(this.node.edges && this.node.edges.length);
	}
}

export class Edge {
	constructor(from, to, idx, obj) {
		this.orig = from;
		this.dest = to;
		this.i = idx;
		this.obj = obj;
	}

	get data() {
		return this.obj[this.orig].edges[this.i][0];
	}

	get from() {
		return new Node(this.orig, this.obj);
	}
}