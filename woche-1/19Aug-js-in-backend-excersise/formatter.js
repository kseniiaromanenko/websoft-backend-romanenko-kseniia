function formatOrder(order) {
  return `
    Bestellung:
ID: ${order.id}
Kunde: ${order.customerName}
Status: ${order.status}
Summe: ${order.total} EUR
`;
}

module.exports = { formatOrder };
