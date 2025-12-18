'use client';
import Image from "next/image";
import { FiPlusCircle } from "react-icons/fi";
import black_cap from "../assets/imagesource/black_cap.png";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { useEffect, useRef, useState } from "react";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";



const HatColorSelector = ({
  colorName,
  colorImage,
  sizeVariants,
  quantities,
  onIncrease,
  onDecrease,
  onChange
}) => {
  const [open, setOpen] = useState(false);
  const zoomRef = useRef(null);


  const base_url = "https://arsalaanrasulshowmeropi.bestworks.cloud";
  const imageSrc = `${base_url}${colorImage}`;


  const handleOpenLightbox = () => {
    setOpen(true);


    setTimeout(() => {
      zoomRef.current?.zoomIn(1.4);
    }, 250);
  };
  return (
    <div className="border-2 border-[#dddddd] rounded-[15px] p-4 text-center">

      {/* IMAGE */}
      <div className="relative w-[120px] mx-auto mb-2">
        <Image
          src={base_url + colorImage}
          width={80}
          height={80}
          alt={colorName}
          className="mx-auto"
        />
        <button
          onClick={handleOpenLightbox}
          className="absolute left-0 bottom-[-6px] text-[#ed1c24] hover:text-[#ff7379]"
        >
          <FiPlusCircle className="text-lg" />
        </button>
      </div>
      <p className="font-bold text-sm mb-3 uppercase text-black">
        {colorName}
      </p>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3">
        {sizeVariants.map(size => {
          const qty = quantities?.[size.id] || 0;
          const maxQty = size.inventoryItems?.qty_available ?? 0;

          const [inputValue, setInputValue] = useState(qty);
          const [isFocused, setIsFocused] = useState(false);

          useEffect(() => {
            if (!isFocused) {
              setInputValue(qty);
            }
          }, [qty, isFocused]);

          return (
            <div key={size.id} className={`border rounded-[10px] p-2 ${qty > 0 ? "border-[#ed1c24]" : "border-[#dddddd]"}`}>
              <p className="text-sm font-medium mb-2 text-black">{size.size_label}</p>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => { onDecrease(size); setInputValue(prev => Math.max(prev - 1, 0)); }} disabled={qty === 0} className={`w-10 h-10 flex items-center justify-center text-white text-xl !rounded-md cursor-pointer ${qty === 0 ? "bg-[#cccccc] cursor-not-allowed" : "bg-[#ed1c24] hover:bg-black"}`}>
                  –
                </button>

                <input
                  type="number"
                  value={isFocused && inputValue === 0 ? "" : inputValue}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false);
                    if (inputValue === "") {
                      setInputValue(0);
                      onChange(size, 0);
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value === "" ? "" : Number(e.target.value);
                    setInputValue(value);
                    if (value !== "") onChange(size, value);
                  }}
                  className="w-16 text-center border border-gray-300 rounded-md p-2 no-spinner"
                />


                <button onClick={() => { onIncrease(size); setInputValue(prev => Math.min(prev + 1, maxQty)); }} disabled={qty >= maxQty} className={`w-10 h-10 flex items-center justify-center text-white text-xl rounded-md ${qty >= maxQty ? "bg-[#cccccc] cursor-not-allowed" : "bg-[#ed1c24] hover:bg-black"}`}>
                  +
                </button>
              </div>
            </div>
          );
        })}

      </div>
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
        carousel={{
          finite: true,
          preload: 0,
        }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: true,
        }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.85)" },
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />



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
// import { useRef, useState } from "react";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";



// const HatColorSelector = ({
//   colorName,
//   colorImage,
//   sizeVariants,
//   quantities,
//   onIncrease,
//   onDecrease,
//   onChange
// }) => {
//   const [open, setOpen] = useState(false);
//   const zoomRef = useRef(null);


//   const base_url = "https://arsalaanrasulshowmeropi.bestworks.cloud";
//   const imageSrc = `${base_url}${colorImage}`;


//   const handleOpenLightbox = () => {
//     setOpen(true);


//     setTimeout(() => {
//       zoomRef.current?.zoomIn(1.4);
//     }, 250);
//   };
//   return (
//     <div className="border-2 border-[#dddddd] rounded-[15px] p-4 text-center">

//       {/* IMAGE */}
//       <div className="relative w-[120px] mx-auto mb-2">
//         <Image
//           src={base_url + colorImage}
//           width={80}
//           height={80}
//           alt={colorName}
//           className="mx-auto"
//         />
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
//       <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3">
//         {sizeVariants.map(size => {
//           const qty = quantities?.[size.id] || 0;
//           const maxQty = size.inventoryItems?.qty_available ?? 0;
//           return (
//             <div
//               key={size.id}
//               className={`border rounded-[10px] p-2
//                 ${qty > 0 ? "border-[#ed1c24]" : "border-[#dddddd]"}
//               `}
//             >
//               <p className="text-sm font-medium mb-2 text-black">
//                 {size.size_label}
//               </p>

//               <div className="flex items-center justify-center gap-2">
//                 <button
//                   onClick={() => onDecrease(size)}
//                   disabled={qty === 0}
//                   className={`w-10 h-10 flex items-center justify-center text-white text-xl !rounded-md cursor-pointer
//                     ${qty === 0
//                       ? "bg-[#cccccc] cursor-not-allowed"
//                       : "bg-[#ed1c24] hover:bg-black"
//                     }
//                   `}
//                 >
//                   –
//                 </button>

//                 <input
//                   type="number"
//                   value={qty}
//                   onChange={(e) =>
//                     onChange(size, Number(e.target.value))
//                   }
//                   className="w-16 text-center border border-gray-300 rounded-md p-2"
//                 />

//                 <button
//                   onClick={() => onIncrease(size)}
//                   disabled={qty >= maxQty}
//                   className={`w-10 h-10 flex items-center justify-center text-white text-xl rounded-md
//     ${qty >= maxQty
//                       ? "bg-[#cccccc] cursor-not-allowed"
//                       : "bg-[#ed1c24] hover:bg-black"
//                     }
//   `}
//                 >
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


