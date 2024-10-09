import { z } from "zod";

export const CreateAppointmentSchema = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
      schedule: z.coerce.date(),
  });

  export const ConfirmAppointmentSchema = z.object({
    schedule: z.coerce.date(),
    notes: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  })

  export const CancelAppointmentSchema = z.object({
    notes: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  })



  export function getAppointmentSchema(type: string) {
    switch (type) {
      case "create":
        return CreateAppointmentSchema;
      case "cancel":
        return CancelAppointmentSchema;
      default:
        return ConfirmAppointmentSchema;
    }
  }

  export const ScheduleFormValidation = z.object({
      schedule: z.coerce.date(),
      reason: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
  });


  export const createPreOrderSchema = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
    carManufacturer: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    carModel: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    year: z.number(),
    trim: z
      .string()
      .min(2, "Trim must be at least 2 characters")
      .max(50, "Trim must be at most 50 characters"),
    method: z.enum(['Yes I have found one online', 'No, I would like you to search for me']),
    websiteLink: z
      .string()
      .min(2, "Website link must be at least 2 characters")
      .max(50, "Website link must be at most 50 characters")
      .optional(), // Make it optional by default
  })

  export const ConfirmPreOrderSchema = z.object({
    notes: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  })

  export const CancelPreOrderSchema = z.object({
    notes: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  })

  export function PreOrderFormSchema(type: string) {
    switch (type) {
      case "create":
        return createPreOrderSchema;
      case "cancel":
        return CancelPreOrderSchema;
      default:
        return ConfirmPreOrderSchema;
    }
  }