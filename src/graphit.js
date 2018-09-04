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