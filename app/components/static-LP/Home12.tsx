import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

function Home12() {
    useEffect(() => {
        AOS.init(
          {once: true}
        );
      }, [])
    return (
        <div className="mt-40 ml-10" data-aos="fade-up" data-aos-duration="500">
            <div className="container mx-auto flex flex-col justify-center mt-10">
                <div className="text-center mr-10 md:mr-0">
                    <h1 className="font-bold text-xl md:text-3xl text-[#505050]">BeyondTech menghilangkan proses</h1>
                    <h1 className="font-bold text-xl md:text-3xl text-[#505050]">yang tidak perlu, untuk ...</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5 mt-10 ml-5 mr-20 pb-5">
                    <div className="bg-[#B52323] rounded-lg pb-7">
                        <h1 className="font-bold text-2xl text-[#FFFFFF] m-5">PERSONAL</h1>
                        <p className=" text-xl text-[#FFFFFF] ml-3 mt-20">Mempermudah segala</p>
                        <p className=" text-xl text-[#FFFFFF] ml-3">urusan untuk biaya</p>
                        <p className=" text-xl text-[#FFFFFF] ml-3">hidup, biaya medis,</p>
                        <p className=" text-xl text-[#FFFFFF] ml-3">hingga investasi</p>
                    </div>
                    <div className="bg-[#2952A1] rounded-lg pb-7">
                        <h1 className="font-bold text-2xl text-[#FFFFFF] m-5">BISNIS</h1>
                        <p className=" text-xl text-[#FFFFFF] ml-3 mt-20">Mendukung</p>
                        <p className=" text-xl text-[#FFFFFF] ml-3">pertumbuhan bisnis</p>
                        <p className=" text-xl text-[#FFFFFF] ml-3">secara ringkas dan</p>
                        <p className=" text-xl text-[#FFFFFF] ml-3">tangkas dengan solusi,</p>
                        <p className=" text-xl text-[#FFFFFF] ml-3">bukan ilusi</p>
                    </div>
                    <div className="bg-[#B52323] rounded-lg pb-7">
                        <h1 className="font-bold text-2xl text-[#FFFFFF] m-5">PENDIDIKAN</h1>
                        <p className=" text-xl text-[#FFFFFF] ml-3 mt-20">Mencapai tujuan dengan</p>
                        <p className=" text-xl text-[#FFFFFF] ml-3">kemudahan untuk meraih</p>
                        <p className=" text-xl text-[#FFFFFF] ml-3">pendidikan dan</p>
                        <p className=" text-xl text-[#FFFFFF] ml-3">melampaui batasan</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home12