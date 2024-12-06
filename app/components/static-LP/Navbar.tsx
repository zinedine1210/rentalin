import React, { useState } from "react";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBars,
  faTimes,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import myImageLoader from "@@/src/utils/loader";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (item) => {
    if (activeDropdown === item) {
      setActiveDropdown(null); // Menutup dropdown jika diklik lagi
    } else {
      setActiveDropdown(item); // Membuka dropdown
    }
  };

  return (
    <div className="bg-white text-black fixed w-full z-20">
      <div className=" flex items-center justify-between md:justify-start px-4 py-7 lg:px-20">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/images/static-LP/logobeyondtech.webp" alt="Logo Beyond" className="h-8 w-auto mr-7" width={239} height={49} placeholder={`data:image/${myImageLoader(239, 49)}`}/>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            className="text-2xl cursor-pointer"
          />
        </div>

        {/* Navbar List */}
        <ul
          className={`ml-5 flex-row md:flex-row md:flex space-y-4 md:space-y-0 space-x-0 md:space-x-7 text-sm ${
            isMenuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          {["Personal", "Bisnis", "Berita", "Tentang Kami", "Developer"].map(
            (item) => (
              <li
                key={item}
                className="relative group hover:text-blue-500"
                onClick={() => handleDropdownToggle(item)}
              >
                <button className="focus:outline-none flex items-center">
                  {item}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-2"
                    style={{ fontSize: "8px" }}
                  />
                </button>

                {/* Dropdown for "Personal" */}
                {item === "Personal" && activeDropdown === "Personal" && (
                  <div className="sm:fixed lg:absolute md:left-5 mt-2 bg-white text-gray-800 p-5 w-[700px] h-auto rounded shadow-lg z-50">
                    <div className="flex flex-col gap-y-3">
                      <div>
                        <h1 className="font-bold text-[#1B75BB]">
                          BeyondTech untuk Kamu
                        </h1>
                      </div>
                      <div className="flex flex-row gap-x-20">
                        <div className="flex flex-col w-1/2 gap-y-3">
                          <div>
                            <h1 className="font-bold text-[#1B75BB]">
                              Kirim & Terima
                            </h1>
                            <hr />
                          </div>
                          <div className="flex justify-between">
                            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                              <p>Kirim Uang {"(Domestik & International)"}</p>
                            </a>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Ajukan & Terima Pembayaran</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Mulai Berjualan</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Donasi</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col w-1/2 gap-y-3">
                          <div>
                            <h1 className="font-bold text-[#1B75BB]">
                              Beli & Belanja
                            </h1>
                            <hr />
                          </div>
                          <div className="flex justify-between">
                            <p>Tambahkan Pembayaran</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Top Up Saldo</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Bayar Produk Digital {"(PPOB)"}</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Voucher Digital</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden fixed top-0 left-0 w-full h-screen bg-white z-20 p-5 overflow-auto`}
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl cursor-pointer"
          />
        </div>

        <ul className="flex flex-col space-y-4 text-sm mt-5">
          {["Personal", "Bisnis", "Berita", "Tentang Kami", "Developer"].map(
            (item) => (
              <li key={item}>
                <button
                  className="w-full text-left focus:outline-none flex items-center justify-between"
                  onClick={() => handleDropdownToggle(item)}
                >
                  {item}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-2"
                    style={{ fontSize: "8px" }}
                  />
                </button>

                {/* Mobile Dropdown Content */}
                {item === "Personal" && activeDropdown === "Personal" && (
                  <div className="fixed bottom-32 left-0 w-full bg-white text-gray-800 p-5 rounded-t-lg shadow-lg z-30">
                    <div className="flex flex-col gap-y-3">
                      <h1 className="font-bold text-[#1B75BB]">
                        BeyondTech untuk Kamu
                      </h1>
                      <div className="flex flex-col gap-y-3">
                        <div className="space-y-3">
                          <h1 className="font-bold text-[#1B75BB]">
                            Kirim & Terima
                          </h1>
                          <hr />
                          <div className="flex justify-between">
                            <p>Kirim Uang {"(Domestik & International)"}</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Ajukan & Terima Pembayaran</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Mulai Berjualan</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Donasi</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h1 className="font-bold text-[#1B75BB]">
                              Beli & Belanja
                            </h1>
                            <hr />
                          </div>
                          <div className="flex justify-between">
                            <p>Tambahkan Pembayaran</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Top Up Saldo</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Bayar Produk Digital {"(PPOB)"}</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                          <div className="flex justify-between">
                            <p>Voucher Digital</p>
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="text-[#1B75BB]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
