import Graphit from './graphit.js';

		init();
		
		function handle(event) {
			var reader = new FileReader();
			reader.onload = (e) => {
				let json = JSON.parse(e.target.result);
				init(json);
				graphit(json);
			};

			reader.readAsText(event.target.files[0]);
		}

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

		function graphit(json) {
			//Exibe conteúdo de "0" em uma filha de <body>
			let first = new Graphit(json, '0');
			document.body.appendChild(ell(first, `<div>${first.data}</div>)`));

			//Expansão de elemento
			document.body.addEventListener('click', event => {
				if(event.target.classList.contains('expansivel')) {
					event.target.classList.remove('expansivel');
					event.target.classList.add('expandido');
					expand(event.target, json);
				}
				event.stopPropagation();
			});

			//Edição de elemento
			document.body.addEventListener('dblclick', event => {
				event.target.setAttribute('contenteditable', true);
			});
		}		

		function ell(node, content) {
			let e = document.createElement('div');
			e.innerHTML = content;

			e = e.firstChild;
			e.setAttribute('data-nodo', node.id);

			e.classList.add('nodo');
			if(node.hasEdges() || node.hasContent()) e.classList.add('expansivel');

			e.setAttribute('contenteditable', false);

			return e;
		}

		function expand(element, json) {
			let n = new Graphit(json, element.getAttribute('data-nodo'));

			//Exibição das referências
			for(let neighbor of n.neighborhood) {
				let content = '<div class="referencia">'
							  +	`${neighbor.edge_text}: ${neighbor.node.data}`
							  + '</div>';
				element.appendChild(ell(neighbor.node, content));
			}

			//Exibição do conteúdo
			for (let child of n.children){
				element.appendChild(ell(child, `<div>${child.data}</div>`));
			}
		}

		function save(json) {
			let uriContent = 'data:application/octet-stream,' + encodeURIComponent(JSON.stringify(json));
			window.open(uriContent, 'novoDocumento');
		}