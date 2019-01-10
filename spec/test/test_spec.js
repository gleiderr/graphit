const admin = require("firebase-admin");
const serviceAccount = require("../../graphit-js-firebase-adminsdk.json");

const Graphit = require('../../src/graphit').Graphit;
const Graphit_Firebase = require('../../src/graphit-firebase').Graphit_Firebase;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://graphit-js.firebaseio.com"
});
admin.auth();

let test_ref = '__graphit-test__';
let g = new Graphit(new Graphit_Firebase(admin.database(), test_ref));

describe("Graphit integrado ao Firebase", function() {
  afterAll(function() {
    admin.database().ref(test_ref).remove();
  });

  describe('Graphit.node()', function() {
    describe(', quando não informado [id]', function() {
      it("e informado [obj], deve retornar instância de GNode com novo [id] e [obj] definidos.", function() {
        return g.node({ obj: 'teste' })
          .then(obj => {
            expect(obj.id).toEqual(jasmine.anything());
            expect(obj.obj).toEqual('teste');
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
      xit('e informado [obj]');
      xit('e não informado [obj]');
    });
  });

  describe('Graphit.adj()', function() {
    it(', quando não informado [id], deve lançar erro.', function() {
      return g.adj({ list: [1] })
        .then(() => fail('Inserção indevidamente concluída com sucesso!'))
        .catch((error) => expect(() => { throw error; }).toThrowError());
    });
  });

  xit("deve permitir a exclusão de strings", function() {
    fail('Teste não escrito');
  });

});