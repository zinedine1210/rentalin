import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Image from "next/image";
import myImageLoader from "@@/src/utils/loader";

import { useRef } from "react";

function Home7() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  const scrollContainer = useRef(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 500, behavior: "smooth" });

      // Check if user has scrolled to the end and reset to start if so
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      if (scrollLeft + clientWidth >= scrollWidth) {
        scrollContainer.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  };

  // Data untuk setiap card
  const cardData = [
    {
      image: "/images/static-LP/image 28.webp",
      title: "Kirim Uang (Domestik & Internasional)",
      description:
        "Kemudahan mengirimkan uang baik domestik atau ke lebih dari 200 mata uang di 50 negara dengan kurs terbaik tanpa biaya tersembunyi",
    },
    {
      image: "/images/static-LP/image 29.webp",
      title: "Ajukan & Terima Pembayaran",
      description:
        "Kirim permintaan uang ke profil yang Anda tuju dan dapatkan pembayaran secara realtime dari rekening bank terkait yang telah terdaftar",
    },
    {
      image: "/images/static-LP/image 27.webp",
      title: "Mulai Berjualan",
      description:
        "Merintis usaha lebih mudah dengan QRIS. Cukup buat, cetak, atau tampilkan QRIS dan terima pembayaran langsung dari ponsel Anda",
    },
    {
      image: "/images/static-LP/image 30.webp",
      title: "Donasi",
      description:
        "Perubahan dimulai dari Anda. Kami mempermudah dalam penggalangan dana untuk mendukung badan amal",
    },
  ];

  // Menggandakan cardData untuk efek infinite scroll
  const doubledCardData = [...cardData, ...cardData];

  return (
    <div
      className="container mx-auto mt-40 px-4"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <div className="flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-[#1B75BB] text-lg sm:text-xl">
            Beyondtech untuk Kamu
          </h1>
          <h1 className="font-semibold text-2xl md:text-3xl text-[#505050] mt-3">
            Kirim & Terima
          </h1>
          <p className="text-base text-[#505050] mt-5">
            Kami memahami akan segala kebutuhan transaksi Anda melalui
            infrastruktur fintech
          </p>
          <p className="text-base text-[#505050]">
            yang inovatif untuk memanfaatkan peluang baru yang muncul.
          </p>
        </div>

        <div className="relative flex items-center w-full mt-10">
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-gray-300 hover:bg-gray-400 p-2 rounded-full shadow"
          >
            &larr;
          </button>

          <div
            ref={scrollContainer}
            className="flex space-x-7 overflow-x-auto no-scrollbar px-2 py-3"
          >
            {doubledCardData.map((card, index) => (
              <div
                key={index}
                className="min-w-[280px] md:min-w-[320px] lg:min-w-[360px] max-w-xs rounded overflow-hidden shadow-lg"
              >
                <div className="bg-[#1B75BB] flex items-center justify-center h-40">
                  <Image
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full"
                    width={319}
                    height={183}
                    placeholder={`data:image/${myImageLoader(319, 183)}`}
                  />
                </div>
                <div className="px-2 py-4">
                  <div className="font-bold text-base mb-2">{card.title}</div>
                  <p className="text-gray-700 text-sm">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 bg-gray-300 hover:bg-gray-400 p-2 rounded-full shadow"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home7;
