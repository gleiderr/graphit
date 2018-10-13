import {Node} from './graphit.js';

export const expansível = (el) => {
	el = nodo_el(el);
	return el && el.classList.contains('Expansível') && el.childNodes.length == 1;
};

export const expandido = (el) => {
	el = nodo_el(el);
	return el && el.childNodes.length > 1;
};

export const element_from_nodo = (id) => {
	const node = new Node(id);

	const container = document.createElement('div');
	if(node.nContent) container.classList.add('Expansível');
	container.setAttribute('data-nodo', id);

	const data_element = document.createElement('div');
	data_element.classList.add('Data');
	data_element.contentEditable = 'true';
	data_element.innerHTML = node.data || '';

	container.append(data_element);

	return container;
};

export const nodo_el = el => {
	while (el && !el.hasAttribute('data-nodo')) el = el.parentElement; //iterando acima até encontrar o nodo pai
	return el;
};

export const nodo_from_element = el => {
	el = nodo_el(el);
	return new Node(el.getAttribute('data-nodo'));
};

const classify = (el) => {
	const node = nodo_from_element(el);

	if(node.nContent) el.classList.add('Expansível');
	el.setAttribute('data-nodo', node.id);

	el.firstChild.classList.add('Data');
	el.firstChild.contentEditable = 'true';
};

export const all_elements = id => {
	return Array.from(document.querySelectorAll(`[data-nodo="${id}"]`));
};

export const replace_me = (me_el, new_el) => {
	me_el.parentElement.replaceChild(new_el, me_el);
};

export const remove_from = (idx, parent_id) => {
	all_elements(parent_id).forEach((parent_el) => {
		if(parent_el.childElementCount == 2) {
			replace_me(parent_el, element_from_nodo(parent_id));
		} else if(expandido(parent_el)) {
			parent_el.childNodes[idx].remove();
		}
	});
};

export const insert_into = (child_id, parent_id) => {
	const all_parents = all_elements(parent_id);
	all_parents.forEach((parent_el) => { 
			if (expandido(parent_el)) {
				parent_el.appendChild(element_from_nodo(child_id));
			} else {
				classify(parent_el);
			}
		});

};