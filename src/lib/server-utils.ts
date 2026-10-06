"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth/authOptions";
// get User Token..
// export async function getUserToken() {
//     const cookie = await cookies()
//     console.log("ALL COOKIES =", cookie.getAll());
//     const token = cookie.get("next-auth.session-token")?.value;
//     console.log("Cookie Token =", token);
//     const encodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })
//     return encodedToken?.accessToken

// }
export async function getUserToken() {
    const session = await getServerSession(authOptions);

    console.log("SESSION =", session);

    return session?.accessToken;
}
// get User Id
// export async function getUserId() {
//     const cookie = await cookies()
//     console.log("ALL COOKIES =", cookie.getAll());
//     const token = cookie.get("next-auth.session-token")?.value;
//     console.log("Cookie Token =", token);
//     const encodedToken = await decode({ token, secret: process.env.NEXTAUTH_SECRET! })
//     return encodedToken?.user.id

// }

export async function getUserId() {
    const session = await getServerSession(authOptions);

    return session?.user?.id;
}