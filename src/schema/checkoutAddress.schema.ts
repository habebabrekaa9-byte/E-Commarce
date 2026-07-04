
import * as z from "zod";
// لكن لو عندك قيم ثابتة هتستخدميها فى أماكن كتير، فالـ enum بيكون منظم وأسهل فى الاستخدام.
// وعملتلها export علشان استخدمها ف ال Formm
export enum paymentMethod {
    CASH = "cash",
    VISA = "visa"
}
export const defaultValues = {
    shippingAddress: {
        details: "string",
        phone: "string",
        city: "string",
        postalCode: "string",
    },
    paymentMethod: paymentMethod.CASH
}

export const checkoutSchema = z.object({
    details: z.string().min(5, "Address must be at least 5 characters"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Phone number is invalid"),
    city: z.string().min(2, "City is required"),
    postalCode: z.string().regex(/^[0-9]{5}$/, "Postal code must be 5 digits"),
    // السطر ده من Zod، وهدفه إنه يعمل Validation إن قيمة paymentMethod لازم تكون واحدة من قيمتين فقط.
    paymentMethod: z.enum(["cash", "visa"], { error: "paymentMethod is required" })
});


export type CheckoutFormValuespayload = z.infer<typeof checkoutSchema>;