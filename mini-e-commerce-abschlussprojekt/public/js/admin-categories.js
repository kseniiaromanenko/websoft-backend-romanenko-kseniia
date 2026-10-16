window.addEventListener("load", async () => {
  await Clerk.load();

  if (!Clerk.user) {
    window.location.href = "/auth.html";
    return;
  }

  const categoriesList = document.getElementById("categories-list");
  const message = document.getElementById("message");
  const refreshButton = document.getElementById("refresh-button");
  const logoutButton = document.getElementById("logout-button");
  const categoryForm = document.getElementById("category-form");
  const categoryName = document.getElementById("category-name");
  const formMessage = document.getElementById("form-message");
  const saveCategoryButton = document.getElementById("save-category-button");
  const cancelEditButton = document.getElementById("cancel-edit-button");

  let editingCategoryId = null;

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
  const resetCategoryForm = () => {
    editingCategoryId = null;

    categoryForm.reset();

    saveCategoryButton.textContent = "Kategorie erstellen";
    cancelEditButton.hidden = true;

    formMessage.hidden = true;
  };

  const startEditingCategory = (category) => {
    editingCategoryId = category.id;

    categoryName.value = category.name;

    saveCategoryButton.textContent = "Änderungen speichern";
    cancelEditButton.hidden = false;

    formMessage.hidden = true;

    categoryForm.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  cancelEditButton.addEventListener("click", resetCategoryForm);

  const deleteCategoryById = async (category) => {
    const confirmed = window.confirm(
      `Möchtest du „${category.name}“ wirklich löschen?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = await Clerk.session.getToken();

      const response = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      message.textContent = `Kategorie „${category.name}“ wurde gelöscht.`;
      message.className = "message success-message";

      await loadCategories();
    } catch (error) {
      message.textContent = `Fehler: ${error.message}`;
      message.className = "message error-message";
    }
  };

  const loadCategories = async () => {
    try {
      message.textContent = "Kategorien werden geladen...";
      categoriesList.innerHTML = "";

      const response = await fetch("/api/categories");
      const categories = await response.json();

      if (!response.ok) {
        throw new Error(categories.error);
      }

      if (categories.length === 0) {
        message.textContent = "Keine Kategorien vorhanden.";
        return;
      }

      message.textContent = "";

      for (const category of categories) {
        const article = document.createElement("article");
        article.className = "category-card";

        const title = document.createElement("h3");
        title.textContent = category.name;

        const id = document.createElement("p");
        id.textContent = `ID: ${category.id}`;

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "edit-button";
        editButton.textContent = "Bearbeiten";

        editButton.addEventListener("click", () => {
          startEditingCategory(category);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Löschen";

        deleteButton.addEventListener("click", async () => {
          await deleteCategoryById(category);
        });

        article.append(title, id, editButton, deleteButton);
        categoriesList.append(article);
      }
    } catch (error) {
      message.textContent = `Fehler: ${error.message}`;
    }
  };

  categoryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      formMessage.hidden = true;

      const isEditing = editingCategoryId !== null;

      const requestUrl = isEditing
        ? `/api/categories/${editingCategoryId}`
        : "/api/categories";

      const requestMethod = isEditing ? "PATCH" : "POST";

      const token = await Clerk.session.getToken();

      const response = await fetch(requestUrl, {
        method: requestMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: categoryName.value,
        }),
      });

      const savedCategory = await response.json();

      if (!response.ok) {
        throw new Error(savedCategory.error);
      }

      resetCategoryForm();

      formMessage.textContent = isEditing
        ? `Kategorie „${savedCategory.name}“ wurde aktualisiert.`
        : `Kategorie „${savedCategory.name}“ wurde erstellt.`;

      formMessage.className = "message success-message";
      formMessage.hidden = false;

      await loadCategories();
    } catch (error) {
      formMessage.textContent = `Fehler: ${error.message}`;
      formMessage.className = "message error-message";
      formMessage.hidden = false;
    }
  });

  refreshButton.addEventListener("click", loadCategories);

  await loadCategories();
});
