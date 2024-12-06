import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Image from "next/image";
import myImageLoader from "@@/src/utils/loader";

function Home8() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
    <div
      className="container mx-auto mt-40"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <div className="flex flex-col justify-center px-4 md:px-10 lg:px-20">
        <div className="flex flex-col text-center">
          <h1 className="text-[#1B75BB] text-xl">
            Berkembang Pesat Dengan Beyondtech
          </h1>
          <h1 className="font-semibold  text-2xl md:text-3xl text-[#505050] mt-3">
            Operasional Bisnis
          </h1>
          <p className="text-base text-[#505050] mt-5">
            Lewati Kendala, lipat gandakan keuntungan Anda. Biarkan Anda Fokus
            dalam
          </p>
          <p className="text-base text-[#505050]">
            pengembangan usaha dan serahkan kebutuhan pembayaran Anda kepada
            kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 mt-10">
          <div className="">
            <div className="bg-[#1B75BB] rounded-full w-8 h-8">
              <Image
                src="/images/static-LP/checklist.webp"
                alt="pic"
                className="w-full h-full p-2"
                width={33}
                height={24}
                placeholder={`data:image/${myImageLoader(33, 24)}`}
              />
            </div>
            <h1 className="font-bold text-base text-[#505050] mt-4">
              Metode Pembayaran
            </h1>
            <p className="text-sm text-[#505050] mt-3 mr-20">
              Tersedia lebih dari 20+ metode pembayaran seperti e-Wallet, Bank
              Transfer, Payment Link, Kartu Kredit/Debit, dan masih banyak lagi
            </p>
          </div>
          <div className="md:ml-10">
            <div className="bg-[#1B75BB] rounded-full w-8 h-8">
              <Image
                src="/images/static-LP/checklist.webp"
                alt="pic"
                className="w-full h-full p-2"
                width={33}
                height={24}
                placeholder={`data:image/${myImageLoader(33, 24)}`}
              />
            </div>
            <h1 className="font-bold text-base text-[#505050] mt-4">
              Dukungan Penuh 24/7
            </h1>
            <p className="text-sm text-[#505050] mt-3 mr-20">
              Butuh bantuan? Jangan khawatir! Tim ahli kami siap membantu segala
              kebutuhan Anda bahkan saat tengah malam sekalipun
            </p>
          </div>
          <div className="">
            <div className="bg-[#1B75BB] rounded-full w-8 h-8">
              <Image
                src="/images/static-LP/checklist.webp"
                alt="pic"
                className="w-full h-full p-2"
                width={33}
                height={24}
                placeholder={`data:image/${myImageLoader(33, 24)}`}
              />
            </div>
            <h1 className="font-bold text-base text-[#505050] mt-4">
              Efisiensi melalui Otomatisasi
            </h1>
            <p className="text-sm text-[#505050] mt-3 mr-20">
              Tinggalkan beban kerja manual dengan pembayaran otomatis melalui
              API, verifikasi pembayaran dan laporan keuangan otomatis dan
              fokuskan ke pekerjaan lainnya
            </p>
          </div>
          <div className="md:ml-10">
            <div className="bg-[#1B75BB] rounded-full w-8 h-8">
              <Image
                src="/images/static-LP/checklist.webp"
                alt="pic"
                className="w-full h-full p-2"
                width={33}
                height={24}
                placeholder={`data:image/${myImageLoader(33, 24)}`}
              />
            </div>
            <h1 className="font-bold text-base text-[#505050] mt-4">
              Integrasi Sesuai Kebutuhan
            </h1>
            <p className="text-sm text-[#505050] mt-3 mr-20">
              Nikmati fleksibilitas melalui plugin yang siap digunakan hingga
              API yang disesuikan dengan kebutuhan bisnis Anda melalu platform
              apa saja
            </p>
          </div>
          <div className="">
            <div className="bg-[#1B75BB] rounded-full w-8 h-8">
              <Image
                src="/images/static-LP/checklist.webp"
                alt="pic"
                className="w-full h-full p-2"
                width={33}
                height={24}
                placeholder={`data:image/${myImageLoader(33, 24)}`}
              />
            </div>
            <h1 className="font-bold text-base text-[#505050] mt-4">
              Manajemen Resiko
            </h1>
            <p className="text-sm text-[#505050] mt-3 mr-20">
              Dilengkapi dengan sistem keamanan yang berlisensi dari otoritas
              regulasi kelas dunia sehingga Anda bisa fokus mengembangkan bisnis
            </p>
          </div>
          <div className="md:ml-10">
            <div className="bg-[#1B75BB] rounded-full w-8 h-8">
              <Image
                src="/images/static-LP/checklist.webp"
                alt="pic"
                className="w-full h-full p-2"
                width={33}
                height={24}
                placeholder={`data:image/${myImageLoader(33, 24)}`}
              />
            </div>
            <h1 className="font-bold text-base text-[#505050] mt-4">
              Gratis Biaya Pendaftaran
            </h1>
            <p className="text-sm text-[#505050] mt-3 mr-20">
              Semua transparan. Anda hanya dikenakan biaya per transaksi sukses
              dan tidak ada biaya tersembunyi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home8;
