class Editor {
  static element(obj) {
    const keys = Object.keys(obj);
    if (keys.includes('id')) {
      let element = document.createElement('div');
      element.classList.add('Node');

      if (obj.id !== undefined) element.setAttribute('data-node', obj.id);
      if (obj.data !== undefined) element.innerText = JSON.stringify(obj.data);

      return element;
    } else if (keys.includes('from_id') && keys.includes('list')) {
      let element = document.createElement('div');
      element.classList.add('AdjacencyList');

      element.setAttribute('data-from_node', obj.from_id);

      return element;
    } else if (keys.includes('to')) {
      let element = document.createElement('div');
      element.classList.add('Edge');

      //Opcional. Nem toda aresta possui label
      let label = Editor.element(obj.label || { id: undefined, data: undefined });

      //Obrigatório. Toda aresta possui um destino
      let to = Editor.element(obj.to);

      element.appendChild(label); //Primeiro -> edge label
      element.appendChild(to); //Segundo -> to node

      return element;
    }
  }

  static it(element) {
    let id = element.getAttribute('data-node');
    let from_id = element.getAttribute('data-from_node');
    let { classList } = element;
    if (classList.contains('Node')) {
      return {
        id,
        data: JSON.parse(element.innerText)
      };
    } else if (classList.contains('AdjacencyList')) {
      return {
        from_id,
        data: JSON.parse(element.innerText)
      };
    } else if (classList.contains('Edge')) {
      let label = Editor.it(element.firstChild); //primeiro
      let to = Editor.it(element.firstChild.nextElementSibling); //segundo
      return { label, to };
    }
  }

  static graph(obj) {

  }
}