// import React, { useEffect } from "react";
// import { cartList } from "../reducers/CartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Image from "next/image";

// const CartDropdown = ({ open, onClose }) => {
//   if (!open) return null;

//   const dispatch = useDispatch();
//   const { cartListItem } = useSelector((state) => state?.cart);
//   const savedUUid = sessionStorage.getItem("uuid");

//   useEffect(() => {
//     dispatch(
//       cartList({
//         id: savedUUid,
//       })
//     );
//   }, []);

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black/40 z-40"
//         onClick={onClose}
//       />
//       <div className="absolute right-0 mt-15 w-80 bg-white shadow-xl border rounded-md z-50">
//         <div className="flex justify-between items-center px-4 py-3 border-b">
//           <h2 className="text-lg font-semibold">Your Cart</h2>
//           <button
//             onClick={onClose}
//             className="text-xl font-bold hover:text-red-500 cursor-pointer"
//           >
//             ×
//           </button>
//         </div>
//         {/* <div className="max-h-72 overflow-y-auto p-3">
//           {cartListItem?.data?.data?.cartGroups?.length > 0 ? (
//             cartListItem.data.data.cartGroups.map((group) => {
//               const hat = group.hatStyleDetails?.[0]?.fields;
//               const img = hat?.["Hat Image"]?.[0]?.url;
//               const name = hat?.["Hat Name"];
//               const sizeChart = hat?.["Size Chart"]; 
//               const qty = group.groupTotalQuantity;
//              const variantName = group.cartItems?.[0]?.variantDetails?.[0]?.fields?.["Variant Name"];
//               const finalName = `${name} (${variantName})`;
//               console.log('finalName',finalName)
//               console.log('cartListItem',cartListItem)

//               return (
//                 <div
//                   key={group.id}
//                   className="flex justify-between items-center py-2 border-b last:border-b-0"
//                 >
//                   <div className="flex items-center gap-2">
//                     {img ? (
//                       <Image
//                         src={img}
//                         width={40}
//                         height={40}
//                         alt="hat"
//                         className="rounded"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 bg-gray-200 rounded" />
//                     )}

//                     <p className="text-sm">{finalName}</p>
//                   </div>

//                   <p className="font-semibold">{qty}</p>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-center py-10 text-gray-500">
//               Your cart is empty
//             </p>
//           )}
//         </div> */}
//         {/* Cart Items */}
//         <div className="max-h-72 overflow-y-auto p-3">
//           {cartListItem?.data?.data?.cartGroups?.some(group => group.groupTotalQuantity > 0) ? (
//             cartListItem.data.data.cartGroups
//               .filter(group => group.groupTotalQuantity > 0)
//               .map((group) => {
//                 const hat = group.hatStyleDetails?.[0]?.fields;
//                 const img = hat?.["Hat Image"]?.[0]?.url;
//                 const name = hat?.["Hat Name"];
//                 const qty = group.groupTotalQuantity;

//                 const variantName =
//                   group.cartItems?.[0]?.variantDetails?.[0]?.fields?.["Variant Name"];

//                 const finalName = `${name} (${variantName})`;

//                 return (
//                   <div
//                     key={group.id}
//                     className="flex justify-between items-center py-2 border-b last:border-b-0"
//                   >
//                     <div className="flex items-center gap-2">
//                       {img ? (
//                         <Image
//                           src={img}
//                           width={40}
//                           height={40}
//                           alt="hat"
//                           className="rounded"
//                         />
//                       ) : (
//                         <div className="w-10 h-10 bg-gray-200 rounded" />
//                       )}
//                       <p className="text-sm">{finalName}</p>
//                     </div>

//                     <p className="font-semibold">{qty}</p>
//                   </div>
//                 );
//               })
//           ) : (
//             <p className="text-center py-10 text-gray-500">Your cart is empty</p>
//           )}
//         </div>

//         <div className="p-3">
//           <button className="w-full bg-[#ed6c27] text-white py-2 rounded-md hover:bg-[#f47b3e] cursor-pointer">
//             Continue Order
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartDropdown;






// import React, { useEffect } from "react";
// import { cartList } from "../reducers/CartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Image from "next/image";

// const CartDropdown = ({ open, onClose }) => {
//   if (!open) return null;

//   const dispatch = useDispatch();
//   const { cartListItem } = useSelector((state) => state?.cart);
//   const savedUUid = sessionStorage.getItem("uuid");
//   console.log("cartListItem",cartListItem);


//   useEffect(() => {
//     if (savedUUid) {
//       dispatch(
//         cartList({
//           id: savedUUid,
//         })
//       );
//     }
//   }, []);

//   const cartGroups = cartListItem?.data?.cart_groups || [];

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

//       <div className="absolute right-0 mt-15 w-80 bg-white shadow-xl border rounded-md z-50">
//         <div className="flex justify-between items-center px-4 py-3 border-b">
//           <h2 className="text-lg font-semibold">Your Cart</h2>
//           <button
//             onClick={onClose}
//             className="text-xl font-bold hover:text-red-500 cursor-pointer"
//           >
//             ×
//           </button>
//         </div>

//         {/* CART ITEMS */}
//         <div className="max-h-72 overflow-y-auto p-3">
//           {cartGroups.length > 0 ? (
//             cartGroups.map((group) =>
//               group.items.map((item) => {
//                 const hatName = item?.hat?.name;
//                 const size = item?.variant?.size_label;
//                 const variantName = item?.variant?.variant_name;
//                 const qty = item?.quantity;
//                 const price = item?.unit_price;
//                 const image = item?.color?.primary_image_url;

//                 console.log("hat_name",hatName);


