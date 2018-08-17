export function import_kja() {
	fetch('./kja.txt')
		.then(response => response.text())
		.then(text => {
			const newIdGenerator = keyGen(0, () => 0);
			const newId = () => newIdGenerator.next().value;

			Node.json = {};
			let nodoLivro, nodoCapítulo;
			let livro, capítulo;
			let nodoBiblia = new Node('0');
			nodoBiblia.data = 'Bíblia King James Atualizada';

			let lines = text.match(/.+/gi);
			let i = 0;
			for(let line of lines) {
				let match = line.match(/(.+?)\s+(\d+):(\d+)\s+(.+)/i);
				if(livro != match[1]) {
					livro = match[1];
					nodoLivro = new Node(newId());
					nodoLivro.data = livro;
					
					capítulo = match[2];
					nodoCapítulo = new Node(newId());
					nodoCapítulo.data = 'Capítulo ' + capítulo;
					nodoLivro.insert(nodoCapítulo);

					nodoBiblia.insert(nodoLivro)
				} else if (capítulo != match[2]) {
					capítulo = match[2];
					nodoCapítulo = new Node(newId());
					nodoCapítulo.data = 'Capítulo ' + capítulo;
					nodoLivro.insert(nodoCapítulo);
				}
				let nodoVersículo = new Node(newId());
				nodoVersículo.data = match[3] + '. ' + match[4];
				nodoCapítulo.insert(); //Versículo
				
				//console.log(match);
				//if(i++ == 30000) break;
			}
			//console.log(json);
			return json;
		})
		.then(iniciarPágina)
		.catch(ex => {console.error(ex)});
}