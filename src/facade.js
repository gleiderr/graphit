import {Node} from './graphit.js';
import {element_from_nodo, nodo_from_element, expansível, expandido,
		nodo_el, all_elements, replace_me} from './elements_factory.js';

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
		.forEach(el => { if(el != container) el.firstChild.innerHTML = node.data; });
};

export const insert = (origin_el, child_el = undefined, idx = undefined) => {
	let child, parent = nodo_from_element(origin_el);
	
	//Inserção real
	child = child_el ? nodo_from_element(child_el) : new Node(newId());
	parent.insert(child, idx);
	
	//Inserção visual
	all_elements(parent.id).forEach((parent_el) => {
		if(parent_el.classList.contains('Expandido')) {
			parent_el.insertBefore(element_from_nodo(child.id), parent_el.childNodes[idx+1]);
		} else {
			parent_el.classList.add('Expansível');
		}
	});
};

export const remove = (data_el) => {
	const remove_el = data_el.parentElement;
	const parent_el = remove_el.parentElement;
	const remove_id = Array.from(parent_el.childNodes).indexOf(remove_el);
	const parent = nodo_from_element(parent_el); 

	//Remoção real
	parent.delete(remove_id - 1);

	//Remoção visual
	all_elements(parent.id).forEach((parent_el) => {
		if(parent.nContent == 0) {
			replace_me(parent_el, element_from_nodo(parent.id));
		} else if(parent_el.classList.contains('Expandido')) {
			parent_el.childNodes[remove_id].remove();
		}
	});
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
