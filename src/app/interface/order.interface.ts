import type { Products } from "./products.interface";

export interface Order {
    _id: string;
    id: number;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    user: OrderUser;
    cartItems: OrderCartItem[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface OrderCartItem {
    _id: string;
    count: number;
    price: number;
    product: Products;
}
export interface OrderUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
}



