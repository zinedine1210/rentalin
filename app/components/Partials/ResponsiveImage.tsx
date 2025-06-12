import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk menutup dropdown jika klik di luar
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  // Menggunakan useEffect untuk mendeteksi klik di luar
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
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
        onClick={() => setOpen(true)}
      />
      {
        isOpen && (
          <div
            onClick={() => setOpen(false)}
            className="bg-black/50 dark:bg-black/60 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full no-scrollbar"
          >
            <div className="relative w-full max-h-full">
              <div className="w-full flex items-center justify-center overflow-y-auto h-full">
                <div
                  className={`${isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                    } duration-500 ease-in-out max-w-full`}
                >
                  <img src={src} alt={alt} className='w-3/4 mx-auto h-auto' />
                </div>
              </div>
            </div>
          </div>

        )
      }
    </div>
  );
};

export default ResponsiveImage;
