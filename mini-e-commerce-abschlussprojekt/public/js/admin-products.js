window.addEventListener("load", async () => {
  await Clerk.load();

  if (!Clerk.user) {
    window.location.href = "/auth.html";
    return;
  }

  const productsList = document.getElementById("products-list");
  const message = document.getElementById("message");
  const refreshButton = document.getElementById("refresh-button");
  const logoutButton = document.getElementById("logout-button");
  const categorySelect = document.getElementById("product-category");
  const createProductForm = document.getElementById("create-product-form");
  const productName = document.getElementById("product-name");
  const productDescription = document.getElementById("product-description");
  const productPrice = document.getElementById("product-price");
  const productImageUrl = document.getElementById("product-image-url");
  const formMessage = document.getElementById("form-message");

  const saveProductButton = document.getElementById("save-product-button");
  const cancelEditButton = document.getElementById("cancel-edit-button");

  let editingProductId = null;

  const token = await Clerk.session.getToken();

  const profileResponse = await fetch("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const currentUser = await profileResponse.json();

  if (!profileResponse.ok) {
    message.textContent = currentUser.error;
    return;
  }

  if (currentUser.role !== "ADMIN" && currentUser.role !== "SUPER_ADMIN") {
    window.location.href = "/index.html";
    return;
  }

  logoutButton.addEventListener("click", async () => {
    await Clerk.signOut();
    window.location.href = "/index.html";
  });

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const categories = await response.json();

      if (!response.ok) {
        throw new Error(categories.error);
      }

      categorySelect.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Kategorie auswählen";
      defaultOption.disabled = true;
      defaultOption.selected = true;

      categorySelect.append(defaultOption);

      for (const category of categories) {
        const option = document.createElement("option");

        option.value = category.id;
        option.textContent = category.name;

        categorySelect.append(option);
      }
    } catch (error) {
      categorySelect.innerHTML = "";

      const errorOption = document.createElement("option");
      errorOption.textContent = `Fehler: ${error.message}`;

      categorySelect.append(errorOption);
    }
  };

  const resetProductForm = () => {
    editingProductId = null;

    createProductForm.reset();
    categorySelect.value = "";

    saveProductButton.textContent = "Produkt erstellen";
    cancelEditButton.hidden = true;

    formMessage.hidden = true;
  };

  const startEditingProduct = (product) => {
    editingProductId = product.id;

    productName.value = product.name;
    productDescription.value = product.description;
    productPrice.value = product.price;
    productImageUrl.value = product.imageUrl || "";
    categorySelect.value = String(product.categoryId);

    saveProductButton.textContent = "Änderungen speichern";
    cancelEditButton.hidden = false;

    formMessage.hidden = true;

    createProductForm.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const deleteProductById = async (product) => {
    const confirmed = window.confirm(
      `Möchtest du „${product.name}“ wirklich löschen?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = await Clerk.session.getToken();

      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      message.textContent = `Produkt „${product.name}“ wurde gelöscht.`;
      message.className = "message success-message";

      await loadProducts();
    } catch (error) {
      message.textContent = `Fehler: ${error.message}`;
      message.className = "message error-message";
    }
  };

  cancelEditButton.addEventListener("click", resetProductForm);

  const loadProducts = async () => {
    try {
      message.textContent = "Produkte werden geladen...";
      productsList.innerHTML = "";

      const response = await fetch("/api/products");
      const products = await response.json();

      if (!response.ok) {
        throw new Error(products.error);
      }

      if (products.length === 0) {
        message.textContent = "Keine Produkte vorhanden.";
        return;
      }

      message.textContent = "";

      for (const product of products) {
        const article = document.createElement("article");
        article.className = "product-card";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("p");
        price.textContent = `${product.price} €`;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Löschen";

        deleteButton.addEventListener("click", async () => {
          await deleteProductById(product);
        });

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "edit-button";
        editButton.textContent = "Bearbeiten";

        editButton.addEventListener("click", () => {
          startEditingProduct(product);
        });

        article.append(title, description, price, editButton, deleteButton);
        productsList.append(article);
      }
    } catch (error) {
      message.textContent = `Fehler: ${error.message}`;
    }
  };

  createProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      formMessage.hidden = true;

      const isEditing = editingProductId !== null;

      const requestUrl = isEditing
        ? `/api/products/${editingProductId}`
        : "/api/products";

      const requestMethod = isEditing ? "PATCH" : "POST";

      const productData = {
        name: productName.value,
        description: productDescription.value,
        price: Number(productPrice.value),
        imageUrl: productImageUrl.value || null,
        categoryId: Number(categorySelect.value),
      };

      const token = await Clerk.session.getToken();

      const response = await fetch(requestUrl, {
        method: requestMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const savedProduct = await response.json();

      if (!response.ok) {
        throw new Error(savedProduct.error);
      }

      resetProductForm();

      formMessage.textContent = isEditing
        ? `Produkt „${savedProduct.name}“ wurde aktualisiert.`
        : `Produkt „${savedProduct.name}“ wurde erstellt.`;

      formMessage.className = "message success-message";
      formMessage.hidden = false;

      await loadProducts();
    } catch (error) {
      formMessage.textContent = `Fehler: ${error.message}`;
      formMessage.className = "message error-message";
      formMessage.hidden = false;
    }
  });

  refreshButton.addEventListener("click", async () => {
    await loadCategories();
    await loadProducts();
  });
  await loadCategories();
  await loadProducts();
});
