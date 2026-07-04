import type { Brand } from "./brand.interface"
import type { Category } from "./categories.interface"
import type { Subcategory } from "./subcategory.interface"

export interface Products {
    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    id: string
    priceAfterDiscount?: number
    availableColors?: string[]
}