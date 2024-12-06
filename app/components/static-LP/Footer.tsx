import myImageLoader from "@@/src/utils/loader";
import Image from "next/image";

function Footer() {
  return (
    <div className="mt-20">
      <div className="flex flex-col lg:flex-row justify-center bg-[#003C6A] lg:space-x-10 p-5">
        <div className="flex flex-col items-center lg:items-start mt-5 lg:mt-20 lg:ml-10 w-full lg:w-1/3 text-center lg:text-left">
          <Image
            src="/images/static-LP/Layer_1.webp"
            alt="beyondtech"
            width={220}
            height={99}
            placeholder={`data:image/${myImageLoader(220, 99)}`}
          />

          <p className="text-sm text-[#FFFFFF] mt-10">
            Track your card order effortlessly!
          </p>
          <p className="text-sm text-[#FFFFFF]">
            Log in to your account and check the
          </p>
          <p className="text-sm text-[#FFFFFF]">
            {"Order History"} for real-time updates.
          </p>
          <p className="text-sm text-[#FFFFFF]">
            Simplify tracking with Hamilton.
          </p>
          <div className="flex flex-row mt-4 lg:mt-10">
            <Image
              src="/images/static-LP/Facebook.png"
              alt="facebook"
              width={70}
              height={70}
              placeholder={`data:image/${myImageLoader(70, 70)}`}
            />
            <Image
              src="/images/static-LP/Twitter.png"
              alt="facebook"
              width={70}
              height={70}
              placeholder={`data:image/${myImageLoader(70, 70)}`}
            />
            <Image
              src="/images/static-LP/Instagram.png"
              alt="facebook"
              width={70}
              height={70}
              placeholder={`data:image/${myImageLoader(70, 70)}`}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/3 mt-10 lg:mt-20 space-y-5">
          <h1 className="font-bold text-[#FFFFFF] text-center lg:text-left lg:mt-10">
            Our Services
          </h1>
          <div className="grid grid-cols-2 gap-y-3 text-center lg:text-left">
            <p className=" text-sm text-[#FFFFFF]">Product</p>
            <p className=" text-sm text-[#FFFFFF]">Solution</p>
            <p className=" text-sm text-[#FFFFFF]">Partners</p>
            <p className=" text-sm text-[#FFFFFF]">Resources</p>
            <p className=" text-sm text-[#FFFFFF]">Company</p>
            <p className="text-sm text-[#FFFFFF]">Enterprise</p>
          </div>
        </div>
        <div className="w-full lg:w-1/3 mt-10 lg:mt-20 text-center lg:text-left">
          <h1 className="font-bold text-[#FFFFFF] lg:mt-10">Contact</h1>

          <p className=" text-sm text-[#FFFFFF] mt-3">
            Propan Tower @ Ciputra International - 14, Lantai 5
          </p>
          <p className=" text-sm text-[#FFFFFF]">
            RT.14/RW.4, Rw. Buaya, Kecamatan Cengkareng,
          </p>
          <p className=" text-sm text-[#FFFFFF]">
            Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta
          </p>
          <p className=" text-sm text-[#FFFFFF]">11740</p>
        </div>
      </div>
      <div className="p-2 flex justify-center bg-[#012542]">
        <p className=" text-sm text-[#FFFFFF] text-center ">
          ©2024 PT. Adisena Mitra Usaha. Hak Cipta Dilindungi Undang-Undang.
        </p>
      </div>
    </div>
  );
}

export default Footer;
