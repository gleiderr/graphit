class Editor {
  static element(obj, type) {
    switch (type) {
      case 'node':
        let element = document.createElement('div');
        element.classList.add('Node');
        element.setAttribute('data-node', obj.id);
        element.innerText = JSON.stringify(obj.data);
        return element;
    }
    if (obj.id !== undefined) {
      let element = document.createElement('div');
      element.classList.add('Node');
      element.setAttribute('data-node', obj.id);
      element.innerText = JSON.stringify(obj.data);
      return element;
    } else if (obj.from_id !== undefined && obj.list !== undefined) {
      let element = document.createElement('div');
      element.classList.add('Adjacency_List');
      element.setAttribute('data-from_node', obj.from_id);
      return element;
    } else if (obj.to !== undefined) {
      let element = document.createElement('div');
      element.classList.add('Edge');
      element.appendChild(Editor.element(obj.label)); //Primeiro -> edge label
      element.appendChild(Editor.element(obj.to)); //Segundo -> to node
      return element;
    }
  }

  static it(element) {
    let id = element.getAttribute('data-node');
    let from_id = element.getAttribute('data-from_node');
    if (id) {
      return {
        id,
        data: JSON.parse(element.innerText)
      };
    } else if (from_id) {
      return {
        from_id,
        data: JSON.parse(element.innerText)
      };
    }
  }

  static graph(obj) {

  }
}