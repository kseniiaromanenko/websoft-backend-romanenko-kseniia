import { z } from "zod";
export const jobSearchSchema = z.object({
  keywords: z.string().trim().min(1, "keywords is required"),
  location: z.string().trim().min(1, "location is required"),
});
