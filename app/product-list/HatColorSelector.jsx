'use client';
import Image from "next/image";
import { FiPlusCircle } from "react-icons/fi";
import black_cap from "../assets/imagesource/black_cap.png";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { useEffect, useRef, useState } from "react";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

// ─── Not Available Badge ──────────────────────────────────────────────────────
const NotAvailableBadge = () => (
  <div className="mt-2 flex flex-col items-center justify-center gap-1">
    <div className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2">
      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Not Available</span>
    </div>
  </div>
);

// ─── SizeInput ────────────────────────────────────────────────────────────────
const SizeInput = ({ size, qty, maxQty, onIncrease, onDecrease, onChange }) => {
  const [displayValue, setDisplayValue] = useState(qty === 0 ? "" : String(qty));

  useEffect(() => {
    setDisplayValue(qty === 0 ? "" : String(qty));
  }, [qty]);

  const handleChange = (e) => {
    const raw = e.target.value;

    if (raw === "") {
      setDisplayValue("");
      onChange(size, 0);
      return;
    }

    const num = parseInt(raw, 10);
    if (isNaN(num) || num < 0) return;

    if (num > maxQty) {
      alert(`Only ${maxQty} items available`);
      setDisplayValue(String(maxQty));
      onChange(size, maxQty);
      return;
    }

    setDisplayValue(String(num));
    onChange(size, num);
  };

  return (
    <div
      className={`border rounded-[10px] p-2 min-w-[150px] flex-shrink-0 ${
        qty > 0 ? "border-[#ed1c24]" : "border-[#dddddd]"
      }`}
    >
      <p className="text-sm font-medium mb-2 text-black">{size.size_label}</p>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onDecrease(size)}
          disabled={qty === 0}
          className={`w-10 h-10 flex items-center justify-center text-white text-xl !rounded-md cursor-pointer ${
            qty === 0 ? "bg-[#cccccc] cursor-not-allowed" : "bg-[#ed1c24] hover:bg-black"
          }`}
        >
          –
        </button>

        <input
          type="number"
          value={displayValue}
          onChange={handleChange}
          placeholder="0"
          min={0}
          max={maxQty}
          className="w-16 text-center border border-gray-300 rounded-md p-2 no-spinner"
        />

        <button
          onClick={() => onIncrease(size)}
          disabled={qty >= maxQty}
          className={`w-10 h-10 flex items-center justify-center text-white text-xl rounded-md ${
            qty >= maxQty ? "bg-[#cccccc] cursor-not-allowed" : "bg-[#ed1c24] hover:bg-black"
          }`}
        >
          +
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const HatColorSelector = ({
  colorName,
  colorImage,
  sizeVariants,
  quantities,
  onIncrease,
  onDecrease,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const zoomRef = useRef(null);

  const base_url = process.env.NEXT_PUBLIC_API_IMAGE_URL;
  const imageSrc = `${base_url}/${colorImage}`;

  const isValidImage =
    colorImage &&
    colorImage !== "null" &&
    colorImage !== "undefined";

  // ─── Check করো সত্যিকারের orderable size আছে কিনা ───────────────────────
  // hatSizes খালি অথবা কোনো size এ inventoryItems নেই → not available
  const hasOrderableSize =
    sizeVariants?.length > 0 &&
    sizeVariants.some((s) => s?.inventoryItems);

  const handleOpenLightbox = () => {
    setOpen(true);
    setTimeout(() => {
      zoomRef.current?.zoomIn(1.4);
    }, 250);
  };

  return (
    <div
      className={`border-2 rounded-[15px] p-4 text-center inline-flex flex-col transition-all ${
        hasOrderableSize
          ? "border-[#dddddd]"
          : "border-gray-200 bg-gray-50 opacity-80"
      }`}
    >
      {/* IMAGE */}
      <div className="relative w-[120px] mx-auto mb-2">
        {isValidImage ? (
          <Image
            src={`${base_url}/${colorImage}`}
            width={80}
            height={80}
            alt={colorName}
            className={`mx-auto ${!hasOrderableSize ? "grayscale opacity-60" : ""}`}
          />
        ) : (
          <Image
            src={black_cap}
            width={80}
            height={80}
            alt={colorName}
            className={`mx-auto ${!hasOrderableSize ? "grayscale opacity-60" : ""}`}
          />
        )}

        {/* Lightbox zoom button — only show if available */}
        {hasOrderableSize && (
          <button
            onClick={handleOpenLightbox}
            className="absolute left-0 bottom-[-6px] text-[#ed1c24] hover:text-[#ff7379]"
          >
            <FiPlusCircle className="text-lg" />
          </button>
        )}
      </div>

      {/* Color Name */}
      <p className={`font-bold text-sm mb-3 uppercase ${hasOrderableSize ? "text-black" : "text-gray-400"}`}>
        {colorName}
      </p>

      {/* Sizes OR Not Available */}
      {hasOrderableSize ? (
        <div className="flex justify-center gap-3 flex-wrap lg:flex-nowrap overflow-visible">
          {sizeVariants
            .filter((size) => size?.inventoryItems)
            .map((size) => {
              const qty = quantities?.[size.id] || 0;
              const maxQty = size.inventoryItems?.qty_available ?? 0;
              return (
                <SizeInput
                  key={size.id}
                  size={size}
                  qty={qty}
                  maxQty={maxQty}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onChange={onChange}
                />
              );
            })}
        </div>
      ) : (
        <NotAvailableBadge />
      )}

      {/* Lightbox */}
      {hasOrderableSize && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: imageSrc }]}
          plugins={[Fullscreen, Zoom]}
          zoom={{
            ref: zoomRef,
            maxZoomPixelRatio: 4,
            zoomInMultiplier: 2,
            doubleClickDelay: 300,
            doubleTapDelay: 300,
            wheelZoomDistanceFactor: 120,
          }}
          carousel={{ finite: true, preload: 0 }}
          controller={{
            closeOnBackdropClick: true,
            closeOnPullDown: true,
            closeOnPullUp: true,
          }}
          styles={{ container: { backgroundColor: "rgba(0,0,0,0.85)" } }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
        />
      )}
    </div>
  );
};

