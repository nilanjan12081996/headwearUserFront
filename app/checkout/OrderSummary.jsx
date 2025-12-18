'use client';
import Image from "next/image"
import { CgFileDocument } from "react-icons/cg"
import small_cap from "../assets/imagesource/small_cap.png";
import { useDispatch, useSelector } from "react-redux";
import { saveOrder } from "../reducers/CheckoutSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const OrderSummary = ({ cust_id, billingId, shippingId, artworkId, orderLoading, setOrderLoading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartListItem } = useSelector((state) => state?.cart);

  const savedCardId = sessionStorage.getItem('cartId')
  const cart_id = sessionStorage.getItem("cart_id")
  // const handleOrderNow = async () => {
  //   if (orderLoading) return;
  //   if (!billingId || !shippingId) {
  //     toast.error("Please complete billing & shipping address");
  //     return;
  //   }
  //   const orderData = {
  //     cart_id: cart_id,
  //     billing_address_id: billingId,
  //     shipping_address_id: shippingId,
  //     shipping_method_id: 1,
  //     artwork_config_id: artworkId,
  //   };

  //   try {
  //     setOrderLoading(true);
  //      await dispatch(saveOrder(orderData)).unwrap();

  //     sessionStorage.removeItem("cartId");
  //     sessionStorage.removeItem("cart_id");
  //     sessionStorage.removeItem("cartItemMap");
  //     sessionStorage.removeItem("hatQuantities");
  //     sessionStorage.removeItem("uuid")

  //     toast.success("Order placed successfully!");
  //     setTimeout(() => {
  //       router.push("/order-confirm");
  //     }, 2500);
  //   } catch (error) {
  //     console.error("Order failed:", error);
  //     toast.error("Failed to place order. Please try again.");
  //   }
  // };
  const base_url = "https://arsalaanrasulshowmeropi.bestworks.cloud";
  return (
    <>
      <div className='lg:w-4/12 border border-[#E6E6E6] rounded-[10px] p-4'>
        <h3 className='text-[22px] font-semibold text-[#1A1A1A] pb-4'>Order Summary</h3>

        <div>

          {/* -------- CART GROUPS (PRODUCTS) -------- */}
          {cartListItem?.data?.cart_groups?.map((group, i) => (
            <div key={i} className='mb-4 flex items-center gap-2'>
              <div className='w-10/12 flex items-center gap-1'>
                <div className='w-3/12'>
                  <Image
                    src={base_url + group?.hat?.primary_image_url}
                    width={40}
                    height={40}
                    alt={group?.hat?.name}
                    className='w-full rounded-md'
                  />
                </div>

                <div className='w-9/12'>
                  <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
                    {group?.hat?.name} x{group?.group_qty}
                  </p>

                  <div className='flex items-center gap-4'>
                    <p className='text-[12px] text-[#1A1A1A]'>
                      Size: {group?.items?.[0]?.variant?.size_label || "N/A"}
                    </p>
                    <p className='text-[12px] text-[#1A1A1A]'>
                      Color: {group?.items?.[0]?.color?.name || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className='w-2/12'>
                <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
                  ${Number(group?.group_subtotal).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* -------- CHARGES (Artwork, Shipping, etc) -------- */}
          {cartListItem?.data?.charges?.map((charge, i) => (
            <div key={i} className='mb-4 flex items-center gap-2'>
              <div className='w-10/12 flex items-center gap-1'>
                <div className='w-3/12 flex justify-center items-center'>
                  <CgFileDocument className='text-[#ed1c24] text-3xl' />
                </div>
                <div className='w-9/12'>
                  <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
                    {charge?.name} x{charge?.qty}
                  </p>
                </div>
              </div>

              <div className='w-2/12'>
                <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
                  ${Number(charge?.line_total).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* -------- TOTALS -------- */}
        <div>
          <div className='flex items-center justify-between border-b border-[#e9e9e9] py-2 mb-2'>
            <p className='text-[14px] text-[#1A1A1A] pb-1 font-normal'>Subtotal:</p>
            <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
              ${Number(cartListItem?.data?.cart?.subtotal_amount).toFixed(2)}
            </p>
          </div>

          {cartListItem?.data?.charges?.map((charge, i) => (
            <div key={i} className='flex items-center justify-between border-b border-[#e9e9e9] py-2 mb-2'>
              <p className='text-[14px] text-[#1A1A1A] pb-1 font-normal'>
                {charge?.name}:
              </p>
              <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>
                ${Number(charge?.line_total).toFixed(2)}
              </p>
            </div>
          ))}

          <div className='flex items-center justify-between py-2 mb-2'>
            <p className='text-[18px] text-[#1A1A1A] pb-1 font-normal'>Total:</p>
            <p className='text-[18px] text-[#1A1A1A] pb-1 font-bold'>
              ${Number(cartListItem?.data?.cart?.grand_total_amount).toFixed(2)}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className={`text-white text-base rounded-full w-full py-3 cursor-pointer ${orderLoading ? 'bg-gray-400' : 'bg-[#ED1C24] hover:bg-black'}`}
          disabled={orderLoading}
        >
          {orderLoading ? "Placing Order..." : "Order Now"}
        </button>

      </div>

    </>
  )
}
export default OrderSummary