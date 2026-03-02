'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/imagesource/logo.png';
import { useDispatch, useSelector } from "react-redux";
import { cartList } from "../reducers/CartSlice";
import { logoutCustomer } from "../reducers/AuthSlice";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { RiUserLine, RiShoppingBagLine } from "react-icons/ri";
import CartDropdown from "./CartDropdown";
import LoginModal from '../modal/LoginModal';
import RegistrationModal from '../modal/RegistrationModal';
import { toast } from "react-toastify";

const Header = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openCartPopup, setOpenCartPopup] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openAccountDropdown, setOpenAccountDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navbarRef = useRef(null);
  const accountDropdownRef = useRef(null);

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { cartListItem } = useSelector((state) => state?.cart);
  const totalQty = cartListItem?.data?.cart?.total_items || 0;
  const savedUUid = typeof window !== "undefined" ? sessionStorage.getItem("uuid") : null;

  useEffect(() => {
    const token = sessionStorage.getItem("showmeheadwear");
    setLoggedIn(!!token || isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(cartList({ id: savedUUid }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarOpen(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setOpenAccountDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutCustomer());
    setLoggedIn(false);
    setOpenLogoutModal(false);
    setOpenAccountDropdown(false);
    toast.success("Logged out successfully!");
  };

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
      {/* Top Bar */}
      <div className="w-full bg-[#1a1a1a] text-white fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-gray-300 min-w-0">
            <IoLocationOutline className="text-[#ed1c24] text-sm shrink-0" />
            <span className="text-xs truncate">
              <span className="hidden sm:inline">Location: </span>Lincoln– 344, Illinois, Chicago, USA
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-2">
            {loggedIn ? (
              // Account Dropdown
              <div className="relative" ref={accountDropdownRef}>
                <button
                  onClick={() => setOpenAccountDropdown((prev) => !prev)}
                  className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-xs"
                >
                  <FaUserCircle size={16} />
                  <span className="font-medium">My Account</span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${openAccountDropdown ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {openAccountDropdown && (
                  <div className="absolute right-0 top-full mt-3 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[100]">
                    {/* Arrow */}
                    <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />

                    {/* Header */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#ed1c24]/10 rounded-full p-1.5">
                          <FaUserCircle size={18} className="text-[#ed1c24]" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">My Account</p>
                          <p className="text-[10px] text-gray-400">Manage your profile</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setOpenAccountDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ed1c24] transition-colors"
                      >
                        <RiUserLine size={16} className="text-gray-400" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        href="/orders"
                        onClick={() => setOpenAccountDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#ed1c24] transition-colors"
                      >
                        <RiShoppingBagLine size={16} className="text-gray-400" />
                        <span>Orders</span>
                      </Link>

                      <div className="mx-3 my-1 border-t border-gray-100" />

                      <button
                        onClick={() => {
                          setOpenAccountDropdown(false);
                          setOpenLogoutModal(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <HiOutlineLogout size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setOpenLoginModal(true)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs font-medium whitespace-nowrap"
                >
                  Sign In
                </button>
                <span className="text-gray-500 text-xs">/</span>
                <button
                  onClick={() => setOpenRegisterModal(true)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs font-medium whitespace-nowrap"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full fixed top-[32px] left-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center" ref={navbarRef}>
            <Link href="/" passHref>
              <Image src={logo} alt="logo" className="w-[140px] lg:w-[161px]" />
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href}
                  className="text-[13px] font-medium text-gray-700 hover:text-[#ed1c24] uppercase tracking-wide transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/product-list"
                className="text-white bg-[#ed1c24] uppercase font-medium text-xs lg:text-[13px] rounded-full px-3 py-2 lg:px-5 lg:py-2.5 hover:bg-black transition-colors duration-200 whitespace-nowrap"
              >
                Get Quote
              </Link>
              <div className="relative">
                <button onClick={() => setOpenCartPopup(true)}
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
              <button
                onClick={() => setIsNavbarOpen((prev) => !prev)}
                className="lg:hidden ml-1 p-2 text-gray-600 hover:text-gray-900"
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
          {isNavbarOpen && (
            <nav className="lg:hidden mt-2 pb-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} onClick={() => setIsNavbarOpen(false)}
                  className="text-[13px] font-medium text-gray-700 hover:text-[#ed1c24] uppercase tracking-wide px-1 py-1.5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {openLogoutModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpenLogoutModal(false)} />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl px-8 py-8 w-full max-w-sm mx-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-4">
                <HiOutlineLogout size={32} className="text-[#ed1c24]" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Log Out</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to log out of your account?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setOpenLogoutModal(false)}
                className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                No, Stay
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-full bg-[#ed1c24] text-white font-medium text-sm hover:bg-black transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

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