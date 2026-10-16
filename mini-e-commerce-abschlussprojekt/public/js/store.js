const productsList = document.getElementById("products-list");
const productCount = document.getElementById("product-count");
const errorMessage = document.getElementById("error-message");
const cartButton = document.getElementById("cart-button");
const cartSection = document.getElementById("cart-section");
const cartBackdrop = document.getElementById("cart-backdrop");
const closeCartButton = document.getElementById("close-cart-button");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");
const checkoutMessage = document.getElementById("checkout-message");

const cartStorageKey = "mini-commerce-cart";
const loadCart = () => {
  const savedCart = localStorage.getItem(cartStorageKey);

  if (!savedCart) {
    return [];
  }

  try {
    return JSON.parse(savedCart);
  } catch {
    return [];
  }
};
const saveCart = () => {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
};
let cart = loadCart();

const updateCartButton = () => {
  const totalQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  cartButton.textContent = `Warenkorb (${totalQuantity})`;
};

const renderCart = () => {
  cartItems.replaceChildren();

  if (cart.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Dein Warenkorb ist leer.";
    cartItems.append(emptyMessage);

    cartTotal.textContent = "0.00 €";
    return;
  }

  let totalPrice = 0;

  for (const item of cart) {
    const cartItem = document.createElement("article");
    cartItem.className = "cart-item";

    const name = document.createElement("strong");
    name.textContent = item.name;

    const quantity = document.createElement("p");
    quantity.textContent = `Menge: ${item.quantity}`;

    const itemTotal = Number(item.price) * item.quantity;
    totalPrice += itemTotal;

    const price = document.createElement("p");
    price.textContent = `${itemTotal.toFixed(2)} €`;

    const controls = document.createElement("div");
    controls.className = "cart-item-controls";

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "−";
    decreaseButton.type = "button";
    decreaseButton.addEventListener("click", () => {
      changeQuantity(item.productId, -1);
    });

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.type = "button";
    increaseButton.addEventListener("click", () => {
      changeQuantity(item.productId, 1);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Entfernen";
    removeButton.type = "button";
    removeButton.className = "remove-cart-item";
    removeButton.addEventListener("click", () => {
      removeFromCart(item.productId);
    });

    controls.append(decreaseButton, increaseButton, removeButton);

    cartItem.append(name, quantity, price, controls);
    cartItems.append(cartItem);
  }

  cartTotal.textContent = `${totalPrice.toFixed(2)} €`;
};

const refreshCart = () => {
  saveCart();
  updateCartButton();
  renderCart();
};

const removeFromCart = (productId) => {
  cart = cart.filter((item) => item.productId !== productId);

  refreshCart();
};

const changeQuantity = (productId, change) => {
  const item = cart.find((item) => item.productId === productId);

  if (!item) {
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  refreshCart();
};

const addToCart = (product) => {
  const existingItem = cart.find((item) => item.productId === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }
  refreshCart();
};
const createProductCard = (product) => {
  const card = document.createElement("article");
  card.className = "product-card";

  const imageContainer = document.createElement("div");
  imageContainer.className = "product-image";

  if (product.imageUrl) {
    const image = document.createElement("img");
    image.src = product.imageUrl;
    image.alt = product.name;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      imageContainer.replaceChildren();
      imageContainer.classList.add("product-image-fallback");
      imageContainer.textContent = "Kein Bild verfügbar";
    });

    imageContainer.append(image);
  } else {
    imageContainer.classList.add("product-image-fallback");
    imageContainer.textContent = "Kein Bild verfügbar";
  }
  const title = document.createElement("h3");
  title.textContent = product.name;

  const description = document.createElement("p");
  description.textContent =
    product.description || "Keine Beschreibung vorhanden.";

  const price = document.createElement("strong");
  price.textContent = `${product.price} €`;

  const button = document.createElement("button");
  button.textContent = "In den Warenkorb";
  button.type = "button";
  button.addEventListener("click", () => {
    addToCart(product);
  });

  card.append(imageContainer, title, description, price, button);
  return card;
};

const loadProducts = async () => {
  try {
    const response = await fetch("/api/products");
    const products = await response.json();

    if (!response.ok) {
      throw new Error(products.error);
    }

    productsList.innerHTML = "";

    for (const product of products) {
      const card = createProductCard(product);
      productsList.append(card);
    }

    productCount.textContent = `${products.length} Produkte gefunden`;
  } catch (error) {
    errorMessage.textContent = `Fehler: ${error.message}`;
    errorMessage.hidden = false;
    productCount.textContent = "Produkte konnten nicht geladen werden.";
  }
};
const checkout = async () => {
  if (cart.length === 0) {
    checkoutMessage.textContent = "Der Warenkorb ist leer.";
    checkoutMessage.hidden = false;
    return;
  }

  await Clerk.load();

  if (!Clerk.user) {
    window.location.href = "/auth.html";
    return;
  }

  try {
    checkoutButton.disabled = true;
    checkoutMessage.hidden = true;

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

    const items = cart.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
      };
    });

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });

    const order = await response.json();

    if (!response.ok) {
      throw new Error(order.error);
    }

    cart = [];
    refreshCart();

    checkoutMessage.textContent = `Bestellung #${order.id} wurde erfolgreich erstellt.`;
    checkoutMessage.hidden = false;
  } catch (error) {
    checkoutMessage.textContent = `Fehler: ${error.message}`;
    checkoutMessage.hidden = false;
  } finally {
    checkoutButton.disabled = false;
  }
};

updateCartButton();
loadProducts();

const openCart = () => {
  renderCart();

  cartSection.classList.add("is-open");
  cartBackdrop.classList.add("is-visible");
  cartSection.setAttribute("aria-hidden", "false");
};

const closeCart = () => {
  cartSection.classList.remove("is-open");
  cartBackdrop.classList.remove("is-visible");
  cartSection.setAttribute("aria-hidden", "true");
};

cartButton.addEventListener("click", openCart);

closeCartButton.addEventListener("click", closeCart);

cartBackdrop.addEventListener("click", closeCart);

checkoutButton.addEventListener("click", checkout);
