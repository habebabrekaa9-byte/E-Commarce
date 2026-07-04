import * as z from "zod";
export const defaultValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
}
export const registerSchema = z.object({

    name: z
        .string()
        .min(3, "must be at least 6")
        .max(50, " name too large"),

    email: z
        .string()
        .email(" incorrect Email "),

    password: z
        .string()
        .min(6, " the password must be 6 char "),

    rePassword: z
        .string()
        .min(6, "required repassword"),

    phone: z
        .string()
        .regex(/^01[0125][0-9]{8}$/, "your phone num must started with 010/011/012/015"),

}).refine((data) => data.password === data.rePassword, {
    message: "The password doesn't match",
    path: ["rePassword"],
});
export type registerPayLoadType = z.infer<typeof registerSchema>

