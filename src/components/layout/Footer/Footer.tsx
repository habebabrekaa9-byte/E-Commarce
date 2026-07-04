import React from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">
              FreshCart
            </h2>
            <p className="text-sm text-muted-foreground">
              Fresh products delivered to your doorstep. Shop
              groceries and essentials with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-primary"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h3 className="font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Contact Us</li>
              <li>Shipping</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest offers and updates.
            </p>

            <Button className="w-full">
              Subscribe
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} FreshCart. All rights
            reserved.
          </p>

          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary">
              Facebook
            </Link>
            <Link href="#" className="hover:text-primary">
              Instagram
            </Link>
            <Link href="#" className="hover:text-primary">
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}