const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const { expect } = require("chai");

const productService = require("../../../src/services/product.service");
const productController = require("../../../src/controllers/product.controller");
const { productsFromDB } = require("./mocks/product.controller.mock");

describe("Testes de unidade na camada Controller", function () {
  describe("Testes de busca de produtos", function () {
    it("Busca de todos os produtos", async function () {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, "getAllProducts")
        .resolves({ status: null, message: productsFromDB });

      await productController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsFromDB);
    });

    it("Busca de um produto pelo id", async function () {
      const req = { params: 1 };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, "getProductById")
        .resolves({ status: null, message: productsFromDB[0] });

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsFromDB[0]);
    });

    it("retorna status 404 e uma mensagem de not found caso não encontre o produto", async function () {
      const req = { params: 999 };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, "getProductById")
        .resolves({ status: "NOT_FOUND", message: "Product not found" });

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    beforeEach(sinon.restore);
  });

  describe("Testes na inserção de produtos", function () {
    it("Verifica se insere um produto com sucesso", async function () {
      const req = { body: { name: "Pc Gamer" } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, "createProduct")
        .resolves({ id: 42, name: "Pc Gamer" });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 42,
        name: "Pc Gamer",
      });
    });

    it("Testa a validação do campo name vazio", async function () {
      const req = { body: { name: "" } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, "createProduct")
        .resolves({ type: "BAD_REQUEST", message: '"name" is required' });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
    });

    beforeEach(sinon.restore);
  });

  describe("Testes na atualização de produtos", function () {
    it("verifica se atualiza um produto com sucesso", async function () {
      const req = { params: 1, body: { name: "Pc Gamer" } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, "updateProduct")
        .resolves({ id: 1, name: "Pc Gamer" });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 1, name: "Pc Gamer" });
    });

    it("verifica se retorna 'Product not' found com o produto inexistente", async function () {
      const req = { params: 999, body: "Pc Gamer" };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = { status: "NOT_FOUND", message: "Product not found" };

      sinon.stub(productService, "updateProduct").resolves(result);

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    it("Verifica se retorna erro ao atualizar com name inexistente", async function () {
      const req = { params: 1, body: { name: "" } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = { type: "NOT_FOUND", message: '"name" is required' };

      sinon.stub(productService, "updateProduct").resolves(result);

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
    });

    beforeEach(sinon.restore);
  });

  describe("Testes na tentativa de deletar um produto", function () {
    it("Tentando deletar um produto existente", async function () {
      const req = { params: { id: 1 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = { status: null, message: null };

      sinon.stub(productService, "deleteProductById").resolves(result);

      await productController.deleteProductById(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith(null);
    });

    it("Tentando deletar um produto inexistente", async function () {
      const req = { params: { id: 999 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = { status: "NOT_FOUND", message: "Product not found" };

      sinon.stub(productService, "deleteProductById").resolves(result);

      await productController.deleteProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: result.message });
    });

    beforeEach(sinon.restore);
  });

    describe("Testes na busca de produtos", function () {
    it("verifica se retorna todos os produtos com a busca vazia", async function () {
      const req = { query: { q: "" } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "getProductByName").resolves(productsFromDB);

      await productController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsFromDB);
    });

    it("verifica se retona o produto especifico Martelo de Thor", async function () {
      const req = { query: { q: "Martelo" } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "getProductByName").resolves(productsFromDB);

      await productController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsFromDB);
    });

    beforeEach(sinon.restore);
  });
});
