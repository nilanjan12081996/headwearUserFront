'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Label, Checkbox, TextInput } from "flowbite-react";

import list_banner from "../assets/imagesource/list_banner.png";

import { GoHome } from "react-icons/go";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

import Image from 'next/image';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { getReorderPreview, submitReorder, clearReorderState } from '../reducers/OrdersSlice';
import ReorderSummary from './ReorderSummary';

const ReorderCheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useSearchParams();
  const orderId = params.get("order_id");

  const {
    reorderPreview,
    reorderPreviewLoading,
    reorderLoading,
    reorderSuccess,
    reorderError,
  } = useSelector((state) => state.order ?? {});

  const [sameAddress, setSameAddress] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const billing = watch("billing");

  // ── Fetch preview if not in redux yet ────────────────────────────────────
  useEffect(() => {
    if (orderId && !reorderPreview && !reorderPreviewLoading) {
      dispatch(getReorderPreview(orderId));
    }
  }, [orderId]);

  // ── Auto-fill form from preview response ──────────────────────────────────
  useEffect(() => {
    if (!reorderPreview) return;

    // Personal info
    setValue("first_name", reorderPreview.firstName || "");
    setValue("last_name", reorderPreview.lastName || "");
    setValue("email", reorderPreview.email || "");
    setValue("phone", reorderPreview.phone || "");
    setValue("company_name", reorderPreview.companyName || "");

    // Addresses — pick the latest BILLING and SHIPPING (last in list = highest addressId)
    const addresses = reorderPreview.addresses || [];

    const billingAddr = [...addresses].reverse().find((a) => a.addressType === "BILLING");
    const shippingAddr = [...addresses].reverse().find((a) => a.addressType === "SHIPPING");

    if (billingAddr) {
      setValue("billing.line1", billingAddr.line1 || "");
      setValue("billing.line2", billingAddr.line2 || "");
      setValue("billing.city", billingAddr.city || "");
      setValue("billing.state", billingAddr.state || "");
      setValue("billing.postal_code", billingAddr.postalCode || "");
      setValue("billing.country", billingAddr.country || "");
      setValue("billing_address_id", billingAddr.addressId);
    }

    if (shippingAddr) {
      setValue("shipping.line1", shippingAddr.line1 || "");
      setValue("shipping.line2", shippingAddr.line2 || "");
      setValue("shipping.city", shippingAddr.city || "");
      setValue("shipping.state", shippingAddr.state || "");
      setValue("shipping.postal_code", shippingAddr.postalCode || "");
      setValue("shipping.country", shippingAddr.country || "");
      setValue("shipping_address_id", shippingAddr.addressId);
    }
  }, [reorderPreview, setValue]);

  // ── Copy billing → shipping ───────────────────────────────────────────────
  useEffect(() => {
    if (sameAddress) {
      setValue("shipping.line1", billing?.line1 || "");
      setValue("shipping.line2", billing?.line2 || "");
      setValue("shipping.city", billing?.city || "");
      setValue("shipping.state", billing?.state || "");
      setValue("shipping.postal_code", billing?.postal_code || "");
      setValue("shipping.country", billing?.country || "");
    } else {
      setValue("shipping.line1", "");
      setValue("shipping.line2", "");
      setValue("shipping.city", "");
      setValue("shipping.state", "");
      setValue("shipping.postal_code", "");
      setValue("shipping.country", "");
    }
  }, [sameAddress, billing, setValue]);

  // ── Success redirect ──────────────────────────────────────────────────────
  useEffect(() => {
    if (reorderSuccess) {
      toast.success("Reorder placed successfully!");
      const t = setTimeout(() => {
        dispatch(clearReorderState());
        router.push("/order-confirm");
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [reorderSuccess]);

  useEffect(() => {
    if (reorderError) {
      toast.error(reorderError);
    }
  }, [reorderError]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    if (!reorderPreview) {
      toast.error("Preview not loaded yet.");
      return;
    }

    setOrderLoading(true);
    try {
      const payload = {
        originalOrderId: Number(orderId),

        addresses: [
          {
            addressId: Number(data.shipping_address_id),
            addressType: "SHIPPING",
          },
          {
            addressId: Number(data.billing_address_id),
            addressType: "BILLING",
          },
        ],

        orderDetails: {
          grandTotalAmount: reorderPreview?.orderDetails?.grandTotalAmount ?? 0,
          groups: (reorderPreview?.orderDetails?.groups ?? []).map((group) => ({
            id: group.id,
            items: (group.items ?? []).map((item) => ({
              id: item.id,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              lineSubtotal: item.lineSubtotal,
            })),
          })),
        },
      };

      await dispatch(submitReorder(payload)).unwrap();
    } catch (err) {
      toast.error(err || "Reorder failed. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
        <div className='banner_area py-0 lg:p-0'>
          <div className="relative">
            <Image src={list_banner} alt='list_banner' className="hidden lg:block w-full" />
            <Image src={list_banner} alt='list_banner' className="block lg:hidden w-full" />
          </div>
        </div>

        <div className="py-10 lg:pb-20 lg:pt-10">

          {/* Breadcrumb */}
          <div className='mb-10'>
            <div className='max-w-6xl mx-auto px-5 lg:px-0 py-0 mb-10 flex justify-between items-center'>
              <div>
                <ul className='flex items-center gap-1 sm:gap-2'>
                  <li>
                    <Link href="/" passHref><GoHome className='text-[#666666] text-2xl' /></Link>
                  </li>
                  <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                  <li className='text-[#666666] text-base'>
                    <Link href="/orders" passHref>Orders</Link>
                  </li>
                  <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                  {orderId && (
                    <>
                      <li className='text-[#666666] text-base'>
                        <Link href={`/orders/${orderId}`} passHref>Order Details</Link>
                      </li>
                      <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                    </>
                  )}
                  <li className='text-[#ED1C24] text-base'>Reorder Checkout</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='max-w-6xl mx-auto px-5 lg:px-0'>

            {/* Existing Customer — always checked, read-only */}
            <div className='mb-2 flex items-center gap-2'>
              <Checkbox
                id="existingCustomer"
                checked={true}
                readOnly
                className="cursor-default"
              />
              <span className="ml-2 text-sm text-gray-700">Existing Customer</span>
            </div>

            {/* Loading state */}
            {reorderPreviewLoading && (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 border-[#ED1C24] border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!reorderPreviewLoading && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='lg:flex items-start justify-start gap-8'>

                  {/* ── LEFT: Forms (exactly same as checkout) ── */}
                  <div className='lg:w-10/12 form_area mb-4 lg:mb-0'>

                    <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Personal Information</h3>

                    <div className='lg:flex gap-4 mb-4'>
                      <div className='lg:w-4/12'>
                        <div className="mb-2 block">
                          <Label htmlFor="first_name">First name</Label>
                        </div>
                        <TextInput {...register("first_name", { required: true })} id="first_name" type="text" sizing="md" placeholder='Your first name' />
                        {errors.first_name && <small className="text-red-500">First name is required</small>}
                      </div>
                      <div className='lg:w-4/12'>
                        <div className="mb-2 block">
                          <Label htmlFor="last_name">Last name</Label>
                        </div>
                        <TextInput {...register("last_name", { required: true })} id="last_name" type="text" sizing="md" placeholder='Your last name' />
                        {errors.last_name && <small className="text-red-500">Last name is required</small>}
                      </div>
                      <div className='lg:w-4/12'>
                        <div className="mb-2 block">
                          <Label htmlFor="company_name">Company Name (optional)</Label>
                        </div>
                        <TextInput {...register("company_name")} id="company_name" type="text" sizing="md" placeholder='Company name' />
                      </div>
                    </div>

                    <div className='flex gap-4 mb-4'>
                      <div className='w-6/12'>
                        <div className="mb-2 block">
                          <Label htmlFor="email">Email</Label>
                        </div>
                        <TextInput {...register("email", { required: true })} id="email" type="email" sizing="md" placeholder='Email Address' />
                        {errors.email && <small className="text-red-500">Email is required</small>}
                      </div>
                      <div className='w-6/12'>
                        <div className="mb-2 block">
                          <Label htmlFor="phone">Phone</Label>
                        </div>
                        <TextInput {...register("phone", { required: true })} id="phone" type="text" sizing="md" placeholder='Phone number' />
                        {errors.phone && <small className="text-red-500">Phone is required</small>}
                      </div>
                    </div>

                    {/* Billing */}
                    <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Billing Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className='w-full'>
                        <div className="mb-2 block"><Label htmlFor="b_line1">Address Line 1</Label></div>
                        <TextInput {...register("billing.line1", { required: true })} id="b_line1" type="text" sizing="md" placeholder='Address Line 1' />
                        {errors?.billing?.line1 && <small className="text-red-500">Address Line 1 is Required</small>}
                      </div>
                      <div className='w-full'>
                        <div className="mb-2 block"><Label htmlFor="b_line2">Address Line 2</Label></div>
                        <TextInput {...register("billing.line2")} id="b_line2" type="text" sizing="md" placeholder='Address Line 2' />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="mb-2 block"><Label htmlFor="b_country">Country / Region</Label></div>
                        <TextInput {...register("billing.country", { required: true })} id="b_country" type="text" sizing="md" placeholder='Country' />
                        {errors?.billing?.country && <small className="text-red-500">Country is Required</small>}
                      </div>
                      <div>
                        <div className="mb-2 block"><Label htmlFor="b_state">States</Label></div>
                        <TextInput {...register("billing.state", { required: true })} id="b_state" type="text" sizing="md" placeholder='State' />
                        {errors?.billing?.state && <small className="text-red-500">State is Required</small>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className='full'>
                        <div className="mb-2 block"><Label htmlFor="b_postal">Postal Code</Label></div>
                        <TextInput {...register("billing.postal_code", { required: true })} id="b_postal" type="text" sizing="md" placeholder='Postal Code' />
                        {errors?.billing?.postal_code && <small className="text-red-500">Postal Code is Required</small>}
                      </div>
                      <div className='full'>
                        <div className="mb-2 block"><Label htmlFor="b_city">City</Label></div>
                        <TextInput {...register("billing.city", { required: true })} id="b_city" type="text" sizing="md" placeholder='City' />
                        {errors?.billing?.city && <small className="text-red-500">City is Required</small>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 check_area mb-2">
                      <Checkbox id="promotion" checked={sameAddress} onChange={(e) => setSameAddress(e.target.checked)} />
                      <Label className='text-[#615E5E] text-base' htmlFor="promotion">Ship to Same address</Label>
                    </div>

                    {/* Shipping */}
                    <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Shipping Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className='w-full'>
                        <div className="mb-2 block"><Label htmlFor="s_line1">Address Line 1</Label></div>
                        <TextInput {...register("shipping.line1", { required: true })} id="s_line1" type="text" sizing="md" placeholder='Address Line 1' />
                        {errors?.shipping?.line1 && <small className="text-red-500">Address Line 1 is Required</small>}
                      </div>
                      <div className='w-full'>
                        <div className="mb-2 block"><Label htmlFor="s_line2">Address Line 2</Label></div>
                        <TextInput {...register("shipping.line2")} id="s_line2" type="text" sizing="md" placeholder='Address Line 2' />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className='w-full'>
                        <div className="mb-2 block"><Label htmlFor="s_country">Country / Region</Label></div>
                        <TextInput {...register("shipping.country", { required: true })} id="s_country" type="text" sizing="md" placeholder='Country' />
                        {errors?.shipping?.country && <small className="text-red-500">Country is Required</small>}
                      </div>
                      <div className='w-full'>
                        <div className="mb-2 block"><Label htmlFor="s_state">States</Label></div>
                        <TextInput {...register("shipping.state", { required: true })} id="s_state" type="text" sizing="md" placeholder='State' />
                        {errors?.shipping?.state && <small className="text-red-500">State is Required</small>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className='w-full'>
                        <div className="mb-2 block"><Label htmlFor="s_postal">Postal Code</Label></div>
                        <TextInput {...register("shipping.postal_code", { required: true })} id="s_postal" type="text" sizing="md" placeholder='Postal Code' />
                        {errors?.shipping?.postal_code && <small className="text-red-500">Postal Code is Required</small>}
                      </div>
                      <div className='w-full'>
                        <div className="mb-2 block"><Label htmlFor="s_city">City</Label></div>
                        <TextInput {...register("shipping.city", { required: true })} id="s_city" type="text" sizing="md" placeholder='City' />
                        {errors?.shipping?.city && <small className="text-red-500">City is Required</small>}
                      </div>
                    </div>

                  </div>

                  {/* ── RIGHT: Order Summary ── */}
                  <ReorderSummary
                    orderLoading={orderLoading || reorderLoading}
                  />

                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default ReorderCheckoutPage;