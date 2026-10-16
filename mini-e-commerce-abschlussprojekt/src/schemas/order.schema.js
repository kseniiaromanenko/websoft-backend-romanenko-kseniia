import { z } from "zod";

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]),
});

const orderItemSchema = z.object({
  productId: z.number().int().positive({
    message: "Produkt-ID muss eine positive ganze Zahl sein",
  }),

  quantity: z.number().int().positive({
    message: "Menge muss eine positive ganze Zahl sein",
  }),
});

export const createOrderSchema = z
  .object({
    items: z.array(orderItemSchema).min(1, {
      message: "Der Warenkorb darf nicht leer sein",
    }),
  })
  .refine(
    (data) => {
      const productIds = data.items.map((item) => item.productId);
      return new Set(productIds).size === productIds.length;
    },
    {
      message: "Jedes Produkt darf nur einmal im Warenkorb vorkommen",
    },
  );
