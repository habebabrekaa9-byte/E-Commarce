import { Interface } from 'node:readline'
import React from 'react'
interface SectionTitleProps {
  title: string,
  subTitle: string
}
export default function SectionTitle({ title, subTitle }: SectionTitleProps) {
  return (
    <section className='py-4'>
      <div className="container">
        <div className="flex gap-1 font-bold text-3xl">
          <h2 className="relative  ps-12 font-bold before:content-[''] before:absolute before:left-0  before:inset-s-0 before:top-1/2 before:-translate-y-1/2 before:w-12 before:h-[8px] before:rounded-sm before:bg-green-600">{title}</h2>
          <p className='text-emerald-600'>{subTitle}</p>
        </div>
      </div>
    </section>
  )
}
