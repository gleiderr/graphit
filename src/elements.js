/*export const cabecalho = (open_file, save_file) => {
	let div = document.createElement('div');
	div.classList.add('Cabeçalho');
	
	div.innerHTML = '<input id="input" type="file" accept=".json">';
	let input = div.firstChild;
	input.addEventListener('input', open_file);

	let button = document.createElement('button');
	button.innerHTML = '💾 salvar';
	button.addEventListener('click', save_file);

	div.appendChild(button);

	const novoNodo = document.createElement('div');
	novoNodo.id	= 'novo_nodo';
	novoNodo.innerText = 'Novo nodo';
	novoNodo.classList.add('Nodo');
	div.appendChild(novoNodo);

	return div;
};*/

const classificação = (node, element) => {
	let c = [];
	if(node.nContent > 0) c.push('Conjunto');

	if(node.nContent > 0 && !element.classList.contains('Expandido')) {
		c.push('Expansível');
	}
	return c;
};



const contêinerElement = node => {
	const container = document.createElement('div');
	container.classList.add('Contêiner');
	container.appendChild(nodoElement(node));

	const referencias = document.createElement('div');
	referencias.classList.add('Referências');
	container.appendChild(referencias);

	const conteúdo = document.createElement('div');
	conteúdo.classList.add('Conteúdo');
	container.appendChild(conteúdo);

	return container;
};

const nodoFromElement = (element) => {
	return new Node(element.getAttribute('data-nodo'));
};

const appendContent = (container, idx, n) => {
	const conteúdo_el = container.firstChild.nextElementSibling.nextElementSibling;
	conteúdo_el.appendChild(contêinerElement(n.content(idx)));
};

function expand(container, json) {
	const nodo_el = container.firstChild;
	const referências_el = nodo_el.nextElementSibling;
	const conteúdo_el = referências_el.nextElementSibling;
	const n = new Node(nodo_el.getAttribute('data-nodo'));

	//Exibição do conteúdo
	for(let idx = 0; idx < n.nContent; idx++) appendContent(container, idx, n);

	nodo_el.classList.remove('Expansível');
	nodo_el.classList.add('Expandido');
}

function propagate(selector, origem, json) {
	let elements = Array.from(document.querySelectorAll(selector));
	for (const element of elements) {
		if (element != origem && element.id != 'novo_nodo') {
			element.innerHTML = origem.innerHTML;
			if(element.hasAttribute('data-nodo'))
				element.classList.add(...classificação(nodoFromElement(element), element));
			//const classList = element.classList;
			//const newElement = origem.cloneNode(true);
			//newElement.classList = classList;

			//element.parentNode.replaceChild(newElement, element);
		}
	}
}