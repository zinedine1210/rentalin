import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import group58682 from "../assets/Group 58682.webp";
import Image from "next/image";
import myImageLoader from "@@/src/utils/loader";

function Home11() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
    <div
      className="container mx-auto mt-40 px-4 md:px-10 h-auto"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <div className="flex flex-col justify-center items-center">
        {/* Judul Visi Misi */}
        <div className="text-center mt-10">
          <h1 className="font-semibold text-2xl md:text-3xl text-[#505050]">
            Visi Misi
          </h1>
        </div>

        {/* Gambar dengan lebar responsif */}
        <div className="mt-10 w-full">
          <Image
            src="/images/static-LP/Group 58682.webp"
            alt="Visi Misi"
            className="w-full h-auto"
            width={1088}
            height={615}
            placeholder={`data:image/${myImageLoader(1088, 615)}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Home11;
