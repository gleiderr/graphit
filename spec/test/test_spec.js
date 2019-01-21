const admin = require("firebase-admin");
const serviceAccount = require("../../graphit-js-firebase-adminsdk.json");

const Graphit = require('../../src/graphit').Graphit;
const Graphit_Firebase = require('../../src/graphit-firebase').Graphit_Firebase;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://graphit-js.firebaseio.com"
});
admin.auth();

let test_ref, g;

describe("Graphit integrado ao Firebase", function() {
  beforeAll(function() {
    test_ref = '__graphit-test__';
    g = new Graphit(new Graphit_Firebase(admin.database(), test_ref));
  });

  afterAll(function() {
    admin.database().ref(test_ref).remove();
  });

  describe('Graphit.node()', function() {
    describe(', quando não informado [id]', function() {
      it("e informado [obj], deve retornar instância de GNode com algum novo [id] e [obj] igual ao informado.", function() {
        const value = 'teste';
        return g.node({ obj: value })
          .then(obj => {
            expect(obj.id).toEqual(jasmine.anything());
            expect(obj.obj).toEqual(value);
          })
          .catch((error) => fail(error));
      });

      it("e não informado [obj], deve retornar instância de GNode com novo [id] definido e [obj] indefinido.", function() {
        return g.node({})
          .then(obj => {
            expect(obj.id).toEqual(jasmine.anything());
            expect(obj.obj).toBeUndefined();
          })
          .catch((error) => fail(error));
      });
    });

    describe(', quando informado [id]', function() {
      it('e informado [obj], deve retornar instância de GNode com [id] e [obj] iguais aos informados.', function() {
        const value = Math.random();
        id = 0;
        return g.node({ id, obj: value })
          .then(obj => {
            expect(obj.id).toEqual(id);
            expect(obj.obj).toEqual(value);
          })
          .catch((error) => fail(error));
      });

      describe('e não informado [obj]', function() {
        it('(id existente na base), deve retornar instância de GNode com [id] igual ao informado e [obj] igual ao existente na base.', async function() {
          const value = Math.random();
          new_obj = await g.node({ obj: value });

          return g.node({ id: new_obj.id })
            .then(obj => {
              expect(obj.id).toEqual(new_obj.id);
              expect(obj.obj).toEqual(value);
            })
            .catch((error) => fail(error));
        });

        it('(id não existente na base), deve retornar instância de GNode com [id] igual ao informado e [obj] indefinido.', async function() {
          let new_obj, id;
          do {
            id = Math.ceil(Math.random() * 1000);
            new_obj = await g.node({ id });
          } while (new_obj.obj != undefined);

          return g.node({ id })
            .then(obj => {
              expect(obj.id).toEqual(id);
              expect(obj.obj).toBeUndefined();
            })
            .catch((error) => fail(error));
        });

      });
    });
  });

  describe('Graphit.adj()', function() {
    it(', quando não informado [id], deve lançar erro.', function() {
      return g.adj({ list: [1] })
        .then(() => fail('Inserção indevida concluída com sucesso!'))
        .catch((error) => expect(() => { throw error; }).toThrowError());
    });
  });

  xit("deve permitir a exclusão de strings", function() {
    fail('Teste não escrito');
  });

});