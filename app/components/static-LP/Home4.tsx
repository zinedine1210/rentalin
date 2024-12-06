import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Image from "next/image";
import myImageLoader from "@@/src/utils/loader";


function Home4() {
  useEffect(() => {
    AOS.init(
      {once: true}
    );
  }, [])
  return (
    <div className="container mx-auto px-4 lg:px-16 mt-36" data-aos="fade-up" data-aos-duration="500">
      <div className="flex flex-col lg:flex-row justify-center lg:space-x-5 lg:space-y-0 space-y-24">
        <div className="flex justify-center items-center w-full lg:w-1/2 mt-7">
          <Image
              src="/images/static-LP/Group 58679.webp"
              alt="pic"
              width={566}
              height={580}
              placeholder={`data:image/${myImageLoader(566, 580)}`}
            />
        </div>
        <div className="w-full lg:w-1/2 ml-auto">
          <h1 className="text-[#1B75BB] text-xl">DISBURSEMENT</h1>
          <h1 className="mt-4 font-semibold text-xl md:text-3xl text-[#505050]">
            Transfer Dana ke Banyak Tujuan Lebih
          </h1>
          <h1 className=" font-semibold text-xl md:text-3xl text-[#505050]">
            Aman Tanpa Kerumitan
          </h1>
          <p className="mt-3 text-base text-[#505050]">
            Kirim dana ke banyak tujuan untuk segala kebutuhan operasional usaha
            lebih optimal dan dapat diselesaikan di hari yang sama. Ucapkan
            selamat tinggal pada kerumitan dan fokuskan pada kesuksesan.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4 w-full">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Image
                src="/images/static-LP/pichome5.webp"
                alt="pic"
                className="bg-[#F7FCFF] p-2 w-14 rounded"
                width={48}
                height={48}
                placeholder={`data:image/${myImageLoader(48, 48)}`}
              />
              <p className="text-xs text-center text-[#505050]">
                Cukup sekali konfirmasi untuk kirim ke banyak tujuan
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <Image
                src="/images/static-LP/pic2home5.webp"
                alt="pic"
                className="bg-[#F7FCFF] p-2 w-14 rounded"
                width={50}
                height={51}
                placeholder={`data:image/${myImageLoader(50, 51)}`}
              />
              <p className="text-xs text-center text-[#505050]">
                Pembayaran diproses secara real-time tanpa tertunda
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <Image
                src="/images/static-LP/pic3home5.webp"
                alt="pic"
                className="bg-[#F7FCFF] p-2 w-14 rounded"
                width={43}
                height={47}
                placeholder={`data:image/${myImageLoader(43, 47)}`}
              />
              <p className="text-xs text-center text-[#505050]">
                Bayar per pengiriman dana tanpa tambahan biaya
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <Image
                src="/images/static-LP/pic4home5.webp"
                alt="pic"
                className="bg-[#F7FCFF] p-2 w-14 rounded"
                width={44}
                height={47}
                placeholder={`data:image/${myImageLoader(44, 47)}`}
              />
              <p className="text-xs text-center text-[#505050]">
                Integrasi dan penggunaan yang mudah, kompatibel dengan sistem
                apapun
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <Image
                src="/images/static-LP/pic5home5.webp"
                alt="pic"
                className="bg-[#F7FCFF] p-2 w-14 rounded"
                width={46}
                height={46}
                placeholder={`data:image/${myImageLoader(46, 46)}`}
              />
              <p className="text-xs text-center text-[#505050]">
                Fitur keamanan berlapis setara dengan bank untuk menjamin
                keamanan
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <Image
                src="/images/static-LP/pic6home5.webp"
                alt="pic"
                className="bg-[#F7FCFF] p-2 w-14 rounded"
                width={40}
                height={39}
                placeholder={`data:image/${myImageLoader(40, 39)}`}
              />
              <p className="text-xs text-center text-[#505050]">
                Validasi rekening bank untuk mengurangi kesalahan pembayaran
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-7">
            <h1 className="text-sm font-bold text-[#505050]">
              Mempermudah proses bisnis seperti:
            </h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            <div className="flex items-center justify-center p-4  rounded-md border border-gray-300">
              <p className="text-xs text-center text-[#505050]">
                Gaji dan insentif karyawan atau Komisi
              </p>
            </div>
            <div className="flex items-center justify-center p-4 rounded-md border border-gray-300">
              <p className="text-xs text-center text-[#505050]">
                Pembayaran ke vendor atau rekananan
              </p>
            </div>
            <div className="flex items-center justify-center p-4 rounded-md border border-gray-300">
              <p className="text-xs text-center text-[#505050]">
                Penyaluran Dana Pinjaman P2P
              </p>
            </div>
            <div className="flex items-center justify-center p-4 rounded-md border border-gray-300">
              <p className="text-xs text-center text-[#505050]">
                Pengembalian Dana atau Refund
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home4;
