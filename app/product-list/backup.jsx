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
import { addCartGroup, addCartItem, cartList, deleteCartItem, updateCartItem } from '../reducers/CartSlice';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { useRef } from "react";





let pendingDesiredQty = {};

function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}


const ProductAccordion = ({ selectedDecoName, selectedDecoId, selectedOption, hatQuantities: initialHatQuantities, setHatQuantities: setParentHatQuantities }) => {
    const dispatch = useDispatch();
    const loadMoreRef = useRef(null);

    const { brandList, brandWiseHatList, singleHatDetail, loading } = useSelector((state) => state.hatBrand);
    const { cartListItem } = useSelector((state) => state?.cart);
    console.log('singleHatDetail', singleHatDetail)
    // Page load e restore kore first render e
    const [cartItemMap, setCartItemMap] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = sessionStorage.getItem("cartItemMap");
            return saved ? JSON.parse(saved) : {};
        }
        return {};
    });
    const base_url = process.env.NEXT_PUBLIC_API_IMAGE_URL;

    const [cartItemId, setCartItemId] = useState()
    const [isProcessing, setIsProcessing] = useState({});
    const [createLock, setCreateLock] = useState({});
    const router = useRouter()
    const [cartUUID, setCartUUID] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [isFetching, setIsFetching] = useState(false);




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
        sessionStorage.setItem("cartItemMap", JSON.stringify(cartItemMap));
    }, [cartItemMap]);

    // initial state with sessionStorage
    const [hatQuantities, setHatQuantities] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = sessionStorage.getItem("hatQuantities");
            return saved ? JSON.parse(saved) : initialHatQuantities || {};
        }
        return initialHatQuantities || {};
    });

    // save every time quantity changes
    useEffect(() => {
        setParentHatQuantities(hatQuantities); // sync to parent if needed
        sessionStorage.setItem("hatQuantities", JSON.stringify(hatQuantities));
    }, [hatQuantities]);

    useEffect(() => {
        const handleStorageChange = () => {
            const savedQuantities = sessionStorage.getItem("hatQuantities");
            if (savedQuantities) {
                const parsed = JSON.parse(savedQuantities);
                setHatQuantities(parsed);
                if (setParentHatQuantities) {
                    setParentHatQuantities(parsed);
                }
            }
        };

        // Listen for custom event
        window.addEventListener("hatQuantitiesChanged", handleStorageChange);

        return () => {
            window.removeEventListener("hatQuantitiesChanged", handleStorageChange);
        };
    }, [setParentHatQuantities]);


    let updateQueue = {};
    useEffect(() => {
        dispatch(getHatBrandList());
    }, []);


    useEffect(() => {
        if (!brandList?.data?.length) return;

        brandList.data.forEach((brand) => {
            dispatch(
                getHatListDetail({
                    brandId: brand.id,
                    page: 1,
                    limit: 5,
                })
            );
        });
    }, [brandList, dispatch]);

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             if (!entries[0].isIntersecting || loading) return;

    //             setShowLoader(true);

    //             setTimeout(() => {
    //                 brandList?.data?.forEach((brand) => {
    //                     const brandData = brandWiseHatList?.[brand.id];

    //                     if (brandData?.hasMore) {
    //                         dispatch(
    //                             getHatListDetail({
    //                                 brandId: brand.id,
    //                                 page: brandData.page + 1,
    //                                 limit: 5
    //                             })
    //                         );
    //                     }
    //                 });

    //                 setShowLoader(false);
    //             }, 2000);
    //         },
    //         {
    //             threshold: 0.2,
    //             rootMargin: "150px"
    //         }
    //     );

    //     if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    //     return () => observer.disconnect();
    // }, [brandWiseHatList, brandList, loading]);

    const hasAnyMoreData = () => {
        return brandList?.data?.some((brand) => {
            return brandWiseHatList?.[brand.id]?.hasMore;
        });
    };

   useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            if (!entries[0].isIntersecting || loading || isFetching) return;

            if (!hasAnyMoreData()) return;

            setIsFetching(true);
            setShowLoader(true);

            const brandRequests = brandList?.data?.map((brand) => {
                const brandData = brandWiseHatList?.[brand.id];
                if (brandData?.hasMore) {
                    return dispatch(getHatListDetail({
                        brandId: brand.id,
                        page: (brandData.page || 1) + 1,
                        limit: 5
                    }));
                }
                return Promise.resolve();
            });
            Promise.all(brandRequests).finally(() => {
                setIsFetching(false);
                setShowLoader(false);
            });
        },
        { threshold: 0.1, rootMargin: "100px" }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
}, [brandWiseHatList, brandList, loading, isFetching]);



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

        // 🔹 Optimistic UI
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

        let cartItemId = cartItemMap?.[key];

        // 🔥 STALE ID PROTECTION
        if (cartItemId && currentQty === 0) {
            cartItemId = undefined;
            setCartItemMap(prev => {
                const updated = { ...prev };
                delete updated[key];
                sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
                return updated;
            });
        }

        // 🔒 Create in progress
        if (createLock[key]) {
            pendingDesiredQty[key] = newQty;
            return;
        }

        // 🆕 CREATE
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

                const cartGroups = res?.payload?.data?.cartGroups || [];

                const createdItem = cartGroups
                    .flatMap(g => g.cartItems)
                    .find(
                        i =>
                            String(i.hat_size_variant_id) === String(sizeId) &&
                            i.is_active === 1 &&
                            i.quantity > 0
                    );

                if (!createdItem?.id) throw new Error("Create failed");

                setCartItemMap(prev => {
                    const updated = { ...prev, [key]: createdItem.id };
                    sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
                    return updated;
                });
                const cartId = res?.payload?.data?.id;
                if (cartId) {

                    sessionStorage.setItem("cart_id", cartId); // optional if you also want sessionStorage
                }

                // 🔁 Apply pending qty if exists
                if (
                    pendingDesiredQty[key] !== undefined &&
                    pendingDesiredQty[key] !== newQty
                ) {
                    await dispatch(
                        updateCartItem({
                            id: createdItem.id,
                            quantity: pendingDesiredQty[key]
                        })
                    );
                    delete pendingDesiredQty[key];
                }

                await dispatch(cartList({ id: cartUUID }));
            } catch (err) {
                console.error("Increase create error", err);

                // rollback UI
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

        // 🔁 UPDATE
        try {
            await dispatch(
                updateCartItem({
                    id: cartItemId,
                    quantity: newQty
                })
            );
            await dispatch(cartList({ id: cartUUID }));
        } catch (err) {
            console.error("Increase update error", err);
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

        // 🔹 Optimistic UI
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
            // ❌ REMOVE ITEM
            if (newQty === 0) {
                await dispatch(deleteCartItem(cartItemId));

                // 🔥 FULL CLEANUP
                setCartItemMap(prev => {
                    const updated = { ...prev };
                    delete updated[key];
                    sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
                    return updated;
                });

                delete pendingDesiredQty[key];

                setCreateLock(prev => {
                    const copy = { ...prev };
                    delete copy[key];
                    return copy;
                });

                await dispatch(cartList({ id: cartUUID }));
                return;
            }

            // 🔁 UPDATE
            await dispatch(
                updateCartItem({
                    id: cartItemId,
                    quantity: newQty
                })
            );

            await dispatch(cartList({ id: cartUUID }));
        } catch (err) {
            console.error("Decrease error", err);
        }
    };


    const handleManualChange = async (
        uniqueHatId,
        colorName,
        size,
        newQty,
        hatId,
        brandId
    ) => {
        const sizeId = size.id;
        console.log('size', size)
        const maxQty = size?.inventoryItems?.qty_available || 0;
        if (newQty < 0) return;
        if (newQty > maxQty) {
            alert(`Only ${maxQty} items available`);
            //  setErrorMsg(`Only ${maxQty} items available`)
            newQty = maxQty;
        }


        const key = `${uniqueHatId}-${colorName}-${sizeId}`;

        const currentQty =
            hatQuantities?.[uniqueHatId]?.[colorName]?.[sizeId] || 0;

        // 🔹 Optimistic UI
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

        let cartItemId = cartItemMap?.[key];

        // 🔥 STALE ID PROTECTION (same as increase)
        if (cartItemId && currentQty === 0) {
            cartItemId = undefined;
            setCartItemMap(prev => {
                const updated = { ...prev };
                delete updated[key];
                sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
                return updated;
            });
        }

        // 🔒 Create in progress
        if (createLock[key]) {
            pendingDesiredQty[key] = newQty;
            return;
        }

        // 🆕 CREATE (same as increase)
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

                const cartId = res?.payload?.data?.id;
                if (cartId) {
                    sessionStorage.setItem("cart_id", cartId);
                }

                const cartGroups = res?.payload?.data?.cartGroups || [];

                const createdItem = cartGroups
                    .flatMap(g => g.cartItems)
                    .find(
                        i =>
                            String(i.hat_size_variant_id) === String(sizeId) &&
                            i.is_active === 1 &&
                            i.quantity > 0
                    );

                if (!createdItem?.id) throw new Error("Create failed");

                // ✅ SAVE NEW ID
                setCartItemMap(prev => {
                    const updated = { ...prev, [key]: createdItem.id };
                    sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
                    return updated;
                });

                // 🔁 Apply pending qty if exists
                if (
                    pendingDesiredQty[key] !== undefined &&
                    pendingDesiredQty[key] !== newQty
                ) {
                    await dispatch(
                        updateCartItem({
                            id: createdItem.id,
                            quantity: pendingDesiredQty[key]
                        })
                    );
                    delete pendingDesiredQty[key];
                }

                await dispatch(cartList({ id: cartUUID }));
            } catch (err) {
                console.error("Manual create error", err);

                // rollback UI
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

        // 🔁 UPDATE (safe)
        try {
            await dispatch(
                updateCartItem({
                    id: cartItemId,
                    quantity: newQty
                })
            );
            await dispatch(cartList({ id: cartUUID }));
        } catch (err) {
            console.error("Manual update error", err);

            // rollback UI
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


    const handleNextpage = () => {
        const totalQty = cartListItem?.data?.cart?.total_items || 0;

        if (totalQty < 24) {
            toast.error(
                "A minimum of 24 hats is required to proceed. Please add more hats to continue."
            );
            return;
        }

        router.push("/upload-artwork");
    };


    return (
        <div className='product_details_area'>
            <ToastContainer />
            {/* <div className="w-full max-w-md mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2focus:ring-pink-400"
                    />

                    <button
                        type="button"
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#ff7379] p-2.5 rounded-full text-white hover:bg-[#ff5a61] transition cursor-pointer"
                        onClick={() => alert("Search clicked")}
                    >
                        <FaSearch size={16} />
                    </button>
                </div>
            </div> */}
            {brandList?.data?.map((brand) => {
                const hats =
                    brandWiseHatList?.[brand.id]?.list?.map((item) => ({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        hatImages: item.hatImages
                    })) || [];

                const pagination = brandWiseHatList?.[brand.id]?.pagination;

                return (
                    <div key={brand.id}>

                        <div className='bg-[#efefef] p-4 my-2'>
                            <Image src={base_url + brand?.image_url} width={200} height={50} />
                            {/* <h2 className='text-[25px] lg:text-[35px] font-bold'>{brand.name}</h2> */}
                        </div>

                        <div className='product_details_area_box'>
                            <Accordion collapseAll key={brand.id}>
                                {hats.length === 0 ? (
                                    <p className='text-center text-gray-500 py-5'>
                                        No records
                                    </p>
                                ) : (
                                    hats.map((hat) => {
                                        console.log("myHats", hat)
                                        // ---------- FIX: Single unique hat ID ----------
                                        const uniqueHatId = `${brand.id}_${hat.id}`;
                                        const imageSrc = hat?.hatImages?.[0]?.image_url
                                            ? base_url + '/' + hat.hatImages[0].image_url
                                            : preview_01;
                                        return (
                                            <AccordionPanel key={hat.id}>
                                                <div onClick={() => handleHatClick(hat.id)}>
                                                    <AccordionTitle>
                                                        <div className='flex items-center gap-3' >

                                                            {/* <Image src={preview_01} alt='preview_01' className="w-[80px]" /> */}
                                                            <Image
                                                                src={imageSrc}
                                                                alt={hat?.hatImages?.[0]?.alt_text || hat.name}
                                                                width={60}
                                                                height={60}
                                                                className="w-[60px] h-[60px] object-contain rounded"
                                                            />
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
                                                            <div className="flex justify-center items-center">
                                                                {/* {singleHatDetail?.data?.data?.hatImages?.map((img) => (
                                                                    <Image
                                                                        key={img.id}
                                                                        src={base_url +'/'+ img.image_url}
                                                                        alt="Hat Image"
                                                                        width={300}
                                                                        height={300}
                                                                        className="rounded-lg object-contain"
                                                                    />
                                                                ))} */}
                                                                <div className="flex justify-center items-center">
                                                                    {singleHatDetail?.data?.data?.hatImages?.[0] && (
                                                                        <Image
                                                                            src={`${base_url}/${singleHatDetail.data.data.hatImages[0].image_url}`}
                                                                            alt="Hat Image"
                                                                            width={300}
                                                                            height={300}
                                                                            className="rounded-lg object-contain"
                                                                        />
                                                                    )}
                                                                </div>

                                                            </div>
                                                            <div className='w-[full] md:w-8/12 mx-auto my-6'>
                                                                {/* <div className='bg-[#eeeeee] rounded-[10px] p-5 text-center mb-4'>
                                                                    <p className='text-base text-black'>{singleHatDetail?.data?.data?.description}</p>
                                                                </div> */}
                                                                <div className="bg-[#eeeeee] rounded-[10px] p-5 mb-4 text-left">
                                                                    <ul className="list-disc list-inside space-y-2 text-base text-black">
                                                                        {singleHatDetail?.data?.data?.description
                                                                            ?.split("\n")
                                                                            ?.map((item, index) => (
                                                                                <li key={index}>{item.trim()}</li>
                                                                            ))}
                                                                    </ul>
                                                                </div>

                                                                {singleHatDetail?.data?.data?.size_chart_json?.size_chart?.length > 0 && (
                                                                    <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
                                                                        {/* Data thakle heading show korbe */}
                                                                        <div className="bg-[#ff7379] text-center font-bold text-base py-2 text-white">
                                                                            Size Chart
                                                                        </div>

                                                                        <div>
                                                                            {/* Sizes Row */}
                                                                            <div
                                                                                className="grid text-center font-semibold border-b border-gray-300 bg-[#eeeeee]"
                                                                                style={{
                                                                                    gridTemplateColumns: `repeat(${singleHatDetail.data.data.size_chart_json.size_chart.length}, 1fr)`
                                                                                }}
                                                                            >
                                                                                {singleHatDetail.data.data.size_chart_json.size_chart.map((item, index) => (
                                                                                    <div key={index} className="py-2 border-r last:border-r-0 border-gray-300">
                                                                                        {item.size}
                                                                                    </div>
                                                                                ))}
                                                                            </div>

                                                                            {/* Values Row */}
                                                                            <div
                                                                                className="grid text-center text-sm"
                                                                                style={{
                                                                                    gridTemplateColumns: `repeat(${singleHatDetail.data.data.size_chart_json.size_chart.length}, 1fr)`
                                                                                }}
                                                                            >
                                                                                {singleHatDetail.data.data.size_chart_json.size_chart.map((item, index) => (
                                                                                    <div key={index} className="py-2 border-r last:border-r-0 border-gray-200">
                                                                                        {item.value}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* PRICE TABLE */}
                                                                <div>
                                                                    {/* Header */}
                                                                    <div className="bg-[#ff7379] text-center mb-2 font-bold text-base py-2 text-white">
                                                                        Total Items Price Break
                                                                    </div>

                                                                    <div className="mb-2">

                                                                        {/* EMBROIDERY */}
                                                                        <div className="flex gap-2 mb-2">

                                                                            {/* Left Label */}
                                                                            <div
                                                                                className={`w-4/12 sm:w-3/12 flex items-center justify-center text-center font-medium text-[11px] sm:text-sm px-2
        ${selectedDecoName === "Embroidery"
                                                                                        ? "bg-[#ff7379] text-white"
                                                                                        : "bg-[#eeeeee] text-black"
                                                                                    }`}
                                                                            >
                                                                                STANDARD <br /> EMBROIDERY
                                                                            </div>

                                                                            {/* Pricing Tiers */}
                                                                            <div className="w-8/12 sm:w-9/12 overflow-x-auto">
                                                                                <div className="flex gap-1 min-w-max">

                                                                                    {singleHatDetail?.data?.embroideryPrices
                                                                                        ?.filter(tier => tier.min_qty >= 24)
                                                                                        .map((tier, index) => {

                                                                                            const totalQty = Object.values(hatQuantities?.[uniqueHatId] || {})
                                                                                                .flatMap(colorObj => Object.values(colorObj || {}))
                                                                                                .reduce((sum, qty) => sum + qty, 0);

                                                                                            const meetsQty = totalQty >= tier.min_qty;

                                                                                            return (
                                                                                                <div key={index} className="text-center w-[65px] sm:w-[75px] flex-shrink-0">

                                                                                                    {/* Quantity */}
                                                                                                    <div
                                                                                                        className={`py-1 text-[10px] sm:text-sm font-medium
                    ${meetsQty
                                                                                                                ? "bg-[#ff7379] text-white"
                                                                                                                : "bg-[#eeeeee] text-black"
                                                                                                            }`}
                                                                                                    >
                                                                                                        {tier.min_qty}
                                                                                                    </div>

                                                                                                    {/* Price */}
                                                                                                    <div
                                                                                                        className={`py-1 text-[10px] sm:text-sm font-bold border border-gray-200 mt-[2px]
                    ${selectedDecoName === "Embroidery" && meetsQty
                                                                                                                ? "bg-[#ff7379] text-white border-[#ff7379]"
                                                                                                                : "bg-white text-black border-gray-200"
                                                                                                            }`}
                                                                                                    >
                                                                                                        ${Number(tier.unit_price)}
                                                                                                    </div>

                                                                                                </div>
                                                                                            );
                                                                                        })}

                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    {/* Footer Note */}
                                                                    <div className="bg-[#eeeeee] mb-4 font-medium text-sm py-2 px-2 text-black text-right">
                                                                        Price includes item & decoration.
                                                                    </div>
                                                                </div>

                                                                {/* PRICE TABLE */}
                                                                {/* <div>
                                                                    <div className="bg-[#ff7379] text-center mb-2 font-bold text-base py-2 text-white">
                                                                        Total Items Price Break
                                                                    </div>

                                                                    <div className="mb-2">
                                                                        <div className="flex gap-2 mb-2">
                                                                            <div
                                                                                className={`w-4/12 sm:w-3/12 flex items-center justify-center text-center font-medium text-[11px] sm:text-sm px-2
                                                                                    ${selectedDecoName === "Embroidery"
                                                                                        ? "bg-[#ff7379] text-white"
                                                                                        : "bg-[#eeeeee] text-black"
                                                                                    }`}
                                                                            >
                                                                                STANDARD <br /> EMBROIDERY
                                                                            </div>
                                                                            <div className="w-8/12 sm:w-9/12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1">
                                                                                {singleHatDetail?.data?.embroideryPrices
                                                                                    ?.filter(tier => tier.min_qty >= 24)
                                                                                    .map((tier, index) => {

                                                                                        const totalQty = Object.values(hatQuantities?.[uniqueHatId] || {})
                                                                                            .flatMap(colorObj => Object.values(colorObj || {}))
                                                                                            .reduce((sum, qty) => sum + qty, 0);

                                                                                        const meetsQty = totalQty >= tier.min_qty;

                                                                                        return (
                                                                                            <div key={index} className="text-center">

                                                                                                <div
                                                                                                    className={`py-1 text-[10px] sm:text-sm font-medium
                                                                                                        ${meetsQty
                                                                                                            ? "bg-[#ff7379] text-white"
                                                                                                            : "bg-[#eeeeee] text-black"
                                                                                                        }`}
                                                                                                >
                                                                                                    {tier.min_qty}
                                                                                                </div>

                                                                                                <div
                                                                                                    className={`py-1 text-[10px] sm:text-sm font-bold border mt-[2px] 
                                                                                                        ${selectedDecoName === "Embroidery" && meetsQty
                                                                                                            ? "bg-[#ff7379] text-white border-[#ff7379]"
                                                                                                            : "bg-white text-black border-gray-200"
                                                                                                        }`}
                                                                                                >
                                                                                                    ${Number(tier.unit_price)}
                                                                                                </div>

                                                                                            </div>
                                                                                        );
                                                                                    })}

                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                    <div className="bg-[#eeeeee] mb-4 font-medium text-sm py-2 px-2 text-black text-right">
                                                                        Price includes item & decoration.
                                                                    </div>
                                                                </div> */}
                                                                
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">


                                                                {singleHatDetail?.data?.data?.hatColors?.map((color, index) => {

                                                                    const sizeVariants = color?.hatSizes || []
                                                                    const colorImage =
                                                                        color?.colorImages?.length > 0
                                                                            ? color.colorImages[0].image_url
                                                                            : null;
                                                                    return (
                                                                        <HatColorSelector
                                                                            key={color.id}
                                                                            colorName={color.name}
                                                                            // colorImage={color.primary_image_url}
                                                                            colorImage={colorImage}
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

                                                                            onChange={(size, val) => {
                                                                                setQty(uniqueHatId, color.name, size.id, val);

                                                                                handleManualChange(
                                                                                    uniqueHatId,
                                                                                    color.name,
                                                                                    size,
                                                                                    val,
                                                                                    singleHatDetail.data.data.id,
                                                                                    singleHatDetail.data.data.brand_id
                                                                                );
                                                                            }}
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
                            <div
                                ref={loadMoreRef}
                                className="h-14 flex items-center justify-center"
                            >
                                {showLoader && (
                                    <div className="flex items-center gap-3 py-4">
                                        <span className="w-5 h-5 border-2 border-[#ff7379] border-t-transparent rounded-full animate-spin"></span>
                                        <span className="text-[#ff7379] text-sm font-medium tracking-wide">
                                            Loading more hats...
                                        </span>
                                    </div>
                                )}
                                {!hasAnyMoreData() && (
                                    <p className="text-center text-gray-400 text-sm py-6 mt-2">
                                        No more hats available
                                    </p>
                                )}


                            </div>

                        </div>
                    </div>
                )
            })}
            {/* <div className='mb-3 lg:mb-0 fixed top-[85px] md:top-[95px] left-1/2 z-49 ml-[30px] md:ml-0 '>
                <button onClick={() => handleNextpage()} className='text-md cursor-pointer bg-[#ff7379] hover:bg-[#ee8d92] text-white font-semibold py-2 px-3 rounded-b-md shadow-md transition duration-300 min-h-[47px]'>
                    Next Step
                </button>
            </div> */}
            <div className='fixed top-[58px] md:top-[70px] left-1/2 -translate-x-1/2 z-50 w-max'>
                <button
                    onClick={() => handleNextpage()}
                    className='group flex items-center gap-2 text-lg md:text-xl bg-[#ed1c24] hover:bg-[#ee5e62] text-white font-bold py-2 px-4 md:px-8 rounded-b-lg cursor-pointer shadow-[0_4px_15px_rgba(255,115,121,0.4)] transition-all duration-300 active:scale-95'
                >
                    <span>Next Step</span>

                    {/* Right Arrow Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ProductAccordion;