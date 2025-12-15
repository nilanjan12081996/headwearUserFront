'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, updateCustomer } from '../reducers/CheckoutSlice';
import OrderSummary from './OrderSummary';
import { toast, ToastContainer } from 'react-toastify';
import { useSearchParams } from 'next/navigation';





const page = () => {
  const { loading } = useSelector((state) => state?.check)
  const [cust_id, setCust_id] = useState()
  const [billingId, setBillingId] = useState()
  const [shippingId, setShippingId] = useState()
  const [sameAddress, setSameAddress] = useState(false);

  const params = useSearchParams();
  const artworkId = params.get("artwork_id");

  console.log("Artwork ID:", artworkId);

  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const savedUUid = sessionStorage.getItem("uuid")
  const cartId = localStorage.getItem("cartId")
  const cart_id = localStorage.getItem("cart_id")

  const billing = watch("billing");

  useEffect(() => {
    if (sameAddress) {
      // copy billing → shipping
      setValue("shipping.line1", billing?.line1 || "");
      setValue("shipping.line2", billing?.line2 || "");
      setValue("shipping.city", billing?.city || "");
      setValue("shipping.state", billing?.state || "");
      setValue("shipping.postal_code", billing?.postal_code || "");
      setValue("shipping.country", billing?.country || "");
    } else {
      // CLEAR SHIPPING FIELDS when unchecked
      setValue("shipping.line1", "");
      setValue("shipping.line2", "");
      setValue("shipping.city", "");
      setValue("shipping.state", "");
      setValue("shipping.postal_code", "");
      setValue("shipping.country", "");
    }
  }, [sameAddress, billing, setValue]);



  const onSubmit = (data) => {
    const payload = {
      customer: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        company_name: data.company_name,
        session_uuid: savedUUid
        //session_uuid: '7a7f3285-43fc-43c4-a03b-822c018dfb07'
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
    dispatch(addAddress(payload)).then((res) => {
      console.log("Res", res);
      if (res?.payload?.status_code === 201) {
        setCust_id(res?.payload?.data?.customer?.id)
        setShippingId(res?.payload?.data?.addresses?.[0]?.data?.id)
        setBillingId(res?.payload?.data?.addresses?.[1]?.data?.id)
        dispatch(updateCustomer({
          id: cart_id,
          customer_id: res?.payload?.data?.customer?.id
        }))
        toast.success(res?.payload?.message)
      }

    });
  };
  return (
    <div>
      <ToastContainer />
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
                  <Checkbox id="promotion"
                    checked={sameAddress}
                    onChange={(e) => setSameAddress(e.target.checked)}
                  />
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
                  <button type='submit' className='!bg-[#ED1C24] !w-auto !px-15 !py-3 hover:bg-[#000] hover:text-[#fff]'>{loading ? "Waiting.." : "Save"}</button>
                </div>
              </div>
            </form>
            <OrderSummary
              cust_id={cust_id}
              billingId={billingId}
              shippingId={shippingId}
              artworkId={artworkId}

            />
          </div>

        </div>
      </div>
      {/* Who We Are section ends here */}





    </div>
  )
}

export default page