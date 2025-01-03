import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'react-image-lightbox';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  minWidth?: number; // Minimum lebar gambar
  minHeight?: number; // Minimum tinggi gambar
  maxWidth?: number; // Maksimum lebar gambar
  maxHeight?: number; // Maksimum tinggi gambar
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  minWidth = 200,
  minHeight = 200,
  maxWidth = 800,
  maxHeight = 800,
}) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div
      onClick={() => setOpen(true)}
      className="flex justify-center items-center overflow-hidden"
      style={{
        minWidth: `${minWidth}px`,
        minHeight: `${minHeight}px`,
        maxWidth: `${maxWidth}px`,
        maxHeight: `${maxHeight}px`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        priority
        width={maxWidth} // Atur lebar maksimum
        height={maxHeight} // Atur tinggi maksimum
        className="object-contain w-full h-full mx-auto text-center" // Gambar akan menyesuaikan ukuran dengan proporsi
      />
      {isOpen && (
          <Lightbox
            mainSrc={src}
            onCloseRequest={() => setOpen(false)}
          />
        )}
    </div>
  );
};

export default ResponsiveImage;
