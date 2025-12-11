'use client'
import Link from 'next/link'
import React from 'react'

import { Avatar, AvatarGroup, AvatarGroupCounter, Label, Select, FileInput, Checkbox, TextInput } from "flowbite-react";

import app_store from "../assets/imagesource/app_store.png";

import google_play from "../assets/imagesource/google_play.png";

import mobiles_01 from "../assets/imagesource/mobiles_01.png";

import about_01 from "../assets/imagesource/about_01.png";

import about_02 from "../assets/imagesource/about_02.png";

import stethy from "../assets/imagesource/stethy.png";

import home from "../assets/imagesource/home.png";

import team_01 from "../assets/imagesource/team_01.png";
import team_02 from "../assets/imagesource/team_02.png";
import team_03 from "../assets/imagesource/team_03.png";
import team_04 from "../assets/imagesource/team_04.png";
import team_05 from "../assets/imagesource/team_05.png";
import team_06 from "../assets/imagesource/team_06.png";

import list_banner from "../assets/imagesource/list_banner.png";

import product_01 from "../assets/imagesource/product_01.png";
import product_02 from "../assets/imagesource/product_02.png";
import product_03 from "../assets/imagesource/product_03.png";
import product_04 from "../assets/imagesource/product_04.png";

import rating_icon from "../assets/imagesource/rating_icon.png";

import red_icon from "../assets/imagesource/red_icon.png";
import yellow_icon from "../assets/imagesource/yellow_icon.png";
import gray_icon from "../assets/imagesource/gray_icon.png";

import print_01 from "../assets/imagesource/print_01.png";
import print_02 from "../assets/imagesource/print_02.png";
import print_03 from "../assets/imagesource/print_03.png";
import print_04 from "../assets/imagesource/print_04.png";

import cap_left from "../assets/imagesource/cap_left.png";
import cap_front from "../assets/imagesource/cap_front.png";
import cap_right from "../assets/imagesource/cap_right.png";
import cap_back from "../assets/imagesource/cap_back.png";

import on_progress from "../assets/imagesource/on_progress.png";

import small_cap from "../assets/imagesource/small_cap.png";





import { GoHome } from "react-icons/go";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { CgFileDocument } from "react-icons/cg";



import Image from 'next/image';


import { FaPlus } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addAddress } from '../reducers/CheckoutSlice';





