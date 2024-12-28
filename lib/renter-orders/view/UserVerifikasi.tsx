import ResponsiveImage from '@@/app/components/Partials/ResponsiveImage'
import { UserType } from '@@/lib/renter/data/UserModel'
import { ApiResponse, fetchClient } from '@@/src/hooks/CollectionAPI'
import React, { useEffect, useState } from 'react'

export default function UserVerifikasi({
    renter_id
}: {
    renter_id: number
}) {
    const [data, setData] = useState<UserType>(null)
    const getData = async () => {
        const result: ApiResponse<UserType> = await fetchClient('GET', '/auth/users/'+renter_id)
        if(result.success){
            console.log(result.data)
            setData(result.data)
        }
    }
    useEffect(() => {
        if(!data){
            getData()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renter_id, data])

    if(data)
  return (
    <div className=''>
        <h1 className='text-xl font-bold text-primary-500'>User Verifikasi</h1>
        <div className='mt-5'>
            <div>
                <h1 className='font-semibold text-primary-500 border-b border-dashed border-zinc-500 pb-2'>Dokumen Renter</h1>
                <div className='p-5 grid grid-cols-3 gap-10'>
                    <div>
                        <h1 className='mb-2 font-semibold '>Dokumen Identitas (KTP atau Kartu Kerja)</h1>
                        <div className='border border-zinc-500 border-dashed rounded-md p-2 text-center mx-auto'>
                            <ResponsiveImage 
                                src={data.file_identity_path}
                                alt={data.file_identity_name}
                                minHeight={200}
                                minWidth={200}
                                maxWidth={200}
                                maxHeight={200}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className='mb-2 font-semibold '>Dokumen Driver License (SIM)</h1>
                        <div className='border border-zinc-500 border-dashed rounded-md p-2 text-center mx-auto'>
                            <ResponsiveImage 
                                src={data.file_driver_license_path}
                                alt={data.file_driver_license_name}
                                minHeight={200}
                                minWidth={200}
                                maxWidth={200}
                                maxHeight={200}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className='mb-2 font-semibold '>Dokumen Profile</h1>
                        <div className='border border-zinc-500 border-dashed rounded-md p-2 text-center mx-auto'>
                            <ResponsiveImage 
                                src={data.file_profile_ig_path}
                                alt={data.file_profile_ig_name}
                                minHeight={200}
                                minWidth={200}
                                maxWidth={200}
                                maxHeight={200}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='font-semibold text-primary-500 border-b border-dashed border-zinc-500 pb-2'>Informasi Renter</h1>
                <div className='p-5 gap-5 grid grid-flow-col grid-rows-3'>
                    <div>
                        <h1 className='font-semibold '>Renter Full Name</h1>
                        <p className='font-light text-zinc-500'>{data.full_name}</p>
                    </div>
                    <div>
                        <h1 className='font-semibold '>Username</h1>
                        <p className='font-light text-zinc-500'>{data.username}</p>
                    </div>
                    <div>
                        <h1 className='font-semibold '>Email</h1>
                        <p className='font-light text-zinc-500'>{data.email}</p>
                    </div>
                    <div>
                        <h1 className='font-semibold '>NO HP</h1>
                        <p className='font-light text-zinc-500'>{data.phone}</p>
                    </div>
                    <div>
                        <h1 className='font-semibold '>NO HP Darurat</h1>
                        <p className='font-light text-zinc-500'>{data.danger_phone}</p>
                    </div>
                    <div>
                        <h1 className='font-semibold '>Address</h1>
                        <p className='font-light text-zinc-500'>{data.address}</p>
                    </div>
                    <div>
                        <h1 className='font-semibold '>Status</h1>
                        <p className='font-light text-zinc-500'>{data.status}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
