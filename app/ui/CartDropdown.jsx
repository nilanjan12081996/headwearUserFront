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
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />
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
        {/* <div className="max-h-72 overflow-y-auto p-3">
          {cartListItem?.data?.data?.cartGroups?.length > 0 ? (
            cartListItem.data.data.cartGroups.map((group) => {
              const hat = group.hatStyleDetails?.[0]?.fields;
              const img = hat?.["Hat Image"]?.[0]?.url;
              const name = hat?.["Hat Name"];
              const sizeChart = hat?.["Size Chart"]; 
              const qty = group.groupTotalQuantity;
             const variantName = group.cartItems?.[0]?.variantDetails?.[0]?.fields?.["Variant Name"];
              const finalName = `${name} (${variantName})`;
              console.log('finalName',finalName)
              console.log('cartListItem',cartListItem)

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

                    <p className="text-sm">{finalName}</p>
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
        </div> */}
        {/* Cart Items */}
        <div className="max-h-72 overflow-y-auto p-3">
          {cartListItem?.data?.data?.cartGroups?.some(group => group.groupTotalQuantity > 0) ? (
            cartListItem.data.data.cartGroups
              .filter(group => group.groupTotalQuantity > 0)
              .map((group) => {
                const hat = group.hatStyleDetails?.[0]?.fields;
                const img = hat?.["Hat Image"]?.[0]?.url;
                const name = hat?.["Hat Name"];
                const qty = group.groupTotalQuantity;

                const variantName =
                  group.cartItems?.[0]?.variantDetails?.[0]?.fields?.["Variant Name"];

                const finalName = `${name} (${variantName})`;

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
                      <p className="text-sm">{finalName}</p>
                    </div>

                    <p className="font-semibold">{qty}</p>
                  </div>
                );
              })
          ) : (
            <p className="text-center py-10 text-gray-500">Your cart is empty</p>
          )}
        </div>

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
