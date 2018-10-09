import {expand, retract, apply, insert, remove, show } from './facade.js';
import {open_file, save_file} from './file_io.js';//

const state = {};

const state_machine = new class {
	constructor() {
		this.selected = [];
	}

	select(el) {
		if(this.selected.includes(el)) {
			this.deselect(el);
		} else {
			this.selected.push(el);
			el.style.background = 'peachpuff';
		}
	}

	deselect(blur_el) {
		this.selected = this.selected.filter((el) => blur_el != el);
		blur_el.style.background = null;
	}
}();

window.addEventListener('load', () => {
	fetch('./bíblia/kja.json')
		.then(response => response.json())
		.then(show, (err) => {
			console.error(err);
			show({});
		});
});

document.addEventListener('click', event => {
	const target = event.target;

	if(target.type == 'file') {
		target.oninput = ev => {
			open_file(ev)
				.then(show, (err) => {
					console.error(err);
					show({});
			});
		};
	} else if (target.type == 'submit') {
		let input = document.getElementsByTagName('input')[0]; //review
		save_file(input.files[0] && input.files[0].name)
			.then(() => {
				let date = new Date(),
					h = date.getHours()   < 10 ? '0' + date.getHours() :   date.getHours(),
					m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
					s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

				document.getElementById('save_at').innerText = 'Salvo às: ' + `${h}:${m}:${s}`;
			});
	} else if (target.hasAttribute('contentEditable')) {
		if(event.ctrlKey) state_machine.select(target);
	}
});

document.addEventListener('dblclick', event => expand(event.target) || retract(event.target));

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
				event.preventDefault();
				state_machine.selected.forEach(remove);
			}
			break;
		case 'Enter':
			//Ctrl + Enter insere novo nodo no nodo focado
			//Ctrl + Shift + Enter insere nodo existente no nodo focado
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
			state_machine.selected.forEach((el) => state_machine.deselect(el));
			break;
	}
});

document.addEventListener('focus', ev => {
	state.focused = ev.target;
}, true);

document.addEventListener('input', ev => {
	apply(ev.target);
}, true);
