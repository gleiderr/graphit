export const cabecalho = (handle) => {
	let div = document.createElement('div');
	div.classList.add('Cabeçalho');
	
	div.innerHTML = '<input id="input" type="file" accept=".json">';
	let input = div.firstChild;
	input.addEventListener('input', handle);

	let button = document.createElement('button');
	button.innerHTML = '💾 salvar';
	//button.addEventListener('click', () => {save(json);});

	div.appendChild(button);

	const novoNodo = document.createElement('div');
	novoNodo.id	= 'novo_nodo';
	novoNodo.innerText = 'Novo nodo';
	novoNodo.classList.add('Nodo');
	div.appendChild(novoNodo);

	return div;
};