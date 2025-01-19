// utils/signUpSchema.ts
import { z } from "zod";
import { FilterProps } from "@/types";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

// Type for the parsed schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
