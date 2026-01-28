'use client';
import React, { useEffect } from "react";
import { cartList } from "../reducers/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const CartBottom = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { cartListItem } = useSelector((state) => state.cart);
  const savedUUid = sessionStorage.getItem("uuid");

  useEffect(() => {
    if (open && savedUUid) {
      dispatch(cartList({ id: savedUUid }));
    }
  }, [open, savedUUid, dispatch]);

  if (!open) return null;

  const cartGroups = cartListItem?.data?.cart_groups || [];
  const charges = cartListItem?.data?.charges || [];
  const base_url = "https://showmecustomheadwearapi.bestworks.cloud";

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* BOTTOM CART */}
      <div className="fixed bottom-0 left-0 w-full bg-white z-50 border-t shadow-xl">

        {/* CLOSE BAR */}
        <div
          onClick={onClose}
          className="w-full bg-red-600 text-white text-center py-2 font-semibold cursor-pointer"
        >
          CLOSE
        </div>

        {/* ITEMS */}
        <div className="max-h-[320px] overflow-y-auto px-4 py-3">
          {cartGroups.length > 0 ? (
            cartGroups.map((group) =>
              group.items.map((item) => {
                const image = item?.color?.primary_image_url;
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3"
                  >
                    <div className="flex gap-3 items-center">
                      {image ? (
                        <Image
                          src={base_url + image}
                          width={40}
                          height={40}
                          alt="product"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200" />
                      )}

                      <div>
                        <p className="text-sm font-medium">
                          {item?.hat?.name} - {item?.color?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item?.variant?.size_label}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-semibold">
                      ${item?.unit_price} x {item?.quantity}
                    </p>
                  </div>
                );
              })
            )
          ) : (
            <p className="text-center py-10 text-gray-400">
              Cart is empty
            </p>
          )}
        </div>

        {/* SUBTOTAL & ADDONS */}
        {cartGroups.length > 0 && (
          <div className="px-3 py-2">
            <div className="flex justify-between items-center text-sm text-gray-800 py-1">
              <span>Subtotal</span>
              <span>${cartListItem?.data?.cart?.subtotal_amount}</span>
            </div>
            {/* <div className="flex justify-between items-center text-sm text-gray-800 py-1">
              <span>Add-ons</span>
              <span>${cartListItem?.data?.cart?.addons_amount}</span>
            </div> */}
            <div className="flex justify-between items-center text-sm font-semibold text-gray-900 py-1">
              <span>Grand Total</span>
              <span>${cartListItem?.data?.cart?.grand_total_amount}</span>
            </div>
          </div>
        )}

        {/* PROMO / CHARGES */}
        {charges.length > 0 && (
          <div className="px-4 py-3">
             <h3 className="text-sm font-semibold mb-1">Charges</h3>
            {charges.map((charge, idx) => (
              <div
                key={idx}
                className="flex justify-between text-sm py-1"
              >
                <span>{charge.name}</span>
                <span>${charge.line_total}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CartBottom;
