const sales = [
  {
    saleId: 1,
    date: "2022-10-13T13:26:10.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2022-10-13T13:26:10.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2022-10-13T13:26:10.000Z",
    productId: 3,
    quantity: 15,
  },
];

const salesById = [
  {
    date: "2022-10-13T13:26:10.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2022-10-13T13:26:10.000Z",
    productId: 2,
    quantity: 10,
  },
];

const salesFromDB = [
  { id: 1, date: "2022-10-14 10:08:56" },
  { id: 2, date: "2022-10-14 10:08:56" },
];

module.exports = {
  sales,
  salesById,
  salesFromDB
};
