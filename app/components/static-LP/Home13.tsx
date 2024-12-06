import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

function Home13() {
  useEffect(() => {
    AOS.init(
      {once: true}
    );
  }, [])
  return (
    <div className="container mx-auto mt-20" data-aos="fade-up" data-aos-duration="500">
      <div className=" flex flex-col lg:flex-row justify-center items-center  bg-[#1B75BB] rounded-2xl  p-10 ml-10 mr-10  lg:space-x-96">
        <div>
          <h1 className="font-bold text-2xl md:text-4xl text-[#FFFFFF] text-center lg:text-left ">
            Mulai Berkembang Pesat dengan Beyondtech
          </h1>
          <p className="font-bold text-xl text-[#FFFFFF] mb-10 text-center lg:text-left">#PastiAdaSolusinya</p>
          <p className="font-bold text-xl text-[#FFFFFF] text-center lg:text-left">
            Scan QR & Registrasi Sekarang
          </p>
        </div>
        <div className=" mt-3 w-[250px] h-[200px] p-3 bg-[#F5F5F5] rounded-xl"></div>
      </div>
    </div>
  );
}

export default Home13;
