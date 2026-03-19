'use client';
import React, { useEffect, useState, useRef } from "react";
import { cartList, deleteCartItem, updateCartItem } from "../reducers/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

// ─── Controlled qty input ─────────────────────────────────────────────────────
const QtyInput = ({ item, onManualChange }) => {
  const [display, setDisplay] = useState(
    item.quantity === 0 ? "" : String(item.quantity)
  );

  useEffect(() => {
    setDisplay(item.quantity === 0 ? "" : String(item.quantity));
  }, [item.quantity]);

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === "") { setDisplay(""); return; }
    const num = parseInt(raw, 10);
    if (isNaN(num) || num < 0) return;
    setDisplay(String(num));
  };

  const commit = () => {
    const num = parseInt(display, 10);
    if (isNaN(num) || num < 0 || display === "") {
      setDisplay(item.quantity === 0 ? "" : String(item.quantity));
      return;
    }
    if (num === item.quantity) return;
    onManualChange(item, num);
  };

  return (
    <input
      type="number"
      value={display}
      onChange={handleChange}
      onBlur={commit}
      onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
      placeholder="0"
      min={0}
      className="w-10 h-8 text-center text-sm font-bold text-gray-800 border-x border-gray-200 bg-white outline-none focus:bg-gray-50 transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const CartBottom = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { cartListItem } = useSelector((state) => state.cart);
  const savedUUid =
    typeof window !== "undefined" ? sessionStorage.getItem("uuid") : null;

  // ─── LOCAL STABLE STATE ───────────────────────────────────────────────────
  const [localItems, setLocalItems] = useState([]);
  const [localTotalItems, setLocalTotalItems] = useState(0);
  const [localSubtotal, setLocalSubtotal] = useState("0.00");
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (open && savedUUid) {
      dispatch(cartList({ id: savedUUid }));
    }
  }, [open, savedUUid, dispatch]);

  useEffect(() => {
    const groups = cartListItem?.data?.cart_groups || [];
    const incoming = groups.flatMap((group) => group.items);

    if (isFirstLoad.current) {
      setLocalItems(incoming);
      isFirstLoad.current = false;
    } else {
      const incomingIds = incoming.map((i) => i.id).sort().join(",");
      const localIds = localItems.map((i) => i.id).sort().join(",");
      if (incomingIds !== localIds) {
        setLocalItems(incoming);
      }
    }

    setLocalTotalItems(cartListItem?.data?.cart?.total_items || 0);
    setLocalSubtotal(cartListItem?.data?.cart?.subtotal_amount || "0.00");
  }, [cartListItem]);

  if (!open) return null;

  const charges = cartListItem?.data?.charges || [];
  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const isUploadPage = pathname === "/upload-artwork";

  // ─── SESSION SYNC ─────────────────────────────────────────────────────────
  const syncSession = (itemId, newQty) => {
    const hatQuantities = JSON.parse(sessionStorage.getItem("hatQuantities") || "{}");
    const cartItemMap = JSON.parse(sessionStorage.getItem("cartItemMap") || "{}");
    const matchedKey = Object.keys(cartItemMap).find(
      (k) => Number(cartItemMap[k]) === Number(itemId)
    );
    if (matchedKey) {
      const [groupKey, color, sizeId] = matchedKey.split("-");
      if (hatQuantities[groupKey]?.[color] !== undefined) {
        hatQuantities[groupKey][color][sizeId] = newQty;
        sessionStorage.setItem("hatQuantities", JSON.stringify(hatQuantities));
        window.dispatchEvent(new Event("hatQuantitiesChanged"));
      }
    }
  };

  // ─── DELETE ───────────────────────────────────────────────────────────────
  const handleDelete = async (item) => {
    const cartItemId = Number(item.id);

    setLocalItems((prev) => prev.filter((i) => i.id !== item.id));
    setLocalTotalItems((prev) => Math.max(0, prev - item.quantity));

    try {
      await dispatch(deleteCartItem(cartItemId));

      const cartItemMap = JSON.parse(sessionStorage.getItem("cartItemMap") || "{}");
      const hatQuantities = JSON.parse(sessionStorage.getItem("hatQuantities") || "{}");

      let matchedKey = null;
      Object.keys(cartItemMap).forEach((key) => {
        if (Number(cartItemMap[key]) === cartItemId) matchedKey = key;
      });

      if (matchedKey) {
        const [groupKey, color, sizeId] = matchedKey.split("-");
        if (hatQuantities[groupKey]?.[color]?.[sizeId] !== undefined)
          delete hatQuantities[groupKey][color][sizeId];
        if (hatQuantities[groupKey]?.[color] && Object.keys(hatQuantities[groupKey][color]).length === 0)
          delete hatQuantities[groupKey][color];
        if (hatQuantities[groupKey] && Object.keys(hatQuantities[groupKey]).length === 0)
          delete hatQuantities[groupKey];
        delete cartItemMap[matchedKey];
      }

      sessionStorage.setItem("hatQuantities", JSON.stringify(hatQuantities));
      sessionStorage.setItem("cartItemMap", JSON.stringify(cartItemMap));
      window.dispatchEvent(new Event("hatQuantitiesChanged"));
      dispatch(cartList({ id: savedUUid }));
    } catch (err) {
      console.error("Cart delete failed", err);
      setLocalItems((prev) => [...prev, item]);
      setLocalTotalItems((prev) => prev + item.quantity);
    }
  };

  // ─── INCREASE ─────────────────────────────────────────────────────────────
  const handleIncrease = async (item) => {
    const newQty = item.quantity + 1;
    setLocalItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i))
    );
    setLocalTotalItems((prev) => prev + 1);
    try {
      await dispatch(updateCartItem({ id: Number(item.id), quantity: newQty }));
      syncSession(item.id, newQty);
      dispatch(cartList({ id: savedUUid }));
    } catch (err) {
      console.error("Cart increase failed", err);
      setLocalItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, quantity: item.quantity } : i))
      );
      setLocalTotalItems((prev) => prev - 1);
    }
  };

  // ─── DECREASE ─────────────────────────────────────────────────────────────
  const handleDecrease = async (item) => {
    if (item.quantity <= 1) { handleDelete(item); return; }
    const newQty = item.quantity - 1;
    setLocalItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i))
    );
    setLocalTotalItems((prev) => prev - 1);
    try {
      await dispatch(updateCartItem({ id: Number(item.id), quantity: newQty }));
      syncSession(item.id, newQty);
      dispatch(cartList({ id: savedUUid }));
    } catch (err) {
      console.error("Cart decrease failed", err);
      setLocalItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, quantity: item.quantity } : i))
      );
      setLocalTotalItems((prev) => prev + 1);
    }
  };

  // ─── MANUAL INPUT ─────────────────────────────────────────────────────────
  const handleManualChange = async (item, newQty) => {
    const oldQty = item.quantity;
    const diff = newQty - oldQty;
    if (newQty === 0) { handleDelete(item); return; }
    setLocalItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i))
    );
    setLocalTotalItems((prev) => prev + diff);
    try {
      await dispatch(updateCartItem({ id: Number(item.id), quantity: newQty }));
      syncSession(item.id, newQty);
      dispatch(cartList({ id: savedUUid }));
    } catch (err) {
      console.error("Cart manual update failed", err);
      setLocalItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, quantity: oldQty } : i))
      );
      setLocalTotalItems((prev) => prev - diff);
    }
  };

  // ─── NEXT ACTION ──────────────────────────────────────────────────────────
  const handleAction = () => {
    onClose();
    if (!isUploadPage) {
      if (localTotalItems < 24) {
        toast.error("A minimum of 24 hats is required to proceed. Please add more hats to continue.");
        return;
      }
      router.push("/upload-artwork");
      return;
    }
    router.push("/checkout");
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 w-full bg-white z-50 rounded-t-2xl shadow-2xl flex flex-col max-h-[85vh]">

        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#ed1c24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9"/>
            </svg>
            <h2 className="text-base font-semibold text-gray-800">Your Cart</h2>
            {localTotalItems > 0 && (
              <span className="bg-[#ed1c24] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {localTotalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {localItems.length > 0 ? (
            localItems.map((item) => {
              const hatName = item?.hat?.name;
              const size = item?.variant?.size_label;
              const colorName = item?.color?.name;
              const qty = item?.quantity;
              const price = item?.unit_price;
              const image = item?.color?.primary_image_url;
              const lineTotal = (Number(price) * qty).toFixed(2);

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                >
                  {/* Image */}
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0 flex items-center justify-center">
                    {image ? (
                      <Image
                        src={base_url + image}
                        width={56}
                        height={56}
                        alt="hat"
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{hatName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{colorName} · Size {size}</p>
                    <p className="text-xs font-semibold text-[#ed1c24] mt-1">${lineTotal}</p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-[#ed1c24] transition-colors cursor-pointer"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4"/>
                        </svg>
                      </button>

                      <QtyInput item={item} onManualChange={handleManualChange} />

                      <button
                        onClick={() => handleIncrease(item)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors cursor-pointer"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/>
                        </svg>
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-400">Your cart is empty</p>
              <p className="text-xs text-gray-300 mt-1">Add some hats to get started!</p>
            </div>
          )}
        </div>

        {/* Summary + CTA — sticky at bottom */}
        {localTotalItems > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-2 bg-white">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold text-gray-800">${localSubtotal}</span>
            </div>

            {/* Charges */}
            {charges.length > 0 && (
              <>
                <div className="border-t border-dashed border-gray-100 pt-2 space-y-1.5">
                  {charges.map((charge, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">
                        {charge.name}
                        {charge.qty > 1 && <span className="ml-1 text-gray-300">×{charge.qty}</span>}
                      </span>
                      <span className="text-gray-600">${charge.line_total}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-gray-200">
                  <span className="text-sm font-semibold text-gray-800">Grand Total</span>
                  <span className="text-base font-bold text-[#ed1c24]">
                    ${cartListItem?.data?.cart?.grand_total_amount}
                  </span>
                </div>
              </>
            )}

            {/* Min qty hint */}
            {localTotalItems < 24 && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                </svg>
                <p className="text-[11px] text-amber-700 font-medium">
                  Add {24 - localTotalItems} more hat{24 - localTotalItems !== 1 ? "s" : ""} to reach minimum of 24
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
};

export default CartBottom;

// 'use client';
// import React, { useEffect } from "react";
// import { cartList } from "../reducers/CartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Image from "next/image";

// const CartBottom = ({ open, onClose }) => {
//   const dispatch = useDispatch();
//   const { cartListItem } = useSelector((state) => state.cart);
//   const savedUUid = sessionStorage.getItem("uuid");

//   useEffect(() => {
//     if (open && savedUUid) {
//       dispatch(cartList({ id: savedUUid }));
//     }
//   }, [open, savedUUid, dispatch]);

//   if (!open) return null;

//   const cartGroups = cartListItem?.data?.cart_groups || [];
//   const charges = cartListItem?.data?.charges || [];
//   const base_url =  process.env.NEXT_PUBLIC_API_BASE_URL;

//   return (
//     <>
//       {/* BACKDROP */}
//       <div
//         className="fixed inset-0 bg-black/40 z-50"
//         onClick={onClose}
//       />

//       {/* BOTTOM CART */}
//       <div className="fixed bottom-0 left-0 w-full bg-white z-50 border-t shadow-xl h-[400px] overflow-y-auto">

//         {/* CLOSE BAR */}
//         <div
//           onClick={onClose}
//           className="w-full bg-red-600 text-white text-center py-2 font-semibold cursor-pointer"
//         >
//           CLOSE
//         </div>

//         {/* ITEMS */}
//         <div className="px-4 py-3">
//           {cartGroups.length > 0 ? (
//             cartGroups.map((group) =>
//               group.items.map((item) => {
//                 const image = item?.color?.primary_image_url;
//                 return (
//                   <div
//                     key={item.id}
//                     className="flex justify-between items-center py-3"
//                   >
//                     <div className="flex gap-3 items-center">
//                       {image ? (
//                         <Image
//                           src={base_url + image}
//                           width={40}
//                           height={40}
//                           alt="product"
//                         />
//                       ) : (
//                         <div className="w-10 h-10 bg-gray-200" />
//                       )}

//                       <div>
//                         <p className="text-sm font-medium">
//                           {item?.hat?.name} - {item?.color?.name}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {item?.variant?.size_label}
//                         </p>
//                       </div>
//                     </div>

//                     <p className="text-sm font-semibold">
//                       ${item?.unit_price} x {item?.quantity}
//                     </p>
//                   </div>
//                 );
//               })
//             )
//           ) : (
//             <p className="text-center py-10 text-gray-400">
//               Cart is empty
//             </p>
//           )}
//         </div>

//         {/* SUBTOTAL & ADDONS */}
//         {cartGroups.length > 0 && (
//           <div className="px-3 py-2">
//             <div className="flex justify-between items-center text-sm text-gray-800 py-1">
//               <span>Subtotal</span>
//               <span>${cartListItem?.data?.cart?.subtotal_amount}</span>
//             </div>
//           </div>
//         )}

//         {/* PROMO / CHARGES */}
//         {charges.length > 0 && (
//           <div className="px-4 py-3">
//             <h3 className="text-sm font-semibold mb-1">Charges</h3>
//             {charges.map((charge, idx) => (
//               <div
//                 key={idx}
//                 className="flex justify-between text-sm py-1"
//               >
//                 <span>{charge.name}</span>
//                 <span>${charge.line_total}</span>
//               </div>
//             ))}
//           </div>
//         )}
//         {cartGroups.length > 0 && (
//           <div className="flex justify-between items-center text-sm font-semibold text-gray-900 p-2">
//             <span>Grand Total</span>
//             <span>${cartListItem?.data?.cart?.grand_total_amount}</span>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartBottom;
