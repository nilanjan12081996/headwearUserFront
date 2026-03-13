// 'use client';
// import Image from "next/image"
// import { CgFileDocument } from "react-icons/cg"
// import { useDispatch, useSelector } from "react-redux";
// import { saveOrder } from "../reducers/CheckoutSlice";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { RiCoupon3Line } from "react-icons/ri";
// import { IoCloseCircle } from "react-icons/io5";

// const OrderSummary = ({ cust_id, billingId, shippingId, artworkId, orderLoading, setOrderLoading }) => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { cartListItem } = useSelector((state) => state?.cart);

//   const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

//   // Coupon states
//   const [showCouponInput, setShowCouponInput] = useState(false);
//   const [couponCode, setCouponCode] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [couponLoading, setCouponLoading] = useState(false);

//   const handleApplyCoupon = () => {
//     if (!couponCode.trim()) return;
//     setCouponLoading(true);
//     // TODO: connect to coupon API
//     setTimeout(() => {
//       setCouponLoading(false);
//       // Placeholder: treat any code as applied (replace with real API call)
//       setAppliedCoupon(couponCode.trim());
//       toast.success("Coupon applied successfully!");
//     }, 800);
//   };

//   const handleRemoveCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponCode("");
//     setShowCouponInput(false);
//   };

//   return (
//     <>
//       <div className='lg:w-4/12 border border-[#E6E6E6] rounded-[10px] p-4'>
//         <h3 className='text-[22px] font-semibold text-[#1A1A1A] pb-4'>Order Summary</h3>

//         <div className="max-h-[400px] overflow-y-auto !overflow-x-hidden pr-2">
//           {/* -------- CART GROUPS & ITEMS -------- */}
//           {cartListItem?.data?.cart_groups?.map((group, groupIdx) => (
//             <div key={groupIdx}>
//               {group?.items?.map((item, itemIdx) => (
//                 <div key={item.id} className='mb-4 flex items-center gap-2 border-b border-gray-50 pb-2'>
//                   <div className='w-10/12 flex items-center gap-2'>
//                     <div className='w-3/12'>
//                       <Image
//                         src={`${base_url}${item?.color?.primary_image_url || item?.hat?.primary_image_url}`}
//                         width={50}
//                         height={50}
//                         alt={item?.hat?.name || "Hat"}
//                         className='rounded-md object-cover'
//                       />
//                     </div>

//                     <div className='w-9/12'>
//                       <p className='text-[14px] text-[#1A1A1A] font-medium'>
//                         {item?.hat?.name}
//                       </p>
//                       <div className='flex flex-wrap items-center gap-2 mt-1'>
//                         <span className='text-[12px] bg-gray-100 px-2 py-0.5 rounded text-[#555]'>
//                           Qty: {item?.quantity}
//                         </span>
//                         <p className='text-[12px] text-[#666]'>
//                           Size: {item?.variant?.size_label || "N/A"}
//                         </p>
//                         <p className='text-[12px] text-[#666]'>
//                           Color: {item?.color?.name || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className='w-2/12 text-right'>
//                     <p className='text-[14px] text-[#1A1A1A] font-medium'>
//                       ${Number(item?.line_total || (item?.unit_price * item?.quantity)).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}

