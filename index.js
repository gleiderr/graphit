import Graphit from './graphit.js';

init();

function init(json = null) {
	let div = document.createElement('div');
	
	div.innerHTML = '<input id="input" type="file" accept=".json">';
	let input = div.firstChild;
	input.addEventListener('input', handle);

	let button = document.createElement('button');
	button.innerHTML = '💾 salvar';
	button.addEventListener('click', () => {save(json);});

	div.appendChild(button);

	document.body.innerHTML = '';
	document.body.appendChild(div);
};

function handle(event) {
	var reader = new FileReader();
	reader.onload = (e) => {
		let json = JSON.parse(e.target.result);
		init(json);
		graphit(json);
	};

	reader.readAsText(event.target.files[0]);
}

const nodoElement = node => {
	const nodo = document.createElement('div');
	nodo.classList.add('Nodo');

	nodo.innerText = node.data;
	nodo.setAttribute('data-nodo', node.id);
	nodo.setAttribute('contenteditable', false);
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
	aresta.innerHTML = edge.edge_text;

	const ref = document.createElement('div');
	ref.classList.add('Referência');
	ref.appendChild(aresta);

	ref.appendChild(contêinerElement(edge.node));
	return ref;
}
 
function graphit(json) {
	//Exibe conteúdo de "0" em uma filha de <body>
	let first = new Graphit(json, '0');
	document.body.appendChild(contêinerElement(first));

	document.addEventListener('click', event => {
		if(event.ctrlKey) { //Edição de elemento
			event.target.addEventListener('blur', blur);

			event.target.setAttribute('contenteditable', true);
			event.target.focus();

		} else if(event.target.classList.contains('Expansível')) { //Expansão de elemento
			event.target.classList.remove('Expansível');
			event.target.classList.add('Expandido');
			expand(event.target.parentNode, json);
		}
		event.stopPropagation();
	});

	
	function blur(event) {
		event.target.removeEventListener('blur', blur);
		event.target.removeAttribute('contenteditable');

		let node = new Graphit(json, event.target.getAttribute('data-nodo'));
		node.data = event.target.firstChild.wholeText;

		propagate(node, event.target);
	}
}

function expand(container, json) {
	let n = new Graphit(json, container.firstChild.getAttribute('data-nodo'));

	//Exibição das referências
	for(let neighbor of n.neighborhood) container.appendChild(refElement(neighbor));

	//Exibição do conteúdo
	for (let child of n.children) container.appendChild(contêinerElement(child));
}

function propagate(node, origem) {
	let elements = Array.from(document.querySelectorAll('[data-nodo="' + node.id + '"]'));
	for (const element of elements) {
		if (element != origem) {
			let parent = element.parentNode;
			parent.replaceChild(nodoElement(node), element);
		}
	}
}

function save(json) {
	let uriContent = 'data:application/octet-stream,' + encodeURIComponent(JSON.stringify(json));
	window.open(uriContent, 'novoDocumento');
}