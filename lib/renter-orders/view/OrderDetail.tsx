import React, { useState } from 'react'
import { OrderModel, OrderType } from '../data/OrderModel'
import InputText from '@@/app/components/Input/InputText'
import { formatCurrency } from '@@/src/utils/script'
import { OrderForm } from '../data/OrderForm'

export default function OrderDetail({
    item,
    dataList,
    handleChange
}: {
    item: OrderType,
    dataList: OrderForm,
    handleChange: (value, target) => void
}) {
    const [data, setData] = useState<OrderModel>(new OrderModel(item))
  return (
    <div className=''>
        <h1 className='text-xl font-bold text-primary-500'>Order Detail</h1>
        <div className='mt-5'>
            <h1 className='font-semibold text-primary-500 border-b border-dashed border-zinc-500 pb-2'>Unit Rent</h1>
            <div className="flex items-center gap-5 mt-5">
                <div className="h-52 bg-cover bg-center w-full max-w-40 rounded-xl shadow-md" style={{ backgroundImage: `url('${data?.file_path}')`}}></div>
                <div>
                    <h1 className='font-bold text-primary-500'>Unit Name: {data.unit_name}</h1>
                    <p className='font-primary-500 italic text-xl'>{formatCurrency(data.total_price, true)}</p>
                </div>
            </div>
        </div>
        <div className='mt-5'>
            <h1 className='font-semibold text-primary-500 border-b border-dashed border-zinc-500 pb-2'>General</h1>
            <div className='p-5 grid grid-cols-3 gap-10'>
                <div>
                    <h1 className='font-semibold '>Sewa Pada</h1>
                    <p className='font-light text-zinc-500'>{data.startDateFormat}</p>
                </div>
                <div>
                    <h1 className='font-semibold '>Durasi Sewa</h1>
                    <p className='font-light text-zinc-500'>{data.duration} Hari</p>
                </div>
                <div>
                    <h1 className='font-semibold '>Kembalikan Pada</h1>
                    <p className='font-light text-zinc-500'>{data.endDateFormat}</p>
                </div>
                <div>
                    <h1 className='font-semibold '>Armada</h1>
                    <p className='font-light text-zinc-500'>{data.armada_location}</p>
                </div>
                <div>
                    <h1 className='font-semibold '>Promo Usage</h1>
                    <p className='font-light text-zinc-500'>{data.usage_name}</p>
                </div>
            </div>
        </div>
        <div>
            <h1 className='font-semibold text-primary-500 border-b border-dashed border-zinc-500 pb-2'>Delivery</h1>
            <div className='p-5 grid grid-cols-3 gap-10'>
                <div>
                    <h1 className='font-semibold '>Delivery Method</h1>
                    <p className='font-light text-zinc-500'>{data.delivery_method}</p>
                </div>
                {
                    data.delivery_method == 'diantar' && (
                        <>
                            <div>
                                <h1 className='font-semibold '>Delivery Address</h1>
                                <p className='font-light text-zinc-500'>{data.delivery_address}</p>
                            </div>
                            <div>
                                <h1 className='font-semibold '>Delivery Price</h1>
                                <InputText 
                                    value={dataList.delivery_price}
                                    name='delivery_price'
                                    id='delivery_price'
                                    onChange={(e) => handleChange(e, 'delivery_price')}
                                />
                            </div>
                        
                        </>
                    )
                }
            </div>
        </div>
        <div>
            <h1 className='font-semibold text-primary-500 border-b border-dashed border-zinc-500 pb-2'>Usage</h1>
            <div className='p-5 grid grid-cols-3 gap-10'>
                <div>
                    <h1 className='font-semibold '>Usage Location</h1>
                    <p className='font-light text-zinc-500'>{data.usage_location}</p>
                </div>
                {
                    data.usage_location == 'luar kota' && (
                        <>
                            <div>
                                <h1 className='font-semibold '>Usage Price</h1>
                                <InputText 
                                    value={dataList.usage_price}
                                    name='usage_price'
                                    id='usage_price'
                                    onChange={(e) => handleChange(e, 'usage_price')}
                                />
                            </div>
                        
                        </>
                    )
                }
            </div>
        </div>
        <div>
            <h1 className='font-semibold text-primary-500 border-b border-dashed border-zinc-500 pb-2'>Request Renter</h1>
            <p className='py-5 font-light'>{data.request ?? <span className='text-red-500'>Nothing request</span>}</p>
        </div>
        <div>
            <h1 className='font-semibold text-primary-500 border-b border-dashed border-zinc-500 pb-2'>Price</h1>
            <div className='p-5 grid grid-cols-3 gap-10'>
                <div>
                    <h1 className='font-semibold '>Price Accumulation</h1>
                    <p className='font-light text-zinc-500'>{formatCurrency(data.total_price * Number(data.duration), true)}</p>
                </div>
                <div>
                    <h1 className='font-semibold '>PPN 12 %</h1>
                    <p className='font-light text-zinc-500'>{formatCurrency(data.total_price * Number(data.duration) * 12 / 100)}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
