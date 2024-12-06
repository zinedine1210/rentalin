import Image from 'next/image';

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
  return (
    <div
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
        className="object-contain w-full h-full" // Gambar akan menyesuaikan ukuran dengan proporsi
      />
    </div>
  );
};

export default ResponsiveImage;
