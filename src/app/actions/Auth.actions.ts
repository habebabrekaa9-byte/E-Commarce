"use server";
import type { loginPayLoadType } from "@/schema/login.schema";
import type { registerPayLoadType } from "@/schema/register.schema";
import { cookies } from "next/headers";
// loginHandling
export async function loginHandling(formValues: loginPayLoadType) {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || "Invaldatin message , somthing went error");
        }
        const cookie = await cookies()
        cookie.set("user-token", data.token);
        console.log("userToken", data.token);

        return data;
    } catch (error) {
        console.log(error)
    }
}
// registerHandling
export async function registerHandling(formValues: registerPayLoadType) {
    try {
        const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signup",
            {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await res.json();

        console.log("REGISTER RESPONSE =", data);

        if (!res.ok) {
            return {
                status: false,
                message: data.message || "Registration failed",
            };
        }

        return {
            status: true,
            ...data,
        };

    } catch (error) {
        console.log("REGISTER ERROR =", error);

        return {
            status: false,
            message: "Something went wrong",
        };
    }
}