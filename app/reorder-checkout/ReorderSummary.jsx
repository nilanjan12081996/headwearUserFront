'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import { FiRefreshCw } from 'react-icons/fi';
import { CgFileDocument } from 'react-icons/cg';

const ReorderSummary = ({ orderLoading }) => {
  const { reorderPreview, reorderPreviewLoading } = useSelector((state) => state.order ?? {});
  const { cartListItem } = useSelector((state) => state?.cart);

  const base_url   = process.env.NEXT_PUBLIC_API_BASE_URL;
  const groups     = reorderPreview?.orderDetails?.groups ?? [];
  const hatImages  = reorderPreview?.hatImages ?? [];
  const artwork    = reorderPreview?.artworkConfig ?? null;
  const grandTotal = reorderPreview?.orderDetails?.grandTotalAmount ?? 0;

  // ── Build a flat cart-item lookup: index across all cart groups → size_label
  // Cart groups and reorder groups are in the same order; items within each group too.
  const cartItems = (cartListItem?.data?.cart_groups ?? []).flatMap(
    (g) => g.items ?? []
  );

  // ── Get first image for a hatColorId
  const getImageByColorId = (hatColorId) => {
    const img = hatImages.find((h) => h.hatColorId === hatColorId);
    return img ? `${base_url}${img.imageUrl}` : null;
  };

  // ── Resolve items with color image + size from cart
  let cartItemIdx = 0;
  const resolvedItems = groups.flatMap((group) =>
    (group.items ?? []).map((item, idx) => {
      const color     = group.hatColors?.[idx] ?? null;
      const colorId   = color?.id ?? 0;
      const cartItem  = cartItems[cartItemIdx++] ?? null;
      const sizeLabel = cartItem?.variant?.size_label ?? 'OSFM';
      return {
        ...item,
        hatName:   group.hatName,
        colorName: color?.name ?? 'N/A',
        imgSrc:    getImageByColorId(colorId),
        sizeLabel,
      };
    })
  );

  const totalItems = resolvedItems.reduce((s, i) => s + (i.quantity ?? 0), 0);

  // ── addons from artworkConfig.addons[]
  const addons = artwork?.addons ?? [];

  // ── Get effective unit price for a given addon & qty (find matching tier)
  const getAddonPrice = (addon) => {
    const tiers = addon?.decorationAddon?.priceTiers ?? [];
    if (!tiers.length) return null;
    const tier = tiers.find(
      (t) => totalItems >= t.minQty && totalItems <= t.maxQty
    ) ?? tiers[0];
    return tier?.unitPrice ?? null;
  };

  // ── format helpers
  const formatPlacement = (str) =>
    str
      ? str.split(',').map((p) => p.trim().replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())).join(', ')
      : 'N/A';
  const formatEmbroidery = (str) =>
    str ? str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'N/A';

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

          {/* ── Hat items — exact OrderSummary style ── */}
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

          {/* ── Addon charges from artworkConfig.addons ── */}
          {addons.map((addonEntry) => {
            const addon      = addonEntry?.decorationAddon;
            const unitPrice  = getAddonPrice(addonEntry);
            const lineTotal  = unitPrice != null ? unitPrice * totalItems : null;
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

      {/* ── Totals ── */}
      {!reorderPreviewLoading && (
        <div className="mt-4 pt-2 border-t border-gray-200">
          {cartListItem?.data?.cart?.subtotal_amount > 0 && (
            <div className='flex items-center justify-between py-1'>
              <p className='text-[14px] text-[#666]'>Subtotal:</p>
              <p className='text-[14px] text-[#1A1A1A] font-medium'>
                ${Number(cartListItem?.data?.cart?.subtotal_amount).toFixed(2)}
              </p>
            </div>
          )}
          {cartListItem?.data?.cart?.addons_amount > 0 && (
            <div className='flex items-center justify-between py-1'>
              <p className='text-[14px] text-[#666]'>Add-ons:</p>
              <p className='text-[14px] text-[#1A1A1A] font-medium'>
                ${Number(cartListItem?.data?.cart?.addons_amount).toFixed(2)}
              </p>
            </div>
          )}
          <div className='flex items-center justify-between py-3 mt-2 border-t border-dashed'>
            <p className='text-[18px] text-[#1A1A1A] font-semibold'>Total:</p>
            <p className='text-[18px] text-[#ED1C24] font-bold'>
              ${Number(grandTotal).toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* ── Button ── */}
      <button
        type="submit"
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