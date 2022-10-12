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
});
