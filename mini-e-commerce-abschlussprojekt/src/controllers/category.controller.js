import prisma from "../prisma.js";
import { categorySchema } from "../schemas/category.schema.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
export const createCategory = async (req, res, next) => {
  try {
    const result = categorySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues[0].message,
      });
    }

    const category = await prisma.category.create({
      data: {
        name: result.data.name,
      },
    });
    return res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Ungültige Kategorie-ID",
      });
    }

    const result = categorySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues[0].message,
      });
    }

    const category = await prisma.category.update({
      where: { id },
      data: { name: result.data.name },
    });
    return res.status(200).json(category);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Kategorie nicht gefunden" });
    }
    next(error);
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Ungültige Kategorie-ID" });
    }
    await prisma.category.delete({
      where: { id },
    });
    return res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Kategorie nicht gefunden",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error:
          "Kategorie kann nicht gelöscht werden, solange sie Produkte enthält",
      });
    }
    next(error);
  }
};
