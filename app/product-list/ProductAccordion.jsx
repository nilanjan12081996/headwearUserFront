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
import { getHatBrandList, getHatListDetail, getSingleHatDetail } from '../reducers/HatBrandSlice';
import HatColorSelector from './HatColorSelector';
import { addCartGroup, addCartItem, cartList, updateCartItem } from '../reducers/CartSlice';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";



let updateQueue = {};               // batch queue for processUpdateQueue
let pendingDesiredQty = {};         // holds latest desired qty while create is in progress

function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}


const ProductAccordion = ({ selectedDecoName, selectedDecoId, selectedOption, hatQuantities: initialHatQuantities, setHatQuantities: setParentHatQuantities }) => {
    const dispatch = useDispatch();
    const { brandList, brandWiseHatList, singleHatDetail, loading } = useSelector((state) => state.hatBrand);
    const { cartListItem } = useSelector((state) => state?.cart);
    console.log('singleHatDetail', singleHatDetail)
    // Page load e restore kore first render e
    const [cartItemMap, setCartItemMap] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("cartItemMap");
            return saved ? JSON.parse(saved) : {};
        }
        return {};
    });
    let base_url = "https://showmecustomheadwearuserapi.bestworks.cloud"

    const [cartItemId, setCartItemId] = useState()
    const [isProcessing, setIsProcessing] = useState({});
    const [createLock, setCreateLock] = useState({});
    const router = useRouter()
    const [cartUUID, setCartUUID] = useState(null);



    useEffect(() => {
        let savedUUID = sessionStorage.getItem("uuid");

        if (!savedUUID) {
            const newUUID = "sess-" + uuidv4();   // <-- prepend sess-
            sessionStorage.setItem("uuid", newUUID);
            console.log("New UUID created:", newUUID);
            savedUUID = newUUID;
        } else {
            console.log("UUID already exists:", savedUUID);
        }

        setCartUUID(savedUUID);  // store in state
    }, []);


    useEffect(() => {
        localStorage.setItem("cartItemMap", JSON.stringify(cartItemMap));
    }, [cartItemMap]);

    // initial state with localStorage
    const [hatQuantities, setHatQuantities] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("hatQuantities");
            return saved ? JSON.parse(saved) : initialHatQuantities || {};
        }
        return initialHatQuantities || {};
    });

    // save every time quantity changes
    useEffect(() => {
        setParentHatQuantities(hatQuantities); // sync to parent if needed
        localStorage.setItem("hatQuantities", JSON.stringify(hatQuantities));
    }, [hatQuantities]);


    let updateQueue = {};
    useEffect(() => {
        dispatch(getHatBrandList());
    }, []);

    useEffect(() => {
        if (!brandList || !brandList.data) return;

        brandList.data.forEach((brand) => {
            dispatch(getHatListDetail({ brandId: brand.id })
            )
        });

    }, [brandList]);

    const handleHatClick = (hatId) => {
        console.log("Hello");

        console.log("hatId", hatId);

        dispatch(getSingleHatDetail({ hatId }))
    };



    const savedUUid = sessionStorage.getItem("uuid")


    const processUpdateQueue = debounce(async (dispatch, savedUUid) => {
        const updates = Object.values(updateQueue);
        if (updates.length === 0) return;

        // perform updates serially (or parallel if you prefer Promise.all)
        for (const item of updates) {
            const { cartItemId, qty } = item;
            if (!cartItemId) continue; // safety: skip any undefined id
            try {
                await dispatch(updateCartItem({
                    id: cartItemId,
                    quantity: qty
                }));
            } catch (err) {
                console.error('updateCartItem failed for', cartItemId, err);
            }
        }

        // clear queue
        updateQueue = {};

        // refresh cart list once after batch
        try {
            await dispatch(cartList({ id: savedUUid }));
        } catch (err) {
            console.error('cartList refresh failed', err);
        }
    }, 400); // debounce delay

    // queueCartUpdate: if no cartItemId and a create is in progress, buffer the qty
    const queueCartUpdate = (uniqueHatId, colorName, cartItemId, newQty) => {
        const key = `${uniqueHatId}-${colorName}`;

        if (!cartItemId) {
            // No cartItemId yet — buffer the desired qty so we can apply it once create finishes
            pendingDesiredQty[key] = newQty;
            return;
        }

        // has cartItemId → place into batch queue
        updateQueue[key] = {
            cartItemId,
            qty: newQty
        };

        processUpdateQueue(dispatch, savedUUid);
    };

    // const increase = async (
    //     uniqueHatId,
    //     colorName,
    //     hatId,
    //     brandId,
    //     variantId,
    //     inventoryRecordId
    // ) => {
    //     const key = `${uniqueHatId}-${colorName}`;

    //     // 1️⃣ Always update UI optimistically
    //     const newQty = (hatQuantities[uniqueHatId]?.[colorName] || 0) + 1;

    //     setHatQuantities(prev => ({
    //         ...prev,
    //         [uniqueHatId]: {
    //             ...prev[uniqueHatId],
    //             [colorName]: newQty
    //         }
    //     }));

    //     // 2️⃣ Get current cartItemId from map
    //     let cartItemId = cartItemMap?.[uniqueHatId]?.[colorName];

    //     // 3️⃣ If CREATE is in progress, queue the desired quantity
    //     if (createLock[key]) {
    //         pendingDesiredQty[key] = newQty;  // Store latest desired qty
    //         return;  // Exit early, but UI already updated
    //     }

    //     // 4️⃣ CREATE FLOW - No cartItemId exists yet
    //     if (!cartItemId) {
    //         // Lock to prevent duplicate creates
    //         setCreateLock(prev => ({
    //             ...prev,
    //             [key]: true
    //         }));

    //         try {
    //             const resItem = await dispatch(addCartItem({
    //                 session_uuid: cartUUID,
    //                 hat_id: hatId,
    //                 brand_id: brandId,
    //                 hat_size_variant_id: variantId,
    //                 decoration_type_id: selectedDecoId,
    //                 quantity: newQty
    //             }));

    //             const newId = resItem?.payload?.data?.cartGroups?.[0]?.cartItems?.[0]?.id;
    //             localStorage.setItem("cartId", newId);

    //             if (!newId) throw new Error("Add item failed");

    //             // Save the new cart item ID
    //             setCartItemMap(prev => {
    //                 const updated = {
    //                     ...prev,
    //                     [uniqueHatId]: {
    //                         ...prev[uniqueHatId],
    //                         [colorName]: newId
    //                     }
    //                 };
    //                 localStorage.setItem("cartItemMap", JSON.stringify(updated));
    //                 return updated;
    //             });

    //             // 5️⃣ Check if user clicked more times during creation
    //             const pendingQty = pendingDesiredQty[key];
    //             if (typeof pendingQty !== "undefined" && pendingQty !== newQty) {
    //                 // User clicked more - update to the pending quantity
    //                 try {
    //                     await dispatch(updateCartItem({
    //                         id: newId,
    //                         quantity: pendingQty
    //                     }));
    //                 } catch (err) {
    //                     console.error("Pending update error:", err);
    //                 }
    //                 delete pendingDesiredQty[key];
    //             }

    //             // Refresh cart
    //             await dispatch(cartList({ id: cartUUID }));

    //         } catch (err) {
    //             console.error("Create error:", err);
    //             // Rollback UI on error
    //             setHatQuantities(prev => ({
    //                 ...prev,
    //                 [uniqueHatId]: {
    //                     ...prev[uniqueHatId],
    //                     [colorName]: (prev[uniqueHatId]?.[colorName] || 1) - 1
    //                 }
    //             }));
    //         } finally {
    //             // Unlock after create completes
    //             setCreateLock(prev => {
    //                 const copy = { ...prev };
    //                 delete copy[key];
    //                 return copy;
    //             });
    //         }

    //         return;
    //     }

    //     // 6️⃣ UPDATE FLOW - cartItemId exists
    //     try {
    //         await dispatch(updateCartItem({
    //             id: cartItemId,
    //             quantity: newQty
    //         }));

    //         await dispatch(cartList({ id: cartUUID }));

    //     } catch (err) {
    //         console.error("Update error:", err);
    //         // Rollback UI on error
    //         setHatQuantities(prev => ({
    //             ...prev,
    //             [uniqueHatId]: {
    //                 ...prev[uniqueHatId],
    //                 [colorName]: (prev[uniqueHatId]?.[colorName] || 1) - 1
    //             }
    //         }));
    //     }
    // };



    // const decrease = async (uniqueHatId, colorName) => {
    //     const currentQty = hatQuantities?.[uniqueHatId]?.[colorName] || 0;
    //     const newQty = Math.max(currentQty - 1, 0);

    //     setHatQuantities(prev => ({
    //         ...prev,
    //         [uniqueHatId]: {
    //             ...prev[uniqueHatId],
    //             [colorName]: newQty
    //         }
    //     }));

    //     const cartItemId = cartItemMap?.[uniqueHatId]?.[colorName];

    //     if (!cartItemId) return;

    //     queueCartUpdate(uniqueHatId, colorName, cartItemId, newQty);
    // };


    const setQty = (uniqueHatId, colorName, sizeId, qty) => {
        setHatQuantities(prev => ({
            ...prev,
            [uniqueHatId]: {
                ...prev[uniqueHatId],
                [colorName]: {
                    ...prev[uniqueHatId]?.[colorName],
                    [sizeId]: qty
                }
            }
        }));
    };

    const increase = async (
        uniqueHatId,
        colorName,
        size,
        hatId,
        brandId
    ) => {
        const sizeId = size.id;
        const key = `${uniqueHatId}-${colorName}-${sizeId}`;
        const currentQty =
            hatQuantities?.[uniqueHatId]?.[colorName]?.[sizeId] || 0;

        const newQty = currentQty + 1;
        setHatQuantities(prev => ({
            ...prev,
            [uniqueHatId]: {
                ...prev[uniqueHatId],
                [colorName]: {
                    ...prev[uniqueHatId]?.[colorName],
                    [sizeId]: newQty
                }
            }
        }));
        const cartItemId = cartItemMap?.[key];
        if (createLock[key]) {
            pendingDesiredQty[key] = newQty;
            return;
        }
        if (!cartItemId) {
            setCreateLock(prev => ({ ...prev, [key]: true }));

            try {
                const res = await dispatch(
                    addCartItem({
                        session_uuid: cartUUID,
                        hat_id: hatId,
                        brand_id: brandId,
                        hat_size_variant_id: sizeId,
                        decoration_type_id: selectedDecoId,
                        quantity: newQty
                    })
                );

                const newCartItemId =
                    res?.payload?.data?.cartGroups?.[0]?.cartItems?.[0]?.id;
                    console.log("newCartItemId",newCartItemId);
                    

                if (!newCartItemId) {
                    throw new Error("Cart item creation failed");
                }
                localStorage.setItem("cartId", newCartItemId);
                setCartItemMap(prev => {
                    const updated = {
                        ...prev,
                        [key]: newCartItemId
                    };
                    localStorage.setItem("cartItemMap", JSON.stringify(updated));
                    return updated;
                });

                const pendingQty = pendingDesiredQty[key];
                if (
                    typeof pendingQty !== "undefined" &&
                    pendingQty !== newQty
                ) {
                    await dispatch(
                        updateCartItem({
                            id: newCartItemId,
                            quantity: pendingQty
                        })
                    );
                    delete pendingDesiredQty[key];
                }

                await dispatch(cartList({ id: cartUUID }));

            } catch (err) {
                console.error("Create error:", err);
                setHatQuantities(prev => ({
                    ...prev,
                    [uniqueHatId]: {
                        ...prev[uniqueHatId],
                        [colorName]: {
                            ...prev[uniqueHatId]?.[colorName],
                            [sizeId]: currentQty
                        }
                    }
                }));
            } finally {
                setCreateLock(prev => {
                    const copy = { ...prev };
                    delete copy[key];
                    return copy;
                });
            }

            return;
        }

        try {
            await dispatch(
                updateCartItem({
                    id: cartItemId,
                    quantity: newQty
                })
            );

            await dispatch(cartList({ id: cartUUID }));

        } catch (err) {
            console.error("Update error:", err);
            setHatQuantities(prev => ({
                ...prev,
                [uniqueHatId]: {
                    ...prev[uniqueHatId],
                    [colorName]: {
                        ...prev[uniqueHatId]?.[colorName],
                        [sizeId]: currentQty
                    }
                }
            }));
        }
    };

    const decrease = async (
        uniqueHatId,
        colorName,
        size
    ) => {
        const sizeId = size.id;
        const key = `${uniqueHatId}-${colorName}-${sizeId}`;

        const currentQty =
            hatQuantities?.[uniqueHatId]?.[colorName]?.[sizeId] || 0;

        if (currentQty === 0) return;

        const newQty = currentQty - 1;
        setHatQuantities(prev => ({
            ...prev,
            [uniqueHatId]: {
                ...prev[uniqueHatId],
                [colorName]: {
                    ...prev[uniqueHatId]?.[colorName],
                    [sizeId]: newQty
                }
            }
        }));

        const cartItemId = cartItemMap?.[key];
        if (!cartItemId) return;

        if (createLock[key]) {
            pendingDesiredQty[key] = newQty;
            return;
        }

        try {
            await dispatch(
                updateCartItem({
                    id: cartItemId,
                    quantity: newQty
                })
            );

            await dispatch(cartList({ id: cartUUID }));

        } catch (err) {
            console.error("Decrease error:", err);
            setHatQuantities(prev => ({
                ...prev,
                [uniqueHatId]: {
                    ...prev[uniqueHatId],
                    [colorName]: {
                        ...prev[uniqueHatId]?.[colorName],
                        [sizeId]: currentQty
                    }
                }
            }));
        }
    };






    const handleManualChange = (uniqueHatId, colorName, newQty, hatId, brandId, variantId, inventoryRecordId) => {
        if (newQty < 0) return;

        // Always update UI
        setHatQuantities(prev => ({
            ...prev,
            [uniqueHatId]: {
                ...prev[uniqueHatId],
                [colorName]: newQty
            }
        }));

        const cartItemId = cartItemMap?.[uniqueHatId]?.[colorName];
        const key = `${uniqueHatId}-${colorName}`;

        // If no cartItemId exists, DON'T call API (it will give 404)
        if (!cartItemId) {
            console.log("No cart item exists yet - skipping API call");
            return;
        }

        // If creation is in progress, queue the change
        if (createLock[key]) {
            pendingDesiredQty[key] = newQty;
            return;
        }

        // Update existing cart item
        queueCartUpdate(uniqueHatId, colorName, cartItemId, newQty);
    };






    const handleNextpage = () => {
        const totalQty = cartListItem?.data?.cart?.total_items;

        if (!totalQty || totalQty === 0) {
            toast.error("You need to select some hats from the expandable regions before continuing to the next step.");
            return;
        }
        router.push("/upload-artwork")
    }

    return (
        <div className='product_details_area'>
            <ToastContainer />
            {brandList?.data?.map((brand) => {
                const hats =
                    brandWiseHatList?.[brand.id]?.data?.map((item) => ({
                        id: item.id,
                        name: item.name,
                        description: item.description
                    })) || [];

                console.log('hats', hats)

                return (
                    <div key={brand.id}>

                        <div className='bg-[#efefef] p-4 my-2'>
                            <Image src={base_url + brand?.image_url} width={100} height={50} />
                            <h2 className='text-[25px] lg:text-[35px] font-bold'>{brand.name}</h2>
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

                                        return (
                                            <AccordionPanel key={hat.id}>
                                                <div onClick={() => handleHatClick(hat.id)}>
                                                    <AccordionTitle>
                                                        <div className='flex items-center gap-3' >
                                                            <Image src={preview_01} alt='preview_01' className="w-[80px]" />
                                                            <p className='text-xl text-[#ff7379] font-semibold'>{hat.name}</p>
                                                        </div>
                                                    </AccordionTitle>
                                                </div>

                                                <AccordionContent>
                                                    {/* {singleHatDetail.loading && (
                                                        <p className="text-center text-lg py-4 text-gray-600">Loading...</p>
                                                    )} */}
                                                    {singleHatDetail?.data && (
                                                        <>
                                                            <div className='flex justify-center items-center'>
                                                                <Image src={preview_01} alt='preview_01' className="w-[400px]" />
                                                            </div>

                                                            <div className='w-[full] md:w-8/12 mx-auto my-6'>
                                                                <div className='bg-[#eeeeee] rounded-[10px] p-5 text-center mb-4'>
                                                                    <p className='text-base text-black'>{singleHatDetail?.data?.data?.description}</p>
                                                                </div>

                                                                <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>Size Chart</div>
                                                                <div className='bg-[#eeeeee] text-center mb-1 font-medium text-base py-2 text-black'> {singleHatDetail?.data?.data?.size_chart_json?.size_cart_json}</div>

                                                                {/* PRICE TABLE */}
                                                                <div>
                                                                    {/* embroidery */}
                                                                    <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>
                                                                        Total Items Price Break
                                                                    </div>

                                                                    <div className="mb-1">

                                                                        {/* EMBROIDERY */}
                                                                        <div className='flex gap-2 mb-1'>
                                                                            <div className={`w-3/12 flex items-center justify-center text-black font-medium text-[12px] md:text-base 
                                                                        ${selectedDecoName === "Embroidery" ? "bg-[#ff7379] text-white" : "bg-[#eeeeee]"}`}>
                                                                                EMBROIDERY
                                                                            </div>

                                                                            <div className='w-9/12 grid grid-cols-8 gap-1'>
                                                                                {singleHatDetail?.data?.embroideryPrices?.map((tier, index) => {

                                                                                    const totalQty = Object.values(hatQuantities?.[uniqueHatId] || {})
                                                                                        .flatMap(colorObj => Object.values(colorObj || {}))
                                                                                        .reduce((sum, qty) => sum + qty, 0);

                                                                                    const meetsQty = totalQty >= tier.min_qty;

                                                                                    return (
                                                                                        <div key={index} className="text-center">
                                                                                            <p className={`p-1 text-[10px] sm:text-sm ${meetsQty ? 'bg-[#ff7379] text-white font-bold' : 'bg-[#eeeeee]'}`}>
                                                                                                {tier.min_qty}
                                                                                            </p>
                                                                                            <div className={`p-1 text-[10px] sm:text-sm ${selectedDecoName === "Embroidery" && meetsQty ? 'bg-[#ff7379] text-white font-bold' : 'bg-[#ffffff]'}`}>
                                                                                                ${Number(tier.unit_price)}
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>

                                                                        {/* PATCH */}
                                                                        <div className='flex gap-2'>
                                                                            <div className={`w-3/12 flex items-center justify-center text-black font-medium text-[12px] md:text-base
                                                                        ${selectedDecoName === "Leather Patch" ? "bg-[#ff7379] text-white" : "bg-[#eeeeee]"}`}>
                                                                                PATCH
                                                                            </div>

                                                                            <div className='w-9/12 grid grid-cols-8 gap-1'>
                                                                                {singleHatDetail?.data?.leatherPatchPrices?.map((tier, index) => {

                                                                                    const totalQty = Object.values(hatQuantities?.[uniqueHatId] || {})
                                                                                        .flatMap(colorObj => Object.values(colorObj || {}))
                                                                                        .reduce((sum, qty) => sum + qty, 0);

                                                                                    const meetsQty = totalQty >= tier.min_qty;

                                                                                    return (
                                                                                        <div key={index} className="text-center">
                                                                                            <p className={`p-1 text-[10px] sm:text-sm ${meetsQty ? 'bg-[#ff7379] text-white font-bold' : 'bg-[#eeeeee]'}`}>
                                                                                                {tier.min_qty}
                                                                                            </p>
                                                                                            <div className={`p-1 text-[10px] sm:text-sm ${selectedDecoName === "Leather Patch" && meetsQty ? 'bg-[#ff7379] text-white font-bold' : 'bg-[#ffffff]'}`}>
                                                                                                ${Number(tier.unit_price)}
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
                                                            <div
                                                                className="grid gap-4"
                                                                style={{
                                                                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
                                                                }}
                                                            >
                                                                {singleHatDetail?.data?.data?.hatColors?.map((color, index) => {

                                                                    const sizeVariants = color?.hatSizes || []
                                                                    return (
                                                                        // <HatColorSelector
                                                                        //     key={color.id}

                                                                        //     colorName={color.name}
                                                                        //     colorImage={color.primary_image_url}
                                                                        //     sizeVariants={sizeVariants}

                                                                        //     value={hatQuantities[uniqueHatId]?.[color.name] || 0}

                                                                        //     onIncrease={() =>
                                                                        //         increase(
                                                                        //             uniqueHatId,
                                                                        //             color.name,
                                                                        //             // hat.id,
                                                                        //             // hat.brand_id,
                                                                        //             // sizeVariants[0]?.id,
                                                                        //             singleHatDetail?.data?.data?.id,        // hat_id (hat style ID)
                                                                        //             singleHatDetail?.data?.data?.brand_id,  // brand_id from the hat data
                                                                        //             sizeVariants?.[0]?.id,
                                                                        //             sizeVariants[0]?.inventory?.recordId
                                                                        //         )
                                                                        //     }

                                                                        //     onDecrease={() =>
                                                                        //         decrease(
                                                                        //             uniqueHatId,
                                                                        //             color.name,
                                                                        //             hat.recordId,
                                                                        //             sizeVariants[0]?.id,
                                                                        //             sizeVariants[0]?.inventory?.recordId
                                                                        //         )
                                                                        //     }

                                                                        //     onChange={(val) =>
                                                                        //         handleManualChange(
                                                                        //             uniqueHatId,
                                                                        //             color.name,
                                                                        //             val,
                                                                        //             hat.recordId,
                                                                        //             sizeVariants[0]?.id,
                                                                        //             sizeVariants[0]?.inventory?.recordId
                                                                        //         )
                                                                        //     }
                                                                        // />
                                                                        <HatColorSelector
                                                                            key={color.id}
                                                                            colorName={color.name}
                                                                            colorImage={color.primary_image_url}
                                                                            sizeVariants={color.hatSizes}

                                                                            quantities={
                                                                                hatQuantities?.[uniqueHatId]?.[color.name] || {}
                                                                            }

                                                                            onIncrease={(size) =>
                                                                                increase(
                                                                                    uniqueHatId,
                                                                                    color.name,
                                                                                    size,
                                                                                    singleHatDetail.data.data.id,
                                                                                    singleHatDetail.data.data.brand_id
                                                                                )
                                                                            }

                                                                            onDecrease={(size) =>
                                                                                decrease(uniqueHatId, color.name, size)
                                                                            }

                                                                            onChange={(size, val) =>
                                                                                setQty(uniqueHatId, color.name, size.id, val)
                                                                            }
                                                                        />

                                                                    );
                                                                })}
                                                            </div>

                                                        </>
                                                    )}
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
            <div className='flex justify-center mt-6'>
                <button onClick={() => handleNextpage()} className='text-xl cursor-pointer bg-[#ff7379] hover:bg-[#ee8d92] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300'>
                    Next Step
                </button>
            </div>
        </div>
    )
}

export default ProductAccordion;