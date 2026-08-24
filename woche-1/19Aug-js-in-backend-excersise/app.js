const orders = require("./data");
const { findOrderById } = require("./orderService");
const { loadOrderByIdAsync } = require("./orderService");
const { formatOrder } = require("./formatter");

console.log("Bestellprüfung startet...");
console.log("Alle Bestellungen:");
console.log(orders);

const searcheId = 3;
const foundOrder = findOrderById(searcheId);

console.log("Gesuchte ID: ", searcheId);

if (foundOrder) {
  console.log("Bestellung wird formatiert...");
  const formattedOrder = formatOrder(foundOrder);
  console.log(formattedOrder);
} else {
  console.log(`Keine Bestellung mit ID ${searchedId} gefunden.`);
}

console.log("Ergebnise aus orderService: ", foundOrder);