//           {/* -------- CHARGES (Artwork, Shipping, etc) -------- */}
//           {cartListItem?.data?.charges?.map((charge, i) => (
//             <div key={i} className='mb-4 flex items-center gap-2 opacity-80'>
//               <div className='w-10/12 flex items-center gap-1'>
//                 <div className='w-3/12 flex justify-center items-center'>
//                   <CgFileDocument className='text-[#ed1c24] text-2xl' />
//                 </div>
//                 <div className='w-9/12'>
//                   <p className='text-[13px] text-[#1A1A1A] font-medium'>
//                     {charge?.name} {charge?.qty > 1 ? `x${charge?.qty}` : ''}
//                   </p>
//                 </div>
//               </div>
//               <div className='w-2/12 text-right'>
//                 <p className='text-[13px] text-[#1A1A1A] font-medium'>
//                   ${Number(charge?.line_total).toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* -------- COUPON CODE SECTION -------- */}
//         <div className="mt-4 pt-3 border-t border-gray-200">
//           {!appliedCoupon ? (
//             <>
//               {!showCouponInput ? (
//                 <button
//                   type="button"
//                   onClick={() => setShowCouponInput(true)}
//                   className="flex items-center gap-2 text-[13px] text-[#ED1C24] font-medium hover:text-black transition-colors cursor-pointer group"
//                 >
//                   <RiCoupon3Line className="text-[17px] group-hover:rotate-12 transition-transform" />
//                   <span className="underline underline-offset-2">Have a coupon code?</span>
//                 </button>
//               ) : (
//                 <div className="flex flex-col gap-2">
//                   <label className="text-[13px] font-medium text-[#1A1A1A]">Enter Coupon Code</label>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="text"
//                       value={couponCode}
//                       onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                       onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
//                       placeholder="e.g. SAVE20"
//                       className="flex-1 border border-[#E6E6E6] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleApplyCoupon}
//                       disabled={couponLoading || !couponCode.trim()}
//                       className={`px-4 py-2 rounded-lg text-[13px] font-semibold text-white transition-all ${couponLoading || !couponCode.trim()
//                           ? "bg-gray-300 cursor-not-allowed"
//                           : "bg-[#ED1C24] hover:bg-black cursor-pointer"
//                         }`}
//                     >
//                       {couponLoading ? "..." : "Apply"}
//                     </button>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => { setShowCouponInput(false); setCouponCode(""); }}
//                     className="text-[12px] text-gray-400 hover:text-gray-600 text-left cursor-pointer transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
//               <div className="flex items-center gap-2">
//                 <RiCoupon3Line className="text-green-600 text-[16px]" />
//                 <div>
//                   <p className="text-[12px] text-green-700 font-semibold">{appliedCoupon}</p>
//                   <p className="text-[11px] text-green-500">Coupon applied!</p>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 onClick={handleRemoveCoupon}
//                 className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
//               >
//                 <IoCloseCircle className="text-[18px]" />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* -------- TOTALS -------- */}
//         <div className="mt-4 pt-2 border-t border-gray-200">
//           <div className='flex items-center justify-between py-1'>
//             <p className='text-[14px] text-[#666]'>Subtotal:</p>
//             <p className='text-[14px] text-[#1A1A1A] font-medium'>
//               ${Number(cartListItem?.data?.cart?.subtotal_amount).toFixed(2)}
//             </p>
//           </div>

//           {cartListItem?.data?.cart?.addons_amount > 0 && (
//             <div className='flex items-center justify-between py-1'>
//               <p className='text-[14px] text-[#666]'>Add-ons:</p>
//               <p className='text-[14px] text-[#1A1A1A] font-medium'>
//                 ${Number(cartListItem?.data?.cart?.addons_amount).toFixed(2)}
//               </p>
//             </div>
//           )}

//           <div className='flex items-center justify-between py-3 mt-2 border-t border-dashed'>
//             <p className='text-[18px] text-[#1A1A1A] font-semibold'>Total:</p>
//             <p className='text-[18px] text-[#ED1C24] font-bold'>
//               ${Number(cartListItem?.data?.cart?.grand_total_amount).toFixed(2)}
//             </p>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className={`text-white text-base font-semibold rounded-full w-full py-3 mt-2 transition-all cursor-pointer ${orderLoading ? 'bg-gray-400' : 'bg-[#ED1C24] hover:bg-black shadow-lg hover:shadow-xl'}`}
//           disabled={orderLoading}
//         >
//           {orderLoading ? "Placing Order..." : "Order Now"}
//         </button>
//       </div>
//     </>
//   )
// }
// export default OrderSummary


'use client';
import Image from "next/image"
import { CgFileDocument } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux";
import { saveOrder } from "../reducers/CheckoutSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiCoupon3Line } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import { applyCoupon, clearCouponState } from "../reducers/OrdersSlice";

