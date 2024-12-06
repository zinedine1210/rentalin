'use client'
import myImageLoader from '@@/src/utils/loader'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
 
export default function NotFound() {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div>
        <Image 
          src={`/images/notfound.png`}
          width={800}
          height={400}
          alt='not found'
          placeholder={`data:image/${myImageLoader(800, 400)}`}
          className=''
        />
        <h1 className='text-center text-3xl font-bold text-primary'>Page Not Found</h1>
        <button className='btn-primary text-center mx-auto mt-5' onClick={() => handleBack()}>Return Back</button>
      </div>
    </div>
  )
}