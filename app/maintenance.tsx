'use client'
import myImageLoader from '@@/src/utils/loader'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function MaintenancePage() {
    const router = useRouter()


    const handleback = () => router.back()
  return (
    <div className='w-full h-full min-h-full max-h-full flex items-center justify-center'>
        <div className='md:flex items-center justify-center gap-10'>
            <div className='w-full md:w-[500px] p-2'>
                <h1 className='text-3xl md:text-6xl font-bold leading-tight text-primary'>This Page Is Under Construction</h1>
                <p className='text-zinc-500 dark:text-zinc-300 mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita mollitia libero veniam reprehenderit necessitatibus blanditiis, qui beatae quas reiciendis neque in laborum provident vitae alias?</p>
                <button className='btn-primary mt-5' onClick={handleback}>Return Back</button>
            </div>
            <Image
                src={`/images/maintenance.png`}
                width={800}
                height={400}
                alt='Under construction'
                placeholder={`data:image/${myImageLoader(800, 400)}`}
                className=''
            />
        </div>
    </div>
  )
}
