import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Image from "next/image";
import myImageLoader from "@@/src/utils/loader";

function Home3() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
    <div
      className="container mx-auto mt-20 px-4 sm:px-8 lg:px-16"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <div className="flex justify-center">
        <div>
          <h1 className="text-[#1B75BB] text-center">Features</h1>
          <h1 className="font-bold text-2xl md:text-3xl  pt-3 text-center">
            <span className="text-[#505050]">Memberikan</span>{" "}
            <span className="text-[#EC2027]">Kemudahan,</span>{" "}
            <span className="text-[#505050]">Melampaui</span>{" "}
            <span className="text-[#EC2027]">Batasan</span>
          </h1>
          <h1 className="font-bold text-2xl md:text-3xl  text-center">
            <span className="text-[#505050]">Untuk</span>{" "}
            <span className="text-[#EC2027]">Mencapai</span>{" "}
            <span className="text-[#EC2027]">Tujuan</span>
          </h1>
          <p className="mt-3 text-base text-center text-[#505050]">
            Kami hadir sebagai solusi bagi kamu yang mau bergerak maju dan
            membuka akses untuk
          </p>
          <p className="text-base text-center text-[#505050]">
            memudahkan dalam menggapai tujuan di balik setiap kebutuhan
            finansial
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-start lg:space-y-0 lg:space-x-0 mt-36 space-y-16">
        <div className="w-full lg:w-3/5">
          <h1 className="text-[#1B75BB] text-xl">PAYMENT LINK</h1>
          <h1 className="font-semibold text-xl md:text-3xl text-[#505050] mt-4">
            Terima Pembayaran dari Pelanggan
          </h1>
          <h1 className="font-semibold text-xl md:text-3xl text-[#505050] ">
            Mana Aja Dengan Hanya Link Sederhana
          </h1>
          <p className="text-base text-[#505050] mt-4">
            Kemudahan dalam menerima pembayaran seperti membalikkan telapak
            tangan. Cukup dengan membuat link lalu bagikan pelanggan kamu
            melalui WhatsApp, SMS, Email, Media Sosial, dan masih banyak lagi.
          </p>
          <div className="mt-5 space-y-5">
            <div className="flex flex-row gap-4">
              <Image
                src="/images/static-LP/Vector.webp"
                alt="logo contreng"
                className="w-[20px] h-[20px] mt-2"
                width={20}
                height={20}
              />
              <div className="text-sm text-[#505050]">
                <p>
                  Terima Pembayaran dari metode pembayaran apa saja seperti
                  Kartu Kredit/
                </p>
                <p>Debit, Virtual Account, E-Wallet, Direct Debit</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Image
                src="/images/static-LP/Vector.webp"
                alt="logo contreng"
                className="w-[20px] h-[20px] mt-2"
                width={20}
                height={20}
              />
              <div className="text-sm text-[#505050]">
                <p>
                  Terima notifikasi real time saat pelanggan kamu sudah
                  menyelesaikan
                </p>
                <p>pembayaran</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Image
                src="/images/static-LP/Vector.webp"
                alt="logo contreng"
                className="w-[20px] h-[20px] mt-2"
                width={20}
                height={20}
              />
              <div className="text-sm text-[#505050]">
                <p>Tersedia Integrasi dengan API untuk pembuatan link dalam</p>
                <p>
                  jumlah yang banyak dan kirim otomatis tanpa salin dan tempel
                  manual
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Image
                src="/images/static-LP/Vector.webp"
                alt="logo contreng"
                className="w-[20px] h-[20px] mt-2"
                width={20}
                height={20}
              />
              <div className="text-sm text-[#505050]">
                <p>
                  Atur dan sesuaikan batas waktu transaksi yang kamu inginkan
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <Image
            src="/images/static-LP/Group 58677.webp"
            alt="Illustration"
            className="w-full sm:w-3/4 lg:w-full h-auto"
            width={585}
            height={580}
            placeholder={`data:image/${myImageLoader(585, 580)}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Home3;
