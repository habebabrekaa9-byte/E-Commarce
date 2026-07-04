"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { getUserCart } from "@/app/actions/cart.actions";

const CATEGORIES = [
  { label: "All Catagory", href: "/products?category=electronics" },
  { label: "Electric", href: "/products?category=fashion" },
  { label: " Men's Fashion", href: "/products?category=home" },
  { label: "Woman's Fashion", href: "/products?category=sports" },
  { label: "Beauty & Health", href: "/products?category=sports" },
];

export default function Navbar() {
  // const cartCount = 3;
  // const wishlistCount = 4;

  const { status, data: SessionData } = useSession()
  // console.log("SessionData",SessionData);

  function logOutHandler() {
    signOut({ callbackUrl: "/" })
  }
  
  const { numOfCartItems,updateNumOfCartItems }=useCart()
  useEffect(() => {
    getUserCart().then((res) => {updateNumOfCartItems(res.numOfCartItems)})
  }, [])
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className=" w-8 h-8 flex items-center justify-center text-sm ">
            <ShoppingCart className="" />
          </span>
          Fresh Cart
        </Link>
        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">

          <Link href="/">
            <Button variant="ghost" ><span className="text-xl">Home</span></Button>
          </Link>
          <Link href="/Products">
            <Button variant="ghost" size="lg"> Products</Button>
          </Link>
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="lg" className="flex items-center gap-1">
                Categories
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {CATEGORIES.map((cat) => (
                <DropdownMenuItem className="text-green-600 text-xl" key={cat.label} asChild>
                  <Link href={cat.href}>{cat.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/Brands">
            <Button variant="ghost" size="sm">Brands</Button>
          </Link>
          <Link href="/allOrders">
            <Button variant="ghost" size="sm">AllOrders</Button>
          </Link>
        </nav>
        {/* Icons + Sign In */}
        <div className="flex items-center gap-1">

          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/wishlist" aria-label="Wishlist">
              <Heart className="h-8 w-2xl" />
              {/* <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">
              </Badge> */}
            </Link>
          </Button>
          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart" aria-label="Cart">
              <ShoppingCart className="h-8 w-2xl" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">
                {numOfCartItems}
              </Badge>
            </Link>
          </Button>

          {/* Sign In , Sign Up */}
          <div className="flex gap-2.5">

            {
              status === "unauthenticated" ? <>
                <Link href="/Register">
                  <Button size="sm" className="ml-1" variant={"secondary"}>Sign up</Button>
                </Link>
                <Link href="/Login">
                  <Button size="sm" className="ml-1">Sign In</Button>
                </Link>
              </> : <>
                <Link href="/profile">{SessionData?.user?.name}</Link>
                <Button size="sm" className="ml-1" onClick={logOutHandler}>Sign Out</Button>
              </>
            }
          </div>

        </div>
      </div>
    </header>
  );
}