const OrderSummary = ({ cust_id, billingId, shippingId, artworkId, orderLoading, setOrderLoading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartListItem } = useSelector((state) => state?.cart);
  const { couponLoading, couponSuccess, couponData } = useSelector((state) => state?.order);

  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    const grandTotalAmount = Number(cartListItem?.data?.cart?.grand_total_amount) || 0;
    const result = await dispatch(applyCoupon({ coupon: couponCode.trim(), grandTotalAmount }));
    if (applyCoupon.fulfilled.match(result)) {
      setShowCouponInput(false);
    } else {
      toast.error(result?.payload || "Invalid coupon code.");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(clearCouponState());
    setCouponCode("");
    setShowCouponInput(false);
  };

  return (
    <>
      <div className='lg:w-4/12 border border-[#E6E6E6] rounded-[10px] p-4'>
        <h3 className='text-[22px] font-semibold text-[#1A1A1A] pb-4'>Order Summary</h3>

        <div className="max-h-[400px] overflow-y-auto !overflow-x-hidden pr-2">
          {/* -------- CART GROUPS & ITEMS -------- */}
          {cartListItem?.data?.cart_groups?.map((group, groupIdx) => (
            <div key={groupIdx}>
              {group?.items?.map((item, itemIdx) => (
                <div key={item.id} className='mb-4 flex items-center gap-2 border-b border-gray-50 pb-2'>
                  <div className='w-10/12 flex items-center gap-2'>
                    <div className='w-3/12'>
                      <Image
                        src={`${base_url}${item?.color?.primary_image_url || item?.hat?.primary_image_url}`}
                        width={50}
                        height={50}
                        alt={item?.hat?.name || "Hat"}
                        className='rounded-md object-cover'
                      />
                    </div>

                    <div className='w-9/12'>
                      <p className='text-[14px] text-[#1A1A1A] font-medium'>
                        {item?.hat?.name}
                      </p>
                      <div className='flex flex-wrap items-center gap-2 mt-1'>
                        <span className='text-[12px] bg-gray-100 px-2 py-0.5 rounded text-[#555]'>
                          Qty: {item?.quantity}
                        </span>
                        <p className='text-[12px] text-[#666]'>
                          Size: {item?.variant?.size_label || "N/A"}
                        </p>
                        <p className='text-[12px] text-[#666]'>
                          Color: {item?.color?.name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='w-2/12 text-right'>
                    <p className='text-[14px] text-[#1A1A1A] font-medium'>
                      ${Number(item?.line_total || (item?.unit_price * item?.quantity)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* -------- CHARGES (Artwork, Shipping, etc) -------- */}
          {cartListItem?.data?.charges?.map((charge, i) => (
            <div key={i} className='mb-4 flex items-center gap-2 opacity-80'>
              <div className='w-10/12 flex items-center gap-1'>
                <div className='w-3/12 flex justify-center items-center'>
                  <CgFileDocument className='text-[#ed1c24] text-2xl' />
                </div>
                <div className='w-9/12'>
                  <p className='text-[13px] text-[#1A1A1A] font-medium'>
                    {charge?.name} {charge?.qty > 1 ? `x${charge?.qty}` : ''}
                  </p>
                </div>
              </div>
              <div className='w-2/12 text-right'>
                <p className='text-[13px] text-[#1A1A1A] font-medium'>
                  ${Number(charge?.line_total).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* -------- COUPON CODE SECTION -------- */}
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
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                      placeholder="e.g. SAVE20"
                      className="flex-1 border border-[#E6E6E6] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading || !couponCode.trim()}
                      className={`px-4 py-2 rounded-lg text-[13px] font-semibold text-white transition-all ${
                        couponLoading || !couponCode.trim()
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-[#ED1C24] hover:bg-black cursor-pointer"
                      }`}
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setShowCouponInput(false); setCouponCode(""); }}
                    className="text-[12px] text-gray-400 hover:text-gray-600 text-left cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          ) : (
            /* ---- Applied coupon card ---- */
            <div className="rounded-xl border border-green-200 bg-green-50 overflow-hidden">
              {/* top row */}
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

              {/* breakdown */}
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

        {/* -------- TOTALS -------- */}
        <div className="mt-4 pt-2 border-t border-gray-200">
          <div className='flex items-center justify-between py-1'>
            <p className='text-[14px] text-[#666]'>Subtotal:</p>
            <p className='text-[14px] text-[#1A1A1A] font-medium'>
              ${Number(cartListItem?.data?.cart?.subtotal_amount).toFixed(2)}
            </p>
          </div>

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
                    : cartListItem?.data?.cart?.grand_total_amount
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`text-white text-base font-semibold rounded-full w-full py-3 mt-2 transition-all cursor-pointer ${orderLoading ? 'bg-gray-400' : 'bg-[#ED1C24] hover:bg-black shadow-lg hover:shadow-xl'}`}
          disabled={orderLoading}
        >
          {orderLoading ? "Placing Order..." : "Order Now"}
        </button>
      </div>
    </>
  )
}
export default OrderSummary