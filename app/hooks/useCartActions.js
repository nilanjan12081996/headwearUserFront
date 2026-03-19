import { useEffect, useRef, useState } from "react";
import { cartList, deleteCartItem, updateCartItem } from "../reducers/CartSlice";
import { useDispatch, useSelector } from "react-redux";

// ─────────────────────────────────────────────────────────────────────────────
// Sync strategy — three cases:
//
// 1. First load → take server data as-is.
//
// 2. Structural change (item added/removed, e.g. ProductAccordion adds a new
//    hat size) → full replace from server.
//
// 3. Qty-only change:
//    a. If WE have a pending/in-flight update for that item → keep our local
//       value. The server hasn't caught up with our latest click yet.
//    b. If the change came from OUTSIDE (ProductAccordion) → accept server qty.
//       This is the key fix — cart now stays in sync with the main page.
//
// Race condition fix:
//    pendingQty map + inFlight flag collapse N rapid clicks into at most
//    2 sequential API calls (one in-flight + one queued), preventing
//    out-of-order responses from writing stale qty to the server.
// ─────────────────────────────────────────────────────────────────────────────

export function useCartActions({ open } = {}) {
  const dispatch = useDispatch();
  const { cartListItem } = useSelector((state) => state?.cart);
  const savedUUid =
    typeof window !== "undefined" ? sessionStorage.getItem("uuid") : null;

  const [localItems, setLocalItems] = useState([]);
  const [localTotalItems, setLocalTotalItems] = useState(0);
  const [localSubtotal, setLocalSubtotal] = useState("0.00");
  const isFirstLoad = useRef(true);

  const pendingQty = useRef({});  // { [itemId]: number } — latest desired qty not yet sent
  const inFlight = useRef({});    // { [itemId]: boolean } — API call currently in progress
  const refreshTimer = useRef(null);

  // ─── Initial fetch ────────────────────────────────────────────────────────
  useEffect(() => {
    if (savedUUid) dispatch(cartList({ id: savedUUid }));
  }, [savedUUid, dispatch, open]);

  // ─── Sync Redux → local state ─────────────────────────────────────────────
  useEffect(() => {
    const groups = cartListItem?.data?.cart_groups || [];
    const incoming = groups.flatMap((g) => g.items);

    if (isFirstLoad.current) {
      // Case 1: first load — take server data as-is
      setLocalItems(incoming);
      isFirstLoad.current = false;
      setLocalTotalItems(cartListItem?.data?.cart?.total_items || 0);
      setLocalSubtotal(cartListItem?.data?.cart?.subtotal_amount || "0.00");
      return;
    }

    const incomingIds = incoming.map((i) => i.id).sort().join(",");
    const localIds = localItems.map((i) => i.id).sort().join(",");

    if (incomingIds !== localIds) {
      // Case 2: structural change — full replace (preserves order from server)
      setLocalItems(incoming);
    } else {
      // Case 3: same items, qty may have changed
      setLocalItems((prev) =>
        prev.map((localItem) => {
          const weOwn =
            pendingQty.current[localItem.id] !== undefined ||
            inFlight.current[localItem.id];

          if (weOwn) {
            // 3a: our own update in progress — keep local value, ignore server
            return localItem;
          }

          // 3b: external change (e.g. ProductAccordion) — accept server qty
          const serverItem = incoming.find((i) => i.id === localItem.id);
          if (serverItem && serverItem.quantity !== localItem.quantity) {
            return { ...localItem, quantity: serverItem.quantity };
          }
          return localItem;
        })
      );
    }

    // Always sync totals and subtotal from server
    setLocalTotalItems(cartListItem?.data?.cart?.total_items || 0);
    setLocalSubtotal(cartListItem?.data?.cart?.subtotal_amount || "0.00");
  }, [cartListItem]);

  // ─── Debounced cartList refresh ───────────────────────────────────────────
  const scheduleRefresh = () => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => {
      dispatch(cartList({ id: savedUUid }));
    }, 600);
  };

  // ─── Core update engine ───────────────────────────────────────────────────
  const flushUpdate = async (itemId) => {
    if (inFlight.current[itemId]) return;
    const qty = pendingQty.current[itemId];
    if (qty === undefined) return;

    inFlight.current[itemId] = true;
    delete pendingQty.current[itemId];

    try {
      await dispatch(updateCartItem({ id: Number(itemId), quantity: qty }));
    } catch (err) {
      console.error("updateCartItem failed", err);
    } finally {
      inFlight.current[itemId] = false;
      if (pendingQty.current[itemId] !== undefined) {
        // More clicks arrived while in-flight → send one more
        flushUpdate(itemId);
      } else {
        // All settled → refresh for accurate totals/charges
        scheduleRefresh();
      }
    }
  };

  // ─── Queue an update ─────────────────────────────────────────────────────
  const queueUpdate = (item, newQty, oldQty) => {
    const diff = newQty - oldQty;

    setLocalItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i))
    );
    setLocalTotalItems((prev) => prev + diff);

    pendingQty.current[item.id] = newQty;
    flushUpdate(item.id);
    syncSession(item.id, newQty);
  };

  // ─── Session sync ─────────────────────────────────────────────────────────
  const syncSession = (itemId, newQty) => {
    try {
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
    } catch (e) {
      console.error("syncSession failed", e);
    }
  };

  // ─── DELETE ───────────────────────────────────────────────────────────────
  const handleDelete = async (item) => {
    const cartItemId = Number(item.id);

    delete pendingQty.current[item.id];

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
  const handleIncrease = (item) => {
    queueUpdate(item, item.quantity + 1, item.quantity);
  };

  // ─── DECREASE ─────────────────────────────────────────────────────────────
  const handleDecrease = (item) => {
    if (item.quantity <= 1) { handleDelete(item); return; }
    queueUpdate(item, item.quantity - 1, item.quantity);
  };

  // ─── MANUAL INPUT ─────────────────────────────────────────────────────────
  const handleManualChange = (item, newQty) => {
    if (newQty === 0) { handleDelete(item); return; }
    queueUpdate(item, newQty, item.quantity);
  };

  return {
    localItems,
    localTotalItems,
    localSubtotal,
    charges: cartListItem?.data?.charges || [],
    grandTotal: cartListItem?.data?.cart?.grand_total_amount,
    handleIncrease,
    handleDecrease,
    handleManualChange,
    handleDelete,
  };
}