export default HatColorSelector;

// 'use client';
// import Image from "next/image";
// import { FiPlusCircle } from "react-icons/fi";
// import black_cap from "../assets/imagesource/black_cap.png";
// import Lightbox from "yet-another-react-lightbox";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import "yet-another-react-lightbox/styles.css";
// import { useEffect, useRef, useState } from "react";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";



// const HatColorSelector = ({
//   colorName,
//   colorImage,
//   sizeVariants,
//   quantities,
//   onIncrease,
//   onDecrease,
//   onChange,

// }) => {
//   const [open, setOpen] = useState(false);
//   const zoomRef = useRef(null);


//   const base_url =  process.env.NEXT_PUBLIC_API_IMAGE_URL;
//   const imageSrc = `${base_url}/${colorImage}`;
  
  

//   const isValidImage =
//     colorImage &&
//     colorImage !== "null" &&
//     colorImage !== "undefined";

//   const handleOpenLightbox = () => {
//     setOpen(true);


//     setTimeout(() => {
//       zoomRef.current?.zoomIn(1.4);
//     }, 250);
//   };
//   return (
//     <div className="border-2 border-[#dddddd] rounded-[15px] p-4 text-center inline-flex flex-col">


//       {/* IMAGE */}
//       <div className="relative w-[120px] mx-auto mb-2">
//         {/* <Image
//           src={base_url + colorImage}
//           width={80}
//           height={80}
//           alt={colorName}
//           className="mx-auto"
//         /> */}


