import {Node} from './graphit.js';
import {cabecalho} from './elements.js';

window.addEventListener('load', () => {
	fetch('./bíblia/kja.json')
		.then(response => response.json())
		.then(open, console.error)
		.catch(open);
});

document.addEventListener('click', event => {
	const target = event.target;
	if(target.classList.contains('Nodo')) {
		if(event.ctrlKey) { //Edição de elemento
			target.addEventListener('blur', blur);
			target.setAttribute('contenteditable', true);
			target.focus();
		}

		if(document.body.getAttribute('data-adding') == 'true') {
			inserir(target, newId);
		}
		event.stopPropagation();
	}
});

document.addEventListener('dblclick', event => {
	const target = event.target;
	if(target.classList.contains('Expansível')) { //Expansão de elemento
		
		expand(target.parentNode);
	}
	event.stopPropagation();
});

window.addEventListener('keydown', event => {
	switch (event.key) {
		case '+':
			if(event.ctrlKey) {
				event.preventDefault();
				document.body.setAttribute('data-adding', 'true');
			}
			break;
		case 'Escape':
			document.body.setAttribute('data-adding', 'false');
			targetSuperset = undefined;
			console.log(event.key);
			break;
	}
});

// ^^^^^^^^^ event_agregator
// vvvvvvvvv events

function open(json = {}) {
	Node.json = json;
	let targetSuperset;

	document.body = document.createElement('body');
	document.body.appendChild(cabecalho(handle));
	
	//Exibe conteúdo de "0" em uma filha de <body>
	let first = new Node('0');
	document.body.appendChild(contêinerElement(first));

	const newIdGenerator = keyGen(lastID(json), () => 0);
	const newId = () => newIdGenerator.next().value;
}

function handle(event) {
	var reader = new FileReader();
	reader.onload = (e) => {
		try {
			let json = JSON.parse(e.target.result);
			open(json);
		} catch(exception) {
			console.error(exception);
			open();
		}
	};

	reader.readAsText(event.target.files[0]);
}

function* keyGen(init = 0, next = Date.now) {
	var lastKey = init;
	while(true) {
		yield (lastKey = Math.max(next(), lastKey + 1)).toString(36);
	}
}

const classificação = (node, element) => {
	let c = [];
	if(node.nContent > 0) c.push('Conjunto');

	if(node.nContent > 0 && !element.classList.contains('Expandido')) {
		c.push('Expansível');
	}
	return c;
};

const nodoElement = node => {
	const element = document.createElement('div');
	element.classList.add('Nodo');

	element.innerText = node.data || '';
	element.setAttribute('data-nodo', node.id);
	element.classList.add(...classificação(node, element));

	return element;
}

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
}

const nodoFromElement = (element) => {
	return new Node(element.getAttribute('data-nodo'));
};

const lastID = json => {
	let maxId = 0;
	for (let id in json) if((id = parseInt(id, 36)) > maxId) maxId = id;
	console.log(maxId);
	return maxId;
};

function blur(event) {
	const target = event.target;
	target.removeEventListener('blur', blur);
	target.removeAttribute('contenteditable');

	if(target.classList.contains('Nodo')) { 
		let node = new Node(target.getAttribute('data-nodo'));
		node.data = target.innerHTML;
		propagate(`[data-nodo="${node.id}"]`, target, json);
	}
}

function inserir(target, newId) {
	if(!targetSuperset) {
		if(target.id != 'novo_nodo') targetSuperset = target;
		return;
	}

	if(target.id == 'novo_nodo') {
		target.setAttribute('data-nodo', newId());
	}

	let superset = nodoFromElement(targetSuperset);

	superset.insert(nodoFromElement(target));

	targetSuperset.classList.add(...classificação(superset, targetSuperset));
	if(targetSuperset.classList.contains('Expandido')) {
		appendContent(targetSuperset.parentElement, superset.nContent - 1, superset);
	}
	
	propagate(`[data-nodo="${superset.id}"]`, targetSuperset, json);

	document.body.setAttribute('data-adding', 'false');
	targetSuperset = undefined;
}

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

function save(json) {
	let content = JSON.stringify(json, null, 1);
    let blob = new Blob([content], { type: 'text/plain' });
    let	anchor = document.createElement('a');

	anchor.download = "graphit.json";
	anchor.href = window.URL.createObjectURL(blob);
	anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
	anchor.click();
}