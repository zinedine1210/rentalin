import { formatCurrency, Notify } from "@@/src/utils/script"
import { OrderModel, OrderType } from "../data/OrderModel"
import { ApiResponse, fetchClient } from "@@/src/hooks/CollectionAPI"

export default function CardOrder({
    item
}: {
    item: OrderModel
}) {

    const tax = (item.delivery_price + item.usage_price + (item.total_price * Number(item.duration))) * 12 / 100

    const totalAccumulation = () => {
        if(item.delivery_method == 'diantar' && item.delivery_price == 0){
            return <h1 className="font-bold text-red-500 italic">Akumulasi akan segera dikirim</h1>
        }

        if(item.usage_location == 'luar kota' && item.usage_price == 0){
            return <h1 className="font-bold text-red-500 italic">Akumulasi akan segera dikirim</h1>
        }
        
        const hargaHarian = item.total_price * Number(item.duration)
        const totalAcc = item.delivery_price + item.usage_price + hargaHarian

        return <h1 className="font-bold text-xl">{formatCurrency(totalAcc + tax, true)}</h1>
    }

    const handlePayment = async () => {
        const payload = {
            status: 'payment'
        }
        const result: ApiResponse<OrderType> = await fetchClient('PUT', '/data/orders/'+item.id, payload)
        const responseData = result.data
        if(result.success){
            Notify('success', 'Request diterima, mohon tunggu beberapa saat', 5000)
            window.location.reload()
        }
    }
  return (
    <div className='bg-white dark:bg-darkPrimary rounded-md shadow-md'>
        <header className="py-3 px-5 border-b flex items-center justify-between">
            <h1 className="font-bold">{item.unit_name}</h1>
            <div className="flex items-center gap-2">
                <div className="badge-blue uppercase">
                    {item.status}
                </div>
                <div className="badge-blue uppercase">{item.delivery_method}</div>
            </div>
        </header>
        <div className="py-3 px-5 flex items-center gap-5 text-sm">
            <div className="h-40 bg-cover bg-center w-full max-w-40 rounded-xl shadow-md" style={{ backgroundImage: `url('${item.file_path}')`}}></div>
            <div className='w-full grid grid-cols-2'>
                <div className="col-span-1">
                    <div className="grid grid-cols-12 w-full py-1">
                        <div className="col-span-4">
                            <h1 className="">Tanggal Sewa</h1>
                        </div>
                        <div className="col-span-8">
                            <p className="font-semibold">: {item.startDateFormat}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 w-full py-3.5">
                    </div>
                    {
                        item?.usage_id && (
                            <div className="grid grid-cols-12 w-full py-1">
                                <div className="col-span-4">
                                    <h1 className="">Promo</h1>
                                </div>
                                <div className="col-span-8">
                                    <p className="font-semibold whitespace-nowrap">: {item.usage_name}</p>
                                </div>
                            </div>
                        )
                    }
                    <div className="grid grid-cols-12 w-full py-1">
                        <div className="col-span-4">
                            <h1 className="">Armada Location</h1>
                        </div>
                        <div className="col-span-8">
                            <p className="font-semibold whitespace-nowrap">: {item.armada_location_substring}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 w-full py-1">
                        <div className="col-span-4">
                            <h1 className="">Delivery Method</h1>
                        </div>
                        <div className="col-span-8">
                            <p className="font-semibold uppercase">: {item.delivery_method}</p>
                        </div>
                    </div>
                    {
                        item?.delivery_address && (
                            <div className="grid grid-cols-12 w-full py-1">
                                <div className="col-span-4">
                                    {/* <h1 className="">Delivery Address</h1> */}
                                </div>
                                <div className="col-span-8">
                                    <p className="font-semibold whitespace-nowrap">: {item.delivery_address}</p>
                                </div>
                            </div>
                        )
                    }
                    <div className="grid grid-cols-12 w-full py-1">
                        <div className="col-span-4">
                            <h1 className="">Usage Location</h1>
                        </div>
                        <div className="col-span-8">
                            <p className="font-semibold uppercase">: {item.usage_location}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 w-full py-1">
                    </div>
                    <div className="grid grid-cols-12 w-full py-1">
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="grid grid-cols-12 w-full py-1">
                        <div className="col-span-4">
                            <h1 className="">Kembalikan Pada</h1>
                        </div>
                        <div className="col-span-8">
                            <p className="font-semibold">: {item.endDateFormat}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 w-full py-1">
                        <div className="col-span-4">
                            <h1 className="">Pajak PPN 12%</h1>
                        </div>
                        <div className="col-span-8">
                            <p className="font-semibold">: {formatCurrency(tax)}</p>
                        </div>
                    </div>
                    {
                        item?.usage_id && (
                            <div className="grid grid-cols-12 w-full py-3.5">
                            </div>
                        )
                    }
                    <div className="grid grid-cols-12 w-full py-3.5">
                        <h1></h1>
                    </div>
                    <div className="grid grid-cols-12 w-full py-1">
                        <div className="col-span-4">
                            <h1 className="">Delivery Price</h1>
                        </div>
                        <div className="col-span-8">
                            <p className="font-semibold">: {item?.delivery_method == 'diantar' ? item.delivery_price == 0 ? <span className="italic text-red-500">Sedang dihitung</span> : formatCurrency(item.delivery_price, true): formatCurrency(0, true)}</p>
                        </div>
                    </div>
                    {
                        item?.delivery_address && (
                            <div className="grid grid-cols-12 w-full py-3.5">
                            </div>
                        )
                    }
                    <div className="grid grid-cols-12 w-full py-1">
                        <div className="col-span-4">
                            <h1 className="">Usage Price</h1>
                        </div>
                        <div className="col-span-8">
                            <p className="font-semibold">: {item?.usage_location == 'luar kota' ? item.usage_price == 0 ? <span className="italic text-red-500">Sedang dihitung</span> : formatCurrency(item.usage_price, true): formatCurrency(0, true)}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 w-full py-1">
                        <div className="col-span-4">
                            <h1 className="">Harga <span className="italic font-bold">({item.duration} Hari)</span></h1>
                        </div>
                        <div className="col-span-8">
                            <p className="font-semibold">: {formatCurrency(item.total_price * Number(item.duration))}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 w-full py-1">
                        <div className="col-span-4">
                            <h1 className="">Total Price</h1>
                        </div>
                        <div className="col-span-8">
                            <p className="font-semibold flex items-center gap-2">: {totalAccumulation()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer className="border-t py-3 px-5 flex items-center justify-between">
            <h1 className="font-semibold text-sm text-zinc-500">Created At : {item.createdAtFormat}</h1>
            {
                item.status == 'accepted' && (
                    <div className="flex items-center gap-5">
                        <button type="button" className="btn-primary" onClick={() => handlePayment()}>Selesaikan Pembayaran</button>
                    </div>
                )
            }
        </footer>
    </div>
  )
}
