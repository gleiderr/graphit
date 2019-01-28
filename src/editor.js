class Editor {
  static element(obj) {
    const keys = Object.keys(obj);
    let element = document.createElement('div');
    if (keys.includes('from_id') && keys.includes('list')) {
      element.classList.add('AdjacencyList');

      element.setAttribute('data-from_node', obj.from_id);

      return element;
    } else if (keys.includes('to')) {
      element.classList.add('Edge');

      //Opcional. Nem toda aresta possui label
      let label = Editor.element(obj.label || { id: undefined });

      //Obrigatório. Toda aresta possui um destino
      let to = Editor.element(obj.to);

      element.appendChild(label); //Primeiro -> edge label
      element.appendChild(to); //Segundo -> to node

      return element;
    }

    element.classList.add('Node');

    if (obj.id !== undefined) element.setAttribute('data-node', obj.id);
    if (obj.data !== undefined) element.innerText = JSON.stringify(obj.data);

    return element;
  }

  static it(element) {
    let { classList } = element;
    if (classList.contains('Node')) {
      let data, id = element.getAttribute('data-node');

      if (element.innerText === '' || element.innerText === undefined) {
        data = undefined;
      } else {
        data = JSON.parse(element.innerText);
      }

      let rtn = {};
      if (id !== undefined && id !== null) rtn.id = id;
      if (data !== undefined) rtn.data = data;
      return rtn;
    } else if (classList.contains('AdjacencyList')) {
      let from_id = element.getAttribute('data-from_node');
      return {
        from_id,
        data: JSON.parse(element.innerText)
      };
    } else if (classList.contains('Edge')) {
      let label = Editor.it(element.firstChild); //primeiro
      let to = Editor.it(element.firstChild.nextElementSibling); //segundo

      if (label.id === undefined && label.data == undefined)
        return { to };
      else
        return { label, to };
    }
  }

  static graph(obj) {

  }
}