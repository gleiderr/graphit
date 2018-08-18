import {Node} from './graphit.js';
import {nodo_element, expand, retract} from './facade.js';
import {open_file, save_file, set_file} from './file_io.js';

window.addEventListener('load', () => {
	fetch('./bíblia/kja.json')
		.then(response => response.json())
		.then(set_file, ex => {
			console.error(ex);
			set_file({});
		})
		.then(show);
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

	if(target.type == 'file') target.oninput = ev => {
		open_file(ev);
		show();
	};
	if(target.type == 'submit') save_file();	
});

document.addEventListener('dblclick', event => {
	const target = event.target;
	if(target.classList.contains('Expansível')) { //Expansão de elemento
		expand(target);
	} else if(target.classList.contains('Expandido')) {
		retract(target);
	}
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

document.addEventListener('blur', ev => {
	console.log(ev);
}, true);

// ^^^^^^^^^ event_agregator
// vvvvvvvvv events

function show() {
	document.body.appendChild(nodo_element(0));
}
