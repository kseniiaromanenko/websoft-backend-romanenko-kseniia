import prisma from "../prisma.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";

export const getProducts = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    let where;

    if (categoryId !== undefined) {
      const parsedCategoryId = Number(categoryId);
      if (!Number.isInteger(parsedCategoryId) || parsedCategoryId <= 0) {
        return res.status(400).json({ error: "Ungültige Kategorie-ID" });
      }

      where = { categoryId: parsedCategoryId };
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { id: "asc" },
    });

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const result = createProductSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues[0].message,
      });
    }

    const { name, description, price, imageUrl, categoryId } = result.data;

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return res.status(404).json({
        error: "Kategorie nicht gefunden",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl: imageUrl || null,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Ungültige Produkt-ID",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        error: "Produkt nicht gefunden",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Ungültige Produkt-ID",
      });
    }

    const result = updateProductSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues[0].message,
      });
    }

    const data = { ...result.data };

    if (data.imageUrl !== undefined) {
      data.imageUrl = data.imageUrl || null;
    }

    if (data.categoryId !== undefined) {
      const category = await prisma.category.findUnique({
        where: {
          id: data.categoryId,
        },
      });

      if (!category) {
        return res.status(404).json({
          error: "Kategorie nicht gefunden",
        });
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Produkt nicht gefunden",
      });
    }

    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Ungültige Produkt-ID",
      });
    }

    await prisma.product.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Produkt nicht gefunden",
      });
    }
    if (error.code === "P2003") {
      return res.status(409).json({
        error:
          "Produkt kann nicht gelöscht werden, weil es bereits in Bestellungen verwendet wird",
      });
    }
    next(error);
  }
};
