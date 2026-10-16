window.addEventListener("load", async () => {
  await Clerk.load();

  if (!Clerk.user) {
    window.location.href = "/auth.html";
    return;
  }

  const userInfo = document.getElementById("user-info");
  const result = document.getElementById("result");
  const createOrderButton = document.getElementById("create-order-button");
  const showOrdersButton = document.getElementById("show-orders-button");
  const signOutButton = document.getElementById("sign-out-button");

  userInfo.textContent = `Angemeldet als: ${Clerk.user.primaryEmailAddress.emailAddress}`;

  createOrderButton.addEventListener("click", async () => {
    const productId = Number(document.getElementById("product-id").value);
    const quantity = Number(document.getElementById("quantity").value);

    try {
      const token = await Clerk.session.getToken();

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [
            {
              productId: productId,
              quantity: quantity,
            },
          ],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        result.textContent = JSON.stringify(data, null, 2);
      } else {
        result.textContent =
          `Fehler (${response.status}):\n` + JSON.stringify(data, null, 2);
      }
    } catch (error) {
      result.textContent = `Fehler: ${error.message}`;
    }
  });

  showOrdersButton.addEventListener("click", async () => {
    try {
      const token = await Clerk.session.getToken();

      const response = await fetch("/api/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        result.textContent = JSON.stringify(data, null, 2);
      } else {
        result.textContent =
          `Fehler (${response.status}):\n` + JSON.stringify(data, null, 2);
      }
    } catch (error) {
      result.textContent = `Fehler: ${error.message}`;
    }
  });

  signOutButton.addEventListener("click", async () => {
    await Clerk.signOut();
    window.location.href = "/auth.html";
  });
});
