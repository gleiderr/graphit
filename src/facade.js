import {Node} from './graphit.js';
import {element_from_nodo, nodo_from_element, expansível, expandido, nodo_el,
		all_elements, replace_me, remove_from, insert_into} from './elements_factory.js';

let newId;
const set_new_id = () => {
	const generator = (function* () {
		let lastKey = 0;
		for (let id in Node.json) lastKey = Math.max(parseInt(id, 36), lastKey);
		console.log('set_new_id', {lastKey, id: lastKey.toString(36)});

		while(true) {
			++lastKey;
			console.log({lastKey, id: lastKey.toString(36)});
			yield lastKey.toString(36);
		}
	})();
	
	newId = () => generator.next().value;
};

/*const set_new_id = () => {
	const generator = (function* () {
		for(let nextKey = 0; true; nextKey++) {
			if(!Node.json[nextKey.toString(36)]) {
				console.log({nextKey, id: nextKey.toString(36)});
				yield nextKey.toString(36);
			}
		}
	})();
	
	newId = () => generator.next().value;
};*/

export const expand = el => {
	const container = nodo_el(el);
	if(expansível(el)) { //Expansão de elemento
		const node = nodo_from_element(el);
		for (let i = 0; i < node.nContent; i++) {
			container.appendChild(element_from_nodo(node.content(i).id));
		}
		return true;
	}
	return false;
};

export const retract = el => {
	const container = nodo_el(el);
	if(expandido(el)) {
		const new_container = element_from_nodo(nodo_from_element(el).id);
		replace_me(container, new_container);
		return true;
	}
	return false;
};

export const apply = el => {
	const container = nodo_el(el);
	const node = nodo_from_element(container);
	node.data = container.firstChild.innerHTML;
	
	//Propagação
	all_elements(node.id)
		.forEach(el => { 
			if(el != container) el.firstChild.innerHTML = node.data; 
		});
};

export const insert = (origin_el, child_el = undefined) => {
	let child, parent = nodo_from_element(origin_el);
	let idx;
	
	//Inserção real
	child = child_el ? nodo_from_element(child_el) : new Node(newId());
	parent.insert(child, idx);
	
	//Inserção visual
	insert_into(child.id, parent.id);
};

export const remove = el => {
	const remove_el = nodo_el(el);
	const parent_el = nodo_el(remove_el.parentElement);
	if(parent_el) {
		const remove_idx = Array.from(parent_el.childNodes).indexOf(remove_el);
		const parent = nodo_from_element(parent_el); 

		//Remoção real
		parent.delete(remove_idx - 1);

		//Remoção visual
		remove_from(remove_idx, parent.id);
	}
};

export function show(json) {
	Node.json = json;
	set_new_id();

	const g = document.createElement('div');
	g.id = 'painel1';
	g.classList.add('Painel');
	g.appendChild(element_from_nodo(0));

	replace_me(document.getElementById('painel1'), g);
}