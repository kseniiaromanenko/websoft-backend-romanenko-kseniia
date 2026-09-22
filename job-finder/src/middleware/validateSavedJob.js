import { savedJobSchema } from "../schemas/savedJob.schema.js";

export const validateSavedJob = (req, res, next) => {
  const result = savedJobSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.issues,
    });
  }

  next();
};