const page = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const savedUUid = sessionStorage.getItem("uuid")

  const onSubmit = (data) => {
    const payload = {
      customer: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        company_name: data.company_name,
        session_uuid: savedUUid
      },
      billing: {
        line1: data.billing.line1,
        line2: data.billing.line2,
        city: data.billing.city,
        state: data.billing.state,
        postal_code: data.billing.postal_code,
        country: data.billing.country,
        address_type: "BILLING",
      },
      shipping: {
        line1: data.shipping.line1,
        line2: data.shipping.line2,
        city: data.shipping.city,
        state: data.shipping.state,
        postal_code: data.shipping.postal_code,
        country: data.shipping.country,
        address_type: "SHIPPING",
      },
    };

    console.log("FINAL PAYLOAD:", payload);
    dispatch(addAddress(payload));
  };
  return (
    <div>
      <div className='banner_area py-0 lg:p-0'>
        {/* home banner section start here */}
        <div className="relative">
          <Image src={list_banner} alt='list_banner' className="hidden lg:block w-full" />
          <Image src={list_banner} alt='list_banner' className="block lg:hidden w-full" />
        </div>
      </div>



      {/* Who We Are section start here */}
      <div className="py-10 lg:pb-20 lg:pt-10">

        <div className='mb-10'>
          <div className='max-w-6xl mx-auto px-5 lg:px-0 py-0 mb-10 flex justify-between items-center'>
            <div>
              <ul className='flex items-center gap-1 sm:gap-2'>
                <li>
                  <Link href="/" passHref><GoHome className='text-[#666666] text-2xl' /></Link>
                </li>
                <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                <li className='text-[#666666] text-base'>Caps</li>
                <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                <li className='text-[#666666] text-base'>Wooly Combed Flexifit</li>
                <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                <li className='text-[#666666] text-base'>Artwork</li>
                <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                <li className='text-[#ED1C24] text-base'>Checkout</li>
              </ul>
            </div>
          </div>

        </div>


        <div className='max-w-6xl mx-auto px-5 lg:px-0'>


          <div className='lg:flex items-start justify-start gap-8'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='lg:w-10/12 form_area mb-4 lg:mb-0'>

                <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Personal Information</h3>

                <div className='lg:flex gap-4 mb-4'>
                  <div className='lg:w-4/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">First name</Label>
                    </div>
                    <TextInput {...register("first_name", { required: true })} id="base" type="text" sizing="md" placeholder='Your first name' />
                    {errors.first_name && (
                      <small className="text-red-500">
                        First name is required
                      </small>
                    )}
                  </div>
                  <div className='lg:w-4/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Last name</Label>
                    </div>
                    <TextInput {...register("last_name", { required: true })} id="base" type="text" sizing="md" placeholder='Your last name' />
                    {errors.first_name && (
                      <small className="text-red-500">
                        Last name is required
                      </small>
                    )}
                  </div>
                  <div className='lg:w-4/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Company Name (optional)</Label>
                    </div>
                    <TextInput {...register("company_name")} id="base" type="text" sizing="md" placeholder='Company name' />
                  </div>
                </div>
                <div className='flex gap-4 mb-4'>
                  <div className='w-6/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Email</Label>
                    </div>
                    <TextInput {...register("email", { required: true })} id="base" type="email" sizing="md" placeholder='Email Address' />
                    {errors.email && (
                      <small className="text-red-500">
                        Email is required
                      </small>
                    )}
                  </div>
                  <div className='w-6/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Phone</Label>
                    </div>
                    <TextInput {...register("phone", { required: true })} id="base" type="text" sizing="md" placeholder='Phone number' />
                    {errors.phone && (
                      <small className="text-red-500">
                        phone is required
                      </small>
                    )}
                  </div>
                </div>

                <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Billing Information</h3>
                <div className='flex gap-4 mb-4'>
                  <div className='w-full'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Address Line 1</Label>
                    </div>
                    <TextInput {...register("billing.line1", { required: true })} id="base" type="text" sizing="md" placeholder='Address Line 1' />
                    {errors?.billing?.line1 && (
                      <small className="text-red-500">
                        Address Line1 is Required
                      </small>
                    )}
                  </div>
                  <div className='w-full'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Address Line 2</Label>
                    </div>
                    <TextInput {...register("billing.line2", { required: true })} id="base" type="text" sizing="md" placeholder='Addess Line 2' />
                    {errors?.billing?.line2 && (
                      <small className="text-red-500">
                        Address Line2 is Required
                      </small>
                    )}
                  </div>
                </div>
                <div className='lg:flex gap-4 mb-4'>
                  <div className='lg:w-5/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Country / Region</Label>
                    </div>
                    <TextInput {...register("billing.country", { required: true })} id="base" type="text" sizing="md" placeholder='Country' />
                    {errors?.billing?.country && (
                      <small className="text-red-500">
                        Country is Required
                      </small>
                    )}
                  </div>
                  <div className='lg:w-5/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">States</Label>
                    </div>
                    <TextInput {...register("billing.state", { required: true })} id="base" type="text" sizing="md" placeholder='State' />
                    {errors?.billing?.state && (
                      <small className="text-red-500">
                        State is Required
                      </small>
                    )}
                  </div>
                </div>

                <div className='flex gap-4 mb-4'>
                  <div className='w-6/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Postal Code</Label>
                    </div>
                    <TextInput {...register("billing.postal_code", { required: true })} id="base" type="text" sizing="md" placeholder='Postal Code' />
                    {errors?.billing?.postal_code && (
                      <small className="text-red-500">
                        Postal Code is Required
                      </small>
                    )}
                  </div>
                  <div className='w-6/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">City</Label>
                    </div>
                    <TextInput  {...register("billing.city", { required: true })} id="base" type="text" sizing="md" placeholder='City' />
                    {errors?.billing?.city && (
                      <small className="text-red-500">
                        City is Required
                      </small>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 check_area mb-2">
                  <Checkbox id="promotion" />
                  <Label className='text-[#615E5E] text-base' htmlFor="promotion">Ship to Same address</Label>
                </div>


                <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Shipping Information</h3>
                <div className='flex gap-4 mb-4'>
                  <div className='w-full'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Address Line 1</Label>
                    </div>
                    <TextInput {...register("shipping.line1", { required: true })} id="base" type="text" sizing="md" placeholder='Address Line 1' />
                    {errors?.shipping?.line1 && (
                      <small className="text-red-500">
                        Address Line 1 is Required
                      </small>
                    )}
                  </div>
                  <div className='w-full'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Address Line 2</Label>
                    </div>
                    <TextInput {...register("shipping.line2", { required: true })} id="base" type="text" sizing="md" placeholder='Addess Line 2' />
                    {errors?.shipping?.line2 && (
                      <small className="text-red-500">
                        Address Line 2 is Required
                      </small>
                    )}
                  </div>
                </div>
                <div className='lg:flex gap-4 mb-4'>
                  <div className='lg:w-5/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Country / Region</Label>
                    </div>
                    <TextInput {...register("shipping.country", { required: true })} id="base" type="text" sizing="md" placeholder='Country' />
                    {errors?.shipping?.country && (
                      <small className="text-red-500">
                        Country is Required
                      </small>
                    )}
                  </div>
                  <div className='lg:w-5/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">States</Label>
                    </div>
                    <TextInput {...register("shipping.state", { required: true })} id="base" type="text" sizing="md" placeholder='State' />
                    {errors?.shipping?.state && (
                      <small className="text-red-500">
                        State is Required
                      </small>
                    )}
                  </div>
                </div>

                <div className='flex gap-4 mb-4'>
                  <div className='w-6/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">Postal Code</Label>
                    </div>
                    <TextInput {...register("shipping.postal_code", { required: true })} id="base" type="text" sizing="md" placeholder='Postal Code' />
                    {errors?.shipping?.postal_code && (
                      <small className="text-red-500">
                        Postal Code is Required
                      </small>
                    )}
                  </div>
                  <div className='w-6/12'>
                    <div className="mb-2 block">
                      <Label htmlFor="base">City</Label>
                    </div>
                    <TextInput  {...register("shipping.city", { required: true })} id="base" type="text" sizing="md" placeholder='City' />
                    {errors?.shipping?.city && (
                      <small className="text-red-500">
                        City is Required
                      </small>
                    )}
                  </div>
                </div>


                <div>
                  <button type='submit' className='!bg-[#ED1C24] !w-auto !px-15 !py-3 hover:bg-[#000] hover:text-[#fff]'>Save</button>
                </div>
              </div>
            </form>
            <div className='lg:w-4/12 border border-[#E6E6E6] rounded-[10px] p-4'>
              <h3 className='text-[22px] font-semibold text-[#1A1A1A] pb-4'>Order Summery</h3>

              <div>

                <div className='mb-4 flex items-center gap-2'>
                  <div className='w-10/12 flex items-center gap-1'>
                    <div className='w-3/12'>
                      <Image src={small_cap} alt='small_cap' className='' />
                    </div>
                    <div className='w-9/12'>
                      <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>Wooly Combed Black x48</p>
                      <div className='flex items-center gap-4'>
                        <p className='text-[12px] text-[#1A1A1A]'>Size: S</p>
                        <p className='text-[12px] text-[#1A1A1A]'>Color: Black</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-2/12'>
                    <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>$70.00</p>
                  </div>
                </div>

                <div className='mb-4 flex items-center gap-2'>
                  <div className='w-10/12 flex items-center gap-1'>
                    <div className='w-3/12'>
                      <Image src={small_cap} alt='small_cap' className='' />
                    </div>
                    <div className='w-9/12'>
                      <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>Wooly Combed Black x48</p>
                      <div className='flex items-center gap-4'>
                        <p className='text-[12px] text-[#1A1A1A]'>Size: S</p>
                        <p className='text-[12px] text-[#1A1A1A]'>Color: Black</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-2/12'>
                    <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>$70.00</p>
                  </div>
                </div>

                <div className='mb-4 flex items-center gap-2'>
                  <div className='w-10/12 flex items-center gap-1'>
                    <div className='w-3/12 flex justify-center items-center'>
                      <CgFileDocument className='text-[#ed1c24] text-3xl' />
                    </div>
                    <div className='w-9/12'>
                      <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>Artwork Setup/Digitizing x96</p>
                    </div>
                  </div>
                  <div className='w-2/12'>
                    <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>$120.00</p>
                  </div>
                </div>

              </div>

              <div>
                <div className='flex items-center justify-between border-b border-[#e9e9e9] py-2 mb-2'>
                  <p className='text-[14px] text-[#1A1A1A] pb-1 font-normal'>Subtotal:</p>
                  <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>$260.00</p>
                </div>
                <div className='flex items-center justify-between border-b border-[#e9e9e9] py-2 mb-2'>
                  <p className='text-[14px] text-[#1A1A1A] pb-1 font-normal'>Subtotal:</p>
                  <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>$260.00</p>
                </div>
                <div className='flex items-center justify-between py-2 mb-2'>
                  <p className='text-[18px] text-[#1A1A1A] pb-1 font-normal'>Total:</p>
                  <p className='text-[18px] text-[#1A1A1A] pb-1 font-bold'>$260.00</p>
                </div>
              </div>

              <button className='bg-[#ED1C24] hover:bg-black text-white text-base rounded-full w-full py-3 cursor-pointer'>
                Get Quote
              </button>


            </div>
          </div>

        </div>
      </div>
      {/* Who We Are section ends here */}





    </div>
  )
}

export default page