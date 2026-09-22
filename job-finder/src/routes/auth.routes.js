import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/me", requireAuth, (req, res) => {
  res.status(200).json({
    userId: req.currentUserId,
  });
});

export default router;
