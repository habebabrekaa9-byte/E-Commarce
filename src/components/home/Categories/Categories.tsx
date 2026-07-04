import type { Category } from '@/app/interface/categories.interface';
import { getCatgories } from '@/app/Services/Categories.Service';
import CommonSlider from '@/components/Shared/CommonSlider/CommonSlider';
import SectionTitle from '@/components/Shared/SectionTitle/SectionTitle';
import type { CategoriesResponse } from '@/types/response.type';
import Image from 'next/image';
import path from 'path';
import React from 'react'

export default async function categories() {
  const categories: CategoriesResponse = await getCatgories();
  console.log(categories.data);
  const images = categories.data.map(function (cat: Category) {
    return {
      path: cat.image,
      name: cat.name
    };
  })
  const categoriesSwiperOptions = {
    slidesPerView: 1,
    // spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,

      },
      1100: {
        slidesPerView: 4,

      },
      1200: {
        slidesPerView: 5,

      }
    }
  }
  return (
    <section>
      <div className="container">
        {/* <div className='grid grid-cols-3 '>
          {
            categories.data.map((cat) => (
              <div className='col-span-1' key={cat._id}>
                <Image src={cat.image} alt={cat.name} width={180} height={190} />
                <h3 className='text-lg'>
                  {cat.name}
                </h3>
              </div>
            ))
          }
        </div> */}
        <SectionTitle title='Shop By ' subTitle='Category'/>
        <CommonSlider images={images} swiperOptions={categoriesSwiperOptions} isMainSlider={false} />
      </div>
    </section>
  )
}
