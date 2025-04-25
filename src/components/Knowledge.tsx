'use client'

import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import Cards from './Cards'
import Image from 'next/image';
const TSHIRTS = [
  '/lang/nj.png',
  '/languages/js.png',
  '/languages/typescript.png',
  '/languages/angular.png',
  '/languages/bootstrap.png',
  '/languages/css.png',
  '/languages/framermotion.png',
  '/languages/html.png',
  '/lang/nodejs.png',
  '/lang/postgresql.png',
  '/lang/react.png',
]

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = []

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }

  return result
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: string[]
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}) {
  const columnRef = useRef<HTMLDivElement | null>(null)
  const [columnHeight, setColumnHeight] = useState(0)
  const duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) return

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={cn('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration } as React.CSSProperties}>
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
        id="knowledge"
          key={reviewIndex}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  )
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAYS = [
    '0s',
    '0.1s',
    '0.2s',
    '0.3s',
    '0.4s',
    '0.5s',
  ]

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)]

  return (
    <div
    className={cn(
      "animate-fade-in rounded-2xl bg-white p-4 sm:p-6 w-[130px] sm:w-[190px] md:w-[250px] opacity-100 shadow-xl shadow-slate-900/5",
      className
    )}
    
      style={{ animationDelay }}
      {...props}>
      <Cards imgSrc={imgSrc} />
    </div>
  )
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, { once: true, amount: 0.4 });
  const columns = splitArray(TSHIRTS, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className='relative -mx-4 mt-16 px-12 mr-1 sm:px-0 grid h-[39rem] max-h-[100vh] grid-cols-1 items-start gap-8 overflow-hidden mt-20 md:grid-cols-2 lg:grid-cols-3 justify-items-end'>
      {isInView ? (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              cn({
                'md:hidden': reviewIndex >= column1.length + column3[0].length,
                'lg:hidden': reviewIndex >= column1.length,
              })
            }
            msPerPixel={6}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className='hidden md:block'
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={12}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className='hidden md:block'
            msPerPixel={6}
          />
        </>
      ) : null}
      <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100' />
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100' />
    </div>
  );
}

export function Knowledge() {
  return (
    <MaxWidthWrapper className='relative max-w-5xl'>
      {/* Image, positioned more to the right for mobile */}
      <Image
        aria-hidden='true'
        src='/pictures/skilled-in.png'
        alt=''
        className='absolute select-none -left-10 top-1/3 w-[290px] sm:w-[300px] md:w-[370px] lg:w-[370px] xl:block lg:-left-24 xl:-left-30' 
      />
      {/* Align ReviewGrid to the right side */}
      <div className="flex justify-end">
        <ReviewGrid />
      </div>
    </MaxWidthWrapper>
  )
}