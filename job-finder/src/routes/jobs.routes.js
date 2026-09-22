import { Router } from "express";
import { searchJobs, getAllJobs } from "../controllers/jobs.controller.js";
import { validateJobSearch } from "../middleware/validate.js";

const router = Router();

router.get("/search", validateJobSearch, searchJobs);
router.get("/", getAllJobs);

export default router;
