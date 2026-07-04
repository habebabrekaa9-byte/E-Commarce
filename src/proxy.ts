import { getToken } from 'next-auth/jwt'
import { NextResponse, type NextRequest } from 'next/server'
import React from 'react'

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const protectedRoute = ["/cart", "/profile", "/checkout", "/allorders"]
    const authRoutes = ["/Login", "/Register"]
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET, secureCookie: process.env.NODE_ENV === "production" })
    console.log(" gettoken for proxy", token);
    if (!token && protectedRoute.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/Login", request.nextUrl))
    }
    if (token && authRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/", request.nextUrl))
    }

    return NextResponse.next()
}
// مش راضلى يظبط
export const config = {
    matcher: [
        "/cart/:path*",
        "/profile/:path*",
        "/Login",
        "/Register"
    ]
}