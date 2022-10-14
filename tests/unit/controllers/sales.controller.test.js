const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const { expect } = require("chai");

const salesService = require("../../../src/services/sales.service");
const salesController = require("../../../src/controllers/sales.controller");
const { productsFromDB } = require("./mocks/sales.controller.mock");

describe("Testes de unidade na camada Controller", function () {
  describe("Testes de busca de vendas", async function () {
    it("Busca de todas as vendas", async function () {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, "getAllSales").resolves(productsFromDB);

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsFromDB);
    });

    it("Busca de vendas pelo id", async function () {
      const req = { params: 1 };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, "getSalesById")
        .resolves({ status: null, message: productsFromDB });

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsFromDB);
    });

    it("Busca de vendas pelo id inexistente", async function () {
      const req = { params: 1 };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, "getSalesById")
        .resolves({ status: "NOT_FOUND", message: "Sale not found" });

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });

    beforeEach(sinon.restore);
  });

  describe("Testes na tentativa de deletar uma venda", function () {
    it("Tentando deletar uma venda existente", async function () {
      const req = { params: { id: 1 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = { status: null, message: null };

      sinon.stub(salesService, "deleteSalesById").resolves(result);

      await salesController.deleteSalesById(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith(null);
    });

    it("Tentando deletar uma venda inexistente", async function () {
      const req = { params: { id: 999 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const result = { status: "NOT_FOUND", message: "Sale not found" };

      sinon.stub(salesService, "deleteSalesById").resolves(result);

      await salesController.deleteSalesById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: result.message });
    });

    beforeEach(sinon.restore);
  });
});
