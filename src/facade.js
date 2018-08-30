import {Node} from './graphit.js';

//Função construída na primeira chamada
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

export const nodo_element = (id/*, idx = 0*/) => { //tornar essa função não pública
	const node = new Node(id);

	const container = document.createElement('div');
	const nodo_element = document.createElement('div');
	container.append(nodo_element);

	container.classList.add('Contêiner');

	if(node.nContent) nodo_element.classList.add('Expansível');
	nodo_element.setAttribute('data-nodo', id);
	nodo_element.contentEditable = 'true';
	//nodo_element.setAttribute('data-idx', idx);
	nodo_element.innerHTML = node.data || '';

	return container;
};

const all_elements = id => {
	return Array.from(document.querySelectorAll(`[data-nodo="${id}"]`));
};

const nodo_from_element = el => {
	return new Node(el.getAttribute('data-nodo'));
};

const replace_nodo_element = (el) => {
	new_element = nodo_element(element.getAttribute('data-nodo')/*,
							   element.getAttribute('data-idx')*/);
	document.replaceChild(new_element, el);

	if(element.classList.contains('Expandido')) {
		const childs = Array.from(el.childNodes);
		for(let i = 1; i < childs.length; i++) 
			replace_nodo_element(childs[i]);
	}
};

export const expand = el => {
	const node = new Node(el.getAttribute('data-nodo'));
	const container = el.parentElement;
	for (let i = 0; i < node.nContent; i++) {
		container.appendChild(nodo_element(node.content(i).id));
	}
	el.classList.remove('Expansível');
	el.classList.add('Expandido');
};

export const retract = el => {
	const container = el.parentElement;
	container.parentElement.replaceChild(nodo_element(el.getAttribute('data-nodo')), container);
};

export const apply = el => {
	let node = new Node(el.getAttribute('data-nodo'));
	node.data = el.innerHTML;
	
	//Propagação
	const elementos = document.querySelectorAll(`[data-nodo="${node.id}"]`);
	for (let elemento of elementos) {
		if(elemento != el) elemento.innerHTML = node.data;
	}
};

export const insert = (origin_el, child_el = undefined, idx = undefined) => {
	let parent_id = origin_el.getAttribute('data-nodo'); //Substituir por nodo_from_element()
	let child, parent = new Node(parent_id);             //Substituir por nodo_from_element()
	
	//Inserção real
	if(!child_el) { //novo elemento
		child = new Node(newId());
	} else { //elemento existente
		child = new Node(child_el.getAttribute('data-nodo'));
	}
	parent.insert(child, idx);
	
	//Inserção visual
	const els = Array.from(document.querySelectorAll(`[data-nodo="${parent_id}"]`)); //substituir por all_elements()
	for (let el of els) {
		const parent_el = el.parentElement;
		if(el.classList.contains('Expandido')) {
			parent_el.insertBefore(nodo_element(child.id, idx), el.childNodes[idx+1]);
		} else {
			el.classList.add('Expansível'); //review replaceChild nodo_element
		}
	}
};

export const remove = (child_el) => {
	const parent_el = child_el.parentElement.parentElement;
	const parent = nodo_from_element(parent_el.firstChild),
	      child = nodo_from_element(child_el);
	const child_idx = Array.from(parent_el.childNodes).indexOf(child_el.parentElement);

	//Remoção real
	parent.delete(child_idx - 1);

	//Remoção visual
	const els = all_elements(parent.id);
	for(let el of els) {
		const container_el = el.parentElement;
		if(parent.nContent == 0) {
			container_el.parentElement.replaceChild(nodo_element(parent.id), container_el);
		} else if(el.classList.contains('Expandido')) {
			container_el.childNodes[child_idx].remove();
		}
	}
};

export function show() {
	set_new_id();

	const g = document.createElement('div');
	g.id = 'painel1';
	g.classList.add('Painel');
	g.appendChild(nodo_element(0));
	
	document.body.replaceChild(g, document.getElementById('painel1'));
}
