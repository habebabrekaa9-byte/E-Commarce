"use server";
import type { loginPayLoadType } from "@/schema/login.schema";
import type { registerPayLoadType } from "@/schema/register.schema";
import { cookies } from "next/headers";

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
        // console.log(data);
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

export async function registerHandling(formValues: registerPayLoadType) {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup",
            {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        const data = await res.json();
        // console.log(data);
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