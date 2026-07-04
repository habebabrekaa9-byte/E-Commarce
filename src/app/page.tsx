import MainSlider from "@/components/home/MainSlider/MainSlider";
import Categories from "@/components/home/Categories/Categories";
import React from "react";
import Products from "@/components/home/Products/Products";
export default function HomePage() {
  return (
    <>
      <>
        {/* main slider */}
        <MainSlider />
        {/* catagories */}
        <Categories />
        {/* products */}
        <Products/>
      </>
    </>
  );
}
