// import { loginHandling } from "@/app/actions/Login.actions";
import * as z from "zod";
export const defaultValues = {
    email: "",
    password: ""
}
export const LoginSchema = z.object({
    email: z.email({ error: "Invalidation Email" }),
    password: z.string().nonempty({ error: "required password" }).regex(/^.{6,}$/, "Invalidate password")
});
export type loginPayLoadType = z.infer<typeof LoginSchema>

