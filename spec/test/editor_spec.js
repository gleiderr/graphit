describe('Editor', () => {
  let id, from_id, data, list, label, to;

  describe('element({id, data})', () => {
    it('deve retornar instance_of Element', () => {
      id = 1;
      data = Math.random();
      expect(Editor.element({ id, data }) instanceof Element).toBeTruthy();
    });
  });

  xdescribe('element({from_id, list})', () => {
    it('deve retornar instance_of Element', () => {
      from_id = 1;
      list = [];
      expect(Editor.element({ from_id, list }) instanceof Element).toBeTruthy();
    });
  });

  xdescribe('element({[label,] to})', () => {
    it('deve retornar instanceof Element', () => {
      data = 1;
      id = 1;
      label = { id, data };
      to = { id, data };
      expect(Editor.element({ label, to }) instanceof Element).toBeTruthy();

      expect(Editor.element({ to }) instanceof Element).toBeTruthy();
    });
  });

  xdescribe('it(element({label, to}))', () => {
    it('deve retornar {label, to}', () => {
      id = 1, data = 1;
      label = { id, data };
      to = { id, data };
      expect(Editor.it(Editor.element({ label, to }))).toEqual({ label, to });
    });
  });

  xdescribe('it(element({to}))', () => {
    it('deve retornar {to}', () => {
      id = 1, data = 1;
      to = { id, data };
      expect(Editor.it(Editor.element({ to }))).toEqual({ to });
    });
  });

  describe('it(element({id, data}))', () => {
    it('deve retornar {id, data}', () => {
      id = 1;
      data = Math.random();
      expect(Editor.it(Editor.element({ id, data }))).toEqual({ id: String(id), data });

      id = '1';
      data = { a: 1, b: 2 };
      expect(Editor.it(Editor.element({ id, data }))).toEqual({ id, data });

      id = 'asdf';
      data = Math.random();
      expect(Editor.it(Editor.element({ id, data }))).toEqual({ id, data });

      id = 'asdf';
      data = [0, 1, 2];
      expect(Editor.it(Editor.element({ id, data }))).toEqual({ id, data });

      id = 'asdf';
      data = { a: 1, b: 2 };
      expect(Editor.it(Editor.element({ id, data }))).toEqual({ id, data });
    });
  });

  describe('it(element({id}))', () => {
    it('deve retornar {id}', () => {
      id = 1;
      expect(Editor.it(Editor.element({ id }))).toEqual({ id: String(id) });

      id = '1';
      expect(Editor.it(Editor.element({ id }))).toEqual({ id });

      id = 'asdf';
      expect(Editor.it(Editor.element({ id }))).toEqual({ id });
    });
  });

  xdescribe('it(element({data}))', () => {
    it('deve retornar {data}', () => {
      data = Math.random();
      expect(Editor.it(Editor.element({ id, data }))).toEqual({ id: String(id), data });

      data = { a: 1, b: 2 };
      expect(Editor.it(Editor.element({ id, data }))).toEqual({ id, data });

      id = 'asdf';
      data = [0, 1, 2];
      expect(Editor.it(Editor.element({ id, data }))).toEqual({ id, data });
    });
  });

  describe('it(element({}))', () => {
    it('deve retornar {}', () => {
      expect(Editor.it(Editor.element({}))).toEqual({});
    });
  });

  xdescribe('it(element({from_id, list[edge_1, edge_2, ..., edge_n]}))', () => {
    it('deve retornar {from_id, list[edge_1, edge_2, ..., edge_n]}', () => {
      from_id = 1;
      list = [];
      expect(Editor.it(Editor.element({ from_id, list }))).toEqual({ from_id: String(from_id), list });

      from_id = '1';
      list = [];
      expect(Editor.it(Editor.element({ from_id, list }))).toEqual({ from_id, list });

      from_id = 'asdf';
      list = [];
      expect(Editor.it(Editor.element({ from_id, list }))).toEqual({ from_id, list });

      from_id = 'asdf';
      list = [0, 1, 2];
      expect(Editor.it(Editor.element({ from_id, list }))).toEqual({ from_id, list });
    });
  });
  xdescribe('graph({from_id, list})', () => {
    it('deve realizar chamada de graphit.adj()');
  });
  xdescribe('graph({id, data})', () => {
    it('deve realizar chamada de graphit.node()');
  });
});