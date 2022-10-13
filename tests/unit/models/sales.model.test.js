const { expect } = require("chai");
const sinon = require("sinon");

const { connection } = require("../../../src/models/db/connection");
const salesModel = require("../../../src/models/sales.model");

const { sales, salesById } = require("./mocks/sales.model.mock");

describe("Testes de unidade na camada Model", function () {
  describe("Testes de buscar de vendas", function () {
    it("Busca de todos os produtos", async function () {
      sinon.stub(connection, "execute").resolves([sales]);

      const result = await salesModel.getAllSales();

      expect(result).to.be.deep.equal(sales);
    });

    it("Busca de todos os produtos pelo id", async function () {
      sinon.stub(connection, "execute").resolves([salesById]);

      const id = 1
      const result = await salesModel.getSalesById(id);

      expect(result).to.be.deep.equal(salesById);
    });

    afterEach(sinon.restore);
  });
});
