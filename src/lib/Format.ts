import { read } from "fs";

export function formatprice(price :number ){
 return new Intl.NumberFormat("en-us",{
    currency:"EGP",
    style:"currency"
 }).format(price)
}
