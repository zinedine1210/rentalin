import Image from 'next/image';
import myImageLoader from "@@/src/utils/loader";

function Home1() {
  return (
    <div className="pt-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center pt-10 z-0">
        <div className="content-center max-w-[600px] pb-14 md:ml-5 lg:ml-0">
          <h1 className="font-bold text-4xl lg:text-6xl  text-center md:text-left">
            <span className="text-[#EC2027]">Kirim</span>{" "}
            <span className="text-[#505050]">dan</span>{" "}
            <span className="text-[#EC2027]">Terima</span>
          </h1>
          <h1 className="font-bold text-4xl lg:text-6xl mb-2 text-center md:text-left">
            <span className="text-[#EC2027]">Dana</span>{" "}
            <span className="text-[#505050]">Antar</span>{" "}
            <span className="text-[#505050]">Negara</span>
          </h1>
          <h1 className="font-bold text-4xl lg:text-6xl mb-3 text-center md:text-left">
            <span className="text-[#EC2027]">Tanpa</span>{" "}
            <span className="text-[#EC2027]">Kendala</span>
          </h1>
          <p className="text-base text-[#505050] text-center md:text-left">
            Hanya dengan satu kali klik, bisa kirim dan terima dana dalam
            hitungan menit tanpa dipersulit.
          </p>
        </div>
        <div className="max-w-[500px] pt-8 z-10 flex justify-center items-center">
          <Image src="/images/static-LP/mockup-beyondtech2.webp" alt="Mockup" className="w-full sm:w-3/4 lg:w-full h-auto object-contain" width={759} height={766} placeholder={`data:image/${myImageLoader(759, 766)}`}/>
        </div>

        {/* Lingkaran yang hanya muncul di layar menengah ke atas */}
        <div className="hidden md:flex justify-center md:w-[580px] md:h-[580px] lg:w-[680px] lg:h-[660px] absolute -right-56 top-24 border border-red-500 rounded-full z-0">
          <div className="bg-gradient-to-b from-[#EC2027] to-[#861216] w-full mt-7 ml-7 mb-7 mr-7 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Home1;
