export class Node {
	constructor (id, obj, data = undefined) {
		this.id = id;
		this.obj = obj;
		this.node = obj[id] || (obj[id] = {});
		if(data) this.data = data;
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
				es.push(new Edge(this.id, i, this.obj));
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

	insert(node) {
		//[this.node] contains [node]
		this.node.content = this.node.content || [];
		this.node.content.push(node.id);

		//[node] is content_of [this.node]
		this.obj[node.id].content_of = this.obj[node.id].content_of || [];
		this.obj[node.id].content_of.push(this.id);
	}
}

export class Edge {
	constructor(from, idx, obj) {
		this.orig = from;
		this.idx = idx;
		this.obj = obj;
	}

	get data() {
		return this.obj[this.orig].edges[this.idx][0];
	}

	set data(data) {
		this.obj[this.orig].edges[this.idx][0] = data;	
	}

	get from() {
		return new Node(this.orig, this.obj);
	}

	get to() {
		const to = this.obj[this.orig].edges[this.idx][1];
		return new Node(to, this.obj);
	}
}