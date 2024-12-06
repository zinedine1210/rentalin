import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Image from "next/image";
import myImageLoader from "@@/src/utils/loader";


function Home5() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
    <div
      className="container mx-auto mt-36 px-4 lg:px-16"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <div className="flex flex-col lg:flex-row justify-center items-start space-y-16 lg:space-x-5 lg:space-y-0">
        <div className="w-full lg:w-3/5">
          <h1 className="text-[#1B75BB] text-xl">REMITTANCE</h1>
          <h1 className="mt-4 font-semibold text-xl md:text-3xl text-[#505050]">
            Cara Paling Mudah, Aman, dan Nyaman
          </h1>
          <h1 className="font-semibold text-xl md:text-3xl text-[#505050]">
            Transfer Dana dari Indonesia ke 200+
          </h1>
          <h1 className="font-semibold text-xl md:text-3xl text-[#505050]">
            Negara
          </h1>
          <p className="mt-3 text-base text-[#505050]">
            Solusi berupa Platform pengiriman uang yang terintegrasi dengan
            seluruh bank yang terhubung dengan principal / bank switching yang
            bekerja sama.
          </p>
          <div className="mt-5 space-y-5">
            <div className="flex flex-row gap-4">
              <Image
                src="/images/static-LP/Vector.webp"
                alt="pic"
                className="w-[20px] h-[20px]"
                width={20}
                height={20}
                placeholder={`data:image/${myImageLoader(20, 20)}`}
              />
              <p className="text-sm text-[#505050]">Support 200+ Mata Uang</p>
            </div>
            <div className="flex flex-row gap-4">
              <Image
                src="/images/static-LP/Vector.webp"
                alt="pic"
                className="w-[20px] h-[20px]"
                width={20}
                height={20}
                placeholder={`data:image/${myImageLoader(20, 20)}`}
              />
              <p className="text-sm text-[#505050]">
                Dana bisa sampai di hari yang sama
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Image
                src="/images/static-LP/Vector.webp"
                alt="pic"
                className="w-[20px] h-[20px]"
                width={20}
                height={20}
                placeholder={`data:image/${myImageLoader(20, 20)}`}
              />
              <p className="text-sm text-[#505050]">
                Dana Dapat Di Terima Full tanpa potongan
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Image
                src="/images/static-LP/Vector.webp"
                alt="pic"
                className="w-[20px] h-[20px]"
                width={20}
                height={20}
                placeholder={`data:image/${myImageLoader(20, 20)}`}
              />
              <p className="text-sm text-[#505050]">
                Kurs dan biaya sangat kompetitif
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Image
                src="/images/static-LP/Vector.webp"
                alt="pic"
                className="w-[20px] h-[20px]"
                width={20}
                height={20}
                placeholder={`data:image/${myImageLoader(20, 20)}`}
              />
              <p className="text-sm text-[#505050]">
                Stabil untuk mengurangi resiko kerugian
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Image
                src="/images/static-LP/Vector.webp"
                alt="pic"
                className="w-[20px] h-[20px]"
                width={20}
                height={20}
                placeholder={`data:image/${myImageLoader(20, 20)}`}
              />
              <p className="text-sm text-[#505050]">
                Aman dengan Lisensi Resmi Bank Indonesia
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <Image
            src="/images/static-LP/pichomee.webp"
            alt="pic"
            className="w-full sm:w-3/4 lg:w-full h-auto"
            width={576}
            height={579}
            placeholder={`data:image/${myImageLoader(576, 579)}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Home5;
