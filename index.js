import * as graphit from './graphit.js';

window.addEventListener('load', () => {
	fetch('./exemplos/bíblia.json').then(response => {
		return response.json();
	}).then(iniciarPágina)
	.catch(ex => {
		console.error(ex);
		iniciarPágina();
	});
});

function iniciarPágina(json = {}) {
	let div = document.createElement('div');
	div.classList.add('Cabeçalho');
	
	div.innerHTML = '<input id="input" type="file" accept=".json">';
	let input = div.firstChild;
	input.addEventListener('input', handle);

	let button = document.createElement('button');
	button.innerHTML = '💾 salvar';
	button.addEventListener('click', () => {save(json);});

	div.appendChild(button);

	document.body.innerHTML = '';
	document.body.appendChild(div);
	
	open(json);
};

function handle(event) {
	var reader = new FileReader();
	reader.onload = (e) => {
		try {
			let json = JSON.parse(e.target.result);
			iniciarPágina(json);
		} catch(exception) {
			console.error(exception);
			iniciarPágina();
		}
	};

	reader.readAsText(event.target.files[0]);
}

const nodoElement = node => {
	const nodo = document.createElement('div');
	nodo.classList.add('Nodo');

	nodo.innerText = node.data || '';
	nodo.setAttribute('data-nodo', node.id);
	if(node.hasEdges() || node.hasContent()) nodo.classList.add('Expansível');

	return nodo;
}

const contêinerElement = node => {
	const container = document.createElement('div');
	container.classList.add('Contêiner');
	container.appendChild(nodoElement(node));

	return container;
}

const refElement = edge => {
	const aresta = document.createElement('div');
	aresta.classList.add('Aresta');
	aresta.setAttribute('data-from', edge.from.id);
	aresta.setAttribute('data-idx', edge.idx);
	aresta.innerHTML = edge.data;

	const ref = document.createElement('div');
	ref.classList.add('Referência');
	ref.appendChild(aresta);

	ref.appendChild(contêinerElement(edge.to));
	return ref;
}
 
function open(json) {
	//Exibe conteúdo de "0" em uma filha de <body>
	let first = new graphit.Node('0', json);
	document.body.appendChild(contêinerElement(first));

	document.addEventListener('click', event => {
		const target = event.target;
		if(event.ctrlKey && (target.classList.contains('Nodo') || target.classList.contains('Aresta'))) { //Edição de elemento
			target.addEventListener('blur', blur);
			target.setAttribute('contenteditable', true);
			target.focus();
		} else if(target.classList.contains('Expansível')) { //Expansão de elemento
			target.classList.remove('Expansível');
			target.classList.add('Expandido');
			expand(target.parentNode, json);
		}
		event.stopPropagation();
	});
	
	function blur(event) {
		const target = event.target;
		target.removeEventListener('blur', blur);
		target.removeAttribute('contenteditable');

		if(target.classList.contains('Nodo')) {
			let node = new graphit.Node(target.getAttribute('data-nodo'), json);
			node.data = target.innerHTML;
			propagate(node, target);
		} else if(target.classList.contains('Aresta')) {
			const from = target.getAttribute('data-from');
			const idx = target.getAttribute('data-idx');
			const edge = new graphit.Edge(from, idx, json);
			edge.data = target.innerHTML;
		}
	}
}

function expand(container, json) {
	let n = new graphit.Node(container.firstChild.getAttribute('data-nodo'), json);

	//Exibição das referências
	for(let edge of n.edges) container.appendChild(refElement(edge));

	//Exibição do conteúdo
	for (let child of n.children) container.appendChild(contêinerElement(child));
}

function propagate(node, origem) {
	let elements = Array.from(document.querySelectorAll('[data-nodo="' + node.id + '"]'));
	for (const element of elements) {
		if (element != origem) {
			const classList = element.classList;
			const newElement = nodoElement(node);
			newElement.classList = classList;

			element.parentNode.replaceChild(newElement, element);
		}
	}
}

function save(json) {
	let uriContent = 'data:application/octet-stream,' + encodeURIComponent(JSON.stringify(json, null, 4));
	window.open(uriContent, 'novoDocumento');
}