//                 return (
//                   <div
//                     key={item.id}
//                     className="flex justify-between items-center py-2 border-b last:border-b-0"
//                   >
//                     <div className="flex items-center gap-2">
//                       {image ? (
//                         <Image
//                           src={image}
//                           width={40}
//                           height={40}
//                           alt="hat"
//                           className="rounded"
//                         />
//                       ) : (
//                         <div className="w-10 h-10 bg-gray-200 rounded" />
//                       )}

//                       <div>
//                         <p className="text-sm font-medium">
//                           {hatName} ({variantName})
//                         </p>
//                         <p className="text-xs text-gray-500">Size: {size}</p>
//                         <p className="text-xs text-gray-700">${price}</p>
//                       </div>
//                     </div>

//                     <p className="font-semibold">{qty}</p>
//                   </div>
//                 );
//               })
//             )
//           ) : (
//             <p className="text-center py-10 text-gray-500">Your cart is empty</p>
//           )}
//         </div>

//         <div className="p-3">
//           <button  onClick={onClose} className="w-full bg-[#ed6c27] text-white py-2 rounded-md hover:bg-[#f47b3e] cursor-pointer">
//             Continue Order
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartDropdown;





import React, { useEffect } from "react";
import { cartList, deleteCartItem } from "../reducers/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const CartDropdown = ({ open, onClose }) => {
  if (!open) return null;

  const dispatch = useDispatch();
  const { cartListItem } = useSelector((state) => state?.cart);
  const savedUUid = sessionStorage.getItem("uuid");

  useEffect(() => {
    if (savedUUid) {
      dispatch(cartList({ id: savedUUid }));
    }
  }, [savedUUid, dispatch]);

  const cartGroups = cartListItem?.data?.cart_groups || [];
  const charges = cartListItem?.data?.charges || [];

  const removeFromLocalStorage = (cartItemId) => {
  const cartItemMap =
    JSON.parse(localStorage.getItem("cartItemMap")) || {};

  const mapKey = Object.keys(cartItemMap).find(
    (key) => String(cartItemMap[key]) === String(cartItemId)
  );

  if (mapKey) {
    delete cartItemMap[mapKey];

    if (Object.keys(cartItemMap).length === 0) {
      localStorage.removeItem("cartItemMap");
    } else {
      localStorage.setItem("cartItemMap", JSON.stringify(cartItemMap));
    }

    const hatQuantities =
      JSON.parse(localStorage.getItem("hatQuantities")) || {};

    const [hatKey, color, size] = mapKey.split("-");

    if (
      hatQuantities[hatKey] &&
      hatQuantities[hatKey][color] &&
      hatQuantities[hatKey][color][size]
    ) {
      delete hatQuantities[hatKey][color][size];
      if (Object.keys(hatQuantities[hatKey][color]).length === 0) {
        delete hatQuantities[hatKey][color];
      }

      if (Object.keys(hatQuantities[hatKey]).length === 0) {
        delete hatQuantities[hatKey];
      }

      if (Object.keys(hatQuantities).length === 0) {
        localStorage.removeItem("hatQuantities");
      } else {
        localStorage.setItem(
          "hatQuantities",
          JSON.stringify(hatQuantities)
        );
      }
    }
  }
};


 const handleDeleteCartItem = (id) => {
  dispatch(deleteCartItem(id))
    .then((res) => {
      if (res?.payload?.data?.status_code === 200) {
        removeFromLocalStorage(id);
        dispatch(cartList({ id: savedUUid }));
      }
    })
    .catch((err) => {
      console.error("Delete failed", err);
    });
};



const totalItems = cartListItem?.data?.cart?.total_items || 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="absolute right-0 mt-15 w-80 bg-white shadow-xl border rounded-md z-50">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:text-red-500 cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="max-h-72 overflow-y-auto p-3">
          {cartGroups.length > 0 ? (
            cartGroups.map((group) =>
              group.items.map((item) => {
                const hatName = item?.hat?.name;
                const size = item?.variant?.size_label;
                const variantName = item?.variant?.variant_name;
                const qty = item?.quantity;
                const price = item?.unit_price;
                const image = item?.color?.primary_image_url;

                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      {image ? (
                        <Image
                          src={image}
                          width={40}
                          height={40}
                          alt="hat"
                          className="rounded"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded" />
                      )}

                      <div>
                        <p className="text-sm font-medium">
                          {hatName} ({variantName})
                        </p>
                        <p className="text-xs text-gray-500">Size: {size}</p>
                        <p className="text-xs text-gray-700">${price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="font-semibold">{qty}</p>

                      {/* <button
                        onClick={() => handleDeleteCartItem(item.id)}
                        className="text-gray-400 hover:text-red-500 text-lg font-bold cursor-pointer"
                        title="Remove item"
                      >
                        ×
                      </button> */}
                    </div>

                  </div>
                );
              })
            )
          ) : (
            <p className="text-center py-10 text-gray-500">Your cart is empty</p>
          )}
        </div>

        {/* CHARGES */}
        {totalItems > 0 && charges.length > 0 && (
          <div className="px-3 py-2 border-t">
            <h3 className="text-sm font-semibold mb-2">Charges</h3>
            {charges.map((charge, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-xs text-gray-700 py-1"
              >
                <span>
                  {charge.name} {charge.qty > 1 && `x${charge.qty}`}
                </span>
                <span>${charge.line_total}</span>
              </div>
            ))}
          </div>
        )}

        {/* CONTINUE ORDER BUTTON */}
        <div className="p-3 border-t">
          <button
            onClick={onClose}
            className="w-full bg-[#ed6c27] text-white py-2 rounded-md hover:bg-[#f47b3e] cursor-pointer"
          >
            Continue Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDropdown;

