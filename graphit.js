export default class Graphit {
	constructor (obj, id) {
		this.obj = obj;
		this.id = id;
		this.node = obj[id];
	}

	get children() {
		let a = [];
		if(this.node.content) {
			for(let i = 0; i < this.node.content.length; i++) {
				a.push(new Graphit(this.obj, this.node.content[i]));
			}
		}
		return a;
	}

	get neighborhood() {
		let es = [];
		if (this.node.edges){
			for (let edge of this.node.edges) {
				let edge_text = edge[0];
				let node = new Graphit(this.obj, edge[1]);
				es.push({edge_text, node});
			}
		}
		return es;
	}

	get data() {
		return this.node.data;
	}

	hasContent() {
		return Boolean(this.node.content && this.node.content.length);
	}

	hasEdges() {
		return Boolean(this.node.edges && this.node.edges.length);
	}
}