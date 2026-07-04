"use server";
import { getUserId, getUserToken } from "@/lib/server-utils";
import type { CheckoutFormValuespayload } from "@/schema/checkoutAddress.schema";

//Session Checkout
// export async function checkoutSession(cartId: string, formValues: CheckoutFormValuespayload) {
//     const token = await getUserToken()
//     try {
//         const res = await fetch(
//             `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     token: token as string,
//                 },
//                 body: JSON.stringify(formValues),
//             }
//         );

//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error(data.message);
//         }

//         return {
//             ...data,
//             status: true,
//         };
//     } catch (error) {
//         console.error(error);

//         return {
//             status: false,
//             error: (error as Error).message,
//         };
//     }
// }

//`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
// api/v2/orders/6a464d77fc33d8001227a45f
// api/v2/orders/6a464dbcfc33d8001227a4e0

//Create Cash Order From Cart (v2)
export async function createCashOrder(cartId: string, formValues: CheckoutFormValuespayload) {
    const token = await getUserToken()

    try {
        // لانى مش عايز ال paymentMethod تتبعت لل backend لانها مش موجوه فيه اصلا ,انا بس عايزهاغير ف لا formm
        const { paymentMethod, ...shippingAddress } = formValues
        const endPiont = paymentMethod === "cash" ? `api/v2/orders/${cartId}` : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`
        console.log(endPiont);

        const res = await fetch(
            `https://ecommerce.routemisr.com/${endPiont}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token as string,
                },
                body: JSON.stringify(shippingAddress),
            }
        );
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }
        return {
            ...data,
            status: true,
        };
    } catch (error) {
        console.error(error);

        return {
            status: false,
            error: (error as Error).message,
        };
    }
}


//getAllUserOrders
export async function getAllUserOrders() {
    const userId = await getUserId()
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

            },
            // next: {
            //     tags: ["cartDetails"],
            // },
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(`HTTP error! status: ${data.message}`);
        return data
            
        
    } catch (error) {
        console.error(error, "not succeded");
    }
}