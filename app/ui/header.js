'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/imagesource/logo.png';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { cartList } from "../reducers/CartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import CartDropdown from "./CartDropdown";
import LoginModal from '../modal/LoginModal';
import RegistrationModal from '../modal/RegistrationModal';

const Header = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openCartPopup, setOpenCartPopup] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navbarRef = useRef(null);

  const { cartListItem } = useSelector((state) => state?.cart);
  const totalQty = cartListItem?.data?.cart?.total_items || 0;

  const savedUUid = typeof window !== "undefined" ? sessionStorage.getItem("uuid") : null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartList({ id: savedUUid }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarOpen(false);
      }
    };
    if (isNavbarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNavbarOpen]);

  const navLinks = [
    { label: "Join The Club", href: "/" },
    { label: "Get Started", href: "#" },
    { label: "Benefits", href: "#" },
    { label: "Why Choose Us", href: "/" },
    { label: "Example Work", href: "#" },
    { label: "FAQ", href: "#" },
  ];

  return (
    <>
      <ToastContainer />

      {/* ── Top Bar ── */}
      <div className="w-full bg-[#1a1a1a] text-white fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto px-3 py-1.5 flex justify-between items-center">
          <div className="flex items-center gap-1 text-gray-300 min-w-0">
            <IoLocationOutline className="text-[#ed1c24] text-[10px] lg:text-xs shrink-0" />
            <span className="text-[9px] lg:text-[11px] truncate">
              <span className="hidden sm:inline">Location: </span>Lincoln– 344, Illinois, Chicago, USA
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <button
              onClick={() => setOpenLoginModal(true)}
              className="text-gray-300 hover:text-white transition-colors duration-200 text-[9px] lg:text-[11px] whitespace-nowrap"
            >
              Sign In
            </button>
            <span className="text-gray-500 text-[9px] lg:text-[11px]">/</span>
            <button
              onClick={() => setOpenRegisterModal(true)}
              className="text-gray-300 hover:text-white transition-colors duration-200 text-[9px] lg:text-[11px] whitespace-nowrap"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <div className="w-full fixed top-[25px] md:top-[28px] left-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center" ref={navbarRef}>

            {/* Logo */}
            <Link href="/" passHref>
              <Image src={logo} alt="logo" className="w-[140px] lg:w-[161px]" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] font-medium text-gray-700 hover:text-[#ed1c24] uppercase tracking-wide transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Buttons */}
            <div className="flex items-center gap-2">
              <Link
                href="/product-list"
                className="text-white bg-[#ed1c24] uppercase font-medium text-xs lg:text-[13px] rounded-full px-3 py-2 lg:px-5 lg:py-2.5 hover:bg-black transition-colors duration-200 whitespace-nowrap"
              >
                Get Quote
              </Link>
              <div className="relative">
                <button
                  onClick={() => setOpenCartPopup(true)}
                  className="flex items-center gap-2 bg-black text-white px-3 py-2 lg:px-5 lg:py-2.5 rounded-full hover:bg-[#ed1c24] transition-all duration-300 cursor-pointer"
                >
                  <FaShoppingCart size={15} />
                  {totalQty > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
                      {totalQty}
                    </span>
                  )}
                  <span className="hidden lg:inline text-[13px] font-medium">View Cart</span>
                </button>
                <CartDropdown open={openCartPopup} onClose={() => setOpenCartPopup(false)} />
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsNavbarOpen((prev) => !prev)}
                className="lg:hidden ml-1 p-2 text-gray-600 hover:text-gray-900"
                aria-label="Toggle menu"
              >
                {isNavbarOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {isNavbarOpen && (
            <nav className="lg:hidden mt-2 pb-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsNavbarOpen(false)}
                  className="text-[13px] font-medium text-gray-700 hover:text-[#ed1c24] uppercase tracking-wide px-1 py-1.5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Modals */}
      {openLoginModal && (
        <LoginModal
          openLoginModal={openLoginModal}
          setOpenLoginModal={setOpenLoginModal}
          setOpenRegisterModal={setOpenRegisterModal}
        />
      )}
      {openRegisterModal && (
        <RegistrationModal
          openRegisterModal={openRegisterModal}
          setOpenRegisterModal={setOpenRegisterModal}
          setOpenLoginModal={setOpenLoginModal}
        />
      )}
    </>
  );
};

export default Header;


// 'use client';

// import React, { useState, useRef, useEffect } from "react";
// import { Navbar, NavbarCollapse } from "flowbite-react";
// import Link from 'next/link';
// import logo from '../assets/imagesource/logo.png';
// import Image from 'next/image';
// import { ToastContainer } from 'react-toastify';
// import VerifyOtpModal from '../modal/verifyOtpModal';
// import LoginModal from '../modal/LoginModal';
// import RegistrationModal from '../modal/RegistrationModal';
// import PriceListModal from '../modal/PriceListModal';
// import { useDispatch, useSelector } from "react-redux";
// import { cartList } from "../reducers/CartSlice";
// import { FaShoppingCart } from "react-icons/fa";
// import CartDropdown from "./CartDropdown";

// const Header = () => {
//   const [openLoginModal, setOpenLoginModal] = useState(false);
//   const { cartListItem } = useSelector((state) => state?.cart);
//   const [openRegisterModal, setOpenRegisterModal] = useState(false);
//   const [openVerifyOtpModal, setOpenVerifyOtpModal] = useState(false);
//   const [openPricModal, setOpenPriceModal] = useState(false);
//   const [openCartPopup, setOpenCartPopup] = useState(false);
//   const totalQty = cartListItem?.data?.cart?.total_items || 0;

//   const [isNavbarOpen, setIsNavbarOpen] = useState(false);
//   const navbarRef = useRef(null);

//   const closeNavbar = () => setIsNavbarOpen(false);

//   // Close on body click (outside navbar)
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navbarRef.current && !navbarRef.current.contains(event.target)) {
//         setIsNavbarOpen(false);
//       }
//     };

//     if (isNavbarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isNavbarOpen]);

//   const savedUUid = typeof window !== "undefined" ? sessionStorage.getItem("uuid") : null;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(cartList({ id: savedUUid }));
//   }, []);

//   return (
//     <div>
//       <ToastContainer />
//       <div className="header_section w-full lg:pb-0 left-0 lg:top-0 fixed z-50 border-b top-0 border-gray-200 shadow-sm">
//         <div className="pt-0 lg:pt-0 lg:py-0 px-4 lg:px-0 rounded-0 relative z-10 bg-white">
//           <div className="w-full bg-white px-0 py-2 rounded-b-2xl max-w-6xl mx-auto">
//             <div className="header_top flex justify-between items-center" ref={navbarRef}>

//               {/* Logo */}
//               <div className="mr-2 hidden lg:block">
//                 <Link href="/" passHref>
//                   <Image src={logo} alt='logo' className='w-[161px] max-[1200px]:w-[120px]' />
//                 </Link>
//               </div>
//               <div className="mr-2 lg:hidden">
//                 <Link href="/" passHref>
//                   <Image src={logo} alt='logo' className='w-[120px]' />
//                 </Link>
//               </div>

//               {/* Main menu */}
//               <div className="menu_section pb-0">
//                 <div className="main_menu">
//                   <Navbar fluid rounded className="bg-transparent pt-0 pb-0">

//                     {/* ── Custom Toggle Button (hamburger ↔ cross) ── */}
//                     <div className="flex md:order-2 text-black toggle_point">
//                       <button
//                         onClick={() => setIsNavbarOpen((prev) => !prev)}
//                         className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
//                         aria-label="Toggle menu"
//                       >
//                         {isNavbarOpen ? (
//                           /* ✕ Cross icon */
//                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         ) : (
//                           /* ☰ Hamburger icon */
//                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
//                           </svg>
//                         )}
//                       </button>
//                     </div>

//                     <NavbarCollapse className={isNavbarOpen ? 'block' : 'hidden lg:block'}>
//                       <li onClick={closeNavbar}>
//                         <Link href="/" passHref>Join The Club</Link>
//                       </li>
//                       <li onClick={closeNavbar}>
//                         <Link href="#" passHref>Get Started</Link>
//                       </li>
//                       <li onClick={closeNavbar}>
//                         <Link href="#" passHref>Benefits</Link>
//                       </li>
//                       <li onClick={closeNavbar}>
//                         <Link href="/" passHref>Why Choose Us</Link>
//                       </li>
//                       <li onClick={closeNavbar}>
//                         <Link href="#" passHref>Example Work</Link>
//                       </li>
//                       <li onClick={closeNavbar}>
//                         <Link href="#" passHref>FAQ</Link>
//                       </li>
//                     </NavbarCollapse>
//                   </Navbar>
//                 </div>
//               </div>

//               {/* Contact Us Button */}
//               <div className="mr-10 lg:mr-0 flex items-center mt-0 lg:mt-0">
//                 <div className="flex gap-2 relative">
//                   <Link
//                     className="text-white bg-[#ed1c24] flex items-center cursor-pointer uppercase font-medium text-xs lg:text-[14px] rounded-[35px] px-2 py-1.5 lg:px-4 lg:py-3 hover:bg-black"
//                     href="/product-list"
//                     passHref
//                   >
//                     Get Quote
//                   </Link>
//                   <button
//                     onClick={() => setOpenCartPopup(true)}
//                     className="relative flex items-center gap-2 bg-black text-white px-2 py-1.5 lg:px-4 lg:py-3 rounded-full hover:bg-[#ed1c24] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
//                   >
//                     <FaShoppingCart size={18} />
//                     {totalQty > 0 && (
//                       <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[20px] h-[20px] px-1 flex items-center justify-center rounded-full shadow-md">
//                         {totalQty}
//                       </span>
//                     )}
//                     <span className="hidden lg:inline">View Cart</span>
//                   </button>

//                   <CartDropdown
//                     open={openCartPopup}
//                     onClose={() => setOpenCartPopup(false)}
//                   />
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* Login Modal */}
//           {openLoginModal && (
//             <LoginModal
//               openLoginModal={openLoginModal}
//               setOpenLoginModal={setOpenLoginModal}
//               setOpenRegisterModal={setOpenRegisterModal}
//             />
//           )}

//           {/* Register Modal */}
//           {openRegisterModal && (
//             <RegistrationModal
//               openRegisterModal={openRegisterModal}
//               setOpenRegisterModal={setOpenRegisterModal}
//               openVerifyOtpModal={openVerifyOtpModal}
//               setOpenVerifyOtpModal={setOpenVerifyOtpModal}
//               setOpenLoginModal={setOpenLoginModal}
//               openPricModal={openPricModal}
//               setOpenPriceModal={setOpenPriceModal}
//             />
//           )}

//           {/* Price Modal */}
//           {openPricModal && (
//             <PriceListModal
//               openPricModal={openPricModal}
//               setOpenPriceModal={setOpenPriceModal}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
