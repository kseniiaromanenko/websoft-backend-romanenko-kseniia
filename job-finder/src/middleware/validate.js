import { jobSearchSchema } from "../schemas/jobSearch.schema.js";

export const validateJobSearch = (req, res, next) => {
  const result = jobSearchSchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.issues,
    });
  }

  next();
};
