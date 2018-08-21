export class Node {
	static set json(json) {
		Node.prototype.obj = json;
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

	insert(node) {
		//[this.node] contains [node]
		this.node.content = this.node.content || [];
		this.node.content.push(node.id);

		//[node] is content_of [this.node]
		this.obj[node.id].content_of = this.obj[node.id].content_of || [];
		this.obj[node.id].content_of.push(this.id);
	}

	// get nEdges() {
	// 	return (this.node.edges && this.node.edges.length) || 0;
	// }

	// edgeData(idx, data = undefined) { 
	// 	if(data !== undefined) {
	// 		this.node.edges = this.node.edges || [];
	// 		this.node.edges[idx] = this.node.edges[idx] || [];
			
	// 		this.node.edges[idx][0] = data;
	// 	}
	// 	return this.node.edges[idx][0];
	// }

	// edgeTo(idx, to = undefined) {
	// 	if(to !== undefined) {
	// 		this.node.edges = this.node.edges || [];
	// 		this.node.edges[idx] = this.node.edges[idx] || [];

	// 		this.node.edges[idx][1] = to.id;
	// 	}
	// 	return new Node(this.node.edges[idx][1], this.obj);
	// }

}