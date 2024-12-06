import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

function Home14() {
  useEffect(() => {
    AOS.init(
      {once: true}
    );
  }, [])
    return (
      <div className="mt-40 ml-5 mr-5 mb-10" data-aos="fade-up" data-aos-duration="500">
        <div className="container mx-auto flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#505050]">Berita</h1>
          </div>
          {/* Responsif grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 m-5">
            {/* Card Berita */}
            <div className="rounded-lg border-[2px] p-5">
              <div className="h-40 bg-[#B52323] rounded-lg mb-3"></div>
              <p className="text-[#505050]">Judul berita atau deskripsi singkat di sini...</p>
            </div>
            <div className="rounded-lg border-[2px] p-5">
              <div className="h-40 bg-[#B52323] rounded-lg mb-3"></div>
              <p className="text-[#505050]">Judul berita atau deskripsi singkat di sini...</p>
            </div>
            <div className="rounded-lg border-[2px] p-5">
              <div className="h-40 bg-[#B52323] rounded-lg mb-3"></div>
              <p className="text-[#505050]">Judul berita atau deskripsi singkat di sini...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home14;
  