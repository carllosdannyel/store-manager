const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require("../../../src/models/sales.model");
const salesService = require("../../../src/services/sales.service");

const { sales, salesById } = require("./mocks/sales.service.mock");

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
      sinon.stub(salesModel, "getSalesById").resolves(undefined);

      const id = 999;
      const result = await salesService.getSalesById(id);

      expect(result.status).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });

    afterEach(sinon.restore);
  });
});
