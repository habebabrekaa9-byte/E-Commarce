import type { Brand } from "@/app/interface/brand.interface";
import type { CartResponse } from "@/app/interface/cart.interface";
import type { Category } from "@/app/interface/categories.interface";
import type { ListingResponse } from "@/app/interface/listing.api.interface";
import type { Order } from "@/app/interface/order.interface";
import type { Products } from "@/app/interface/products.interface";
export type CategoriesResponse = ListingResponse<Category>
export type ProductsResponse = ListingResponse<Products>
// الحته دى مهمه جدا بسبب انها مش بترجع arr زى اللى فات 
export type ProductCartResponse = CartResponse;
export type OrdersResponse = Order[];
export type BrandsResponse = ListingResponse<Brand>
// CartResponse
export type ProductDetails = {
    data: Products
}
export type BrandDetails = {
    data: Brand
}