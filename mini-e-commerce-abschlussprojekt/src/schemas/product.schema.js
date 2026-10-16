import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Produktname ist erforderlich",
  }),

  description: z.string().trim().min(1, {
    message: "Produktbeschreibung ist erforderlich",
  }),

  price: z.number().positive({
    message: "Produktpreis muss größer als 0 sein",
  }),

  imageUrl: z.string().trim().nullable().optional(),

  categoryId: z.number().int().positive({
    message: "Ungültige Kategorie-ID",
  }),
});

export const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Mindestens ein Produktfeld ist erforderlich",
  });
