import {Node} from './graphit.js';

export const element_from_nodo = (id) => {
	const node = new Node(id);

	const container = document.createElement('div');
	const data_element = document.createElement('div');
	container.append(data_element);

	container.classList.add('Contêiner');
	container.setAttribute('data-nodo', id);

	if(node.nContent) data_element.classList.add('Expansível');
	data_element.contentEditable = 'true';
	data_element.innerHTML = node.data || '';

	return container;
};

export const nodo_el = el => {
	while (!el.hasAttribute('data-nodo')) el = el.parentElement; //iterando acima até encontrar o nodo pai
	return el;
};

export const nodo_from_element = el => {
	el = nodo_el(el);
	return new Node(el.getAttribute('data-nodo'));
};

export const all_elements = id => {
	return Array.from(document.querySelectorAll(`[data-nodo="${id}"]`));
};

export const replace_me = (me_el, new_el) => {
	me_el.parentElement.replaceChild(new_el, me_el);
};