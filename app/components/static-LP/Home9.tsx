import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


function Home9() {
  useEffect(() => {
    AOS.init(
      {once: true}
    );
  }, [])
    return (
      <div className="container mx-auto mt-36 px-4 md:px-10 lg:px-20" data-aos="fade-up" data-aos-duration="500">
        <div className="flex flex-col justify-center">
          <div className="text-center mt-10">
            <h1 className="font-bold text-2xl">
              <span className="text-[#505050]">Cara</span>{" "}
              <span className="text-[#505050]">Kami</span>{" "}
              <span className="text-[#EC2027]">Bekerja</span>
            </h1>
            <p className="text-sm text-[#505050] mt-5">
              Beyondtech menjembatani transaksi Anda ke luar negeri. Anda hanya
              perlu mengirimkan
            </p>
            <p className="text-sm text-[#505050]">
              dana melalui aplikasi kami dan kami akan teruskan ke rekening
              penerima
            </p>
          </div>
          
          {/* Konten Cara Lama dan Cara Baru */}
          <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            <div className="text-center rounded h-full p-5 border-2 border-gray-300">
              <h1 className="text-lg font-bold text-[#505050]">Cara Lama</h1>
              <p className="text-sm text-[#505050] mt-2">
                Detail mengenai cara lama proses transaksi.
              </p>
            </div>
            <div className=" text-center rounded h-full p-5 border-2 border-gray-300">
              <h1 className="text-lg font-bold text-[#505050]">Cara Baru</h1>
              <p className="text-sm text-[#505050] mt-2">
                Detail mengenai cara baru proses transaksi yang lebih efisien.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home9;
  