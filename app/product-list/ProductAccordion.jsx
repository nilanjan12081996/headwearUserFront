'use client';
import React, { useEffect, useState, useRef, useCallback, memo, useMemo } from 'react';
import preview_01 from "../assets/imagesource/preview_01.jpg";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getHatBrandList, getHatListDetail, getSingleHatDetail } from '../reducers/HatBrandSlice';
import HatColorSelector from './HatColorSelector';
import { addCartItem, cartList, deleteCartItem, updateCartItem } from '../reducers/CartSlice';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";

// ─── Animation Styles ─────────────────────────────────────────────────────────
const ANIM_STYLE = `
@keyframes expandDown {
  from { opacity: 0; transform: scaleY(0.95); }
  to   { opacity: 1; transform: scaleY(1); }
}
.hat-detail-panel {
  animation: expandDown 0.3s ease-out forwards;
  transform-origin: top;
}
`;

let pendingDesiredQty = {};

function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

function useColCount() {
    const [cols, setCols] = useState(2);
    useEffect(() => {
        function update() {
            const w = window.innerWidth;
            if (w >= 1024) setCols(4);
            else if (w >= 768) setCols(3);
            else setCols(2);
        }
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return cols;
}

// ─── Image Gallery: main image on top + thumbnail strip below ────────────────
const HatImageGallery = ({ hatData, base_url }) => {
    // Build all slides: first hat's main image, then each color image
    const slides = useMemo(() => {
        const mainSlide = hatData?.hatImages?.[0]
            ? { src: `${base_url}/${hatData.hatImages[0].image_url}`, label: hatData.name || '' }
            : null;

        const colorSlides = (hatData?.hatColors || [])
            .filter(c => c?.colorImages?.length > 0)
            .map(c => ({
                src: `${base_url}/${c.colorImages[0].image_url}`,
                label: c.name,
            }));

        return [mainSlide, ...colorSlides].filter(Boolean);
    }, [hatData, base_url]);

    const VISIBLE = 4; // thumbnails visible at once
    const [selectedIdx, setSelectedIdx] = useState(0);  // which image is shown in main
    const [thumbStart, setThumbStart] = useState(0);     // which thumbnail index starts the visible window

    const canPrev = thumbStart > 0;
    const canNext = thumbStart + VISIBLE < slides.length;

    const handleThumbPrev = () => {
        if (canPrev) setThumbStart(s => s - 1);
    };
    const handleThumbNext = () => {
        if (canNext) setThumbStart(s => s + 1);
    };

    const visibleThumbs = slides.slice(thumbStart, thumbStart + VISIBLE);
    const current = slides[selectedIdx];

    return (
        <div className="flex flex-col items-center bg-gray-50 p-5 md:w-5/12 border-r border-gray-100">

            {/* ── Main Image ── */}
            <div className="w-full flex items-center justify-center min-h-[220px] mb-3">
                {current && (
                    <Image
                        key={current.src}
                        src={current.src}
                        alt={current.label || 'Hat'}
                        width={300}
                        height={300}
                        className="object-contain max-h-[220px] w-auto transition-opacity duration-200"
                    />
                )}
            </div>

            {/* ── Label under main image ── */}
            <p className="text-center text-sm font-bold text-[#ff7379] mb-3 min-h-[20px]">
                {current?.label || ''}
            </p>

            {/* ── Thumbnail strip with prev/next arrows ── */}
            {slides.length > 1 && (
                <div className="flex items-center gap-2 w-full justify-center">
                    {/* Prev Arrow */}
                    <button
                        onClick={handleThumbPrev}
                        disabled={!canPrev}
                        className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-[#ff7379] text-[#ff7379]
                                   hover:bg-[#ff7379] hover:text-white transition-all flex items-center justify-center
                                   disabled:opacity-25 disabled:cursor-not-allowed"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Visible Thumbnails */}
                    <div className="flex gap-2">
                        {visibleThumbs.map((slide, i) => {
                            const realIdx = thumbStart + i;
                            const isSelected = realIdx === selectedIdx;
                            return (
                                <button
                                    key={realIdx}
                                    onClick={() => setSelectedIdx(realIdx)}
                                    className={`w-14 h-14 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all bg-white
                                        ${isSelected
                                            ? 'border-[#ff7379] shadow-md ring-2 ring-pink-100'
                                            : 'border-gray-200 hover:border-[#ff7379] opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <Image
                                        src={slide.src}
                                        alt={slide.label || ''}
                                        width={56}
                                        height={56}
                                        className="object-contain w-full h-full"
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Next Arrow */}
                    <button
                        onClick={handleThumbNext}
                        disabled={!canNext}
                        className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-[#ff7379] text-[#ff7379]
                                   hover:bg-[#ff7379] hover:text-white transition-all flex items-center justify-center
                                   disabled:opacity-25 disabled:cursor-not-allowed"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

// ─── DetailPanel ──────────────────────────────────────────────────────────────
const DetailPanel = memo(({
    uniqueHatId, singleHatDetail, base_url, hatQuantities,
    selectedDecoName, onIncrease, onDecrease, onManualChange
}) => {
    if (!singleHatDetail?.data) {
        return (
            <div className="col-span-full py-12 flex justify-center border-2 border-[#ff7379] rounded-2xl mb-4">
                <span className="w-8 h-8 border-4 border-[#ff7379] border-t-transparent rounded-full animate-spin"></span>
            </div>
        );
    }

    const hatData = singleHatDetail.data.data;

    return (
        <div
            id={`panel-${uniqueHatId}`}
            className="hat-detail-panel col-span-full border-2 border-[#ff7379] rounded-2xl bg-white overflow-hidden mb-6 shadow-xl"
        >
            {/* Top Section: Gallery + Description + Size Chart */}
            <div className="flex flex-col md:flex-row border-b border-gray-100">

                {/* Image Gallery */}
                <HatImageGallery hatData={hatData} base_url={base_url} />

                <div className="p-6 md:w-7/12 flex flex-col justify-center">
                    {/* Description */}
                    <div className="bg-[#eeeeee] rounded-xl p-4 mb-4 text-left">
                        <ul className="list-disc list-inside space-y-2 text-base text-black">
                            {hatData?.description
                                ?.split("\n")
                                ?.map((item, index) => (
                                    <li key={index}>{item.trim()}</li>
                                ))}
                        </ul>
                    </div>

                    {/* Size Chart */}
                    {hatData?.size_chart_json?.size_chart?.length > 0 && (
                        <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
                            <div className="bg-[#ff7379] text-center font-bold text-base py-2 text-white">
                                Size Chart
                            </div>
                            <div
                                className="grid text-center font-semibold border-b border-gray-300 bg-[#eeeeee]"
                                style={{ gridTemplateColumns: `repeat(${hatData.size_chart_json.size_chart.length}, 1fr)` }}
                            >
                                {hatData.size_chart_json.size_chart.map((item, index) => (
                                    <div key={index} className="py-2 border-r last:border-r-0 border-gray-300">
                                        {item.size}
                                    </div>
                                ))}
                            </div>
                            <div
                                className="grid text-center text-sm"
                                style={{ gridTemplateColumns: `repeat(${hatData.size_chart_json.size_chart.length}, 1fr)` }}
                            >
                                {hatData.size_chart_json.size_chart.map((item, index) => (
                                    <div key={index} className="py-2 border-r last:border-r-0 border-gray-200">
                                        {item.value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Price Table */}
            <div className="px-6 py-4">
                <div className="bg-[#ff7379] text-center mb-2 font-bold text-base py-2 text-white">
                    Total Items Price Break
                </div>
                <div className="mb-2">
                    <div className="flex gap-2 mb-2">
                        <div
                            className={`w-4/12 sm:w-3/12 flex items-center justify-center text-center font-medium text-[11px] sm:text-sm px-2
                                ${selectedDecoName === "Embroidery" ? "bg-[#ff7379] text-white" : "bg-[#eeeeee] text-black"}`}
                        >
                            STANDARD <br /> EMBROIDERY
                        </div>
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
                                                <div className={`py-1 text-[10px] sm:text-sm font-medium ${meetsQty ? "bg-[#ff7379] text-white" : "bg-[#eeeeee] text-black"}`}>
                                                    {tier.min_qty}
                                                </div>
                                                <div className={`py-1 text-[10px] sm:text-sm font-bold border border-gray-200 mt-[2px]
                                                    ${selectedDecoName === "Embroidery" && meetsQty
                                                        ? "bg-[#ff7379] text-white border-[#ff7379]"
                                                        : "bg-white text-black border-gray-200"}`}>
                                                    ${Number(tier.unit_price).toFixed(2)}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#eeeeee] mb-4 font-medium text-sm py-2 px-2 text-black text-right">
                    Price includes item & decoration.
                </div>
            </div>

            {/* Color Selectors */}
            <div className=''>
                <div className="flex flex-wrap -m-2 mb-2 gap-2 justify-center">
                    {hatData?.hatColors?.map((color) => {
                        const colorImage = color?.colorImages?.length > 0 ? color.colorImages[0].image_url : null;
                        return (
                            <HatColorSelector
                                key={color.id}
                                colorName={color.name}
                                colorImage={colorImage}
                                sizeVariants={color.hatSizes}
                                quantities={hatQuantities?.[uniqueHatId]?.[color.name] || {}}
                                onIncrease={(size) => onIncrease(uniqueHatId, color.name, size, hatData.id, hatData.brand_id)}
                                onDecrease={(size) => onDecrease(uniqueHatId, color.name, size)}
                                onChange={(size, val) => onManualChange(uniqueHatId, color.name, size, val, hatData.id, hatData.brand_id)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

DetailPanel.displayName = 'DetailPanel';

// ─── Main Component ───────────────────────────────────────────────────────────
const ProductAccordion = ({ selectedDecoName, selectedDecoId, hatQuantities: initialHatQuantities, setHatQuantities: setParentHatQuantities }) => {
    const dispatch = useDispatch();
    const colCount = useColCount();
    const router = useRouter();
    const loadMoreRef = useRef(null);

    const { brandList, brandWiseHatList, singleHatDetail, loading } = useSelector((state) => state.hatBrand);
    const { cartListItem } = useSelector((state) => state?.cart);
    const base_url = process.env.NEXT_PUBLIC_API_IMAGE_URL;

    const [cartItemMap, setCartItemMap] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = sessionStorage.getItem("cartItemMap");
            return saved ? JSON.parse(saved) : {};
        }
        return {};
    });

    const [hatQuantities, setHatQuantities] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = sessionStorage.getItem("hatQuantities");
            return saved ? JSON.parse(saved) : initialHatQuantities || {};
        }
        return initialHatQuantities || {};
    });

    const [expandedHat, setExpandedHat] = useState(null);
    const [cartUUID, setCartUUID] = useState(null);
    const [createLock, setCreateLock] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    let updateQueue = {};

    useEffect(() => {
        if (!document.getElementById('hat-grid-styles')) {
            const style = document.createElement('style');
            style.id = 'hat-grid-styles';
            style.textContent = ANIM_STYLE;
            document.head.appendChild(style);
        }
        let savedUUID = sessionStorage.getItem("uuid");
        if (!savedUUID) {
            const newUUID = "sess-" + uuidv4();
            sessionStorage.setItem("uuid", newUUID);
            savedUUID = newUUID;
        }
        setCartUUID(savedUUID);
    }, []);

    useEffect(() => {
        setParentHatQuantities(hatQuantities);
        sessionStorage.setItem("hatQuantities", JSON.stringify(hatQuantities));
    }, [hatQuantities]);

    useEffect(() => {
        sessionStorage.setItem("cartItemMap", JSON.stringify(cartItemMap));
    }, [cartItemMap]);

    useEffect(() => {
        const handleStorageChange = () => {
            const savedQuantities = sessionStorage.getItem("hatQuantities");
            if (savedQuantities) {
                const parsed = JSON.parse(savedQuantities);
                setHatQuantities(parsed);
                if (setParentHatQuantities) setParentHatQuantities(parsed);
            }
        };
        window.addEventListener("hatQuantitiesChanged", handleStorageChange);
        return () => window.removeEventListener("hatQuantitiesChanged", handleStorageChange);
    }, [setParentHatQuantities]);

    useEffect(() => { dispatch(getHatBrandList()); }, []);

    useEffect(() => {
        if (!brandList?.data?.length) return;
        brandList.data.forEach((brand) => {
            dispatch(getHatListDetail({ brandId: brand.id, page: 1, limit: 12 }));
        });
    }, [brandList, dispatch]);

    const hasAnyMoreData = () => brandList?.data?.some((brand) => brandWiseHatList?.[brand.id]?.hasMore);

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
                            limit: 12
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

    const savedUUid = cartUUID;

    const processUpdateQueue = debounce(async (dispatch, savedUUid) => {
        const updates = Object.values(updateQueue);
        if (updates.length === 0) return;
        for (const item of updates) {
            const { cartItemId, qty } = item;
            if (!cartItemId) continue;
            try { await dispatch(updateCartItem({ id: cartItemId, quantity: qty })); }
            catch (err) { console.error('updateCartItem failed', err); }
        }
        updateQueue = {};
        try { await dispatch(cartList({ id: savedUUid })); }
        catch (err) { console.error('cartList refresh failed', err); }
    }, 400);

    const queueCartUpdate = (uniqueHatId, colorName, cartItemId, newQty) => {
        const key = `${uniqueHatId}-${colorName}`;
        if (!cartItemId) { pendingDesiredQty[key] = newQty; return; }
        updateQueue[key] = { cartItemId, qty: newQty };
        processUpdateQueue(dispatch, savedUUid);
    };

    const increase = useCallback(async (uniqueHatId, colorName, size, hatId, brandId) => {
        const sizeId = size.id;
        const key = `${uniqueHatId}-${colorName}-${sizeId}`;
        const currentQty = hatQuantities?.[uniqueHatId]?.[colorName]?.[sizeId] || 0;
        const newQty = currentQty + 1;

        setHatQuantities(prev => ({
            ...prev,
            [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: newQty } }
        }));

        let cartItemId = cartItemMap?.[key];

        if (cartItemId && currentQty === 0) {
            cartItemId = undefined;
            setCartItemMap(prev => {
                const updated = { ...prev }; delete updated[key];
                sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
                return updated;
            });
        }

        if (createLock[key]) { pendingDesiredQty[key] = newQty; return; }

        if (!cartItemId) {
            setCreateLock(prev => ({ ...prev, [key]: true }));
            try {
                const res = await dispatch(addCartItem({
                    session_uuid: cartUUID, hat_id: hatId, brand_id: brandId,
                    hat_size_variant_id: sizeId, decoration_type_id: selectedDecoId, quantity: newQty
                }));
                const cartGroups = res?.payload?.data?.cartGroups || [];
                const createdItem = cartGroups.flatMap(g => g.cartItems)
                    .find(i => String(i.hat_size_variant_id) === String(sizeId) && i.is_active === 1 && i.quantity > 0);
                if (!createdItem?.id) throw new Error("Create failed");
                setCartItemMap(prev => {
                    const updated = { ...prev, [key]: createdItem.id };
                    sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
                    return updated;
                });
                const cartId = res?.payload?.data?.id;
                if (cartId) sessionStorage.setItem("cart_id", cartId);
                if (pendingDesiredQty[key] !== undefined && pendingDesiredQty[key] !== newQty) {
                    await dispatch(updateCartItem({ id: createdItem.id, quantity: pendingDesiredQty[key] }));
                    delete pendingDesiredQty[key];
                }
                await dispatch(cartList({ id: cartUUID }));
            } catch (err) {
                console.error("Increase create error", err);
                setHatQuantities(prev => ({
                    ...prev,
                    [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: currentQty } }
                }));
            } finally {
                setCreateLock(prev => { const copy = { ...prev }; delete copy[key]; return copy; });
            }
            return;
        }

        try {
            await dispatch(updateCartItem({ id: cartItemId, quantity: newQty }));
            await dispatch(cartList({ id: cartUUID }));
        } catch (err) { console.error("Increase update error", err); }
    }, [hatQuantities, cartItemMap, cartUUID, selectedDecoId, createLock, dispatch]);

    const decrease = useCallback(async (uniqueHatId, colorName, size) => {
        const sizeId = size.id;
        const key = `${uniqueHatId}-${colorName}-${sizeId}`;
        const currentQty = hatQuantities?.[uniqueHatId]?.[colorName]?.[sizeId] || 0;
        if (currentQty === 0) return;
        const newQty = currentQty - 1;

        setHatQuantities(prev => ({
            ...prev,
            [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: newQty } }
        }));

        const cartItemId = cartItemMap?.[key];
        if (!cartItemId) return;
        if (createLock[key]) { pendingDesiredQty[key] = newQty; return; }

        try {
            if (newQty === 0) {
                await dispatch(deleteCartItem(cartItemId));
                setCartItemMap(prev => {
                    const updated = { ...prev }; delete updated[key];
                    sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
                    return updated;
                });
                delete pendingDesiredQty[key];
                setCreateLock(prev => { const copy = { ...prev }; delete copy[key]; return copy; });
                await dispatch(cartList({ id: cartUUID }));
                return;
            }
            await dispatch(updateCartItem({ id: cartItemId, quantity: newQty }));
            await dispatch(cartList({ id: cartUUID }));
        } catch (err) { console.error("Decrease error", err); }
    }, [hatQuantities, cartItemMap, cartUUID, createLock, dispatch]);

    const handleManualChange = useCallback(async (uniqueHatId, colorName, size, newQty, hatId, brandId) => {
        const sizeId = size.id;
        const maxQty = size?.inventoryItems?.qty_available || 0;
        if (newQty < 0) return;
        if (newQty > maxQty) { alert(`Only ${maxQty} items available`); newQty = maxQty; }

        const key = `${uniqueHatId}-${colorName}-${sizeId}`;
        const currentQty = hatQuantities?.[uniqueHatId]?.[colorName]?.[sizeId] || 0;

        setHatQuantities(prev => ({
            ...prev,
            [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: newQty } }
        }));

        let cartItemId = cartItemMap?.[key];
        if (cartItemId && currentQty === 0) {
            cartItemId = undefined;
            setCartItemMap(prev => {
                const updated = { ...prev }; delete updated[key];
                sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
                return updated;
            });
        }

        if (createLock[key]) { pendingDesiredQty[key] = newQty; return; }

        if (!cartItemId) {
            setCreateLock(prev => ({ ...prev, [key]: true }));
            try {
                const res = await dispatch(addCartItem({
                    session_uuid: cartUUID, hat_id: hatId, brand_id: brandId,
                    hat_size_variant_id: sizeId, decoration_type_id: selectedDecoId, quantity: newQty
                }));
                const cartId = res?.payload?.data?.id;
                if (cartId) sessionStorage.setItem("cart_id", cartId);
                const cartGroups = res?.payload?.data?.cartGroups || [];
                const createdItem = cartGroups.flatMap(g => g.cartItems)
                    .find(i => String(i.hat_size_variant_id) === String(sizeId) && i.is_active === 1 && i.quantity > 0);
                if (!createdItem?.id) throw new Error("Create failed");
                setCartItemMap(prev => {
                    const updated = { ...prev, [key]: createdItem.id };
                    sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
                    return updated;
                });
                if (pendingDesiredQty[key] !== undefined && pendingDesiredQty[key] !== newQty) {
                    await dispatch(updateCartItem({ id: createdItem.id, quantity: pendingDesiredQty[key] }));
                    delete pendingDesiredQty[key];
                }
                await dispatch(cartList({ id: cartUUID }));
            } catch (err) {
                console.error("Manual create error", err);
                setHatQuantities(prev => ({
                    ...prev,
                    [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: currentQty } }
                }));
            } finally {
                setCreateLock(prev => { const copy = { ...prev }; delete copy[key]; return copy; });
            }
            return;
        }

        try {
            await dispatch(updateCartItem({ id: cartItemId, quantity: newQty }));
            await dispatch(cartList({ id: cartUUID }));
        } catch (err) {
            console.error("Manual update error", err);
            setHatQuantities(prev => ({
                ...prev,
                [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: currentQty } }
            }));
        }
    }, [hatQuantities, cartItemMap, cartUUID, selectedDecoId, createLock, dispatch]);

    const handleHatClick = (hatId, brandId, uniqueHatId) => {
        if (expandedHat?.uniqueHatId === uniqueHatId) {
            setExpandedHat(null);
            return;
        }
        setExpandedHat({ uniqueHatId, brandId });
        dispatch(getSingleHatDetail({ hatId }));
        setTimeout(() => {
            const el = document.getElementById(`panel-${uniqueHatId}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 350);
    };

    const handleNextpage = () => {
        const totalQty = cartListItem?.data?.cart?.total_items || 0;
        if (totalQty < 24) {
            toast.error("A minimum of 24 hats is required to proceed. Please add more hats to continue.");
            return;
        }
        router.push("/upload-artwork");
    };

    return (
        <div className='product_details_area max-w-[1400px] mx-auto p-4'>
            <ToastContainer />

            {brandList?.data?.map((brand) => {
                const hats = brandWiseHatList?.[brand.id]?.list || [];
                return (
                    <div key={brand.id} className="mb-10">
                        <div className='bg-[#efefef] p-4 rounded-xl mb-4'>
                            <Image src={base_url + brand?.image_url} width={200} height={50} alt={brand.name} />
                        </div>

                        {hats.length === 0 ? (
                            <p className='text-center text-gray-500 py-5'>No records</p>
                        ) : (
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                                {(() => {
                                    const rendered = [];
                                    for (let i = 0; i < hats.length; i += colCount) {
                                        const row = hats.slice(i, i + colCount);

                                        row.forEach((hat) => {
                                            const uniqueHatId = `${brand.id}_${hat.id}`;
                                            const isExpanded = expandedHat?.uniqueHatId === uniqueHatId;
                                            const imageSrc = hat?.hatImages?.[0]?.image_url
                                                ? `${base_url}/${hat.hatImages[0].image_url}`
                                                : preview_01;
                                            const totalQty = Object.values(hatQuantities?.[uniqueHatId] || {})
                                                .flatMap(colorObj => Object.values(colorObj || {}))
                                                .reduce((sum, qty) => sum + qty, 0);

                                            rendered.push(
                                                <div
                                                    key={hat.id}
                                                    onClick={() => handleHatClick(hat.id, brand.id, uniqueHatId)}
                                                    className={`cursor-pointer rounded-xl border-2 transition-all p-3 bg-white relative
                                                        ${isExpanded
                                                            ? 'border-[#ff7379] ring-4 ring-pink-50 shadow-lg'
                                                            : 'border-gray-200 hover:border-[#ff7379] hover:shadow-md'}`}
                                                >
                                                    {totalQty > 0 && (
                                                        <div className="absolute -top-2 -right-2 bg-[#ff7379] text-white text-[10px] font-bold h-6 w-6 flex items-center justify-center rounded-full shadow-lg z-10">
                                                            {totalQty}
                                                        </div>
                                                    )}
                                                    <div className="aspect-square flex items-center justify-center overflow-hidden mb-2">
                                                        <Image
                                                            src={imageSrc}
                                                            alt={hat?.hatImages?.[0]?.alt_text || hat.name}
                                                            width={200} height={200}
                                                            className="object-contain w-full h-full"
                                                        />
                                                    </div>
                                                    <p className="text-xs font-bold text-center text-[#ff7379] truncate px-1">{hat.name}</p>
                                                    <div className={`mt-2 flex justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                                        <svg className="w-4 h-4 text-[#ff7379]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            );
                                        });

                                        const expandedInThisRow = row.find(h => `${brand.id}_${h.id}` === expandedHat?.uniqueHatId);
                                        if (expandedInThisRow) {
                                            rendered.push(
                                                <DetailPanel
                                                    key={`panel-${expandedHat.uniqueHatId}`}
                                                    uniqueHatId={expandedHat.uniqueHatId}
                                                    singleHatDetail={singleHatDetail}
                                                    base_url={base_url}
                                                    hatQuantities={hatQuantities}
                                                    selectedDecoName={selectedDecoName}
                                                    onIncrease={increase}
                                                    onDecrease={decrease}
                                                    onManualChange={handleManualChange}
                                                />
                                            );
                                        }
                                    }
                                    return rendered;
                                })()}
                            </div>
                        )}
                    </div>
                );
            })}

            <div ref={loadMoreRef} className="h-14 flex items-center justify-center">
                {showLoader && (
                    <div className="flex items-center gap-3 py-4">
                        <span className="w-5 h-5 border-2 border-[#ff7379] border-t-transparent rounded-full animate-spin"></span>
                        <span className="text-[#ff7379] text-sm font-medium tracking-wide">Loading more hats...</span>
                    </div>
                )}
                {!hasAnyMoreData() && !showLoader && (
                    <p className="text-center text-gray-400 text-sm py-6 mt-2">No more hats available</p>
                )}
            </div>

            <div className='fixed top-[58px] md:top-[70px] left-1/2 -translate-x-1/2 z-10 w-max'>
                <button
                    onClick={handleNextpage}
                    className='group flex items-center gap-2 text-lg md:text-xl bg-[#ed1c24] hover:bg-[#ee5e62] text-white font-bold py-2 px-4 md:px-8 rounded-b-lg cursor-pointer shadow-[0_4px_15px_rgba(255,115,121,0.4)] transition-all duration-300 active:scale-95'
                >
                    <span>Next Step</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProductAccordion;

// 'use client';
// import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
// import preview_01 from "../assets/imagesource/preview_01.jpg";
// import Image from 'next/image';
// import { useDispatch, useSelector } from 'react-redux';
// import { getHatBrandList, getHatListDetail, getSingleHatDetail } from '../reducers/HatBrandSlice';
// import HatColorSelector from './HatColorSelector';
// import { addCartItem, cartList, deleteCartItem, updateCartItem } from '../reducers/CartSlice';
// import { useRouter } from 'next/navigation';
// import { toast, ToastContainer } from 'react-toastify';
// import { v4 as uuidv4 } from "uuid";

// // ─── Animation Styles ─────────────────────────────────────────────────────────
// const ANIM_STYLE = `
// @keyframes expandDown {
//   from { opacity: 0; transform: scaleY(0.95); }
//   to   { opacity: 1; transform: scaleY(1); }
// }
// .hat-detail-panel {
//   animation: expandDown 0.3s ease-out forwards;
//   transform-origin: top;
// }
// `;

// // ─── Pending desired qty buffer (module-level like original) ──────────────────
// let pendingDesiredQty = {};

// // ─── Debounce helper (same as original) ──────────────────────────────────────
// function debounce(fn, delay = 300) {
//     let timer;
//     return (...args) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => fn(...args), delay);
//     };
// }

// // ─── Responsive column count hook ────────────────────────────────────────────
// function useColCount() {
//     const [cols, setCols] = useState(2);
//     useEffect(() => {
//         function update() {
//             const w = window.innerWidth;
//             if (w >= 1024) setCols(4);
//             else if (w >= 768) setCols(3);
//             else setCols(2);
//         }
//         update();
//         window.addEventListener('resize', update);
//         return () => window.removeEventListener('resize', update);
//     }, []);
//     return cols;
// }

// // ─── DetailPanel Sub-Component ────────────────────────────────────────────────
// const DetailPanel = memo(({
//     uniqueHatId, singleHatDetail, base_url, hatQuantities,
//     selectedDecoName, onIncrease, onDecrease, onManualChange
// }) => {
//     if (!singleHatDetail?.data) {
//         return (
//             <div className="col-span-full py-12 flex justify-center border-2 border-[#ff7379] rounded-2xl mb-4">
//                 <span className="w-8 h-8 border-4 border-[#ff7379] border-t-transparent rounded-full animate-spin"></span>
//             </div>
//         );
//     }

//     const hatData = singleHatDetail.data.data;

//     return (
//         <div
//             id={`panel-${uniqueHatId}`}
//             className="hat-detail-panel col-span-full border-2 border-[#ff7379] rounded-2xl bg-white overflow-hidden mb-6 shadow-xl"
//         >
//             {/* Top Section: Image + Description + Size Chart */}
//             <div className="flex flex-col md:flex-row border-b border-gray-100">
//                 <div className="flex flex-col items-center justify-center bg-gray-50 md:w-5/12 border-r border-gray-100">
//                     {hatData?.hatImages?.[0] && (
//                         <Image
//                             src={`${base_url}/${hatData.hatImages[0].image_url}`}
//                             alt="Hat"
//                             width={300}
//                             height={300}
//                             className="object-contain max-h-[250px]"
//                         />
//                     )}
//                     {hatData?.name && (
//                         <p className="text-center text-base font-bold text-[#ff7379]">{hatData.name}</p>
//                     )}
//                 </div>
//                 <div className="p-6 md:w-7/12 flex flex-col justify-center">
//                     {/* Description */}
//                     <div className="bg-[#eeeeee] rounded-xl p-4 mb-4 text-left">
//                         <ul className="list-disc list-inside space-y-2 text-base text-black">
//                             {hatData?.description
//                                 ?.split("\n")
//                                 ?.map((item, index) => (
//                                     <li key={index}>{item.trim()}</li>
//                                 ))}
//                         </ul>
//                     </div>

//                     {/* Size Chart */}
//                     {hatData?.size_chart_json?.size_chart?.length > 0 && (
//                         <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
//                             <div className="bg-[#ff7379] text-center font-bold text-base py-2 text-white">
//                                 Size Chart
//                             </div>
//                             <div
//                                 className="grid text-center font-semibold border-b border-gray-300 bg-[#eeeeee]"
//                                 style={{ gridTemplateColumns: `repeat(${hatData.size_chart_json.size_chart.length}, 1fr)` }}
//                             >
//                                 {hatData.size_chart_json.size_chart.map((item, index) => (
//                                     <div key={index} className="py-2 border-r last:border-r-0 border-gray-300">
//                                         {item.size}
//                                     </div>
//                                 ))}
//                             </div>
//                             <div
//                                 className="grid text-center text-sm"
//                                 style={{ gridTemplateColumns: `repeat(${hatData.size_chart_json.size_chart.length}, 1fr)` }}
//                             >
//                                 {hatData.size_chart_json.size_chart.map((item, index) => (
//                                     <div key={index} className="py-2 border-r last:border-r-0 border-gray-200">
//                                         {item.value}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Price Table */}
//             <div className="px-6 py-4">
//                 <div className="bg-[#ff7379] text-center mb-2 font-bold text-base py-2 text-white">
//                     Total Items Price Break
//                 </div>
//                 <div className="mb-2">
//                     <div className="flex gap-2 mb-2">
//                         {/* Label */}
//                         <div
//                             className={`w-4/12 sm:w-3/12 flex items-center justify-center text-center font-medium text-[11px] sm:text-sm px-2
//                                 ${selectedDecoName === "Embroidery"
//                                     ? "bg-[#ff7379] text-white"
//                                     : "bg-[#eeeeee] text-black"
//                                 }`}
//                         >
//                             STANDARD <br /> EMBROIDERY
//                         </div>

//                         {/* Pricing Tiers */}
//                         <div className="w-8/12 sm:w-9/12 overflow-x-auto">
//                             <div className="flex gap-1 min-w-max">
//                                 {singleHatDetail?.data?.embroideryPrices
//                                     ?.filter(tier => tier.min_qty >= 24)
//                                     .map((tier, index) => {
//                                         const totalQty = Object.values(hatQuantities?.[uniqueHatId] || {})
//                                             .flatMap(colorObj => Object.values(colorObj || {}))
//                                             .reduce((sum, qty) => sum + qty, 0);
//                                         const meetsQty = totalQty >= tier.min_qty;

//                                         return (
//                                             <div key={index} className="text-center w-[65px] sm:w-[75px] flex-shrink-0">
//                                                 <div className={`py-1 text-[10px] sm:text-sm font-medium ${meetsQty ? "bg-[#ff7379] text-white" : "bg-[#eeeeee] text-black"}`}>
//                                                     {tier.min_qty}
//                                                 </div>
//                                                 <div className={`py-1 text-[10px] sm:text-sm font-bold border border-gray-200 mt-[2px]
//                                                     ${selectedDecoName === "Embroidery" && meetsQty
//                                                         ? "bg-[#ff7379] text-white border-[#ff7379]"
//                                                         : "bg-white text-black border-gray-200"
//                                                     }`}>
//                                                     ${Number(tier.unit_price)}
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-[#eeeeee] mb-4 font-medium text-sm py-2 px-2 text-black text-right">
//                     Price includes item & decoration.
//                 </div>
//             </div>

//             {/* Color Selectors */}
//             <div className=''>
//             <div className="flex flex-wrap -m-2 mb-2 gap-2 justify-center">
//                 {hatData?.hatColors?.map((color) => {
//                     const colorImage = color?.colorImages?.length > 0 ? color.colorImages[0].image_url : null;
//                     return (
//                         <HatColorSelector
//                             key={color.id}
//                             colorName={color.name}
//                             colorImage={colorImage}
//                             sizeVariants={color.hatSizes}
//                             quantities={hatQuantities?.[uniqueHatId]?.[color.name] || {}}
//                             onIncrease={(size) => onIncrease(uniqueHatId, color.name, size, hatData.id, hatData.brand_id)}
//                             onDecrease={(size) => onDecrease(uniqueHatId, color.name, size)}
//                             onChange={(size, val) => onManualChange(uniqueHatId, color.name, size, val, hatData.id, hatData.brand_id)}
//                         />
//                     );
//                 })}
//             </div>
//             </div>
//         </div>
//     );
// });

// DetailPanel.displayName = 'DetailPanel';

// // ─── Main Component ───────────────────────────────────────────────────────────
// const ProductAccordion = ({ selectedDecoName, selectedDecoId, hatQuantities: initialHatQuantities, setHatQuantities: setParentHatQuantities }) => {
//     const dispatch = useDispatch();
//     const colCount = useColCount();
//     const router = useRouter();
//     const loadMoreRef = useRef(null);

//     const { brandList, brandWiseHatList, singleHatDetail, loading } = useSelector((state) => state.hatBrand);
//     const { cartListItem } = useSelector((state) => state?.cart);

//     const base_url = process.env.NEXT_PUBLIC_API_IMAGE_URL;

//     // ── State (with sessionStorage restore, same as original) ─────────────────
//     const [cartItemMap, setCartItemMap] = useState(() => {
//         if (typeof window !== "undefined") {
//             const saved = sessionStorage.getItem("cartItemMap");
//             return saved ? JSON.parse(saved) : {};
//         }
//         return {};
//     });

//     const [hatQuantities, setHatQuantities] = useState(() => {
//         if (typeof window !== "undefined") {
//             const saved = sessionStorage.getItem("hatQuantities");
//             return saved ? JSON.parse(saved) : initialHatQuantities || {};
//         }
//         return initialHatQuantities || {};
//     });

//     const [expandedHat, setExpandedHat] = useState(null);   // { uniqueHatId, brandId }
//     const [cartUUID, setCartUUID] = useState(null);
//     const [createLock, setCreateLock] = useState({});
//     const [showLoader, setShowLoader] = useState(false);
//     const [isFetching, setIsFetching] = useState(false);

//     // ── Module-level update queue (same as original) ───────────────────────────
//     let updateQueue = {};

//     // ── Init UUID + inject animation styles ────────────────────────────────────
//     useEffect(() => {
//         if (!document.getElementById('hat-grid-styles')) {
//             const style = document.createElement('style');
//             style.id = 'hat-grid-styles';
//             style.textContent = ANIM_STYLE;
//             document.head.appendChild(style);
//         }

//         let savedUUID = sessionStorage.getItem("uuid");
//         if (!savedUUID) {
//             const newUUID = "sess-" + uuidv4();
//             sessionStorage.setItem("uuid", newUUID);
//             savedUUID = newUUID;
//         }
//         setCartUUID(savedUUID);
//     }, []);

//     // ── Sync hatQuantities to sessionStorage + parent (same as original) ───────
//     useEffect(() => {
//         setParentHatQuantities(hatQuantities);
//         sessionStorage.setItem("hatQuantities", JSON.stringify(hatQuantities));
//     }, [hatQuantities]);

//     useEffect(() => {
//         sessionStorage.setItem("cartItemMap", JSON.stringify(cartItemMap));
//     }, [cartItemMap]);

//     // ── Listen for external hatQuantities changes (same as original) ───────────
//     useEffect(() => {
//         const handleStorageChange = () => {
//             const savedQuantities = sessionStorage.getItem("hatQuantities");
//             if (savedQuantities) {
//                 const parsed = JSON.parse(savedQuantities);
//                 setHatQuantities(parsed);
//                 if (setParentHatQuantities) setParentHatQuantities(parsed);
//             }
//         };
//         window.addEventListener("hatQuantitiesChanged", handleStorageChange);
//         return () => window.removeEventListener("hatQuantitiesChanged", handleStorageChange);
//     }, [setParentHatQuantities]);

//     // ── Load brand list ────────────────────────────────────────────────────────
//     useEffect(() => {
//         dispatch(getHatBrandList());
//     }, []);

//     // ── Load hat list per brand ────────────────────────────────────────────────
//     useEffect(() => {
//         if (!brandList?.data?.length) return;
//         brandList.data.forEach((brand) => {
//             dispatch(getHatListDetail({ brandId: brand.id, page: 1, limit: 12 }));
//         });
//     }, [brandList, dispatch]);

//     // ── IntersectionObserver for infinite scroll (same logic as original) ──────
//     const hasAnyMoreData = () => {
//         return brandList?.data?.some((brand) => brandWiseHatList?.[brand.id]?.hasMore);
//     };

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 if (!entries[0].isIntersecting || loading || isFetching) return;
//                 if (!hasAnyMoreData()) return;

//                 setIsFetching(true);
//                 setShowLoader(true);

//                 const brandRequests = brandList?.data?.map((brand) => {
//                     const brandData = brandWiseHatList?.[brand.id];
//                     if (brandData?.hasMore) {
//                         return dispatch(getHatListDetail({
//                             brandId: brand.id,
//                             page: (brandData.page || 1) + 1,
//                             limit: 12
//                         }));
//                     }
//                     return Promise.resolve();
//                 });

//                 Promise.all(brandRequests).finally(() => {
//                     setIsFetching(false);
//                     setShowLoader(false);
//                 });
//             },
//             { threshold: 0.1, rootMargin: "100px" }
//         );

//         if (loadMoreRef.current) observer.observe(loadMoreRef.current);
//         return () => observer.disconnect();
//     }, [brandWiseHatList, brandList, loading, isFetching]);

//     // ── Debounced batch update queue (same as original) ────────────────────────
//     const savedUUid = cartUUID;

//     const processUpdateQueue = debounce(async (dispatch, savedUUid) => {
//         const updates = Object.values(updateQueue);
//         if (updates.length === 0) return;

//         for (const item of updates) {
//             const { cartItemId, qty } = item;
//             if (!cartItemId) continue;
//             try {
//                 await dispatch(updateCartItem({ id: cartItemId, quantity: qty }));
//             } catch (err) {
//                 console.error('updateCartItem failed for', cartItemId, err);
//             }
//         }

//         updateQueue = {};

//         try {
//             await dispatch(cartList({ id: savedUUid }));
//         } catch (err) {
//             console.error('cartList refresh failed', err);
//         }
//     }, 400);

//     const queueCartUpdate = (uniqueHatId, colorName, cartItemId, newQty) => {
//         const key = `${uniqueHatId}-${colorName}`;
//         if (!cartItemId) {
//             pendingDesiredQty[key] = newQty;
//             return;
//         }
//         updateQueue[key] = { cartItemId, qty: newQty };
//         processUpdateQueue(dispatch, savedUUid);
//     };

//     // ── increase (full original logic) ────────────────────────────────────────
//     const increase = useCallback(async (uniqueHatId, colorName, size, hatId, brandId) => {
//         const sizeId = size.id;
//         const key = `${uniqueHatId}-${colorName}-${sizeId}`;
//         const currentQty = hatQuantities?.[uniqueHatId]?.[colorName]?.[sizeId] || 0;
//         const newQty = currentQty + 1;

//         // Optimistic UI
//         setHatQuantities(prev => ({
//             ...prev,
//             [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: newQty } }
//         }));

//         let cartItemId = cartItemMap?.[key];

//         // Stale ID protection
//         if (cartItemId && currentQty === 0) {
//             cartItemId = undefined;
//             setCartItemMap(prev => {
//                 const updated = { ...prev };
//                 delete updated[key];
//                 sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
//                 return updated;
//             });
//         }

//         // Create in progress
//         if (createLock[key]) {
//             pendingDesiredQty[key] = newQty;
//             return;
//         }

//         // CREATE
//         if (!cartItemId) {
//             setCreateLock(prev => ({ ...prev, [key]: true }));
//             try {
//                 const res = await dispatch(addCartItem({
//                     session_uuid: cartUUID,
//                     hat_id: hatId,
//                     brand_id: brandId,
//                     hat_size_variant_id: sizeId,
//                     decoration_type_id: selectedDecoId,
//                     quantity: newQty
//                 }));

//                 const cartGroups = res?.payload?.data?.cartGroups || [];
//                 const createdItem = cartGroups
//                     .flatMap(g => g.cartItems)
//                     .find(i => String(i.hat_size_variant_id) === String(sizeId) && i.is_active === 1 && i.quantity > 0);

//                 if (!createdItem?.id) throw new Error("Create failed");

//                 setCartItemMap(prev => {
//                     const updated = { ...prev, [key]: createdItem.id };
//                     sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
//                     return updated;
//                 });

//                 const cartId = res?.payload?.data?.id;
//                 if (cartId) sessionStorage.setItem("cart_id", cartId);

//                 // Apply pending qty if exists
//                 if (pendingDesiredQty[key] !== undefined && pendingDesiredQty[key] !== newQty) {
//                     await dispatch(updateCartItem({ id: createdItem.id, quantity: pendingDesiredQty[key] }));
//                     delete pendingDesiredQty[key];
//                 }

//                 await dispatch(cartList({ id: cartUUID }));
//             } catch (err) {
//                 console.error("Increase create error", err);
//                 // Rollback
//                 setHatQuantities(prev => ({
//                     ...prev,
//                     [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: currentQty } }
//                 }));
//             } finally {
//                 setCreateLock(prev => { const copy = { ...prev }; delete copy[key]; return copy; });
//             }
//             return;
//         }

//         // UPDATE
//         try {
//             await dispatch(updateCartItem({ id: cartItemId, quantity: newQty }));
//             await dispatch(cartList({ id: cartUUID }));
//         } catch (err) {
//             console.error("Increase update error", err);
//         }
//     }, [hatQuantities, cartItemMap, cartUUID, selectedDecoId, createLock, dispatch]);

//     // ── decrease (full original logic) ────────────────────────────────────────
//     const decrease = useCallback(async (uniqueHatId, colorName, size) => {
//         const sizeId = size.id;
//         const key = `${uniqueHatId}-${colorName}-${sizeId}`;
//         const currentQty = hatQuantities?.[uniqueHatId]?.[colorName]?.[sizeId] || 0;

//         if (currentQty === 0) return;
//         const newQty = currentQty - 1;

//         // Optimistic UI
//         setHatQuantities(prev => ({
//             ...prev,
//             [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: newQty } }
//         }));

//         const cartItemId = cartItemMap?.[key];
//         if (!cartItemId) return;

//         if (createLock[key]) {
//             pendingDesiredQty[key] = newQty;
//             return;
//         }

//         try {
//             if (newQty === 0) {
//                 await dispatch(deleteCartItem(cartItemId));
//                 setCartItemMap(prev => {
//                     const updated = { ...prev };
//                     delete updated[key];
//                     sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
//                     return updated;
//                 });
//                 delete pendingDesiredQty[key];
//                 setCreateLock(prev => { const copy = { ...prev }; delete copy[key]; return copy; });
//                 await dispatch(cartList({ id: cartUUID }));
//                 return;
//             }

//             await dispatch(updateCartItem({ id: cartItemId, quantity: newQty }));
//             await dispatch(cartList({ id: cartUUID }));
//         } catch (err) {
//             console.error("Decrease error", err);
//         }
//     }, [hatQuantities, cartItemMap, cartUUID, createLock, dispatch]);

//     // ── handleManualChange (full original logic) ───────────────────────────────
//     const handleManualChange = useCallback(async (uniqueHatId, colorName, size, newQty, hatId, brandId) => {
//         const sizeId = size.id;
//         const maxQty = size?.inventoryItems?.qty_available || 0;
//         if (newQty < 0) return;
//         if (newQty > maxQty) {
//             alert(`Only ${maxQty} items available`);
//             newQty = maxQty;
//         }

//         const key = `${uniqueHatId}-${colorName}-${sizeId}`;
//         const currentQty = hatQuantities?.[uniqueHatId]?.[colorName]?.[sizeId] || 0;

//         // Optimistic UI
//         setHatQuantities(prev => ({
//             ...prev,
//             [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: newQty } }
//         }));

//         let cartItemId = cartItemMap?.[key];

//         // Stale ID protection
//         if (cartItemId && currentQty === 0) {
//             cartItemId = undefined;
//             setCartItemMap(prev => {
//                 const updated = { ...prev };
//                 delete updated[key];
//                 sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
//                 return updated;
//             });
//         }

//         if (createLock[key]) {
//             pendingDesiredQty[key] = newQty;
//             return;
//         }

//         // CREATE
//         if (!cartItemId) {
//             setCreateLock(prev => ({ ...prev, [key]: true }));
//             try {
//                 const res = await dispatch(addCartItem({
//                     session_uuid: cartUUID,
//                     hat_id: hatId,
//                     brand_id: brandId,
//                     hat_size_variant_id: sizeId,
//                     decoration_type_id: selectedDecoId,
//                     quantity: newQty
//                 }));

//                 const cartId = res?.payload?.data?.id;
//                 if (cartId) sessionStorage.setItem("cart_id", cartId);

//                 const cartGroups = res?.payload?.data?.cartGroups || [];
//                 const createdItem = cartGroups
//                     .flatMap(g => g.cartItems)
//                     .find(i => String(i.hat_size_variant_id) === String(sizeId) && i.is_active === 1 && i.quantity > 0);

//                 if (!createdItem?.id) throw new Error("Create failed");

//                 setCartItemMap(prev => {
//                     const updated = { ...prev, [key]: createdItem.id };
//                     sessionStorage.setItem("cartItemMap", JSON.stringify(updated));
//                     return updated;
//                 });

//                 if (pendingDesiredQty[key] !== undefined && pendingDesiredQty[key] !== newQty) {
//                     await dispatch(updateCartItem({ id: createdItem.id, quantity: pendingDesiredQty[key] }));
//                     delete pendingDesiredQty[key];
//                 }

//                 await dispatch(cartList({ id: cartUUID }));
//             } catch (err) {
//                 console.error("Manual create error", err);
//                 setHatQuantities(prev => ({
//                     ...prev,
//                     [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: currentQty } }
//                 }));
//             } finally {
//                 setCreateLock(prev => { const copy = { ...prev }; delete copy[key]; return copy; });
//             }
//             return;
//         }

//         // UPDATE
//         try {
//             await dispatch(updateCartItem({ id: cartItemId, quantity: newQty }));
//             await dispatch(cartList({ id: cartUUID }));
//         } catch (err) {
//             console.error("Manual update error", err);
//             setHatQuantities(prev => ({
//                 ...prev,
//                 [uniqueHatId]: { ...prev[uniqueHatId], [colorName]: { ...prev[uniqueHatId]?.[colorName], [sizeId]: currentQty } }
//             }));
//         }
//     }, [hatQuantities, cartItemMap, cartUUID, selectedDecoId, createLock, dispatch]);

//     // ── Hat card click: toggle expand + fetch detail ───────────────────────────
//     const handleHatClick = (hatId, brandId, uniqueHatId) => {
//         if (expandedHat?.uniqueHatId === uniqueHatId) {
//             setExpandedHat(null);
//             return;
//         }
//         setExpandedHat({ uniqueHatId, brandId });
//         dispatch(getSingleHatDetail({ hatId }));

//         // Scroll into view after panel renders
//         setTimeout(() => {
//             const el = document.getElementById(`panel-${uniqueHatId}`);
//             if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//         }, 350);
//     };

//     // ── Next page handler (same as original) ──────────────────────────────────
//     const handleNextpage = () => {
//         const totalQty = cartListItem?.data?.cart?.total_items || 0;
//         if (totalQty < 24) {
//             toast.error("A minimum of 24 hats is required to proceed. Please add more hats to continue.");
//             return;
//         }
//         router.push("/upload-artwork");
//     };

//     // ─────────────────────────────────────────────────────────────────────────
//     return (
//         <div className='product_details_area max-w-[1400px] mx-auto p-4'>
//             <ToastContainer />

//             {brandList?.data?.map((brand) => {
//                 const hats = brandWiseHatList?.[brand.id]?.list || [];

//                 return (
//                     <div key={brand.id} className="mb-10">
//                         {/* Brand Header */}
//                         <div className='bg-[#efefef] p-4 rounded-xl mb-4'>
//                             <Image src={base_url + brand?.image_url} width={200} height={50} alt={brand.name} />
//                         </div>

//                         {hats.length === 0 ? (
//                             <p className='text-center text-gray-500 py-5'>No records</p>
//                         ) : (
//                             <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//                                 {(() => {
//                                     const rendered = [];

//                                     for (let i = 0; i < hats.length; i += colCount) {
//                                         const row = hats.slice(i, i + colCount);

//                                         // Render hat cards in this row
//                                         row.forEach((hat) => {
//                                             const uniqueHatId = `${brand.id}_${hat.id}`;
//                                             const isExpanded = expandedHat?.uniqueHatId === uniqueHatId;
//                                             const imageSrc = hat?.hatImages?.[0]?.image_url
//                                                 ? `${base_url}/${hat.hatImages[0].image_url}`
//                                                 : preview_01;

//                                             const totalQty = Object.values(hatQuantities?.[uniqueHatId] || {})
//                                                 .flatMap(colorObj => Object.values(colorObj || {}))
//                                                 .reduce((sum, qty) => sum + qty, 0);

//                                             rendered.push(
//                                                 <div
//                                                     key={hat.id}
//                                                     onClick={() => handleHatClick(hat.id, brand.id, uniqueHatId)}
//                                                     className={`cursor-pointer rounded-xl border-2 transition-all p-3 bg-white relative
//                                                         ${isExpanded
//                                                             ? 'border-[#ff7379] ring-4 ring-pink-50 shadow-lg'
//                                                             : 'border-gray-200 hover:border-[#ff7379] hover:shadow-md'
//                                                         }`}
//                                                 >
//                                                     {/* Qty Badge */}
//                                                     {totalQty > 0 && (
//                                                         <div className="absolute -top-2 -right-2 bg-[#ff7379] text-white text-[10px] font-bold h-6 w-6 flex items-center justify-center rounded-full shadow-lg z-10">
//                                                             {totalQty}
//                                                         </div>
//                                                     )}

//                                                     {/* Hat Image */}
//                                                     <div className="aspect-square flex items-center justify-center overflow-hidden mb-2">
//                                                         <Image
//                                                             src={imageSrc}
//                                                             alt={hat?.hatImages?.[0]?.alt_text || hat.name}
//                                                             width={200}
//                                                             height={200}
//                                                             className="object-contain w-full h-full"
//                                                         />
//                                                     </div>

//                                                     {/* Hat Name */}
//                                                     <p className="text-xs font-bold text-center text-[#ff7379] truncate px-1">{hat.name}</p>

//                                                     {/* Chevron */}
//                                                     <div className={`mt-2 flex justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
//                                                         <svg className="w-4 h-4 text-[#ff7379]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
//                                                         </svg>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         });

//                                         // After this row, inject DetailPanel if expanded hat is in this row
//                                         const expandedInThisRow = row.find(
//                                             h => `${brand.id}_${h.id}` === expandedHat?.uniqueHatId
//                                         );

//                                         if (expandedInThisRow) {
//                                             rendered.push(
//                                                 <DetailPanel
//                                                     key={`panel-${expandedHat.uniqueHatId}`}
//                                                     uniqueHatId={expandedHat.uniqueHatId}
//                                                     singleHatDetail={singleHatDetail}
//                                                     base_url={base_url}
//                                                     hatQuantities={hatQuantities}
//                                                     selectedDecoName={selectedDecoName}
//                                                     onIncrease={increase}
//                                                     onDecrease={decrease}
//                                                     onManualChange={handleManualChange}
//                                                 />
//                                             );
//                                         }
//                                     }

//                                     return rendered;
//                                 })()}
//                             </div>
//                         )}
//                     </div>
//                 );
//             })}

//             {/* Load More Trigger */}
//             <div ref={loadMoreRef} className="h-14 flex items-center justify-center">
//                 {showLoader && (
//                     <div className="flex items-center gap-3 py-4">
//                         <span className="w-5 h-5 border-2 border-[#ff7379] border-t-transparent rounded-full animate-spin"></span>
//                         <span className="text-[#ff7379] text-sm font-medium tracking-wide">Loading more hats...</span>
//                     </div>
//                 )}
//                 {!hasAnyMoreData() && !showLoader && (
//                     <p className="text-center text-gray-400 text-sm py-6 mt-2">No more hats available</p>
//                 )}
//             </div>

//             {/* Next Step Button */}
//             <div className='fixed top-[58px] md:top-[70px] left-1/2 -translate-x-1/2 z-50 w-max'>
//                 <button
//                     onClick={handleNextpage}
//                     className='group flex items-center gap-2 text-lg md:text-xl bg-[#ed1c24] hover:bg-[#ee5e62] text-white font-bold py-2 px-4 md:px-8 rounded-b-lg cursor-pointer shadow-[0_4px_15px_rgba(255,115,121,0.4)] transition-all duration-300 active:scale-95'
//                 >
//                     <span>Next Step</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
//                     </svg>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProductAccordion;