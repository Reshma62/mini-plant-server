import { z } from "zod";

export const createCategorySchema = z.object({
  categoryName: z.string({ required_error: "Category name is required" }),
  categoryImage: z.string({ required_error: "Category image is required" }),
});
export const updateCategorySchema = z.object({
  categoryName: z
    .string({ required_error: "Category name is required" })
    .optional(),
  categoryImage: z
    .string({ required_error: "Category image is required" })
    .optional(),
});
