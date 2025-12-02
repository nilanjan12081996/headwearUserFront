
'use client';
import React, { useEffect, useState } from 'react'
import logoBlack from "../assets/imagesource/logoBlack.png";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
import preview_01 from "../assets/imagesource/preview_01.jpg";
import preview_02 from "../assets/imagesource/preview_02.jpg";
import preview_03 from "../assets/imagesource/preview_03.jpg";
import Black from "../assets/imagesource/Black.png";
import { FiPlusCircle } from "react-icons/fi";
import White from "../assets/imagesource/White.png";
import Moss from "../assets/imagesource/Moss.png";
import Buck from "../assets/imagesource/Buck.png";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getHatBrandList, getHatListDetail } from '../reducers/HatBrandSlice';


const ProductAccordion = ({ min = 0, max = 100, step = 1 }) => {

    const [value, setValue] = useState(min);

    const decrease = () => {
        setValue(prev => Math.max(prev - step, min));
    };
    const increase = () => {
        setValue(prev => Math.min(prev + step, max));
    };

    const dispatch = useDispatch();
    const { brandList, brandWiseHatList } = useSelector((state) => state.hatBrand);
    useEffect(() => {
        dispatch(getHatBrandList());
    }, []);

    useEffect(() => {
        if (!brandList || !brandList.data) return;

        brandList.data.forEach((brand) => {
            dispatch(getHatListDetail({ brandId: brand.id }));
        });

    }, [brandList]);

    return (
        <div className='product_details_area'>
            {brandList?.data?.map((brand) => {
                const hats = brandWiseHatList?.[brand.id]?.data?.hats || [];

                return (
                    <div key={brand.id}>
                        <div className='bg-[#efefef] p-4 my-2'>
                            <Image
                                // src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${brand.brandImage}`}
                                src={logoBlack}
                                width={200}
                                height={80}
                                alt='brand-img'
                                className='object-contain'
                                unoptimized
                            />

                        </div>
                        <div className='product_details_area_box'>
                            <Accordion>
                                {hats.length === 0 ? (
                                    <p className='text-center text-gray-500 py-5'>
                                        No records
                                    </p>
                                ) : (
                                    hats.map((hat) => {
                                        console.log('hat', hat)
                                        console.log('sp', hat.pricing.embroidery?.tiers[0]?.minQty)
                                        const sizeParts = hat?.sizeChart ? hat.sizeChart.split(",").map(s => s.trim()) : [];
                                        const mainSize = sizeParts[0] || "";
                                        const otherSizes = sizeParts.slice(1).join(", ");
                                        return (
                                            <AccordionPanel key={hat.id}>
                                                <AccordionTitle>
                                                    <div className='flex items-center gap-3'>
                                                        <Image src={preview_01} alt='preview_01' className="w-[80px]" />
                                                        <p className='text-xl text-[#ff7379] font-semibold'>{hat.hatName}</p>
                                                    </div>
                                                </AccordionTitle>
                                                <AccordionContent>
                                                    <div>
                                                        <div className='flex justify-center items-center'>
                                                            <Image src={preview_01} alt='preview_01' className="w-[400px]" />
                                                        </div>
                                                        <div className='w-8/12 mx-auto my-6'>
                                                            <div className='bg-[#eeeeee] rounded-[10px] p-5 text-center mb-4'>
                                                                <p className='text-base text-black'>The most comfortable and versatile performance snapback ont the market. The 636 by Kodo Caps is a
                                                                    moisture wicking performance snapback hat that has laser cut ventelation the back panels for optimal
                                                                    breathability on and off the course. Give these hats a try. You will NOT be disappointed.</p>
                                                            </div>
                                                            <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>Size Chart</div>
                                                            <div className='bg-[#eeeeee] text-center mb-1 font-medium text-base py-2 text-black'> {mainSize}</div>
                                                            {otherSizes && (
                                                                <div className='text-center mb-4'>
                                                                    <p>{otherSizes}</p>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>
                                                                    Total Items Price Break
                                                                </div>
                                                                <div className="mb-1">
                                                                    <div className='flex gap-2 mb-1'>
                                                                        <div className='w-3/12 bg-[#ff7379] flex items-center justify-center text-black font-medium text-base'>EMBROIDERY</div>
                                                                        <div className='w-9/12 grid grid-cols-8 gap-1'>
                                                                            {hat.pricing?.embroidery?.tiers?.length > 0 ? (
                                                                                hat.pricing.embroidery.tiers.map((tier, index) => (
                                                                                    <div key={index} className="text-center">
                                                                                        <p className='bg-[#eeeeee] p-1 text-sm'>{tier.minQty}</p>
                                                                                        <div className='bg-[#ffffff] p-1 text-sm'>${tier.unitPrice}</div>
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                <p className='text-gray-400'>No embroidery pricing available</p>
                                                                            )}

                                                                        </div>
                                                                    </div>
                                                                    <div className='flex gap-2'>
                                                                        <div className='w-3/12 bg-[#eeeeee] flex items-center justify-center text-black font-medium text-base'>PATCH</div>
                                                                        <div className='w-9/12 grid grid-cols-8 gap-1'>
                                                                            {hat.pricing?.embroidery?.tiers?.length > 0 ? (
                                                                                hat.pricing.leatherPatch.tiers.map((tier, index) => (
                                                                                    <div key={index} className="text-center">
                                                                                        <p className='bg-[#eeeeee] p-1 text-sm'>{tier.minQty}</p>
                                                                                        <div className='bg-[#ffffff] p-1 text-sm'>${tier.unitPrice}</div>
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                <p className='text-gray-400'>No patch pricing available</p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='bg-[#eeeeee] mb-4 font-medium text-sm py-2 pr-2 text-black text-right'>Price includes item & decoration.</div>
                                                            </div>
                                                        </div>

                                                        <div className='grid grid-cols-4 gap-4'>

                                                            <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
                                                                <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
                                                                    <Image src={Black} alt='Black' className="" />
                                                                    <div className='absolute left-[5px] bottom-[-7px]'>
                                                                        <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
                                                                            <FiPlusCircle className='text-xl' />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <p className='text-base text-black font-medium pb-4'>Black</p>
                                                                <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
                                                                    <p className='text-base text-black font-normal pb-4'>OSFA</p>
                                                                    <div className="flex items-center gap-2 number_section">
                                                                        {/* Minus Button */}
                                                                        <button
                                                                            type="button"
                                                                            onClick={decrease}
                                                                            className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                                                        >
                                                                            –
                                                                        </button>

                                                                        {/* Input Field */}
                                                                        <input
                                                                            type="number"
                                                                            value={value}
                                                                            onChange={(e) => setValue(Number(e.target.value))}
                                                                            className="w-20 text-center border border-gray-300 rounded-md p-2"
                                                                        />

                                                                        {/* Plus Button */}
                                                                        <button
                                                                            type="button"
                                                                            onClick={increase}
                                                                            className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
                                                                <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
                                                                    <Image src={White} alt='White' className="" />
                                                                    <div className='absolute left-[5px] bottom-[-7px]'>
                                                                        <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
                                                                            <FiPlusCircle className='text-xl' />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <p className='text-base text-black font-medium pb-4'>White</p>
                                                                <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
                                                                    <p className='text-base text-black font-normal pb-4'>OSFA</p>
                                                                    <div className="flex items-center gap-2 number_section">
                                                                        {/* Minus Button */}
                                                                        <button
                                                                            type="button"
                                                                            onClick={decrease}
                                                                            className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                                                        >
                                                                            –
                                                                        </button>

                                                                        {/* Input Field */}
                                                                        <input
                                                                            type="number"
                                                                            value={value}
                                                                            onChange={(e) => setValue(Number(e.target.value))}
                                                                            className="w-20 text-center border border-gray-300 rounded-md p-2"
                                                                        />

                                                                        {/* Plus Button */}
                                                                        <button
                                                                            type="button"
                                                                            onClick={increase}
                                                                            className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
                                                                <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
                                                                    <Image src={Moss} alt='Moss' className="" />
                                                                    <div className='absolute left-[5px] bottom-[-7px]'>
                                                                        <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
                                                                            <FiPlusCircle className='text-xl' />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <p className='text-base text-black font-medium pb-4'>Moss</p>
                                                                <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
                                                                    <p className='text-base text-black font-normal pb-4'>OSFA</p>
                                                                    <div className="flex items-center gap-2 number_section">
                                                                        {/* Minus Button */}
                                                                        <button
                                                                            type="button"
                                                                            onClick={decrease}
                                                                            className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                                                        >
                                                                            –
                                                                        </button>

                                                                        {/* Input Field */}
                                                                        <input
                                                                            type="number"
                                                                            value={value}
                                                                            onChange={(e) => setValue(Number(e.target.value))}
                                                                            className="w-20 text-center border border-gray-300 rounded-md p-2"
                                                                        />

                                                                        {/* Plus Button */}
                                                                        <button
                                                                            type="button"
                                                                            onClick={increase}
                                                                            className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
                                                                <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
                                                                    <Image src={Buck} alt='Buck' className="" />
                                                                    <div className='absolute left-[5px] bottom-[-7px]'>
                                                                        <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
                                                                            <FiPlusCircle className='text-xl' />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <p className='text-base text-black font-medium pb-4'>Buck</p>
                                                                <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
                                                                    <p className='text-base text-black font-normal pb-4'>OSFA</p>
                                                                    <div className="flex items-center gap-2 number_section">
                                                                        {/* Minus Button */}
                                                                        <button
                                                                            type="button"
                                                                            onClick={decrease}
                                                                            className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                                                        >
                                                                            –
                                                                        </button>

                                                                        {/* Input Field */}
                                                                        <input
                                                                            type="number"
                                                                            value={value}
                                                                            onChange={(e) => setValue(Number(e.target.value))}
                                                                            className="w-20 text-center border border-gray-300 rounded-md p-2"
                                                                        />

                                                                        {/* Plus Button */}
                                                                        <button
                                                                            type="button"
                                                                            onClick={increase}
                                                                            className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionPanel>)
                                    }))}
                            </Accordion>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductAccordion



// 'use client';
// import React, { useEffect, useState } from 'react'
// import logoBlack from "../assets/imagesource/logoBlack.png";
// import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
// import preview_01 from "../assets/imagesource/preview_01.jpg";
// import preview_02 from "../assets/imagesource/preview_02.jpg";
// import preview_03 from "../assets/imagesource/preview_03.jpg";
// import Black from "../assets/imagesource/Black.png";
// import { FiPlusCircle } from "react-icons/fi";
// import White from "../assets/imagesource/White.png";
// import Moss from "../assets/imagesource/Moss.png";
// import Buck from "../assets/imagesource/Buck.png";
// import Image from 'next/image';
// import { useDispatch } from 'react-redux';
// import { getHatBrandList, getHatListDetail } from '../reducers/HatBrandSlice';


// const ProductAccordion = ({ min = 0, max = 100, step = 1 }) => {

//     const [value, setValue] = useState(min);

//     const decrease = () => {
//         setValue(prev => Math.max(prev - step, min));
//     };

//     const dispatch=useDispatch();


//     const increase = () => {
//         setValue(prev => Math.min(prev + step, max));
//     };
//     return (
//         <div className='product_details_area'>
//             <div className='bg-[#efefef] p-4'>
//                 <Image src={logoBlack} alt='logoBlack' className="w-[200px]" />
//             </div>
//             <div className='product_details_area_box'>
//                 <Accordion>
//                     <AccordionPanel>
//                         <AccordionTitle>
//                             <div className='flex items-center gap-3'>
//                                 <Image src={preview_01} alt='preview_01' className="w-[80px]" />
//                                 <p className='text-xl text-[#ff7379] font-semibold'>The 636 Performance Rope Snapback</p>
//                             </div>
//                         </AccordionTitle>
//                         <AccordionContent>
//                             <div>
//                                 <div className='flex justify-center items-center'>
//                                     <Image src={preview_01} alt='preview_01' className="w-[400px]" />
//                                 </div>
//                                 <div className='w-8/12 mx-auto my-6'>
//                                     <div className='bg-[#eeeeee] rounded-[10px] p-5 text-center mb-4'>
//                                         <p className='text-base text-black'>The most comfortable and versatile performance snapback ont the market. The 636 by Kodo Caps is a
//                                             moisture wicking performance snapback hat that has laser cut ventelation the back panels for optimal
//                                             breathability on and off the course. Give these hats a try. You will NOT be disappointed.</p>
//                                     </div>
//                                     <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>Size Chart</div>
//                                     <div className='bg-[#eeeeee] text-center mb-1 font-medium text-base py-2 text-black'>OSFA</div>
//                                     <div className='text-center mb-4'>
//                                         <p>6 5/8"-7 7/8"</p>
//                                     </div>
//                                     <div>
//                                         <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>
//                                             Total Items Price Break
//                                         </div>
//                                         <div className="mb-1">
//                                             <div className='flex gap-2 mb-1'>
//                                                 <div className='w-3/12 bg-[#ff7379] flex items-center justify-center text-black font-medium text-base'>EMBROIDERY</div>
//                                                 <div className='w-9/12 grid grid-cols-8 gap-1'>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className='flex gap-2'>
//                                                 <div className='w-3/12 bg-[#eeeeee] flex items-center justify-center text-black font-medium text-base'>PATCH</div>
//                                                 <div className='w-9/12 grid grid-cols-8 gap-1'>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='bg-[#eeeeee] mb-4 font-medium text-sm py-2 pr-2 text-black text-right'>Price includes item & decoration.</div>
//                                     </div>
//                                 </div>

//                                 <div className='grid grid-cols-4 gap-4'>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={Black} alt='Black' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>Black</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={White} alt='White' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>White</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={Moss} alt='Moss' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>Moss</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={Buck} alt='Buck' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>Buck</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </AccordionContent>
//                     </AccordionPanel>
//                     <AccordionPanel>
//                         <AccordionTitle>
//                             <div className='flex items-center gap-3'>
//                                 <Image src={preview_02} alt='preview_02' className="w-[80px]" />
//                                 <p className='text-xl text-[#ff7379] font-semibold'>The 618 Performance Trucker Snapback</p>
//                             </div>
//                         </AccordionTitle>
//                         <AccordionContent>
//                             <div>
//                                 <div className='flex justify-center items-center'>
//                                     <Image src={preview_01} alt='preview_01' className="w-[400px]" />
//                                 </div>
//                                 <div className='w-8/12 mx-auto my-6'>
//                                     <div className='bg-[#eeeeee] rounded-[10px] p-5 text-center mb-4'>
//                                         <p className='text-base text-black'>The most comfortable and versatile performance snapback ont the market. The 636 by Kodo Caps is a
//                                             moisture wicking performance snapback hat that has laser cut ventelation the back panels for optimal
//                                             breathability on and off the course. Give these hats a try. You will NOT be disappointed.</p>
//                                     </div>
//                                     <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>Size Chart</div>
//                                     <div className='bg-[#eeeeee] text-center mb-1 font-medium text-base py-2 text-black'>OSFA</div>
//                                     <div className='text-center mb-4'>
//                                         <p>6 5/8"-7 7/8"</p>
//                                     </div>
//                                     <div>
//                                         <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>
//                                             Total Items Price Break
//                                         </div>
//                                         <div className="mb-1">
//                                             <div className='flex gap-2 mb-1'>
//                                                 <div className='w-3/12 bg-[#ff7379] flex items-center justify-center text-black font-medium text-base'>EMBROIDERY</div>
//                                                 <div className='w-9/12 grid grid-cols-8 gap-1'>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className='flex gap-2'>
//                                                 <div className='w-3/12 bg-[#eeeeee] flex items-center justify-center text-black font-medium text-base'>PATCH</div>
//                                                 <div className='w-9/12 grid grid-cols-8 gap-1'>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='bg-[#eeeeee] mb-4 font-medium text-sm py-2 pr-2 text-black text-right'>Price includes item & decoration.</div>
//                                     </div>
//                                 </div>

//                                 <div className='grid grid-cols-4 gap-4'>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={Black} alt='Black' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>Black</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={White} alt='White' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>White</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={Moss} alt='Moss' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>Moss</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={Buck} alt='Buck' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>Buck</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </AccordionContent>
//                     </AccordionPanel>
//                     <AccordionPanel>
//                         <AccordionTitle>
//                             <div className='flex items-center gap-3'>
//                                 <Image src={preview_03} alt='preview_03' className="w-[80px]" />
//                                 <p className='text-xl text-[#ff7379] font-semibold'>The 314 Snapback</p>
//                             </div>
//                         </AccordionTitle>
//                         <AccordionContent>
//                             <div>
//                                 <div className='flex justify-center items-center'>
//                                     <Image src={preview_01} alt='preview_01' className="w-[400px]" />
//                                 </div>
//                                 <div className='w-8/12 mx-auto my-6'>
//                                     <div className='bg-[#eeeeee] rounded-[10px] p-5 text-center mb-4'>
//                                         <p className='text-base text-black'>The most comfortable and versatile performance snapback ont the market. The 636 by Kodo Caps is a
//                                             moisture wicking performance snapback hat that has laser cut ventelation the back panels for optimal
//                                             breathability on and off the course. Give these hats a try. You will NOT be disappointed.</p>
//                                     </div>
//                                     <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>Size Chart</div>
//                                     <div className='bg-[#eeeeee] text-center mb-1 font-medium text-base py-2 text-black'>OSFA</div>
//                                     <div className='text-center mb-4'>
//                                         <p>6 5/8"-7 7/8"</p>
//                                     </div>
//                                     <div>
//                                         <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>
//                                             Total Items Price Break
//                                         </div>
//                                         <div className="mb-1">
//                                             <div className='flex gap-2 mb-1'>
//                                                 <div className='w-3/12 bg-[#ff7379] flex items-center justify-center text-black font-medium text-base'>EMBROIDERY</div>
//                                                 <div className='w-9/12 grid grid-cols-8 gap-1'>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className='flex gap-2'>
//                                                 <div className='w-3/12 bg-[#eeeeee] flex items-center justify-center text-black font-medium text-base'>PATCH</div>
//                                                 <div className='w-9/12 grid grid-cols-8 gap-1'>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
//                                                     </div>
//                                                     <div className='text-center'>
//                                                         <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
//                                                         <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='bg-[#eeeeee] mb-4 font-medium text-sm py-2 pr-2 text-black text-right'>Price includes item & decoration.</div>
//                                     </div>
//                                 </div>

//                                 <div className='grid grid-cols-4 gap-4'>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={Black} alt='Black' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>Black</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={White} alt='White' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>White</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={Moss} alt='Moss' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>Moss</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
//                                         <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
//                                             <Image src={Buck} alt='Buck' className="" />
//                                             <div className='absolute left-[5px] bottom-[-7px]'>
//                                                 <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
//                                                     <FiPlusCircle className='text-xl' />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <p className='text-base text-black font-medium pb-4'>Buck</p>
//                                         <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
//                                             <p className='text-base text-black font-normal pb-4'>OSFA</p>
//                                             <div className="flex items-center gap-2 number_section">
//                                                 {/* Minus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={decrease}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     –
//                                                 </button>

//                                                 {/* Input Field */}
//                                                 <input
//                                                     type="number"
//                                                     value={value}
//                                                     onChange={(e) => setValue(Number(e.target.value))}
//                                                     className="w-20 text-center border border-gray-300 rounded-md p-2"
//                                                 />

//                                                 {/* Plus Button */}
//                                                 <button
//                                                     type="button"
//                                                     onClick={increase}
//                                                     className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </AccordionContent>
//                     </AccordionPanel>
//                 </Accordion>
//             </div>
//         </div>
//     )
// }

// export default ProductAccordion