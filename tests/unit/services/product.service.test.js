const { expect } = require("chai");
const sinon = require("sinon");

const productModel = require("../../../src/models/product.model");
const productService = require("../../../src/services/product.service");

const { productsFromDB } = require("./mocks/product.service.mock");

describe("Testes de unidade na camada Service", function () {
  describe("Testes de busca de produtos", function () {
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

  describe("Testes na inserção de produtos", function () {
    it("Verifica se insere um produto com sucesso", async function () {
      sinon
        .stub(productModel, "createProduct")
        .resolves({ id: 42, name: "Pc Gamer" });

      const productName = "Pc Gamer";
      const result = await productService.createProduct(productName);

      expect(result).to.be.deep.equal({ id: result.id, name: "Pc Gamer" });
    });

    it("Testa a validação do campo name vazio", async function () {
      sinon
        .stub(productModel, "createProduct")
        .resolves({ type: 'BAD_REQUEST', message: '"name" is required' });

      const productName = "";
      const { type, message } = await productService.createProduct(productName);

      expect(type).to.be.equal('BAD_REQUEST')
      expect(message).to.be.equal('"name" is required')
    });   

    it("Testa a validação do campo name com menos de 5 caracteres", async function () {
      sinon
        .stub(productModel, "createProduct")
        .resolves({ type: 'UNPROCESSABLE_ENTITY', message: '"name" length must be at least 5 characters long' });

      const productName = "abcd";
      const { type, message } = await productService.createProduct(productName);

      expect(type).to.be.equal('UNPROCESSABLE_ENTITY')
      expect(message).to.be.equal('"name" length must be at least 5 characters long')
    });      

    afterEach(sinon.restore);
  });
});