//         {isValidImage ? (
//           <Image
//             src={`${base_url}/${colorImage}`}
//             width={80}
//             height={80}
//             alt={colorName}
//             className="mx-auto"
//           />
//         ) : (
//           <Image
//             src={black_cap}
//             width={80}
//             height={80}
//             alt={colorName}
//             className="mx-auto"
//           />
//         )}


//         <button
//           onClick={handleOpenLightbox}
//           className="absolute left-0 bottom-[-6px] text-[#ed1c24] hover:text-[#ff7379]"
//         >
//           <FiPlusCircle className="text-lg" />
//         </button>
//       </div>
//       <p className="font-bold text-sm mb-3 uppercase text-black">
//         {colorName}
//       </p>
//       <div className="flex justify-center gap-3 flex-wrap lg:flex-nowrap overflow-visible">
//         {sizeVariants.map(size => {
//           const qty = quantities?.[size.id] || 0;
//           const maxQty = size.inventoryItems?.qty_available ?? 0;

//           const [inputValue, setInputValue] = useState(qty);
//           const [isFocused, setIsFocused] = useState(false);

//           useEffect(() => {
//             if (!isFocused) {
//               setInputValue(qty);
//             }
//           }, [qty, isFocused]);

//           return (
//             <div
//               key={size.id}
//               className={`border rounded-[10px] p-2 min-w-[150px] flex-shrink-0 ${qty > 0 ? "border-[#ed1c24]" : "border-[#dddddd]"
//                 }`}
//             >

//               <p className="text-sm font-medium mb-2 text-black">{size.size_label}</p>
//               <div className="flex items-center justify-center gap-2">
//                 <button onClick={() => { onDecrease(size); setInputValue(prev => Math.max(prev - 1, 0)); }} disabled={qty === 0} className={`w-10 h-10 flex items-center justify-center text-white text-xl !rounded-md cursor-pointer ${qty === 0 ? "bg-[#cccccc] cursor-not-allowed" : "bg-[#ed1c24] hover:bg-black"}`}>
//                   –
//                 </button>

//                 <input
//                   type="number"
//                   value={isFocused && inputValue === 0 ? "" : inputValue}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => {
//                     setIsFocused(false);
//                     if (inputValue === "") {
//                       setInputValue(0);
//                       onChange(size, 0);
//                     }
//                   }}
//                   onChange={(e) => {
//                     const value = e.target.value === "" ? "" : Number(e.target.value);
//                     setInputValue(value);
//                     if (value !== "") onChange(size, value);
//                   }}
//                   className="w-16 text-center border border-gray-300 rounded-md p-2 no-spinner"
//                 />


//                 <button onClick={() => { onIncrease(size); setInputValue(prev => Math.min(prev + 1, maxQty)); }} disabled={qty >= maxQty} className={`w-10 h-10 flex items-center justify-center text-white text-xl rounded-md ${qty >= maxQty ? "bg-[#cccccc] cursor-not-allowed" : "bg-[#ed1c24] hover:bg-black"}`}>
//                   +
//                 </button>
//               </div>
//             </div>
//           );
//         })}

//       </div>
//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={[{ src: imageSrc }]}
//         plugins={[Fullscreen, Zoom]}
//         zoom={{
//           ref: zoomRef,
//           maxZoomPixelRatio: 4,
//           zoomInMultiplier: 2,
//           doubleClickDelay: 300,
//           doubleTapDelay: 300,
//           wheelZoomDistanceFactor: 120,
//         }}
//         carousel={{
//           finite: true,
//           preload: 0,
//         }}
//         controller={{
//           closeOnBackdropClick: true,
//           closeOnPullDown: true,
//           closeOnPullUp: true,
//         }}
//         styles={{
//           container: { backgroundColor: "rgba(0,0,0,0.85)" },
//         }}
//         render={{
//           buttonPrev: () => null,
//           buttonNext: () => null,
//         }}
//       />



//     </div>
//   );
// };

// export default HatColorSelector;
