import Modal from '@@/app/components/Partials/Modal';
import { UnitModel } from '@@/lib/units/data/UnitModel';
import { useGlobalContext } from '@@/src/providers/GlobalContext';
import { accumulationPrice, formatCurrency, formatDateData, Notify } from '@@/src/utils/script';
import { Filter } from './MainView2';
import { Icon } from '@iconify/react';
import { OrderPayload } from '@@/database/orders-scheme';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { UsagePriceModel } from '@@/lib/usage-price/data/UsagePriceModel';
import Loading from '@@/app/loading';
import { IconsCollection } from '@@/src/constant/icons';
import { UsersPayload } from '@@/database/user-scheme';
import Link from 'next/link';
import InputText from '@@/app/components/Input/InputText';
import UploadCloudinary from '@@/app/components/Input/UploadCloudinary';
import { CloudinaryType, UploadType } from '@@/lib/uploads/data/UploadModel';
import { ApiResponse, fetchClient, tryLogin } from '@@/src/hooks/CollectionAPI';
import { UserType } from '../data/UserModel';
import { useRouter } from 'next/navigation';

export default function ModalForm({
  filter,
  usagePrice
}: {
  filter: Filter,
  usagePrice: null | UsagePriceModel
}){
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const { state, setState } = useGlobalContext()
  const [data, setData] = useState<UnitModel | null>(null)
  const [agree, setAgree] = useState<boolean>(false)
  const [fileList, setFileList] = useState<{[key: string]: UploadType}>({
    file_identity: {
      file_name: '',
      file_path: '',
      file_type: '',
      public_id: ''
    },
    file_profile_ig: {
      file_name: '',
      file_path: '',
      file_type: '',
      public_id: ''
    },
    file_driver_license: {
      file_name: '',
      file_path: '',
      file_type: '',
      public_id: ''
    }
  })
  const [userData, setUserData] = useState<UsersPayload>({
    username: '',
    email: '',
    password: '',
    phone: '',
    file_identity: 0,
    file_profile_ig: 0,
    file_driver_license: 0,
    full_name: '',
    danger_phone: '',
    address: '',
    role: 'renter',
    status: 'active'
  })
  const [formData, setFormData] = useState<OrderPayload>({
    unit_id: 0,
    renter_id: 0,
    usage_id: 0,
    armada_id: 0,
    usage_location: 'dalam kota',
    usage_price: 0,
    delivery_method: 'ambil sendiri',
    delivery_address: '',
    delivery_price: 0,
    start_date: '',
    duration: 0,
    total_price: 0,
    status: 'pending',
    request: ''
  })
  const [price, setPrice] = useState<number | null>(null)

  const endDate = filter?.start_date && filter?.duration ? new Date(new Date(filter.start_date).setDate(new Date(filter.start_date).getDate() + Number(filter.duration))) : null;

  const handleInput = (e: FormEvent) => {
    const target = e.target as HTMLInputElement
    const { value, name } = target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleUserInput = (value: string, target: string) => {
    setUserData({
      ...userData,
      [target]: value
    })
  }

  const totalAccumulation = useCallback(() => {
    if(data){
      const accDuration = price * Number(filter.duration)
      const accAddOns = formData.usage_price + formData.delivery_price
      const accTax = (accDuration + accAddOns) * 12 / 100
      const accTotal = accDuration + accAddOns + accTax
      return accTotal
    }
    return 0
  }, [data, filter.duration, formData.delivery_price, formData.usage_price, price])

  useEffect(() => {
    if(!data){
      const getDataFromModal: UnitModel = state?.modal?.data
      console.log(getDataFromModal)
      const priceFinal = getDataFromModal?.price ? accumulationPrice(getDataFromModal.price, usagePrice.price_multiplier, usagePrice.operator_type) : null
      if(getDataFromModal){
        setData(getDataFromModal)
        setFormData({
          ...formData,
          unit_id: getDataFromModal.id,
          renter_id: 0,
          usage_id: Number(usagePrice.id),
          armada_id: getDataFromModal.armada_id,
          start_date: filter.start_date,
          duration: Number(filter.duration),
          total_price: priceFinal
        })
        setPrice(priceFinal)
        setLoading(false)
      }
    }
  }, [filter, usagePrice, setLoading, data, state, formData, setFormData])

  const hargaAccumulation = () => {
    const promoUse: UsagePriceModel = usagePrice
    if(promoUse){
        return (
            <div>
                <div className="flex gap-2 items-end">
                    <h1 className="font-semibold text-xl">{formatCurrency(accumulationPrice(data.price, promoUse.price_multiplier, promoUse.operator_type), true)}</h1>
                    <p className="text-sm mb-1">/Hari</p>
                </div>
                <p className="text-sm font-light italic text-red-500 line-through">{formatCurrency(data.price, true)}</p>
            </div>
        )
    }else{
        return (
            <div className="flex gap-2 items-end">
                <h1 className="font-semibold text-xl">{formatCurrency(price, true)}</h1>
                <p className="text-sm mb-1">/Hari</p>
            </div>
        )
    }
  }

  const handleUsageLocation = (e: FormEvent) => {
      const target = e.target as HTMLInputElement
      const { value } = target
      if(value == 'dalam kota'){
        setFormData({
          ...formData,
          usage_price: 0,
          usage_location: 'dalam kota'
        })
      }else{
        setFormData({
          ...formData,
          usage_price: 50000 * Number(filter.duration),
          usage_location: 'luar kota'
      })
    }
  }

  const handleDeliveryMethod = (e: FormEvent) => {
    const target = e.target as HTMLInputElement
    const { value } = target
    if(value == 'ambil sendiri'){
      setFormData({
        ...formData,
        delivery_price: 0,
        delivery_method: 'ambil sendiri',
        delivery_address: ''
      })
    }else{
      setFormData({
        ...formData,
        delivery_price: 0,
        delivery_method: 'diantar',
        delivery_address: ''
      })
    }
  }

  const accTax = () => {
    if(data){
      const accDuration = price * Number(filter.duration)
      const accAddOns = formData.usage_price + formData.delivery_price
      const accTax = (accDuration + accAddOns) * 12 / 100
      return accTax
    }
    return 0
  }

  const checkDisabled = () => {
    if(
      agree &&
      fileList.file_identity.public_id && 
      fileList.file_profile_ig.public_id && 
      fileList.file_driver_license.public_id &&
      userData.full_name &&
      userData.email &&
      userData.phone &&
      userData.danger_phone &&
      userData.address &&
      formData.unit_id &&
      formData.armada_id &&
      formData.start_date &&
      formData.duration &&
      formData.status &&
      formData.delivery_method &&
      formData.usage_location
    ) return false
    return true
  }

  const handleFilesChange = (value: CloudinaryType, target: string) => {
      const valuestruct: UploadType = {
        file_name: value.display_name,
        file_path: value.secure_url,
        file_type: value.format,
        public_id: value.public_id
      }
      setFileList((prev: any) => ({
        ...prev,
        [target]: valuestruct
      }))
    };

  const handleSubmit = async () => {
    // Upload dulu foto2 usernya
    setLoading(true)
    let payloadUser = JSON.parse(JSON.stringify(userData))

    // upload identity
    const uploadfileidentity: ApiResponse<UploadType> = await fetchClient('POST', '/data/upload-cloudinary', fileList.file_identity)
    const resUploadfileidentity = uploadfileidentity.data
    payloadUser.file_identity = resUploadfileidentity.id

    // upload profile ig
    const uploadProfileIG: ApiResponse<UploadType> = await fetchClient('POST', '/data/upload-cloudinary', fileList.file_profile_ig)
    const resUploadFileProfileIG = uploadProfileIG.data
    payloadUser.file_profile_ig = resUploadFileProfileIG.id

    // upload driver license
    const uploadDriverLicense: ApiResponse<UploadType> = await fetchClient('POST', '/data/upload-cloudinary', fileList.file_driver_license)
    const resUploadDriverLicense = uploadDriverLicense.data
    payloadUser.file_driver_license = resUploadDriverLicense.id

    // setting value yang dibutuhkan
    payloadUser.username = userData.email
    payloadUser.password = '$2b$10$AqWluutcAOhyDuADHoMkhuRTVLPAN8LgLJFJ332jbNwC4V9v1b1LC'
    
    const createUser: ApiResponse<UserType> = await fetchClient('POST', `/auth/users`, payloadUser)
    const responseCreateUser: UserType = createUser.data
    if(!createUser.success || !responseCreateUser){
      setLoading(false)
      return Notify('error', 'Gagal membuat user baru')
    }

    const payloadOrder = JSON.parse(JSON.stringify(formData))
    // setting value yang dibutuhkan
    payloadOrder.renter_id = responseCreateUser.id
    // setFormData({
    //   ...formData,
    //   renter_id: responseCreateUser.id
    // })
    const createOrder: ApiResponse<OrderPayload> = await fetchClient('POST', '/data/orders', payloadOrder)
    const responseCreateOrder = createOrder.data
    if(!createOrder.success || !responseCreateOrder){
      setLoading(false)
      return Notify('error', 'Gagal membuat order baru')
    }

    Notify('Berhasil membuat orderan', 'success', 5000)
    Notify('Kamu akan diarahkan ke halaman pesanan', 'info', 8000)
    setState({ ...state, modal: null })

    // auto login
    const payload = {
      username: responseCreateUser.username,
      password: '12345'
    }
    const result: ApiResponse<any> = await tryLogin(payload)
    if(result.success){
      Notify(result.message, 'info', 5000)
      setLoading(false)
      setTimeout(() => {
        router.push('/renter')
      }, 2000);
    }else{
      setLoading(false)
      Notify(result.message, 'error')
    }
  }
  
  return (
    <Modal name='formunit'>
        <div>
          <header className='border-b pb-3'>
            <h1 className='font-bold text-2xl'>Formulir Sewa Unit</h1>
            <p className='font-light'>Sewa unit di rentalin sekalian register</p>
          </header>
          {
            !loading ?
            <div className='min-w-full grid grid-cols-12 gap-5 relative p-5'>
              <div className='col-span-12 border p-5 rounded-md flex items-center gap-5 justify-evenly'>
                <div>
                  <h1 className='font-semibold'>Ambil Unit</h1>
                  <p className='text-zinc-500'>{filter?.start_date ? formatDateData(filter.start_date):""}</p>
                </div>
                <div>
                  <h1 className='font-semibold'>Kembalikan Unit</h1>
                  <p className='text-zinc-500'>{endDate && formatDateData(endDate.toString())}</p>
                </div>
                <div>
                  <h1 className='font-semibold'>Lokasi Unit</h1>
                  <p className='text-zinc-500'>Jakarta Timur, Cakung</p>
                </div>
                <div>
                  <h1 className='font-semibold'>Promo Otomatis</h1>
                  <p className='text-zinc-500'>{usagePrice ? usagePrice.name : ''}</p>
                </div>
              </div>
              <div className='space-y-5 col-span-8'>
                <div className='border p-5 rounded-md flex items-center gap-5'>
                  <div className="h-40 bg-cover bg-center w-full max-w-40 rounded-xl shadow-md" style={{ backgroundImage: `url('${data?.file_path}')`}}></div>
                  <div className='w-full'>
                    <h1 className='font-semibold text-xl'>{data?.name_unit}</h1>
                    <p className='text-zinc-500 font-light'>{data?.description}</p>
                    {hargaAccumulation()}
                    <div className='mt-5 space-y-2'>
                      <div className='flex items-center gap-2 w-full'>
                        <Icon icon={data?.category_icon} className='text-2xl text-primary-500' />
                        <h1 className=' font-semibold'>{data?.category_title}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='border p-5 rounded-md'>
                  <h1 className='font-semibold text-lg mb-5'>Lokasi Armada</h1>
                  <p className='text-sm'>{data?.armada_name}</p>
                  <p className='mb-2 font-light text-sm'>{data?.armada_location}</p>
                  <div className='border rounded-md overflow-hidden' style={{ height: '300px' }}>
                    <iframe
                      src={data.armada_embed_link}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading='lazy'
                      referrerPolicy='no-referrer-when-downgrade'
                      title='lokasi armada'
                    ></iframe>
                  </div>
                </div>
                <div className='border p-5 rounded-md'>
                  <h1 className='font-semibold text-lg'>Lokasi Pengambilan</h1>
                  <p className='font-light text-sm'>Pilih lokasi pengambilan pada hari sewa pertamamu</p>

                  <div className='relative mt-2 space-y-1'>
                    <div className='flex items-center justify-between gap-2 border border-primary-500 rounded-md py-2 px-5'>
                      <div className='flex items-center gap-2'>
                        <input checked={formData.delivery_method == 'ambil sendiri'} type="checkbox" name="delivery_method" id="ambilsendiri" value={'ambil sendiri'} onChange={e => handleDeliveryMethod(e)} />
                        <label htmlFor="ambilsendiri" className='font-semibold'>Ambil sendiri di lokasi Armada</label>
                      </div>
                      <h1 className='font-bold text-primary-500'>{formatCurrency(0, true)}</h1>
                    </div>
                    <div className='border border-primary-500 rounded-md py-2 px-5'>
                      <div className='flex items-center gap-2'>
                        <input checked={formData.delivery_method == 'diantar'} type="checkbox" name="delivery_method" id="diantar" value={'diantar'} onChange={e => handleDeliveryMethod(e)} />
                        <label htmlFor="diantar" className='font-semibold'>Diantar ke lokasimu</label>
                      </div>
                      <p className='text-red-500 text-sm font-light'>*Biaya antar akan dihitung oleh admin setelah checkout</p>
                      <div className='w-full mt-2'>
                        <textarea disabled={formData.delivery_method !== 'diantar'} value={formData.delivery_address} name="delivery_address" id="delivery_address" className='input-style w-full' onChange={handleInput}></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='border p-5 rounded-md'>
                  <h1 className='font-semibold text-lg'>Pemakaian</h1>
                  <p className='font-light text-sm'>Untuk perhitungan Luar Kota akan dikenakan charge per hari. Khusus pemakaian <span className='font-semibold'>BODETABEK</span> dikenakan biaya Rp 50.000/hari. Pemakaian diluar <span className='font-semibold'>BODETABEK</span> mohon infokan pada permintaan khusus</p>

                  <div className='relative mt-2 space-y-1'>
                    <div className='flex items-center justify-between gap-2 border border-primary-500 rounded-md py-2 px-5'>
                      <div className='flex items-center gap-2'>
                        <input checked={formData.usage_location == 'dalam kota'} type="checkbox" name="usage_location" id="dalamkota" value={'dalam kota'} onChange={e => handleUsageLocation(e)} />
                        <label htmlFor="dalamkota" className='font-semibold'>Dalam Kota</label>
                      </div>

                      <h1 className='font-bold text-primary-500'>{formatCurrency(0, true)}</h1>
                    </div>
                    <div className='flex items-center justify-between gap-2 border border-primary-500 rounded-md py-2 px-5'>
                      <div className='flex items-center gap-2'>
                        <input checked={formData.usage_location == 'luar kota'} type="checkbox" name="usage_location" id="luarkota" value={'luar kota'} onChange={e => handleUsageLocation(e)} />
                        <label htmlFor="luarkota" className='font-semibold'>Luar Kota</label>
                      </div>

                      <h1 className='font-bold text-primary-500'>{formatCurrency(50000, true)}</h1>
                    </div>
                  </div>
                </div>
                <div className='border p-5 rounded-md'>
                  <h1 className='font-semibold text-lg'>Permintaan Khusus</h1>
                  <p className='font-light text-sm mb-2'>Catat kebutuhan kamu biar sewa serasa punya sendiri!!</p>
                  <p className='font-light text-sm mb-2'>Informasikan &ldquo;Pemakaian Luar Kota: Ya/Tidak&rdquo;</p>
                  <p className='font-light text-sm mb-2'>Informasikan “Penggunaan Luar Kota: Bodetabek/Yogyakarta/Kota-kota Lainnya“</p>

                  <div className='w-full mt-2'>
                    <textarea value={formData.request} name="request" id="request" placeholder='Ketikan permintaan khususmu...' className='input-style w-full' onChange={handleInput}></textarea>
                  </div>
                </div>
                <div className='border p-5 rounded-md'>
                  <div className='flex items-center gap-5 justify-between'>
                    <div>
                      <h1 className='font-semibold text-lg'>Register sekaligus pesan</h1>
                      <p className='font-light text-sm mb-2'>Masuk ke akun mu aja biar pesannya lebih cepet..</p>
                    </div>
                    <Link href={'/auth'}>
                      <button type='button' className='btn-primary'>Masuk</button>
                    </Link>
                  </div>

                  <div className='gap-x-2 gap-y-5 w-full mt-2 grid grid-cols-2'>
                    <InputText 
                      type='text' 
                      id='full_name' 
                      name='full_name' 
                      label='Nama Lengkap'
                      onChange={(value) => handleUserInput(value, 'full_name')}
                      value={userData.full_name} 
                    />
                    <InputText 
                      type='email' 
                      id='email' 
                      name='email' 
                      label='Email'
                      onChange={(value) => handleUserInput(value, 'email')}
                      value={userData.email} 
                    />
                    <InputText 
                      type='text' 
                      id='phone' 
                      name='phone' 
                      label='Nomer HP'
                      onChange={(value) => handleUserInput(value, 'phone')}
                      value={userData.phone} 
                    />
                    <InputText 
                      type='text' 
                      id='danger_phone' 
                      name='danger_phone' 
                      label='Nomer HP Darurat'
                      onChange={(value) => handleUserInput(value, 'danger_phone')}
                      value={userData.danger_phone} 
                    />
                    <div className='col-span-2'>
                      <InputText 
                        type='text' 
                        id='address' 
                        name='address' 
                        label='Alamat lengkap'
                        onChange={(value) => handleUserInput(value, 'address')}
                        value={userData.address} 
                      />
                    </div>
                    <div className='col-span-2'>
                      <h1 className='font-semibold text-sm mb-2'>Upload file</h1>
                      <UploadCloudinary
                        id="file-identity"
                        label="Identitas (KTP/ID Kerja/NPWP/KK)"
                        onChange={(value) => handleFilesChange(value, 'file_identity')}
                        publicId={fileList.file_identity.public_id}
                      />
                    </div>
                    <div className='col-span-2'>
                      <h1 className='font-semibold text-sm mb-2'>Upload file</h1>
                      <UploadCloudinary
                        id="driver-license"
                        label="Driver License (SIM)"
                        onChange={(value) => handleFilesChange(value, 'file_driver_license')}
                        publicId={fileList.file_driver_license.public_id}
                      />
                    </div>
                    <div className='col-span-2'>
                      <h1 className='font-semibold text-sm mb-2'>Upload file</h1>
                      <UploadCloudinary
                        id="file-ss-ig"
                        label="Foto Anda sendiri"
                        onChange={(value) => handleFilesChange(value, 'file_profile_ig')}
                        publicId={fileList.file_profile_ig.public_id}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rincian Biaya */}
              <div className='col-span-4'>
                <div className='border p-5 rounded-md h-full flex flex-col'>
                  <div className='h-full'>
                    <h1 className='font-bold text-xl pb-2 border-dashed border-b-2 border-zinc-500'>Rincian Total Biaya</h1>
                    <div className='py-2'>
                      <div className='py-2 border-b border-zinc-500'>
                        <h1 className='font-semibold mb-2'>Unit Sewa</h1>
                        <div className='flex items-center justify-between gap-2'>
                          <h1 className='font-light'>{data?.name_unit}</h1>
                          <p className='font-semibold text-zinc-500'>{formatCurrency(price, true)}</p>
                        </div>
                        <div className='flex items-center justify-between gap-2'>
                          <h1 className='font-light'>{filter?.duration} Hari</h1>
                          <p className='font-semibold text-primary-500'>{data?.price && typeof filter.duration === 'number' ? formatCurrency(price * filter.duration, true) : ""}</p>
                        </div>
                      </div>
                      {formData.delivery_method === 'diantar' && (
                        <div className='py-2 border-b border-zinc-500'>
                          <h1 className='font-semibold mb-2'>Delivery Cost</h1>
                          <div className='flex items-center justify-between gap-2'>
                            <h1 className='font-light'>Biaya</h1>
                            <p className='font-semibold text-zinc-500 italic'>Akan dihitung Admin</p>
                          </div>
                        </div>
                      )}
                      {formData.usage_location === 'luar kota' && (
                        <div className='py-2 border-b border-zinc-500'>
                          <h1 className='font-semibold mb-2'>Pemakaian</h1>
                          <div className='flex items-center justify-between gap-2'>
                            <h1 className='font-light'>Luar Kota (Jabodetabek)</h1>
                            <p className='font-semibold text-zinc-500'>{formatCurrency(50000, true)}</p>
                          </div>
                          <div className='flex items-center justify-between gap-2'>
                            <h1 className='font-light'>{filter.duration} Hari</h1>
                            <p className='font-semibold text-primary-500'>{formatCurrency(formData.usage_price, true)}</p>
                          </div>
                        </div>
                      )}
                      <div className='py-2'>
                        <h1 className='font-semibold mb-2'>Estimasi Pembayaran</h1>
                        <div className='flex items-center justify-between gap-2'>
                          <h1 className='font-light'>Pajak (12%)</h1>
                          <p className='font-semibold text-primary-500'>{formatCurrency(accTax(), true)}</p>
                        </div>
                        <div className='mt-10 mb-2 flex items-center justify-between gap-2'>
                          <h1 className='font-bold text-xl'>Total Sewa</h1>
                          <p className='font-semibold text-primary-500 text-xl'>{formatCurrency(totalAccumulation(), true)}</p>
                        </div>
                        { formData.delivery_method === 'diantar' && (
                          <div className='badge-red'>
                            <Icon icon={IconsCollection.info} className='text-3xl'/>
                            <p>Harga diatas belum termasuk biaya pengantaran unit, biaya akan muncul setelah Anda checkout</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='badge-blue mb-2'>
                      <input type="checkbox" className='w-5 h-5 inline-block' id="agree" checked={agree} onChange={() => setAgree(!agree)} />
                      <label htmlFor="agree" className='font-light text-sm py-2'>
                        Saya setuju dengan <a href="/terms" target="_blank" className='text-primary-500 underline'>syarat dan ketentuan</a> yang berlaku dari rentalin
                      </label>
                    </div>
                    <button type='button' onClick={() => handleSubmit()} className='btn-primary w-full' disabled={checkDisabled()}>
                      <Icon icon={IconsCollection.rent} className='text-2xl'/>
                      CHECKOUT
                    </button>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className='fixed top-0 left-0 w-screen h-screen bg-black/20 cursor-progress pointer-events-none flex items-center justify-center'>
              <Loading />
            </div>
          }
        </div>
    </Modal>
  );
}
