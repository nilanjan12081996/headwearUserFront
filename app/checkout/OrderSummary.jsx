// 'use client';
// import Image from "next/image"
// import { CgFileDocument } from "react-icons/cg"
// import small_cap from "../assets/imagesource/small_cap.png";
// import { useDispatch, useSelector } from "react-redux";
// import { saveOrder } from "../reducers/CheckoutSlice";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// const OrderSummary = ({ cust_id, billingId, shippingId, artworkId, orderLoading, setOrderLoading }) => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { cartListItem } = useSelector((state) => state?.cart);

//   const savedCardId = sessionStorage.getItem('cartId')
//   const cart_id = sessionStorage.getItem("cart_id")
//   const base_url =  process.env.NEXT_PUBLIC_API_BASE_URL;
//   return (
//     <>
//       <div className='lg:w-4/12 border border-[#E6E6E6] rounded-[10px] p-4'>
//         <h3 className='text-[22px] font-semibold text-[#1A1A1A] pb-4'>Order Summary</h3>

//         <div>

//           {/* -------- CART GROUPS (PRODUCTS) -------- */}
//           {cartListItem?.data?.cart_groups?.map((group, i) => (
//             <div key={i} className='mb-4 flex items-center gap-2'>
//               <div className='w-10/12 flex items-center gap-1'>
//                 <div className='w-3/12'>
//                   {/* <Image
//                     src={base_url + group?.hat?.primary_image_url}
//                     width={40}
//                     height={40}
//                     alt={group?.hat?.name}
//                     className='w-full rounded-md'
//                   /> */}
//                     <Image
//                      src={`${base_url}${group?.items?.[0]?.hat?.primary_image_url}`}
//                       width={40}
//                       height={40}
//                       alt="Hat"
//                     />
//                 </div>

//                 <div className='w-9/12'>
//                   <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
//                     {group?.hat?.name} x{group?.group_qty}
//                   </p>

//                   <div className='flex items-center gap-4'>
//                     <p className='text-[12px] text-[#1A1A1A]'>
//                       Size: {group?.items?.[0]?.variant?.size_label || "N/A"}
//                     </p>
//                     <p className='text-[12px] text-[#1A1A1A]'>
//                       Color: {group?.items?.[0]?.color?.name || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className='w-2/12'>
//                 <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
//                   ${Number(group?.group_subtotal).toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {/* -------- CHARGES (Artwork, Shipping, etc) -------- */}
//           {cartListItem?.data?.charges?.map((charge, i) => (
//             <div key={i} className='mb-4 flex items-center gap-2'>
//               <div className='w-10/12 flex items-center gap-1'>
//                 <div className='w-3/12 flex justify-center items-center'>
//                   <CgFileDocument className='text-[#ed1c24] text-3xl' />
//                 </div>
//                 <div className='w-9/12'>
//                   <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
//                     {charge?.name} x{charge?.qty}
//                   </p>
//                 </div>
//               </div>

//               <div className='w-2/12'>
//                 <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
//                   ${Number(charge?.line_total).toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           ))}

//         </div>

//         {/* -------- TOTALS -------- */}
//         <div>
//           <div className='flex items-center justify-between border-b border-[#e9e9e9] py-2 mb-2'>
//             <p className='text-[14px] text-[#1A1A1A] pb-1 font-normal'>Subtotal:</p>
//             <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
//               ${Number(cartListItem?.data?.cart?.subtotal_amount).toFixed(2)}
//             </p>
//           </div>
//           <div className='flex items-center justify-between border-b border-[#e9e9e9] py-2 mb-2'>
//             <p className='text-[14px] text-[#1A1A1A] pb-1 font-normal'>Add-ons:</p>
//             <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
//               <span>${cartListItem?.data?.cart?.addons_amount}</span>
//             </p>
//           </div>

//           {/* {cartListItem?.data?.charges?.map((charge, i) => (
//             <div key={i} className='flex items-center justify-between border-b border-[#e9e9e9] py-2 mb-2'>
//               <p className='text-[14px] text-[#1A1A1A] pb-1 font-normal'>
//                 {charge?.name}:
//               </p>
//               <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
//                 ${Number(charge?.line_total).toFixed(2)}
//               </p>
//             </div>
//           ))} */}

//           <div className='flex items-center justify-between py-2 mb-2'>
//             <p className='text-[18px] text-[#1A1A1A] pb-1 font-normal'>Total:</p>
//             <p className='text-[18px] text-[#1A1A1A] pb-1 font-bold'>
//               ${Number(cartListItem?.data?.cart?.grand_total_amount).toFixed(2)}
//             </p>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className={`text-white text-base rounded-full w-full py-3 cursor-pointer ${orderLoading ? 'bg-gray-400' : 'bg-[#ED1C24] hover:bg-black'}`}
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

const OrderSummary = ({ cust_id, billingId, shippingId, artworkId, orderLoading, setOrderLoading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartListItem } = useSelector((state) => state?.cart);

  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

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
            <p className='text-[18px] text-[#ED1C24] font-bold'>
              ${Number(cartListItem?.data?.cart?.grand_total_amount).toFixed(2)}
            </p>
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