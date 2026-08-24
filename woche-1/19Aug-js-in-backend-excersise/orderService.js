const orders = require("./data");

function findOrderById(id) {
  return orders.find((order) => order.id === id);
}

function loadOrderByIdAsync(id, callback) {
  setTimeout(() => {
    const foundOrder = findOrderById(id);
    if (foundOrder) {
      callback(null, foundOrder);
    } else {
      callback(`Keine Bestellung mit ID ${id} gefunden.`, null);
    }
  }, 1000);
}

module.exports = { findOrderById, loadOrderByIdAsync };
