import moment from "moment"
import "moment/locale/id"
import { OrderModel } from "../data/OrderModel"
import Image from "next/image"
import { formatCurrency, formatDateData } from "@@/src/utils/script"

export default function CardInvoice({
    item
}: {
    item: OrderModel
}) {
    const handlePrint = () => {
        window.print()
    }

    const tax = (item.delivery_price + item.usage_price + (item.total_price * Number(item.duration))) * 12 / 100

    const totalAccumulation = () => {
        if (item.delivery_method == 'diantar' && item.delivery_price == 0) {
            return <h1 className="font-bold text-red-500 italic">Akumulasi akan segera dikirim</h1>
        }

        if (item.usage_location == 'luar kota' && item.usage_price == 0) {
            return <h1 className="font-bold text-red-500 italic">Akumulasi akan segera dikirim</h1>
        }

        const hargaHarian = item.total_price * Number(item.duration)
        const totalAcc = item.delivery_price + item.usage_price + hargaHarian

        return <h1 className="font-bold text-xl">{formatCurrency(totalAcc + tax, true)}</h1>
    }

    return (
        <div className="max-w-[210mm] mx-auto bg-white print:max-w-none print:m-0">
            <div className="p-8 print:p-0">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 print:mb-4">
                    <div className="w-1/2">
                        <Image
                            width={130}
                            height={24}
                            src={'/images/logo.png'}
                            alt="Rentalin logo"
                            className="mb-2"
                        />
                        <p className="text-sm">PT. Rentalin Indonesia</p>
                    </div>
                    <div className="text-right">
                        <h1 className="text-lg font-bold mb-1">INVOICE</h1>
                        <p className="text-sm">No: INV-{item.id}</p>
                        <p className="text-sm">{formatDateData(new Date().toISOString())}</p>
                    </div>
                </div>

                {/* Status */}
                {/* <div className="mb-6 print:mb-4">
                    <span className={`px-3 py-1 text-xs font-medium border ${
                        item.status === 'completed' ? 'border-green-500 text-green-700' :
                        item.status === 'pending' ? 'border-yellow-500 text-yellow-700' :
                        item.status === 'rejected' ? 'border-red-500 text-red-700' :
                        'border-blue-500 text-blue-700'
                    }`}>
                        {item.status.toUpperCase()}
                    </span>
                </div> */}

                {/* Vehicle & Rental Details */}
                <div className="grid grid-cols-2 gap-8 mb-8 print:mb-4">
                    <div>
                        <h2 className="text-sm font-bold mb-2 text-primary-500">Detail Kendaraan</h2>
                        <div className="space-y-2">
                            <p className="text-sm">
                                <span className="font-medium">Unit:</span> {item.unit_name}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Lokasi:</span> {item.armada_location}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-primary-500 mb-2">Detail Penyewaan</h2>
                        <div className="space-y-2">
                            <p className="text-sm">
                                <span className="font-medium">Tanggal Mulai:</span> {moment(item.start_date).locale('id').format('DD MMMM YYYY')}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Durasi:</span> {item.duration} hari
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Area:</span> {item.usage_location}
                            </p>
                            <p className="text-sm">
                                <span className="font-medium">Pengiriman:</span> {item.delivery_method}
                            </p>
                            {item.delivery_method === 'diantar' && (
                                <p className="text-sm">
                                    <span className="font-medium">Alamat:</span> {item.delivery_address}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Price Details */}
                <div className="mb-8 print:mb-4">
                    <h2 className="text-sm font-semibold mb-3">Rincian Biaya</h2>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2 font-medium">Deskripsi</th>
                                <th className="text-right py-2 font-medium">Jumlah</th>
                                <th className="text-right py-2 font-medium">Harga</th>
                                <th className="text-right py-2 font-medium">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2">Sewa Kendaraan</td>
                                <td className="text-right py-2">{item.duration} hari</td>
                                <td className="text-right py-2">{formatCurrency(item.total_price)}</td>
                                <td className="text-right py-2">{formatCurrency(item.total_price * Number(item.duration))}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2">Biaya Pengiriman</td>
                                <td className="text-right py-2">1</td>
                                <td className="text-right py-2">{formatCurrency(item.delivery_price)}</td>
                                <td className="text-right py-2">{formatCurrency(item.delivery_price)}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2">Biaya Penggunaan</td>
                                <td className="text-right py-2">1</td>
                                <td className="text-right py-2">{formatCurrency(item.usage_price)}</td>
                                <td className="text-right py-2">{formatCurrency(item.usage_price)}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2">Pajak (12%)</td>
                                <td className="text-right py-2">1</td>
                                <td className="text-right py-2">{formatCurrency(tax)}</td>
                                <td className="text-right py-2">{formatCurrency(tax)}</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="py-2 text-right font-medium">Total</td>
                                <td className="py-2 text-right font-bold">{totalAccumulation()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="text-sm border-t pt-4">
                    <p className="mb-1">Terima kasih telah mempercayakan penyewaan kendaraan kepada kami</p>
                    <p>Untuk informasi lebih lanjut, silakan hubungi customer service kami</p>
                </div>

                {/* Signatures */}
                <div className="mt-12 flex items-center justify-between">
                    <div className="text-center">
                        <div className="h-24 border-b border-dashed border-gray-400 mb-2">
                            {/* Placeholder untuk tanda tangan penyewa */}
                        </div>
                        <p className="text-sm font-medium">Tanda Tangan Penyewa</p>
                        <p className="text-sm mt-1">John Doe</p>
                    </div>
                    <div className="text-center">
                        <div className="h-24 border-b border-dashed border-gray-400 mb-2">
                            <Image
                                width={130}
                                height={24}
                                src={'/images/ttdku.png'}
                                alt="TTD Zinedine"
                                className="mb-2 mx-auto"
                            />
                        </div>
                        <p className="text-sm font-medium">Tanda Tangan Rentalin</p>
                        <p className="text-sm mt-1">Zinedine Ziddan</p>
                    </div>
                </div>
            </div>

            {/* Print Button */}
            <div className="mt-6 text-center print:hidden">
                <button
                    onClick={handlePrint}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Cetak Invoice
                </button>
            </div>
        </div>
    )
}
