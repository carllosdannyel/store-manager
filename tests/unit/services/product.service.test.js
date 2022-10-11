const { expect } = require("chai");
const sinon = require("sinon");

const productModel = require("../../../src/models/product.model");
const productService = require("../../../src/services/product.service");

const { productsFromDB } = require("./mocks/product.service.mock");

describe("Testes na camada Service", function () {
  describe("Testes de unidade do model de products", function () {
    it("Busca de todos os produtos", async function () {
      sinon.stub(productModel, "getAllProducts").resolves(productsFromDB);

      const result = await productService.getAllProducts();

      expect(result.status).to.equal(null);
      expect(result.message).to.equal(productsFromDB);
    });

    it("Busca de um produto pelo id", async function () {
      sinon.stub(productModel, "getProductById").resolves(productsFromDB[0]);

      const id = 1;
      const result = await productService.getProductById(id);

      expect(result.status).to.equal(null);
      expect(result.message).to.equal(productsFromDB[0]);
    });

    it("retorna undefined caso não encontre o produto", async function () {
      sinon.stub(productModel, "getProductById").resolves(undefined);

      const id = 999;
      const result = await productService.getProductById(id);

      expect(result.status).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });
    afterEach(sinon.restore);
  });
});
