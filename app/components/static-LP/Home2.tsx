import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import Image from 'next/image';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import myImageLoader from "@@/src/utils/loader";
import { ClientModel, ClientType } from '@@/lib/client/data/ClientModel';
import { ApiResponse, fetchClient, TableResponse } from '@@/src/hooks/CollectionAPI';


function Home2() {
  const [data, setData] = useState<ClientModel[]>([])

  const getData = async () => {
    const result: ApiResponse<TableResponse<ClientType[]>> = await fetchClient('GET', '/data/client')
    const responseData = result.data
    if(result.success){
      const toModel: ClientModel[] = ClientModel.toDatatableResponse(responseData.data)
      setData(toModel)
    }
    console.log(result)
  }
  useEffect(() => {
    AOS.init(
      {once: true}
    );
    getData()
  }, [])

  return (
    <div className="sm:pb-20 relative z-10" data-aos="fade-up" data-aos-duration="500">
      <div className="flex flex-col md:flex-row justify-center md:space-x-36 space-y-6 md:space-y-0 py-12 bg-[#EC2027] text-white text-center">
        <div>
          <h1 className="font-bold text-xl md:text-2xl">
            50
            <FontAwesomeIcon
              icon={faPlus}
              className="font-bold"
              style={{ fontSize: "18px" }}
            />
          </h1>
          <p>Mata Uang</p>
        </div>
        <div>
          <h1 className="font-bold text-xl md:text-2xl">
            200
            <FontAwesomeIcon
              icon={faPlus}
              className="font-bold"
              style={{ fontSize: "18px" }}
            />
          </h1>
          <p>Negara</p>
        </div>
        <div>
          <h1 className="font-bold text-xl md:text-2xl">
            100.000
            <FontAwesomeIcon
              icon={faPlus}
              className="font-bold"
              style={{ fontSize: "18px" }}
            />
          </h1>
          <p>Pengguna</p>
        </div>
        <div>
          <h1 className="font-bold text-xl md:text-2xl">
            20
            <FontAwesomeIcon
              icon={faPlus}
              className="font-bold"
              style={{ fontSize: "18px" }}
            />
          </h1>
          <p>Metode Pembayaran</p>
        </div>
      </div>

      {/* Container for the images with proper sizing */}
      <div className="animate-slide flex flex-row justify-center items-center py-10 space-x-12 bg-[#ffff]">
        {
          data.length > 0 && data.map((item, key: number) => {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.file_path} alt={item.file_name} key={key} className='grayscale contrast-50 max-w-[215px] max-h-[45px]' />
            )
          })
        }
      </div>
    </div>
  );
}

export default Home2;
