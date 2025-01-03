import ResponsiveImage from "@@/app/components/Partials/ResponsiveImage"
import { UnitModel } from "@@/lib/units/data/UnitModel"
import { UsagePriceModel } from "@@/lib/usage-price/data/UsagePriceModel"
import { accumulationPrice, formatCurrency } from "@@/src/utils/script"

export default function CardUnit({
    data,
    onToggle,
    usagePrice
}: {
    data: UnitModel,
    onToggle: (data: UnitModel) => void,
    usagePrice: null | UsagePriceModel
}) {

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
                    <h1 className="font-semibold text-xl">{formatCurrency(data.price, true)}</h1>
                    <p className="text-sm mb-1">/Hari</p>
                </div>
            )
        }
    }
  return (
    <div className="w-full rounded-xl bg-white dark:bg-darkPrimary shadow-xl overflow-hidden">
        <div className="h-56 bg-cover overflow-hidden bg-center w-full">
            <ResponsiveImage
                src={data.file_path}
                alt={data.file_name}
                minHeight={200}
                minWidth={350}
                maxWidth={200}
                maxHeight={350}
            />

        </div>
        <div className="p-3 space-y-2">
            {hargaAccumulation()}
            <h1 className="font-semibold text-2xl">{data.nameUnitSubstring}</h1>
            <p className="text-sm">{data.descriptionSubstring}</p>
        </div>
        <div className="pt-3 pb-5 text-center mx-auto border-t">
            <button className="btn-primary mx-auto" type="button" onClick={() => onToggle(data)}>Book Now</button>
        </div>
    </div>
  )
}
