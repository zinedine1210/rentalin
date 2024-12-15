import { UnitModel } from "@@/lib/units/data/UnitModel"
import { formatCurrency } from "@@/src/utils/script"

export default function CardUnit({
    data
}: {
    data: UnitModel
}) {
    console.log(data)
  return (
    <div className="w-full rounded-xl bg-white shadow-xl overflow-hidden">
        <div className="h-56 bg-cover bg-center w-full" style={{ backgroundImage: `url('${data.file_path}')`}}></div>
        <div className="p-3 space-y-2">
            <div className="flex gap-2 items-end">
                <h1 className="font-semibold text-xl text-red-500">{formatCurrency(data.price, true)}</h1>
                <p className="text-sm mb-1">/Hari</p>
            </div>
            <h1 className="font-semibold text-2xl">{data.name_unit}</h1>
            <p className="text-sm">{data.descriptionSubstring}</p>
        </div>
        <div className="pt-3 pb-5 text-center mx-auto border-t">
            <button className="btn-primary mx-auto" type="button">Book Now</button>
        </div>
    </div>
  )
}
