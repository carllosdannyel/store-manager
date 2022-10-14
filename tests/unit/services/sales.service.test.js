const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require("../../../src/models/sales.model");
const salesService = require("../../../src/services/sales.service");

const { sales, salesById, salesFromDB } = require("./mocks/sales.service.mock");

describe("Testes de unidade na camada Service", function () {
  describe("Testes de busca de vendas", function () {
    it("Busca de todos as vendas", async function () {
      sinon.stub(salesModel, "getAllSales").resolves(sales);

      const result = await salesService.getAllSales();

      expect(result).to.be.deep.equal(sales);
    });

    it("Busca de todos as vendas pelo id", async function () {
      sinon.stub(salesModel, "getSalesById").resolves(salesById);

      const id = 1;
      const result = await salesService.getSalesById(id);

      expect(result.status).to.equal(null);
      expect(result.message).to.be.deep.equal(salesById);
    });

    it("retorna NOT_FOUND caso não encontre as vendas", async function () {
      sinon.stub(salesModel, "getSalesById").resolves([]);

      const id = 999;
      const result = await salesService.getSalesById(id);

      expect(result.status).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });

    afterEach(sinon.restore);
  });

    describe("Testes na tentativa de deletar um venda", function () {
    it("Tentando deletar uma venda existente", async function () {
      sinon
        .stub(salesModel, "deleteSalesById")
        .resolves([[salesFromDB[0]]]);

      const id = 1;
      const result = await salesService.deleteSalesById(id);

      expect(result).to.be.deep.equal({ status: null, message: null });
    });

    it("Tentando deletar uma venda inexistente", async function () {
      sinon.stub(salesModel, "deleteSalesById").resolves(null);

      const id = 999;
      const result = await salesService.deleteSalesById(id);

      expect(result).to.be.deep.equal({
        status: "NOT_FOUND",
        message: "Sale not found",
      });
    });

    afterEach(sinon.restore);
  });
});
