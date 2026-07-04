"use server";
import { getUserToken } from '@/lib/server-utils';
import { log } from 'console';
import { revalidateTag } from 'next/cache';
import React from 'react'
import { toast } from 'sonner';

// Add Product To Cart
export default async function addToCart(ProductId: string) {
    const token = await getUserToken()
    console.log("tokenUser", token);
    if (!token) {
        throw new Error("User is not logged in , tokenn === null");
    }
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
            method: "POST",
            body: JSON.stringify({
                productId: ProductId
            }),
            headers: {
                "Content-Type": "application/json",
                token: token as string, // ← حط الـ token هنا
            },
            next: {
                tags: ["cartDetails"],
            },
        });
        const data = await res.json();
        console.log(data);
        console.log("add to cart tokennn", token);
        if (!res.ok) throw new Error(`HTTP error! status: ${data.message}`);

        const sucessRes = {
            ...data,
            status: true
        }
        if (res.status) {
            revalidateTag("cartDetails", "max")
        }
        return sucessRes

    } catch (error) {
        console.error(error, "not succeded");
    }
}
// Get Logged User Cart
export async function getUserCart() {
    const token = await getUserToken()
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token as string, // ← حط الـ token هنا
            },
            next: {
                tags: ["cartDetails"],
            },
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(`HTTP error! status: ${data.message}`);
        return {
            ...data,
            status: true
        };
    } catch (error) {
        console.error(error, "not succeded");
    }
}
// Update Cart Product Quantity 
export async function updateCartProduct(productId: string, count: number) {
    const token = await getUserToken()
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token as string, // ← حط الـ token هنا
            },
            body: JSON.stringify({
                count,
            }),
            next: {
                tags: ["cartDetails"],
            },
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(`the product not removed: ${data.message}`);
        const sucessRes = {
            ...data,
            status: true
        }
        if (res.status) {
            revalidateTag("cartDetails", "max")
        }
        return sucessRes
    } catch (error) {
        console.error(error, "not succeded");
    }
}
// Remove Product From Cart 
export async function removeProductFromCart(productId: string) {
    const token = await getUserToken()
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                token: token as string, // ← حط الـ token هنا
            },
            next: {
                tags: ["cartDetails"],
            },
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(`the product not removed: ${data.message}`);
        const sucessRes = {
            ...data,
            status: true
        }
        if (res.status) {
            revalidateTag("cartDetails", "max")
        }
        return sucessRes
    } catch (error) {
        console.error(error, "not succeded");
    }
}
// Clear User Cart
export async function clearUserCart() {
    const token = await getUserToken()
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                token: token as string, // ← حط الـ token هنا
            },
            next: {
                tags: ["cartDetails"],
            },
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(`the product not removed: ${data.message}`);
        const sucessRes = {
            ...data,
            status: true
        }
        if (res.status) {
            revalidateTag("cartDetails", "max")
        }
        return sucessRes
    } catch (error) {
        console.error(error, "not succeded");
    }
}

