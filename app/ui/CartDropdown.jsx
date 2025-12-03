import React, { useEffect } from "react";
import { cartList } from "../reducers/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const CartDropdown = ({ open, onClose }) => {
  if (!open) return null;

  const dispatch = useDispatch();
  const { cartListItem } = useSelector((state) => state?.cart);
  const savedUUid = sessionStorage.getItem("uuid");

  useEffect(() => {
    dispatch(
      cartList({
        id: savedUUid,
      })
    );
  }, []);

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Dropdown Card */}
      <div className="absolute right-0 mt-15 w-80 bg-white shadow-xl border rounded-md z-50">

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:text-red-500 cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="max-h-72 overflow-y-auto p-3">
          {cartListItem?.data?.data?.cartGroups?.length > 0 ? (
            cartListItem.data.data.cartGroups.map((group) => {
              const hat = group.hatStyleDetails?.[0]?.fields;
              const img = hat?.["Hat Image"]?.[0]?.url;
              const name = hat?.["Hat Name"];
              const sizeChart = hat?.["Size Chart"]; 
              const qty = group.groupTotalQuantity;

              return (
                <div
                  key={group.id}
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    {img ? (
                      <Image
                        src={img}
                        width={40}
                        height={40}
                        alt="hat"
                        className="rounded"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded" />
                    )}

                    <p className="text-sm">{name}({sizeChart})</p>
                  </div>

                  <p className="font-semibold">{qty}</p>
                </div>
              );
            })
          ) : (
            <p className="text-center py-10 text-gray-500">
              Your cart is empty
            </p>
          )}
        </div>

        {/* Footer Button */}
        <div className="p-3">
          <button className="w-full bg-[#ed6c27] text-white py-2 rounded-md hover:bg-[#f47b3e] cursor-pointer">
            Continue Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDropdown;


// import React, { useEffect } from 'react'
// import { cartList } from '../reducers/CartSlice'
// import { useDispatch, useSelector } from 'react-redux'

// const CartDropdown = ({ open,onClose}) => {
//      if (!open) return null;
//     const dispatch=useDispatch()
//     const{cartListItem}=useSelector((state)=>state?.cart)
//      const savedUUid = sessionStorage.getItem("uuid")

//        useEffect(() => {
//          dispatch(cartList({
//            id: savedUUid
//          }))
//        }, [])
//        console.log("cartListItem",cartListItem);
       
//   return (
//    <>
//    {/* <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-end z-50">
//       <div className="w-80 bg-white h-full p-5 shadow-2xl overflow-y-auto">

      
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Your Cart</h2>
//           <button onClick={onClose} className="text-xl font-bold">×</button>
//         </div>

  
//         {cartListItem?.cartGroups?.length > 0 ? (
//           cartListItem.cartGroups.map((group, index) => {
//             const hat = group.hatStyleDetails?.[0]?.fields;

//             return (
//               <div key={index} className="border-b pb-3 mb-3">
//                 <p className="font-medium">{hat?.["Hat Name"]}</p>
//                 <p className="text-sm text-gray-600">
//                   Qty: {group.groupTotalQuantity}
//                 </p>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-gray-600 text-center mt-20">Your cart is empty</p>
//         )}

   
//         <button className="w-full bg-[#ed1c24] text-white py-3 rounded-lg mt-4 font-semibold">
//           Continue Order
//         </button>
//       </div>
//     </div> */}


//     <div className="absolute right-0 top-14 w-80 bg-white shadow-xl border rounded-md z-50">
      
//       {/* Cart Items List */}
//       <div className="max-h-72 overflow-y-auto p-3">
//         {cartListItem?.data?.data?.cartGroups?.length > 0 ? (
//           cartListItem?.data?.data?.cartGroups.map((group) => {
//             const hat = group.hatStyleDetails?.[0]?.fields;
//             const img = hat?.["Hat Image"]?.[0]?.url;
//             const name = hat?.["Hat Name"];
//             const qty = group.groupTotalQuantity;

//             return (
//               <div
//                 key={group.id}
//                 className="flex justify-between items-center py-2 border-b last:border-b-0"
//               >
//                 <div className="flex items-center gap-2">
//                   {/* Hat Thumbnail */}
//                   {img ? (
//                     <Image
//                       src={img}
//                       width={32}
//                       height={32}
//                       alt="hat"
//                       className="rounded"
//                     />
//                   ) : (
//                     <div className="w-8 h-8 bg-gray-200 rounded" />
//                   )}

//                   <p className="text-sm">{name}</p>
//                 </div>

//                 <p className="font-semibold">{qty}</p>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center py-10 text-gray-500">Your cart is empty</p>
//         )}
//       </div>

//       {/* Continue Order Button */}
//       <div className="p-3">
//         <button className="w-full bg-[#ed6c27] text-white py-2 rounded-md hover:bg-[#f47b3e]">
//           Continue Order
//         </button>
//       </div>

//     </div>
//   );


     
//    </>
//   )
// }

// export default CartDropdown
