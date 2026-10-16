import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/authorize.middleware.js";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.get("/", getCategories);
router.post("/", requireAuth, requireAdmin, createCategory);
router.patch("/:id", requireAuth, requireAdmin, updateCategory);
router.delete("/:id", requireAuth, requireAdmin, deleteCategory);

export default router;
