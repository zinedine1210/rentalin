import Modal from '@@/app/components/Partials/Modal';
import { UnitModel } from '@@/lib/units/data/UnitModel';
import { useGlobalContext } from '@@/src/providers/GlobalContext';
import { formatCurrency, formatDateData } from '@@/src/utils/script';
import { Filter } from './MainView2';

export default function ModalForm({
  filter
}: {
  filter: Filter
}){
    const { state, setState } = useGlobalContext()

    const data: null | UnitModel = state?.modal?.data

    console.log(data)
  
    return (
      <Modal name='formunit'>
          <div className='min-w-[900px]'>
            <header className='border-b pb-3'>
              <h1 className='font-semibold'>Formulir Penyewaan Sekaligus Daftar</h1>
            </header>

            <div className='min-w-full grid grid-cols-3 gap-5 relative p-5'>
              <div className='col-span-3 border p-5 rounded-md flex items-center gap-5 justify-evenly'>
                <div>
                  <h1 className='font-semibold'>Ambil Unit</h1>
                  <p className='text-zinc-500'>{filter?.start_date ? formatDateData(filter.start_date):""}</p>
                </div>
                <div>
                  <h1 className='font-semibold'>Kembalikan Unit</h1>
                  <p className='text-zinc-500'>{filter?.start_date ? formatDateData(filter.start_date):""}</p>
                </div>
                <div>
                  <h1 className='font-semibold'>Lokasi Unit</h1>
                  <p className='text-zinc-500'>Jakarta Timur, Cakung</p>
                </div>
              </div>
              <div className='space-y-5 col-span-2'>
                <div className='border p-5 flex items-center gap-5'>
                  <div className="h-40 bg-cover bg-center w-full max-w-40 rounded-xl shadow-md" style={{ backgroundImage: `url('${data?.file_path}')`}}></div>
                  <div className='w-full'>
                    <h1 className='font-semibold text-xl'>{data?.name_unit}</h1>
                    <p className='text-primary-500'>{data?.price ? formatCurrency(data.price, true):""} / hari</p>
                  </div>
                </div>
              </div>
              <div className='border p-5 rounded-md col-span-1'>
                <h1>Rincian Total Biaya</h1>
                <div className=''>
                  
                </div>
              </div>
            </div>
          </div>
      </Modal>
    );
}
