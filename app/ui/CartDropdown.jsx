
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
  const totalItems = cartListItem?.data?.cart?.total_items || 0;

  // ================= DELETE HANDLER =================
  const handleDelete = async (item) => {
    try {
      const cartItemId = Number(item.id);

      // 1️⃣ DELETE FROM API
      await dispatch(deleteCartItem(cartItemId));
      await dispatch(cartList({ id: savedUUid }));

      // 2️⃣ GET SESSION DATA
      const cartItemMap = JSON.parse(
        sessionStorage.getItem("cartItemMap") || "{}"
      );

      const hatQuantities = JSON.parse(
        sessionStorage.getItem("hatQuantities") || "{}"
      );

      // 3️⃣ FIND MATCHING KEY FROM cartItemMap
      let matchedKey = null;

      Object.keys(cartItemMap).forEach((key) => {
        if (Number(cartItemMap[key]) === cartItemId) {
          matchedKey = key; // example: "1_1-YellowHat-9"
        }
      });

      // 4️⃣ REMOVE FROM hatQuantities
      if (matchedKey) {
        const [groupKey, color, sizeId] = matchedKey.split("-");

        if (
          hatQuantities[groupKey] &&
          hatQuantities[groupKey][color] &&
          hatQuantities[groupKey][color][sizeId]
        ) {
          delete hatQuantities[groupKey][color][sizeId];
        }

        // clean empty color
        if (
          hatQuantities[groupKey] &&
          hatQuantities[groupKey][color] &&
          Object.keys(hatQuantities[groupKey][color]).length === 0
        ) {
          delete hatQuantities[groupKey][color];
        }

        // clean empty group
        if (
          hatQuantities[groupKey] &&
          Object.keys(hatQuantities[groupKey]).length === 0
        ) {
          delete hatQuantities[groupKey];
        }

        // 5️⃣ REMOVE FROM cartItemMap
        delete cartItemMap[matchedKey];
      }

      // 6️⃣ SAVE BACK TO SESSION
      sessionStorage.setItem(
        "hatQuantities",
        JSON.stringify(hatQuantities)
      );

      sessionStorage.setItem(
        "cartItemMap",
        JSON.stringify(cartItemMap)
      );
      window.dispatchEvent(new Event("hatQuantitiesChanged"));

    } catch (err) {
      console.error("Cart delete failed", err);
    }
  };
  const base_url = "https://arsalaanrasulshowmeropi.bestworks.cloud";

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="absolute right-[-40px] md:right-0 mt-15 w-80 bg-white shadow-xl border rounded-md z-50">
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
                    className="flex justify-between items-center py-2 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      {image ? (
                        <Image
                          src={base_url + image}
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

                      <button
                        onClick={() => handleDelete(item)}
                        className="
                          w-5 h-5
                          flex items-center justify-center
                          rounded-full
                          bg-red-500
                          text-white
                          text-sm
                          hover:bg-red-600
                          transition
                          duration-200
                          shadow-md
                          cursor-pointer
                        "
                      >
                        ×
                      </button>


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
          <div className="px-3 py-2">
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

