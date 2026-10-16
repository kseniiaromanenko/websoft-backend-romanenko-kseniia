import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/authorize.middleware.js";

const router = Router();

router.get("/my", requireAuth, getMyOrders);
router.get("/", requireAuth, requireAdmin, getAllOrders);
router.post("/", requireAuth, createOrder);
router.patch("/:id/status", requireAuth, requireAdmin, updateOrderStatus);

export default router;
