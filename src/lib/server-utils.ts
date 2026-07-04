"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const cookie = await cookies()
    console.log("ALL COOKIES =", cookie.getAll());
    const token = cookie.get("next-auth.session-token")?.value;
    console.log("Cookie Token =", token);
    const encodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })
    return encodedToken?.accessToken

}

export async function getUserId() {
    const cookie = await cookies()
    console.log("ALL COOKIES =", cookie.getAll());
    const token = cookie.get("next-auth.session-token")?.value;
    console.log("Cookie Token =", token);
    const encodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })
    return encodedToken?.user.id

}