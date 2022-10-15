const { expect } = require("chai");
const sinon = require("sinon");

const { connection } = require("../../../src/models/db/connection");
const productModel = require("../../../src/models/product.model");

const { productsFromDB } = require("./mocks/product.model.mock");

describe("Testes de unidade na camada Model", function () {
  describe("Testes de buscar de produtos", function () {
    it("Busca de todos os produtos", async function () {
      sinon.stub(connection, "execute").resolves([productsFromDB]);

      const result = await productModel.getAllProducts();

      expect(result).to.equal(productsFromDB);
    });

    it("Busca de um produto pelo id", async function () {
      sinon.stub(connection, "execute").resolves([[productsFromDB[0]]]);

      const id = 1;
      const result = await productModel.getProductById(id);

      expect(result).to.be.deep.equal(productsFromDB[0]);
    });

    it("retorna array vazio caso não encontre o produto", async function () {
      sinon.stub(connection, "execute").resolves([[]]);

      const id = 999;
      const result = await productModel.getProductById(id);

      expect(result).to.equal(undefined);
    });

    afterEach(sinon.restore);
  });

  describe("Testes na inserção de produtos", function () {
    it("Verifica se insere um produto com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 42 }]);

      const productName = "Pc Gamer";
      const result = await productModel.createProduct(productName);

      expect(result).to.be.equal(42);
    });

    afterEach(sinon.restore);
  });

  describe("Testes na atualização de produtos", function () {
    it("Verifica se retorna undefined caso nao encontre o produto", async function () {
      sinon.stub(connection, "execute").resolves([[]]);

      const id = 999;
      const name = "Pc Gamer";
      const result = await productModel.updateProduct(id, name);

      expect(result).to.equal(undefined);
    });

    it("Verifica se retorna o novo produto atualizado", async function () {
      sinon
        .stub(connection, "execute")
        .resolves([[{ id: 42, name: "Pc Gamer" }]]);

      const id = 42;
      const name = "Pc Gamer";
      const result = await productModel.updateProduct(id, name);

      expect(result).to.be.deep.equal({
        id: 42,
        name: "Pc Gamer",
      });
    });

    afterEach(sinon.restore);
  });

  describe("Testes na tentativa de deletar um produto", function () {
    it("Tentando remover um produto existente", async function () {
      sinon.stub(connection, "execute").resolves([productsFromDB[0]]);

      const id = 999;
      const result = await productModel.deleteProductById(id);

      expect(result).to.be.equal(null);
    });

    it("Tentando remover um produto inexistente", async function () {
      sinon.stub(connection, "execute").resolves([[{ affectedRows: 0 }]]);

      const id = 1;
      const [result] = await productModel.deleteProductById(id);

      expect(result.affectedRows).to.be.equal(0);
    });

    afterEach(sinon.restore);
  });

    describe("Busncando produtos atraves da query de busca", function () {
    it("verifica se retorna todos os produtos ao nao passar um valor", async function () {
      sinon.stub(connection, "execute").resolves([productsFromDB]);

      const name = "";

      const result = await productModel.getProductByName(name);

      expect(result).to.be.deep.equal(productsFromDB);
    });

    it("verifica se retona o produto especifico Martelo de Thor", async function () {
      sinon.stub(connection, "execute").resolves([productsFromDB[0]]);

      const name = "Martelo";

      const result = await productModel.getProductByName(name);

      expect(result).to.be.deep.equal(productsFromDB[0]);
    });

    afterEach(sinon.restore);
  });
});
