import {expand, retract, apply, insert, remove, show } from './facade.js';
import {open_file, save_file, set_file} from './file_io.js';//

const state = {};
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
	if(state.state == 'inserting' && target.hasAttribute('data-nodo')) {
	   	state.selected.push(target);
	   	target.style.background = 'peachpuff';
	}

	if(target.type == 'file') target.oninput = ev => {
		open_file(ev, show);
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
	//console.log(event.key);
	switch (event.key) {
		case 'i': case 'I': //Incluir nodo
			if(event.target.hasAttribute('data-nodo')) {
				if(event.ctrlKey && !event.shiftKey) {
					state.state = "inserting";
					state.selected = [state.focused];
					document.body.setAttribute('data-selecting', 'true');

					state.selected[0].style.background = 'orange';
				}	
			}
			break;
		case 'Delete': //Excluir nodo
			if(event.ctrlKey) {
				remove(state.focused);
			}
			break;
		case 'Enter':
			if(state.state == 'inserting'){
				event.preventDefault();
				if(state.selected.length == 1) insert(state.selected[0]);
				else for(let i = 1; i < state.selected.length; i++) {
					insert(state.selected[0], state.selected[i]);
				}
				
				//Encerra seleção
				for(let i = 0; i < state.selected.length; i++) state.selected[i].style.background = null;
				document.body.setAttribute('data-selecting', 'false');
				state.state = state.selected = undefined;
			}
			break;
		case 'Escape':
			//Encerra seleção
			if(state.selected) {
				for(let i = 0; i < state.selected.length; i++) state.selected[i].style.background = null;
				document.body.setAttribute('data-selecting', 'false');
				state.state = state.selected = undefined;
			} 
			break;
	}
});

document.addEventListener('focus', ev => {
	state.focused = ev.target;
}, true);

document.addEventListener('blur', ev => {
	if(ev.target.hasAttribute('data-nodo')) apply(ev.target);
}, true);
