import { Router } from "express";
import { saveJob, getSavedJob } from "../controllers/savedJobs.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateSavedJob } from "../middleware/validateSavedJob.js";

const router = Router();

router.post("/", requireAuth, validateSavedJob, saveJob);
router.get("/", requireAuth, getSavedJob);
export default router;
