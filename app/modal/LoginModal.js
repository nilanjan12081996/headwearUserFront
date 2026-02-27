'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import loginImage from "../../public/images/loginimg.png"

const LoginModal = ({ openLoginModal, setOpenLoginModal, setOpenRegisterModal }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // API ready hoile connect korbe
    console.log("login data", data);
  };

  const handleSignup = () => {
    setOpenRegisterModal(true);
    setOpenLoginModal(false);
  };

  if (!openLoginModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpenLoginModal(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[900px] mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl flex min-h-[480px]">

        {/* Left - Image Panel */}
        <div className="hidden lg:flex w-1/2 relative">
          <Image
            src={loginImage}
            alt="Login"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Right - Form Panel */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-12 py-12">

          {/* Close */}
          <button
            onClick={() => setOpenLoginModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <IoClose size={22} />
          </button>

          <h2 className="text-2xl lg:text-[28px] font-bold text-gray-900 mb-1">Hello Again!</h2>
          <p className="text-sm text-gray-500 mb-7">Get access to your Orders</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Email */}
            <div className="relative">
              <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-3 text-sm outline-none focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] transition-all placeholder-gray-400"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-10 py-3 text-sm outline-none focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] transition-all placeholder-gray-400"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex justify-end">
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-700">
                Forgot Password
              </Link>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ed1c24] text-white font-semibold py-3 rounded-full hover:bg-black transition-colors duration-300 text-sm tracking-wide mt-1"
            >
              {loading ? "Please wait..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <button
              onClick={handleSignup}
              className="text-gray-900 font-semibold hover:text-[#ed1c24] transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;