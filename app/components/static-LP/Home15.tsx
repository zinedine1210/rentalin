import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Image from "next/image";
import myImageLoader from "@@/src/utils/loader";

function Home15() {
  useEffect(() => {
    AOS.init(
      {once: true}
    );
  }, [])
  return (
    <div className="mt-40 ml-10 mr-10 mb-10" data-aos="fade-up" data-aos-duration="500">
      <div className="container mx-auto flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5">
        <div>
          <h1 className='font-bold text-3xl text-[#505050]'>Frequently</h1>
          <h1 className='font-bold text-3xl text-[#EC2027] mt-1'>Asked Questions</h1>
          <p className='text-base text-[#505050] mt-5'>
            Here, you can find all the information you need to reach out to our
            online bank. Whether you have questions about your account, need
            assistance with our services, or want to provide feedback, we’re
            here to help.
          </p>
          <button className="bg-[#EC2027] hover:bg-red-500 text-white py-2 px-4 rounded mt-5 w-full lg:w-auto">
          Ask a Question
          </button>
        </div>
        <div className='space-y-3'>
          <div className='flex flex-col justify-start bg-[#F3F7FF] rounded-lg'>
            <h1 className='font-bold text-[#505050] mt-3 ml-3 mb-3'>What is online banking?</h1>
            <p className='text-[#505050] ml-3 mb-3 mr-5'>
              Online banking, also known as internet banking, is a digital
              platform provided by banks and financial institutions that allows
              customers to perform various financial transactions and manage
              their accounts over the internet.
            </p>
          </div>
          <div className='pl-3 pt-7 pb-7 bg-[#FDF8F1] rounded-lg'>
            <h1 className=' font-bold text-[#505050]'>How do I sign up for online banking?</h1>
          </div>
          <div className='pl-3 pt-7 pb-7 bg-[#FDF8F1] rounded-lg'>
            <h1 className=' font-bold text-[#505050]'>Is online banking safe?</h1>
          </div>
          <div className='pl-3 pt-7 pb-7 bg-[#F3F7FF] rounded-lg'>
            <h1 className=' font-bold text-[#505050]'>What transactions can I perform with online banking?</h1>
          </div>
        </div>
        <div className=' flex items-end w-3/4'>
            <Image
            src="/images/static-LP/image 8.webp"
            alt="man"
            className="w-full h-auto"
            width={240}
            height={559}
            placeholder={`data:image/${myImageLoader(240, 559)}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Home15;
