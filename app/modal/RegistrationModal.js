'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerCustomer } from "../reducers/AuthSlice";
import { RiUserLine, RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiPhoneLine, RiBuildingLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import regImg from "../../public/images/regimg.png";
import { toast } from "react-toastify";

const RegistrationModal = ({ openRegisterModal, setOpenRegisterModal, setOpenLoginModal }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const nameParts = data.full_name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      companyName: data.company_name,
      firstName,
      lastName,
      email: data.email,
      phone: Number(data.phone),
      password: data.password,
      confirmPassword: data.confirm_password,
    };

    const res = await dispatch(registerCustomer(payload));

    if (res?.payload?.status_code === 200 || res?.payload?.status_code === 201) {
      toast.success("Registration successful!");
      reset();
      setOpenRegisterModal(false);
    } else {
      toast.error(res?.payload?.message || "Registration failed. Please try again.");
    }
  };

  const openLogin = () => {
    setOpenLoginModal(true);
    setOpenRegisterModal(false);
  };

  if (!openRegisterModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpenRegisterModal(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[900px] mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl flex min-h-[520px]">

        {/* Left - Image Panel */}
        <div className="hidden lg:flex w-1/2 relative">
          <Image
            src={regImg}
            alt="Register"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Right - Form Panel */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-12 py-10 overflow-y-auto">

          {/* Close */}
          <button
            onClick={() => setOpenRegisterModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <IoClose size={22} />
          </button>

          <h2 className="text-2xl lg:text-[28px] font-bold text-gray-900 mb-1">Looks like you're new here!</h2>
          <p className="text-sm text-gray-500 mb-6">Sign up with your Email to get started</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">

            {/* Company Name */}
            <div className="relative">
              <RiBuildingLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Company Name"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-3 text-sm outline-none focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] transition-all placeholder-gray-400"
                {...register("company_name", { required: "Company name is required" })}
              />
              {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name.message}</p>}
            </div>

            {/* Full Name */}
            <div className="relative">
              <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-3 text-sm outline-none focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] transition-all placeholder-gray-400"
                {...register("full_name", { required: "Full name is required" })}
              />
              {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
            </div>

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

            {/* Phone */}
            <div className="relative">
              <RiPhoneLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-3 text-sm outline-none focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] transition-all placeholder-gray-400"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: { value: /^[0-9]+$/, message: "Enter a valid phone number" },
                })}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
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

            {/* Confirm Password */}
            <div className="relative">
              <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border border-gray-200 rounded-lg pl-9 pr-10 py-3 text-sm outline-none focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] transition-all placeholder-gray-400"
                {...register("confirm_password", {
                  required: "Confirm password is required",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
              </button>
              {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ed1c24] text-white font-semibold py-3 rounded-full hover:bg-black transition-colors duration-300 text-sm tracking-wide mt-1"
            >
              {loading ? "Please wait..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <button
              onClick={openLogin}
              className="text-gray-900 font-semibold hover:text-[#ed1c24] transition-colors"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;