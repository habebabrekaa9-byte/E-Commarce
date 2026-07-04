
import type { Products } from "./products.interface"

export interface CartResponse {
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: CartDetails
}

export interface CartDetails {
  _id: string
  cartOwner: string
  products: ProductCart[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface ProductCart {
  count: number
  _id: string
  product: Products
  price: number
}

/**
 export interface Root {
    status: string
    message: string
    numOfCartItems: number
    cartId: string
    data: Data
  }
  
  export interface Data {
    _id: string
    cartOwner: string
    products: Product[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
  }
  
  export interface Product {
    count: number
    _id: string
    product: Product2
    price: number
  }
* 
 * 
 * 
 */