window.addEventListener("load", async () => {
  await Clerk.load();

  if (!Clerk.user) {
    window.location.href = "/auth.html";
    return;
  }

  const adminEmail = document.getElementById("admin-email");
  const signOutButton = document.getElementById("sign-out-button");

  const ordersList = document.getElementById("orders-list");
  const totalOrders = document.getElementById("total-orders");
  const pendingOrders = document.getElementById("pending-orders");
  const processingOrders = document.getElementById("processing-orders");
  const completedOrders = document.getElementById("completed-orders");
  const refreshOrdersButton = document.getElementById("refresh-orders-button");
  const errorMessage = document.getElementById("error-message");

  const successMessage = document.getElementById("success-message");

  const orderStatuses = ["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"];

  const createStatusSelect = (currentStatus) => {
    const select = document.createElement("select");

    for (const status of orderStatuses) {
      const option = document.createElement("option");

      option.value = status;
      option.textContent = status;
      option.selected = status === currentStatus;

      select.append(option);
    }

    return select;
  };

  const token = await Clerk.session.getToken();

  const response = await fetch("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const currentUser = await response.json();

  if (!response.ok) {
    adminEmail.textContent = "Fehler beim Laden des Benutzerprofils";
    return;
  }

  if (currentUser.role !== "ADMIN" && currentUser.role !== "SUPER_ADMIN") {
    window.location.href = "/order-test.html";
    return;
  }

  adminEmail.textContent = currentUser.email;

  signOutButton.addEventListener("click", async () => {
    await Clerk.signOut();
    window.location.href = "/auth.html";
  });

  const createCell = (text) => {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
  };

  const loadOrders = async () => {
    try {
      const token = await Clerk.session.getToken();

      const response = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orders = await response.json();

      if (!response.ok) {
        throw new Error(orders.error);
      }

      ordersList.innerHTML = "";

      for (const order of orders) {
        const row = document.createElement("tr");

        const products = order.items
          .map((item) => `${item.product.name} × ${item.quantity}`)
          .join(", ");

        const statusSelect = createStatusSelect(order.status);

        const saveButton = document.createElement("button");
        saveButton.textContent = "Speichern";
        saveButton.type = "button";

        saveButton.addEventListener("click", async () => {
          try {
            const token = await Clerk.session.getToken();

            const response = await fetch(`/api/orders/${order.id}/status`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                status: statusSelect.value,
              }),
            });

            const updatedOrder = await response.json();

            if (!response.ok) {
              throw new Error(updatedOrder.error);
            }

            successMessage.textContent = `Bestellung #${updatedOrder.id} wurde aktualisiert.`;
            successMessage.hidden = false;

            await loadOrders();
          } catch (error) {
            errorMessage.textContent = `Fehler: ${error.message}`;
            errorMessage.hidden = false;
          }
        });

        const actionCell = document.createElement("td");
        actionCell.append(statusSelect, saveButton);

        row.append(
          createCell(`№ ${order.id}`),
          createCell(order.user.email),
          createCell(products),
          createCell(`${order.totalPrice} €`),
          createCell(order.status),
          actionCell,
        );

        ordersList.append(row);
      }

      totalOrders.textContent = orders.length;
      pendingOrders.textContent = orders.filter(
        (order) => order.status === "PENDING",
      ).length;
      processingOrders.textContent = orders.filter(
        (order) => order.status === "PROCESSING",
      ).length;
      completedOrders.textContent = orders.filter(
        (order) => order.status === "COMPLETED",
      ).length;
    } catch (error) {
      errorMessage.textContent = `Fehler: ${error.message}`;
      errorMessage.hidden = false;
    }
  };

  refreshOrdersButton.addEventListener("click", loadOrders);

  await loadOrders();
});
