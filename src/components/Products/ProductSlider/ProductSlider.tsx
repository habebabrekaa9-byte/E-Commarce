"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import { Swiper as SwiperType, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Thumbs } from 'swiper/modules';
interface ProductSliderProps {
  images: string[],
}
export default function ProductSlider({ images }: ProductSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] =
    useState<SwiperType | null>(null);
  return (
    <>
      <SwiperType className='mb-3 mySwiper2'
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
      >
        {
          images.map((src) => (
            <SwiperSlide key={src}>
              <Image className='mx-auto' src={src} alt={`swiperimages`} width={180} height={190} />
            </SwiperSlide>
          )
          )}
      </SwiperType>
      <SwiperType
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
      >
        {
          images.map((src) => (
            <SwiperSlide key={src}>
              <Image className='mx-auto' src={src} alt={`swiperimages`} width={180} height={190} />
            </SwiperSlide>
          )
          )}
      </SwiperType>
    </>
  )
}
