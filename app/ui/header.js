'use client';

import React, { useState, useRef, useEffect } from "react";
import { Button, Navbar, NavbarCollapse, NavbarToggle } from "flowbite-react";
import Link from 'next/link';
import logo from '../assets/imagesource/logo.png';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import VerifyOtpModal from '../modal/verifyOtpModal';
import LoginModal from '../modal/LoginModal';
import RegistrationModal from '../modal/RegistrationModal';
import PriceListModal from '../modal/PriceListModal';
import { useDispatch, useSelector } from "react-redux";
import { cartList } from "../reducers/CartSlice";
import { FaShoppingCart } from "react-icons/fa";
import CartDropdown from "./CartDropdown";

const Header = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { cartListItem } = useSelector((state) => state?.cart);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openVerifyOtpModal, setOpenVerifyOtpModal] = useState(false);
  const [openPricModal, setOpenPriceModal] = useState(false);
  const [openCartPopup, setOpenCartPopup] = useState(false);
  const totalQty = cartListItem?.data?.data?.summary?.totalQuantity || 0;
  console.log('totalQty',totalQty)


  // Navbar toggle state
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Ref for navbar collapse
  const navbarRef = useRef(null);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  // Close on body click (outside navbar)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarOpen(false);
      }
    };

    if (isNavbarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNavbarOpen]);

  // const savedUUid = sessionStorage.getItem("uuid")
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(cartList({
  //     id: savedUUid
  //   }))
  // }, [])
  console.log('cartListItem', cartListItem)

  return (
    <div>
      <ToastContainer />
      <div className="header_section w-full lg:pb-0 left-0 lg:top-0">
        <div className="pt-0 lg:pt-0 lg:py-0 px-4 lg:px-0 rounded-0 relative z-10 bg-white">
          <div className="w-full bg-white px-0 py-5 rounded-b-2xl max-w-7xl mx-auto ">
            <div className="header_top flex justify-between items-center">
              {/* Logo */}
              <div className="mr-2 hidden lg:block">
                <Link href="/" passHref>
                  <Image src={logo} alt='logo' className='w-[161px]' />
                </Link>
              </div>
              <div className="mr-2 lg:hidden">
                <Link href="/" passHref>
                  <Image src={logo} alt='logo' className='w-[120px]' />
                </Link>
              </div>

              {/* Main menu */}
              <div className="menu_section pb-0">
                <div className="main_menu">
                  <Navbar fluid rounded className="bg-transparent pt-0 pb-0">
                    <div className="flex md:order-2 text-black toggle_point">
                      <NavbarToggle onClick={toggleNavbar} />
                    </div>
                    <NavbarCollapse
                      ref={navbarRef}
                      className={isNavbarOpen ? 'block' : 'hidden md:block'}
                    >
                      <li onClick={closeNavbar}>
                        <Link href="/" passHref>Join The Club</Link>
                      </li>
                      <li onClick={closeNavbar}>
                        <Link href="#" passHref>Get Started</Link>
                      </li>
                      <li onClick={closeNavbar}>
                        <Link href="#" passHref>Benefits</Link>
                      </li>
                      <li onClick={closeNavbar}>
                        <Link href="/" passHref>Why Choose Us</Link>
                      </li>
                      <li onClick={closeNavbar}>
                        <Link href="#" passHref>Example Work</Link>
                      </li>
                      <li onClick={closeNavbar}>
                        <Link href="#" passHref>FAQ</Link>
                      </li>
                    </NavbarCollapse>
                  </Navbar>
                </div>
              </div>

              {/* Contact Us Button */}
              <div className="mr-10 lg:mr-0 flex items-center mt-0 lg:mt-0">
                <div className="flex gap-2 relative">
                  <Link
                    className="text-white bg-[#ed1c24] flex items-center cursor-pointer uppercase font-medium text-xs lg:text-[15px] rounded-[35px] px-2 py-1.5 lg:px-8 lg:py-4 hover:bg-black"
                    href="/product-list"
                    passHref
                  >
                    Get Quote
                  </Link>
                  <button
                    onClick={() => setOpenCartPopup(true)}
                    className="relative flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full 
  hover:bg-[#ed1c24] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <FaShoppingCart size={18} />

                    {/* Quantity Badge */}
                    {totalQty > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold 
      w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                        {totalQty}
                      </span>
                    )}

                    View Cart
                  </button>

                  <CartDropdown
                    open={openCartPopup}
                    onClose={() => setOpenCartPopup(false)}

                  />
                </div>
              </div>
            </div>
          </div>

          {/* Login Modal */}
          {openLoginModal && (
            <LoginModal
              openLoginModal={openLoginModal}
              setOpenLoginModal={setOpenLoginModal}
              setOpenRegisterModal={setOpenRegisterModal}
            />
          )}

          {/* Register Modal */}
          {openRegisterModal && (
            <RegistrationModal
              openRegisterModal={openRegisterModal}
              setOpenRegisterModal={setOpenRegisterModal}
              openVerifyOtpModal={openVerifyOtpModal}
              setOpenVerifyOtpModal={setOpenVerifyOtpModal}
              setOpenLoginModal={setOpenLoginModal}
              openPricModal={openPricModal}
              setOpenPriceModal={setOpenPriceModal}
            />
          )}

          {/* Price Modal */}
          {openPricModal && (
            <PriceListModal
              openPricModal={openPricModal}
              setOpenPriceModal={setOpenPriceModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
