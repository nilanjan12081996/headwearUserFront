'use client';
import React, { useEffect, useState } from 'react'
import logoBlack from "../assets/imagesource/logoBlack.png";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
import preview_01 from "../assets/imagesource/preview_01.jpg";
import preview_02 from "../assets/imagesource/preview_02.jpg";
import preview_03 from "../assets/imagesource/preview_03.jpg";
import Black from "../assets/imagesource/Black.png";
import { FiPlusCircle } from "react-icons/fi";
import White from "../assets/imagesource/White.png";
import Moss from "../assets/imagesource/Moss.png";
import Buck from "../assets/imagesource/Buck.png";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getHatBrandList, getHatListDetail } from '../reducers/HatBrandSlice';
import HatColorSelector from './HatColorSelector';
import { addCartGroup, addCartItem, cartList, updateCartItem } from '../reducers/CartSlice';


const ProductAccordion = ({ selectedOption, hatQuantities, setHatQuantities }) => {

    const dispatch = useDispatch();
    const { brandList, brandWiseHatList } = useSelector((state) => state.hatBrand);
    const [cartItemMap, setCartItemMap] = useState({});
    const [cartItemId, setCartItemId] = useState()
    const [isProcessing, setIsProcessing] = useState({});
    useEffect(() => {
        dispatch(getHatBrandList());
    }, []);

    useEffect(() => {
        if (!brandList || !brandList.data) return;

        brandList.data.forEach((brand) => {
            dispatch(getHatListDetail({ brandId: brand.id }));
        });

    }, [brandList]);


    const savedSeeesonId = sessionStorage.getItem("id");
    const savedUUid = sessionStorage.getItem("uuid")

    const lock = (uniqueHatId, colorName) => {
        setIsProcessing(prev => ({
            ...prev,
            [uniqueHatId]: {
                ...prev[uniqueHatId],
                [colorName]: true
            }
        }));
    };

    const unlock = (uniqueHatId, colorName) => {
        setIsProcessing(prev => ({
            ...prev,
            [uniqueHatId]: {
                ...prev[uniqueHatId],
                [colorName]: false
            }
        }));
    };


    const increase = async (uniqueHatId, colorName, recordId, varientId, inventoryRecordId) => {
        if (isProcessing?.[uniqueHatId]?.[colorName]) return;
        lock(uniqueHatId, colorName);
        const newQty = (hatQuantities[uniqueHatId]?.[colorName] || 0) + 1;
        setHatQuantities(prev => ({
            ...prev,
            [uniqueHatId]: {
                ...prev[uniqueHatId],
                [colorName]: newQty
            }
        }));

        const cartItemId = cartItemMap?.[uniqueHatId]?.[colorName];

        try {
            if (!cartItemId) {
                const resGroup = await dispatch(addCartGroup({
                    cart_id: savedSeeesonId,
                    hat_id: recordId,
                    decoration_id:selectedOption
                }));

                if (resGroup?.payload?.status_code === 201) {
                    const resItem = await dispatch(addCartItem({
                        group_id: resGroup?.payload?.data?.id,
                        varient_size_id: varientId,
                        quantity: newQty,
                        inventry_id: inventoryRecordId
                    }));

                    const newId = resItem?.payload?.data?.id;

                    if (newId) {
                        setCartItemMap(prev => ({
                            ...prev,
                            [uniqueHatId]: {
                                ...prev[uniqueHatId],
                                [colorName]: newId
                            }
                        }));
                    }
                    await dispatch(cartList({
                        id: savedUUid
                    })); 
                }
            } else {
                await dispatch(updateCartItem({
                    cart_item_id: cartItemId,
                    quantity: newQty
                }));
                await dispatch(cartList({
                    id: savedUUid
                }));
            }
        } catch (err) {
            console.error("increase error:", err);
        } finally {
            unlock(uniqueHatId, colorName);
        }
    };



    const decrease = (uniqueHatId, colorName, recordId, varientId, inventoryRecordId) => {

        const currentQty = hatQuantities?.[uniqueHatId]?.[colorName] || 0;
        const newQty = Math.max(currentQty - 1, 0);

        const cartItemId = cartItemMap?.[uniqueHatId]?.[colorName];
        if (!cartItemId) {
            return;
        }
        if (newQty > 0) {
            dispatch(updateCartItem({
                cart_item_id: cartItemId,
                quantity: newQty
            }))
                .then((res) => {
                    console.log(res, "rsss")
                    if (res?.payload?.status_code === 200) {
                        dispatch(cartList({
                            id: savedUUid
                        }))
                    }
                })
        }
        if (currentQty === 1 && newQty === 0) {
            dispatch(updateCartItem({
                cart_item_id: cartItemId,
                quantity: 0
            }))
                .then((res) => {
                    console.log(res, "rsss")
                    if (res?.payload?.status_code === 200) {
                        dispatch(cartList({
                            id: savedUUid
                        }))
                    }
                })
        }
        setHatQuantities(prev => ({
            ...prev,
            [uniqueHatId]: {
                ...prev[uniqueHatId],
                [colorName]: newQty
            }
        }));
    };


    const handleManualChange = async (uniqueHatId, colorName, newQty, recordId, varientId, inventoryRecordId) => {
        if (newQty < 0) return;
        setHatQuantities(prev => ({
            ...prev,
            [uniqueHatId]: {
                ...prev[uniqueHatId],
                [colorName]: newQty
            }
        }));

        const cartItemId = cartItemMap?.[uniqueHatId]?.[colorName];

        if (!cartItemId && newQty > 0) {

            const resGroup = await dispatch(addCartGroup({
                cart_id: savedSeeesonId,
                hat_id: recordId,
                decoration_id: selectedOption
            }));

            if (resGroup?.payload?.status_code === 201) {
                const resItem = await dispatch(addCartItem({
                    group_id: resGroup?.payload?.data?.id,
                    varient_size_id: varientId,
                    quantity: newQty,
                    inventry_id: inventoryRecordId
                }));

                const newId = resItem?.payload?.data?.id;

                if (newId) {
                    setCartItemMap(prev => ({
                        ...prev,
                        [uniqueHatId]: {
                            ...prev[uniqueHatId],
                            [colorName]: newId
                        }
                    }));
                }

                await dispatch(cartList({ id: savedUUid }));
            }

            return;
        }
        if (cartItemId) {
            await dispatch(updateCartItem({
                cart_item_id: cartItemId,
                quantity: newQty
            }));

            await dispatch(cartList({ id: savedUUid }));
        }
    };




    return (
        <div className='product_details_area'>
            {brandList?.data?.map((brand) => {
                const hats = brandWiseHatList?.[brand.id]?.data?.hats || [];

                return (
                    <div key={brand.id}>

                        <div className='bg-[#efefef] p-4 my-2'>
                            <h2 className='text-[35px] font-bold'>{brand.brandName}</h2>
                        </div>

                        <div className='product_details_area_box'>
                            <Accordion collapseAll>
                                {hats.length === 0 ? (
                                    <p className='text-center text-gray-500 py-5'>
                                        No records
                                    </p>
                                ) : (
                                    hats.map((hat) => {

                                        // ---------- FIX: Single unique hat ID ----------
                                        const uniqueHatId = `${brand.id}_${hat.id}`;

                                        const sizeParts = hat?.sizeChart ? hat.sizeChart.split(",").map(s => s.trim()) : [];
                                        const mainSize = sizeParts[0] || "";
                                        const otherSizes = sizeParts.slice(1).join(", ");


                                        return (
                                            <AccordionPanel key={hat.id}>
                                                <AccordionTitle>
                                                    <div className='flex items-center gap-3'>
                                                        <Image src={preview_01} alt='preview_01' className="w-[80px]" />
                                                        <p className='text-xl text-[#ff7379] font-semibold'>{hat.hatName}</p>
                                                    </div>
                                                </AccordionTitle>

                                                <AccordionContent>

                                                    {/* HAT IMAGE & DESCRIPTION */}
                                                    <div className='flex justify-center items-center'>
                                                        <Image src={preview_01} alt='preview_01' className="w-[400px]" />
                                                    </div>

                                                    <div className='w-8/12 mx-auto my-6'>
                                                        <div className='bg-[#eeeeee] rounded-[10px] p-5 text-center mb-4'>
                                                            <p className='text-base text-black'>{hat.description}</p>
                                                        </div>

                                                        <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>Size Chart</div>
                                                        <div className='bg-[#eeeeee] text-center mb-1 font-medium text-base py-2 text-black'> {mainSize}</div>
                                                        {otherSizes && (
                                                            <div className='text-center mb-4'>
                                                                <p>{otherSizes}</p>
                                                            </div>
                                                        )}

                                                        {/* PRICE TABLE */}
                                                        <div>
                                                            {/* embroidery */}
                                                            <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>
                                                                Total Items Price Break
                                                            </div>

                                                            <div className="mb-1">

                                                                {/* EMBROIDERY */}
                                                                <div className='flex gap-2 mb-1'>
                                                                    <div className={`w-3/12 flex items-center justify-center text-black font-medium text-base 
                                                                        ${selectedOption === "Emboidary" ? "bg-[#ff7379] text-white" : "bg-[#eeeeee]"}`}>
                                                                        EMBROIDERY
                                                                    </div>

                                                                    <div className='w-9/12 grid grid-cols-8 gap-1'>
                                                                        {hat.pricing?.embroidery?.tiers?.map((tier, index) => {

                                                                            const totalQty = Object.values(hatQuantities[uniqueHatId] || {})
                                                                                .reduce((a, b) => a + b, 0);

                                                                            const meetsQty = totalQty >= tier.minQty;

                                                                            return (
                                                                                <div key={index} className="text-center">
                                                                                    <p className={`p-1 text-sm ${meetsQty ? 'bg-[#ff7379] text-white font-bold' : 'bg-[#eeeeee]'}`}>
                                                                                        {tier.minQty}
                                                                                    </p>
                                                                                    <div className={`p-1 text-sm ${selectedOption === "Emboidary" && meetsQty ? 'bg-[#ff7379] text-white font-bold' : 'bg-[#ffffff]'}`}>
                                                                                        ${tier.unitPrice}
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>

                                                                {/* PATCH */}
                                                                <div className='flex gap-2'>
                                                                    <div className={`w-3/12 flex items-center justify-center text-black font-medium text-base 
                                                                        ${selectedOption === "Patch" ? "bg-[#ff7379] text-white" : "bg-[#eeeeee]"}`}>
                                                                        PATCH
                                                                    </div>

                                                                    <div className='w-9/12 grid grid-cols-8 gap-1'>
                                                                        {hat.pricing?.leatherPatch?.tiers?.map((tier, index) => {

                                                                            const totalQty = Object.values(hatQuantities[uniqueHatId] || {})
                                                                                .reduce((a, b) => a + b, 0);

                                                                            const meetsQty = totalQty >= tier.minQty;

                                                                            return (
                                                                                <div key={index} className="text-center">
                                                                                    <p className={`p-1 text-sm ${meetsQty ? 'bg-[#ff7379] text-white font-bold' : 'bg-[#eeeeee]'}`}>
                                                                                        {tier.minQty}
                                                                                    </p>
                                                                                    <div className={`p-1 text-sm ${selectedOption === "Patch" && meetsQty ? 'bg-[#ff7379] text-white font-bold' : 'bg-[#ffffff]'}`}>
                                                                                        ${tier.unitPrice}
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className='bg-[#eeeeee] mb-4 font-medium text-sm py-2 pr-2 text-black text-right'>Price includes item & decoration.</div>
                                                        </div>
                                                    </div>


                                                    {/* COLOR SELECTOR FIXED */}
                                                    <div className='grid grid-cols-4 gap-4'>
                                                        {hat.colors?.map((color, index) => {
                                                            const variant = color.sizeVariants?.[0];
                                                            const inventoryRecordId = variant?.inventory?.recordId;
                                                            return (
                                                                <HatColorSelector
                                                                    key={color.id}
                                                                    colorName={color.colorName}
                                                                    colorImage={color?.imageUrl}
                                                                    sizeVariants={color?.sizeVariants}
                                                                    value={hatQuantities[uniqueHatId]?.[color.colorName] || 0}

                                                                    onIncrease={() =>
                                                                        increase(uniqueHatId, color.colorName, hat.recordId, hat.colors[index]?.sizeVariants?.[0]?.recordId, inventoryRecordId)
                                                                    }

                                                                    onDecrease={() =>
                                                                        decrease(uniqueHatId, color.colorName, hat.recordId, hat.colors[index]?.sizeVariants?.[0]?.recordId, inventoryRecordId)
                                                                    }

                                                                    onChange={(val) =>
                                                                        handleManualChange(
                                                                            uniqueHatId,
                                                                            color.colorName,
                                                                            val,
                                                                            hat.recordId,
                                                                            hat.colors[index]?.sizeVariants?.[0]?.recordId,
                                                                            inventoryRecordId
                                                                        )
                                                                    }

                                                                />
                                                            )
                                                        })}
                                                    </div>

                                                </AccordionContent>
                                            </AccordionPanel>
                                        )
                                    })
                                )}
                            </Accordion>
                        </div>
                    </div>
                )
            })}

            <div className='flex justify-center'>
                <button className='text-xl cursor-pointer bg-[#ff7379] hover:bg-[#ee8d92] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300'>
                    Next Step
                </button>
            </div>
        </div>
    )
}

export default ProductAccordion;
