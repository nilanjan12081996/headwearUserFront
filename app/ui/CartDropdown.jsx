import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useCartActions } from "../hooks/useCartActions";

// ─── Spinner ──────────────────────────────────────────────────────────────────
const Spinner = () => (
  <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin inline-block" />
);

// ─── QtyInput with loading ────────────────────────────────────────────────────
const QtyInput = ({ item, onManualChange, onIncrease, onDecrease }) => {
  const [display, setDisplay] = useState(
    item.quantity === 0 ? "" : String(item.quantity)
  );
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    setDisplay(item.quantity === 0 ? "" : String(item.quantity));
  }, [item.quantity]);

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === "") { setDisplay(""); return; }
    const num = parseInt(raw, 10);
    if (isNaN(num) || num < 0) return;
    setDisplay(String(num));

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (num !== item.quantity) {
        setLoading(true);
        try { await onManualChange(item, num); } finally { setLoading(false); }
      }
    }, 500);
  };

  const handleBlur = async () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
      const num = display === "" ? 0 : parseInt(display, 10);
      if (!isNaN(num) && num !== item.quantity) {
        setLoading(true);
        try { await onManualChange(item, num); } finally { setLoading(false); }
      } else {
        setDisplay(item.quantity === 0 ? "" : String(item.quantity));
      }
    }
  };

  const handleIncrease = async () => {
    if (loading) return;
    setLoading(true);
    try { await onIncrease(item); } finally { setLoading(false); }
  };

  const handleDecrease = async () => {
    if (loading) return;
    setLoading(true);
    try { await onDecrease(item); } finally { setLoading(false); }
  };

  return (
    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={handleDecrease}
        disabled={loading}
        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-[#ed1c24] transition-colors cursor-pointer disabled:opacity-50"
      >
        {loading ? <Spinner /> : (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4"/>
          </svg>
        )}
      </button>

      <input
        type="number"
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
        disabled={loading}
        placeholder="0"
        min={0}
        className="w-10 h-7 text-center text-sm font-bold text-gray-800 border-x border-gray-200 bg-white outline-none focus:bg-gray-50 transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none disabled:bg-gray-50"
      />

      <button
        onClick={handleIncrease}
        disabled={loading}
        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors cursor-pointer disabled:opacity-50"
      >
        {loading ? <Spinner /> : (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/>
          </svg>
        )}
      </button>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const CartDropdown = ({ open, onClose }) => {
  if (!open) return null;

  const router = useRouter();
  const pathname = usePathname();
  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const isUploadPage = pathname === "/upload-artwork";

  const {
    localItems,
    localTotalItems,
    localSubtotal,
    charges,
    grandTotal,
    handleIncrease,
    handleDecrease,
    handleManualChange,
    handleDelete,
  } = useCartActions({ open });

  // const handleAction = () => {
  //   onClose();
  //   if (!isUploadPage) {
  //     if (localTotalItems < 24) {
  //       toast.error("A minimum of 24 hats is required to proceed. Please add more hats to continue.");
  //       return;
  //     }
  //     router.push("/upload-artwork");
  //     return;
  //   }
  //   router.push("/checkout");
  // };

  const handleAction = () => {
    if (localTotalItems < 24) {
        toast.error("A minimum of 24 hats is required to proceed.");
        return;
    }

    // hat.id দিয়ে group করো
    const hatTotals = {};
    localItems.forEach((item) => {
        const hatId = item?.hat?.id;
        const hatName = item?.hat?.name;
        if (!hatId) return;
        if (!hatTotals[hatId]) hatTotals[hatId] = { name: hatName, qty: 0 };
        hatTotals[hatId].qty += item.quantity || 0;
    });

    const invalidHats = Object.values(hatTotals).filter(h => h.qty > 0 && h.qty < 24);

    if (invalidHats.length > 0) {
        toast.error(
            `These hats need minimum 24 items: ${invalidHats.map(h => `${h.name} (${h.qty}/24)`).join(", ")}`,
            { autoClose: 5000 }
        );
        return;
    }

    onClose();
    if (!isUploadPage) {
        router.push("/upload-artwork");
        return;
    }
    router.push("/checkout");
};
  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40" onClick={onClose} />

      <div className="absolute right-0 mt-3 w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
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
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="max-h-[320px] overflow-y-auto px-4 py-3 space-y-3">
          {localItems.length > 0 ? (
            localItems.map((item) => {
              const qty = item?.quantity;
              const price = item?.unit_price;
              const image = item?.color?.primary_image_url;
              const lineTotal = (Number(price) * qty).toFixed(2);

              return (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0 flex items-center justify-center">
                    {image ? (
                      <Image src={base_url + image} width={48} height={48} alt="hat" className="object-contain w-full h-full" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item?.hat?.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item?.color?.name} · Size {item?.variant?.size_label}</p>
                    <p className="text-xs font-semibold text-[#ed1c24] mt-1">${lineTotal}</p>
                  </div>

                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <QtyInput
                      item={item}
                      onManualChange={handleManualChange}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                    />
                    <button onClick={() => handleDelete(item)} className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer" title="Remove item">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
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

        {/* Summary */}
        {localTotalItems > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold text-gray-800">${localSubtotal}</span>
            </div>
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
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-sm font-semibold text-gray-800">Grand Total</span>
                  <span className="text-base font-bold text-[#ed1c24]">${grandTotal}</span>
                </div>
              </>
            )}
            {localTotalItems < 24 && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-1">
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

        {/* CTA */}
        {localTotalItems > 0 && (
          <div className="px-5 pb-4 pt-2">
            <button
              onClick={handleAction}
              className="w-full flex items-center justify-center gap-2 bg-[#ed1c24] hover:bg-[#c51920] active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-red-100"
            >
              {isUploadPage ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                  Proceed to Checkout
                </>
              ) : (
                <>
                  Continue Order
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDropdown;

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter, usePathname } from "next/navigation";
// import { toast } from "react-toastify";
// import { useCartActions } from "../hooks/useCartActions";

// // ─── Controlled qty input ─────────────────────────────────────────────────────
// const QtyInput = ({ item, onManualChange }) => {
//   const [display, setDisplay] = useState(
//     item.quantity === 0 ? "" : String(item.quantity)
//   );

//   useEffect(() => {
//     setDisplay(item.quantity === 0 ? "" : String(item.quantity));
//   }, [item.quantity]);

//   const handleChange = (e) => {
//     const raw = e.target.value;
//     if (raw === "") { setDisplay(""); return; }
//     const num = parseInt(raw, 10);
//     if (isNaN(num) || num < 0) return;
//     setDisplay(String(num));
//   };

//   const commit = () => {
//     const num = parseInt(display, 10);
//     if (isNaN(num) || num < 0 || display === "") {
//       setDisplay(item.quantity === 0 ? "" : String(item.quantity));
//       return;
//     }
//     if (num === item.quantity) return;
//     onManualChange(item, num);
//   };

//   return (
//     <input
//       type="number"
//       value={display}
//       onChange={handleChange}
//       onBlur={commit}
//       onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
//       placeholder="0"
//       min={0}
//       className="w-10 h-7 text-center text-sm font-bold text-gray-800 border-x border-gray-200 bg-white outline-none focus:bg-gray-50 transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//     />
//   );
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// const CartDropdown = ({ open, onClose }) => {
//   if (!open) return null;

//   const router = useRouter();
//   const pathname = usePathname();
//   const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
//   const isUploadPage = pathname === "/upload-artwork";

//   const {
//     localItems,
//     localTotalItems,
//     localSubtotal,
//     charges,
//     grandTotal,
//     handleIncrease,
//     handleDecrease,
//     handleManualChange,
//     handleDelete,
//   } = useCartActions({ open });

//   const handleAction = () => {
//     onClose();
//     if (!isUploadPage) {
//       if (localTotalItems < 24) {
//         toast.error("A minimum of 24 hats is required to proceed. Please add more hats to continue.");
//         return;
//       }
//       router.push("/upload-artwork");
//       return;
//     }
//     router.push("/checkout");
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40" onClick={onClose} />

//       <div className="absolute right-0 mt-3 w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">

//         {/* Header */}
//         <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
//           <div className="flex items-center gap-2">
//             <svg className="w-5 h-5 text-[#ed1c24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9"/>
//             </svg>
//             <h2 className="text-base font-semibold text-gray-800">Your Cart</h2>
//             {localTotalItems > 0 && (
//               <span className="bg-[#ed1c24] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
//                 {localTotalItems}
//               </span>
//             )}
//           </div>
//           <button
//             onClick={onClose}
//             className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
//             </svg>
//           </button>
//         </div>

//         {/* Items */}
//         <div className="max-h-[320px] overflow-y-auto px-4 py-3 space-y-3">
//           {localItems.length > 0 ? (
//             localItems.map((item) => {
//               const qty = item?.quantity;
//               const price = item?.unit_price;
//               const image = item?.color?.primary_image_url;
//               const lineTotal = (Number(price) * qty).toFixed(2);

//               return (
//                 <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
//                   <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200 flex-shrink-0 flex items-center justify-center">
//                     {image ? (
//                       <Image src={base_url + image} width={48} height={48} alt="hat" className="object-contain w-full h-full" />
//                     ) : (
//                       <div className="w-full h-full bg-gray-100 rounded-lg" />
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-gray-800 truncate">{item?.hat?.name}</p>
//                     <p className="text-xs text-gray-400 mt-0.5">{item?.color?.name} · Size {item?.variant?.size_label}</p>
//                     <p className="text-xs font-semibold text-[#ed1c24] mt-1">${lineTotal}</p>
//                   </div>

//                   <div className="flex flex-col items-center gap-2 flex-shrink-0">
//                     <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
//                       <button
//                         onClick={() => handleDecrease(item)}
//                         className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-[#ed1c24] transition-colors cursor-pointer"
//                       >
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4"/>
//                         </svg>
//                       </button>
//                       <QtyInput item={item} onManualChange={handleManualChange} />
//                       <button
//                         onClick={() => handleIncrease(item)}
//                         className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors cursor-pointer"
//                       >
//                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/>
//                         </svg>
//                       </button>
//                     </div>
//                     <button onClick={() => handleDelete(item)} className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer" title="Remove item">
//                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
//                 <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9"/>
//                 </svg>
//               </div>
//               <p className="text-sm font-medium text-gray-400">Your cart is empty</p>
//               <p className="text-xs text-gray-300 mt-1">Add some hats to get started!</p>
//             </div>
//           )}
//         </div>

//         {/* Summary */}
//         {localTotalItems > 0 && (
//           <div className="px-5 py-3 border-t border-gray-100 space-y-2">
//             <div className="flex justify-between items-center text-sm">
//               <span className="text-gray-500">Subtotal</span>
//               <span className="font-semibold text-gray-800">${localSubtotal}</span>
//             </div>
//             {charges.length > 0 && (
//               <>
//                 <div className="border-t border-dashed border-gray-100 pt-2 space-y-1.5">
//                   {charges.map((charge, idx) => (
//                     <div key={idx} className="flex justify-between items-center text-xs">
//                       <span className="text-gray-400">
//                         {charge.name}
//                         {charge.qty > 1 && <span className="ml-1 text-gray-300">×{charge.qty}</span>}
//                       </span>
//                       <span className="text-gray-600">${charge.line_total}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex justify-between items-center pt-2 border-t border-gray-200">
//                   <span className="text-sm font-semibold text-gray-800">Grand Total</span>
//                   <span className="text-base font-bold text-[#ed1c24]">${grandTotal}</span>
//                 </div>
//               </>
//             )}
//             {localTotalItems < 24 && (
//               <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-1">
//                 <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                     d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
//                 </svg>
//                 <p className="text-[11px] text-amber-700 font-medium">
//                   Add {24 - localTotalItems} more hat{24 - localTotalItems !== 1 ? "s" : ""} to reach minimum of 24
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* CTA */}
//         {localTotalItems > 0 && (
//           <div className="px-5 pb-4 pt-2">
//             <button
//               onClick={handleAction}
//               className="w-full flex items-center justify-center gap-2 bg-[#ed1c24] hover:bg-[#c51920] active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-red-100"
//             >
//               {isUploadPage ? (
//                 <>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
//                       d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
//                   </svg>
//                   Proceed to Checkout
//                 </>
//               ) : (
//                 <>
//                   Continue Order
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//                   </svg>
//                 </>
//               )}
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartDropdown;