import { CloudinaryType } from "@@/lib/uploads/data/UploadModel"
import { IconsCollection } from "@@/src/constant/icons"
import { Icon } from "@iconify/react"
import { CldImage, CldUploadButton } from "next-cloudinary"

export default function UploadCloudinary({
    id,
    label,
    publicId,
    onChange,
    errorMessage
}: {
    id: string,
    label: string,
    publicId: string,
    onChange: (value: CloudinaryType) => void,
    errorMessage?: string
}) {

    const handleSuccessUpload = (results, widget) => {
        if(results?.info){
            const resultData: CloudinaryType = results.info
            onChange(resultData)
        }
        widget.close()
    }
        
  return (
    <div className="w-full">
        {
            publicId ? 
                <div className="w-full h-56 bg-center overflow-hidden">
                    <CldImage
                        width="960"
                        height="600"
                        src={publicId}
                        sizes="100vw"
                        alt="Description of my image"
                    />
                </div>
            :
                <CldUploadButton
                    className={"border border-primary-200 duration-300 ease-in-out hover:border-primary-500 w-full p-5 rounded-md border-dashed flex items-center justify-center"}
                    onSuccess={handleSuccessUpload}
                    signatureEndpoint={'/api/sign-cloudinary-params'}
                    uploadPreset="rentalin_preset_signed"
                >
                    <div className="mx-auto text-center">
                        <Icon icon={IconsCollection.upload} className="mx-auto text-zinc-300 dark:text-white text-5xl"/>
                        <h1 className="text-zinc-500 text-sm mt-2">Upload {label ?? 'to Cloud'}</h1>
                    </div>
                </CldUploadButton>
        }
    </div>
  )
}
