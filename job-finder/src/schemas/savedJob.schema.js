import { z } from "zod";

export const savedJobSchema = z.object({
  externalJobId: z.string().trim().min(1, "externalJobId is required"),
  title: z.string().trim().min(1, "title is required"),
  company: z.string().trim().min(1, "company is required"),
  location: z.string().trim().min(1, "location is required"),
  description: z.string().trim().min(1, "description is required"),
  url: z.string().url("url must be valid"),
  source: z.string().trim().min(1, "source is required"),
});
