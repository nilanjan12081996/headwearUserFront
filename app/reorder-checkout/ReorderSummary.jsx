'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { FiRefreshCw } from 'react-icons/fi';
import { CgFileDocument } from 'react-icons/cg';
import { RiCoupon3Line } from 'react-icons/ri';
import { IoCloseCircle } from 'react-icons/io5';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { applyCoupon, clearCouponState } from '../reducers/OrdersSlice';

const ReorderSummary = ({ orderLoading }) => {
  const dispatch = useDispatch();
  const { reorderPreview, reorderPreviewLoading } = useSelector((state) => state.order ?? {});
  const { cartListItem } = useSelector((state) => state?.cart);
  // ── Coupon state from redux (same slice as OrderSummary) ──
  const { couponLoading, couponSuccess, couponData } = useSelector((state) => state?.order);

  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const groups = reorderPreview?.orderDetails?.groups ?? [];
  const hatImages = reorderPreview?.hatImages ?? [];
  const artwork = reorderPreview?.artworkConfig ?? null;
  const grandTotal = reorderPreview?.orderDetails?.grandTotalAmount ?? 0;

  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  // ── Coupon handlers (identical to OrderSummary) ──
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    const grandTotalAmount = Number(grandTotal) || 0;
    const result = await dispatch(applyCoupon({ coupon: couponCode.trim(), grandTotalAmount }));
    if (applyCoupon.fulfilled.match(result)) {
      setShowCouponInput(false);
    } else {
      toast.error(result?.payload || 'Invalid coupon code.');
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(clearCouponState());
    setCouponCode('');
    setShowCouponInput(false);
  };

  // ── Build a flat cart-item lookup ──
  const cartItems = (cartListItem?.data?.cart_groups ?? []).flatMap(
    (g) => g.items ?? []
  );

  const getImageByColorId = (hatColorId) => {
    const img = hatImages.find((h) => h.hatColorId === hatColorId);
    return img ? `${base_url}${img.imageUrl}` : null;
  };

  let cartItemIdx = 0;
  const resolvedItems = groups.flatMap((group) =>
    (group.items ?? []).map((item, idx) => {
      const color = group.hatColors?.[idx] ?? null;
      const colorId = color?.id ?? 0;
      const cartItem = cartItems[cartItemIdx++] ?? null;
      const sizeLabel = cartItem?.variant?.size_label ?? 'OSFM';
      return {
        ...item,
        hatName: group.hatName,
        colorName: color?.name ?? 'N/A',
        imgSrc: getImageByColorId(colorId),
        sizeLabel,
      };
    })
  );

  const totalItems = resolvedItems.reduce((s, i) => s + (i.quantity ?? 0), 0);
  const addons = artwork?.addons ?? [];

  const getAddonPrice = (addon) => {
    const tiers = addon?.decorationAddon?.priceTiers ?? [];
    if (!tiers.length) return null;
    const tier = tiers.find(
      (t) => totalItems >= t.minQty && totalItems <= t.maxQty
    ) ?? tiers[0];
    return tier?.unitPrice ?? null;
  };

  return (
    <div className='lg:w-4/12 border border-[#E6E6E6] rounded-[10px] p-4'>
      <h3 className='text-[22px] font-semibold text-[#1A1A1A] pb-4'>Order Summary</h3>

      {/* loading */}
      {reorderPreviewLoading && (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-[#ED1C24] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!reorderPreviewLoading && (
        <div className="max-h-[400px] overflow-y-auto !overflow-x-hidden pr-2">

          {/* ── Hat items ── */}
          {resolvedItems.map((item) => (
            <div key={item.id} className='mb-4 flex items-center gap-2 border-b border-gray-50 pb-2'>
              <div className='w-10/12 flex items-center gap-2'>
                <div className='w-3/12'>
                  {item.imgSrc ? (
                    <Image
                      src={item.imgSrc}
                      width={50}
                      height={50}
                      alt={item.hatName}
                      className='rounded-md object-cover'
                    />
                  ) : (
                    <div className="w-[50px] h-[50px] bg-gray-100 rounded-md" />
                  )}
                </div>
                <div className='w-9/12'>
                  <p className='text-[14px] text-[#1A1A1A] font-medium'>{item.hatName}</p>
                  <div className='flex flex-wrap items-center gap-2 mt-1'>
                    <span className='text-[12px] bg-gray-100 px-2 py-0.5 rounded text-[#555]'>
                      Qty: {item.quantity}
                    </span>
                    <p className='text-[12px] text-[#666]'>Size: {item.sizeLabel}</p>
                    <p className='text-[12px] text-[#666]'>Color: {item.colorName}</p>
                  </div>
                </div>
              </div>
              <div className='w-2/12 text-right'>
                <p className='text-[14px] text-[#1A1A1A] font-medium'>
                  ${Number(item.lineSubtotal).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* ── Addon charges ── */}
          {addons.map((addonEntry) => {
            const addon = addonEntry?.decorationAddon;
            const unitPrice = getAddonPrice(addonEntry);
            const lineTotal = unitPrice != null ? unitPrice * totalItems : null;
            return (
              <div key={addonEntry.id} className='mb-4 flex items-center gap-2 opacity-80'>
                <div className='w-10/12 flex items-center gap-1'>
                  <div className='w-3/12 flex justify-center items-center'>
                    <CgFileDocument className='text-[#ed1c24] text-2xl' />
                  </div>
                  <div className='w-9/12'>
                    <p className='text-[13px] text-[#1A1A1A] font-medium'>
                      {addon?.name} {totalItems > 1 ? `x${totalItems}` : ''}
                    </p>
                  </div>
                </div>
                <div className='w-2/12 text-right'>
                  <p className='text-[13px] text-[#1A1A1A] font-medium'>
                    {lineTotal != null ? `$${Number(lineTotal).toFixed(2)}` : '—'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Coupon Section (identical to OrderSummary) ── */}
      {!reorderPreviewLoading && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          {!couponSuccess ? (
            <>
              {!showCouponInput ? (
                <button
                  type="button"
                  onClick={() => setShowCouponInput(true)}
                  className="flex items-center gap-2 text-[13px] text-[#ED1C24] font-medium hover:text-black transition-colors cursor-pointer group"
                >
                  <RiCoupon3Line className="text-[17px] group-hover:rotate-12 transition-transform" />
                  <span className="underline underline-offset-2">Have a coupon code?</span>
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-[#1A1A1A]">Enter Coupon Code</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      placeholder="e.g. SAVE20"
                      className="flex-1 border border-[#E6E6E6] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponCode.trim()}
                      className={`px-4 py-2 rounded-lg text-[13px] font-semibold text-white transition-all ${couponLoading || !couponCode.trim()
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-[#ED1C24] hover:bg-black cursor-pointer'
                        }`}
                    >
                      {couponLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setShowCouponInput(false); setCouponCode(''); }}
                    className="text-[12px] text-gray-400 hover:text-gray-600 text-left cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          ) : (
            /* ── Applied coupon card ── */
            <div className="rounded-xl border border-green-200 bg-green-50 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 rounded-full p-1.5">
                    <RiCoupon3Line className="text-green-600 text-[14px]" />
                  </div>
                  <div>
                    <p className="text-[13px] text-green-700 font-bold tracking-wide">
                      {couponData?.couponCode}
                    </p>
                    <p className="text-[11px] text-green-500">Coupon applied successfully!</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <IoCloseCircle className="text-[18px]" />
                </button>
              </div>

              <div className="border-t border-dashed border-green-200 mx-3" />
              <div className="px-3 py-2 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-[#555]">Original Amount</p>
                  <p className="text-[12px] text-[#555]">
                    ${Number(couponData?.originalAmount).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-green-600 font-medium">
                    Discount&nbsp;
                    {couponData?.discountType === 'PERCENTAGE'
                      ? `(${couponData?.discountValue}% off)`
                      : `(-$${Number(couponData?.discountValue).toFixed(2)} fixed)`}
                  </p>
                  <p className="text-[12px] text-green-600 font-medium">
                    -${Number(couponData?.discountAmount).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-green-200">
                  <p className="text-[12px] text-green-700 font-semibold">You Pay</p>
                  <p className="text-[13px] text-green-700 font-bold">
                    ${Number(couponData?.finalAmount).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Totals ── */}
      {!reorderPreviewLoading && (
        <div className="mt-4 pt-2 border-t border-gray-200">
          <div className='flex items-center justify-between py-3 mt-2 border-t border-dashed'>
            <p className='text-[18px] text-[#1A1A1A] font-semibold'>Total:</p>
            <div className="text-right">
              {couponSuccess && couponData?.finalAmount && (
                <p className="text-[12px] text-gray-400 line-through">
                  ${Number(couponData?.originalAmount).toFixed(2)}
                </p>
              )}
              <p className='text-[18px] text-[#ED1C24] font-bold'>
                ${Number(
                  couponSuccess && couponData?.finalAmount
                    ? couponData?.finalAmount
                    : grandTotal
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Button ── */}
      <button
        type="submit"
        // onClick={(e) => {
        //   const totalQty = cartListItem?.data?.cart?.total_items || 0;
        //   if (totalQty < 24) {
        //     e.preventDefault();
        //     toast.error("A minimum of 24 hats is required to proceed. Please add more hats to continue.");
        //     return;
        //   }
        // }}
        disabled={orderLoading || reorderPreviewLoading || !reorderPreview}
        className={`text-white text-base font-semibold rounded-full w-full py-3 mt-2 transition-all flex items-center justify-center gap-2
          ${orderLoading || reorderPreviewLoading || !reorderPreview
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#ED1C24] hover:bg-black shadow-lg hover:shadow-xl cursor-pointer'
          }`}
      >
        {orderLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Placing Reorder…
          </>
        ) : (
          <>
            <FiRefreshCw size={14} />
            Place Reorder
          </>
        )}
      </button>
    </div>
  );
};

export default ReorderSummary;