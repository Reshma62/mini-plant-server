import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"), // Ensure name is a non-empty string
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"), // Ensure password is at least 6 characters long
    needsPasswordChange: z.string().optional(), // Optional field
    role: z.enum(["admin", "student", "faculty"]), // Ensure role is one of the specified values
  }),
});
