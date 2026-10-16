window.addEventListener("load", async () => {
  await Clerk.load();

  if (!Clerk.user) {
    window.location.href = "/auth.html";
    return;
  }

  const userEmail = document.getElementById("user-email");
  const signOutButton = document.getElementById("sign-out-button");
  const ordersList = document.getElementById("orders-list");
  const errorMessage = document.getElementById("error-message");
  const emptyMessage = document.getElementById("empty-message");

  const createOrderCard = (order) => {
    const card = document.createElement("article");
    card.className = "order-card";

    const heading = document.createElement("div");
    heading.className = "order-card-heading";

    const title = document.createElement("h2");
    title.textContent = `Bestellung #${order.id}`;

    const status = document.createElement("span");
    status.className = "order-status";
    status.textContent = order.status;

    heading.append(title, status);

    const date = document.createElement("p");
    const createdAt = new Date(order.createdAt);
    date.textContent = `Datum: ${createdAt.toLocaleDateString("de-DE")}`;

    const items = document.createElement("ul");
    items.className = "order-items";

    for (const item of order.items) {
      const orderItem = document.createElement("li");
      orderItem.textContent = `${item.product.name} × ${item.quantity}`;
      items.append(orderItem);
    }

    const total = document.createElement("strong");
    total.textContent = `Gesamtpreis: ${order.totalPrice} €`;

    card.append(heading, date, items, total);
    return card;
  };

  const loadMyOrders = async () => {
    try {
      const token = await Clerk.session.getToken();

      const profileResponse = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profile = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error(profile.error);
      }

      userEmail.textContent = profile.email;

      const response = await fetch("/api/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orders = await response.json();

      if (!response.ok) {
        throw new Error(orders.error);
      }

      ordersList.replaceChildren();

      if (orders.length === 0) {
        emptyMessage.hidden = false;
        return;
      }

      emptyMessage.hidden = true;

      for (const order of orders) {
        ordersList.append(createOrderCard(order));
      }
    } catch (error) {
      errorMessage.textContent = `Fehler: ${error.message}`;
      errorMessage.hidden = false;
    }
  };

  signOutButton.addEventListener("click", async () => {
    await Clerk.signOut();
    window.location.href = "/index.html";
  });

  await loadMyOrders();
});
