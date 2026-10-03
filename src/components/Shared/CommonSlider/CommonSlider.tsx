"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from "swiper/types";
import { Autoplay, Pagination } from 'swiper/modules';


const basicSwiperOptions = {
    pagination: {
        clickable: true,
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-red-500 border-white',
        bulletClass: 'swiper-pagination-bullet !size-4 border-2'
    },
    modules: [Pagination, Autoplay],
    spaceBetween: 10,
    slidesPerView: 1,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    }
}
interface CommonSliderProps {
    images: Images[],
    className?: string,
    isMainSlider: boolean,
    swiperOptions?: SwiperOptions
}
interface Images {
    name: string,
    path: string
}
export default function CommonSlider({ images, className, swiperOptions, isMainSlider }: CommonSliderProps) {
    return (
        <section className='py-4'>
            <div className="container">
                <Swiper
                    {...basicSwiperOptions} {...swiperOptions}
                >
                    {
                        images.map((slide) => (
                            <SwiperSlide key={slide.path}>
                                <Image className={className} src={slide.path} alt={slide.name} width={1920} height={600} />
                                {!isMainSlider && (<h2 className='text-xl font-semibold'>{slide.name}</h2>)}
                            </SwiperSlide>
                        )
                        )}
                </Swiper>
            </div>
        </section>
    )
}
