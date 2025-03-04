import { z } from "zod";

export const createProductSchema = z.object({
  category: z.string().nonempty({ message: "Category is required" }),
  title: z.string().nonempty({ message: "Title is required" }),
  price: z.number().positive({ message: "Price must be positive" }),
  quantity: z
    .number()
    .int()
    .nonnegative({ message: "Quantity must be a non-negative integer" }),
  description: z.string().nonempty({ message: "Description is required" }),
  rating: z
    .number()
    .min(0)
    .max(5, { message: "Rating must be between 0 and 5" }),
  image: z.string().nonempty({ message: "Image is required" }),
});
export const updateProductSchema = z.object({
  category: z.string({ required_error: "Category is required" }).optional(),
  title: z.string({ required_error: "Title is required" }).optional(),
  price: z
    .number({ required_error: "Price is required" })
    .positive({ message: "Price must be positive" })
    .optional(),
  quantity: z
    .number({ required_error: "Quantity is required" })
    .int()
    .nonnegative({ message: "Quantity must be a non-negative integer" })
    .optional(),
  description: z
    .string({ required_error: "Description is required" })
    .optional(),
  rating: z
    .number({ required_error: "Rating is required" })
    .min(0, { message: "Rating must be at least 0" })
    .max(5, { message: "Rating must be at most 5" })
    .optional(),
  image: z.string({ required_error: "Image is required" }).optional(),
});
