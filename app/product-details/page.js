'use client';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Avatar, AvatarGroup, AvatarGroupCounter, Label, Select, FileInput, Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

import app_store from "../assets/imagesource/app_store.png";

import google_play from "../assets/imagesource/google_play.png";

import mobiles_01 from "../assets/imagesource/mobiles_01.png";

import about_01 from "../assets/imagesource/about_01.png";

import about_02 from "../assets/imagesource/about_02.png";

import stethy from "../assets/imagesource/stethy.png";

import home from "../assets/imagesource/home.png";

import team_01 from "../assets/imagesource/team_01.png";
import team_02 from "../assets/imagesource/team_02.png";
import team_03 from "../assets/imagesource/team_03.png";
import team_04 from "../assets/imagesource/team_04.png";
import team_05 from "../assets/imagesource/team_05.png";
import team_06 from "../assets/imagesource/team_06.png";

import list_banner from "../assets/imagesource/list_banner.png";

import product_01 from "../assets/imagesource/product_01.png";
import product_02 from "../assets/imagesource/product_02.png";
import product_03 from "../assets/imagesource/product_03.png";
import product_04 from "../assets/imagesource/product_04.png";

import rating_icon from "../assets/imagesource/rating_icon.png";

import red_icon from "../assets/imagesource/red_icon.png";
import yellow_icon from "../assets/imagesource/yellow_icon.png";
import gray_icon from "../assets/imagesource/gray_icon.png";

import yellow_cap from "../assets/imagesource/yellow_cap.png";
import orange_cap from "../assets/imagesource/orange_cap.png";
import purple_cap from "../assets/imagesource/purple_cap.png";
import cream_cap from "../assets/imagesource/cream_cap.png";
import brown_cap from "../assets/imagesource/brown_cap.png";
import black_cap from "../assets/imagesource/black_cap.png";

import product_details_small_img01 from "../assets/imagesource/product_details_small_img01.png";
import product_details_small_img02 from "../assets/imagesource/product_details_small_img02.png";
import product_details_small_img03 from "../assets/imagesource/product_details_small_img03.png";
import product_details_small_img04 from "../assets/imagesource/product_details_small_img04.png";

import product_details_big_img from "../assets/imagesource/product_details_big_img.png";

import { useRouter, useSearchParams } from 'next/navigation';


import { GoHome } from "react-icons/go";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { HiMiniPlusCircle } from "react-icons/hi2";

import { PiHandbag } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";

import { IoIosColorPalette } from "react-icons/io";
import { IoMdTrophy } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";



import Image from 'next/image';


import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../reducers/ProductSlice';
import { getValidImageUrl } from '../utils/imageHelper';



const page = () => {
const [activeImage, setActiveImage] = useState(null);
const[initialImage,setInitialImage]=useState(null)
//let initialImage = null;
  const{singleProList}=useSelector((state)=>state?.prod)
  const dispatch=useDispatch()
const searchParams = useSearchParams();
const id=atob(searchParams.get("id"))

  console.log("id",id);
  console.log("singleProList",singleProList);
  
  useEffect(()=>{
    dispatch(getSingleProduct({id:id})).then((res)=>{
      console.log("res",res);
      if(res?.payload?.status_code===200)
      {
        setActiveImage(res?.payload?.data?.images)
        setInitialImage(res?.payload?.data?.images)
      }
      
    })
  },[id])
  const handleOrderNowClick = () => {
    router.push('/upload-artwork');
  };

    const smallImages = [
    product_details_small_img01,
    product_details_small_img02,
    product_details_small_img03,
    product_details_small_img04
  ];

   const handleImageHover = (imageSrc) => {
    setActiveImage(imageSrc);
  };
   const handleMouseLeave = () => {
    setActiveImage(initialImage);
  };

//   const getAllUniquePricingTiers = (decorationMethods) => {
//   if (!decorationMethods?.length) return [];
  
//   const allTiers = decorationMethods.flatMap(method => 
//     method.pricingTiers || []
//   );
  
//   // Remove duplicates based on minQty-maxQty combination
//   const uniqueTiers = allTiers.reduce((acc, tier) => {
//     const key = `${tier.minQty}-${tier.maxQty}`;
//     if (!acc.some(t => `${t.minQty}-${t.maxQty}` === key)) {
//       acc.push(tier);
//     }
//     return acc;
//   }, []);
  
//   // Sort by minQty
//   return uniqueTiers.sort((a, b) => a.minQty - b.minQty);
// };


// const uniquePricingTiers = getAllUniquePricingTiers(
//   singleProList?.data?.decorationMethods
// );



const getAllPricingTiers = (decorationMethods) => {
  if (!decorationMethods?.length) return [];
  
  // Flatten all tiers from all methods
  const allTiers = decorationMethods.flatMap(method => 
    method.pricingTiers || []
  );
  
  // Use Map to ensure unique IDs
  const uniqueMap = new Map();
  allTiers.forEach(tier => {
    uniqueMap.set(tier.id, tier);
  });
  
  // Convert back to array and sort
  return Array.from(uniqueMap.values())
    .sort((a, b) => a.minQty - b.minQty);
};

const uniquePricingTiers = getAllPricingTiers(
  singleProList?.data?.decorationMethods
);






  return (
    <div>
      <div className='banner_area py-0 lg:p-0'>
        {/* home banner section start here */}
        <div className="relative">
          <Image src={list_banner} alt='list_banner' className="hidden lg:block w-full" />
          <Image src={list_banner} alt='list_banner' className="block lg:hidden w-full" />
        </div>
      </div>



      {/* Who We Are section start here */}
      <div className="py-10 lg:pb-20 lg:pt-10">

        <div className='mb-10'>
          <div className='max-w-6xl mx-auto px-5 lg:px-0 py-0 mb-10 flex justify-between items-center'>
            <div>
               <ul className='flex items-center gap-2'>
                  <li>
                    <Link href="/" passHref><GoHome className='text-[#666666] text-2xl' /></Link>
                  </li>
                  <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                  <li className='text-[#666666] text-base'>Caps</li>
                  <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                  {/* <li className='text-[#ED1C24] text-base'>Wooly Combed Flexifit</li> */}
                   <li className='text-[#ED1C24] text-base'>{singleProList?.data?.supplierStyleCode}</li>
               </ul>
            </div>
          </div>

        </div>


        <div className='max-w-6xl mx-auto px-5 lg:px-0'>

           <div className='lg:flex gap-8 mb-10'>
              <div className='lg:w-6/12 flex gap-3'>
                 <div className='w-2/12'
                 onMouseLeave={handleMouseLeave}
                 >
                   {/* <div className='mb-2'>
                      <Image src={product_details_small_img01} alt='product_details_small_img01' className="" />
                   </div>
                   <div className='mb-2'>
                      <Image src={product_details_small_img02} alt='product_details_small_img02' className="" />
                   </div>
                   <div className='mb-2'>
                      <Image src={product_details_small_img03} alt='product_details_small_img03' className="" />
                   </div>
                   <div className='mb-2'>
                      <Image src={product_details_small_img04} alt='product_details_small_img04' className="" />
                   </div> */}
                    {smallImages.map((imgSrc, index) => (
                  <div 
                    key={index}
                    className='mb-2 cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105'
                    onMouseEnter={() => handleImageHover(imgSrc)}
                  >
                    <Image 
                      src={imgSrc} 
                      alt={`product_details_small_img0${index + 1}`}
                      className="w-full h-auto rounded-md shadow-sm hover:shadow-md"
                      width={80} // Adjust based on your design
                      height={80}
                    />
                  </div>
        ))}
                 </div>
                 <div className='w-10/12'>
                    {/* <Image src={product_details_big_img} alt='product_details_big_img' className="" /> */}
                    <Image 
                    src={activeImage} 
                    alt='product_details_big_img' 
                    className="w-full h-auto rounded-lg shadow-lg transition-all duration-300"
                    width={400} // Adjust based on your design
                    height={400}
                    priority // For better performance on initial load
                    />
                 </div>
              </div>
              <div className='lg:w-6/12'>
                 <div className='border-b border-[#e5e5e5] pb-3'>
                    <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-2'>{singleProList?.data?.supplierStyleCode}</h3>
                    <p className='text-xl text-black font-medium'>{singleProList?.data?.basePrice}</p>
                 </div>
                 <div className="overflow-x-auto mt-4 wooly_area mb-5">
                    {/* <Table>
                      <TableHead>
                        <TableRow>
                          <TableHeadCell>QUANTITY</TableHeadCell>
                          {singleProList?.data?.decorationMethods?.map((quan)=>(
                            quan?.pricingTiers?.map((qty)=>(
                               <TableHeadCell>{qty?.minQty}-{qty?.maxQty}</TableHeadCell>
                            ))
                           
                          ))}
                          
                        </TableRow>
                      </TableHead>
                      <TableBody className="divide-y">
                        <TableRow className="bg-white border-white">
                          <TableCell className="whitespace-nowrap font-medium bg-[#FF7379] text-white">
                            Standard Print
                          </TableCell>
                          <TableCell className='bg-white text-black'>$24.00</TableCell>
                          <TableCell className='bg-white text-black'>$30.00</TableCell>
                          <TableCell className='bg-white text-black'>$45.00</TableCell>
                        </TableRow>
                        <TableRow className="bg-white border-white">
                          <TableCell className="whitespace-nowrap font-medium bg-[#FF7379] text-white">
                            Leather Patch
                          </TableCell>
                          <TableCell className='bg-white text-black'>$40.00</TableCell>
                          <TableCell className='bg-white text-black'>$55.00</TableCell>
                          <TableCell className='bg-white text-black'>$60.00</TableCell>
                        </TableRow>
                        <TableRow className="bg-white border-white">
                          <TableCell className="whitespace-nowrap font-medium bg-[#FF7379] text-white">3d Emboidary</TableCell>
                          <TableCell className='bg-white text-black'>$37.00</TableCell>
                          <TableCell className='bg-white text-black'>$60.00</TableCell>
                          <TableCell className='bg-white text-black'>$70.00</TableCell>
                        </TableRow>
                        <TableRow className="bg-white border-white">
                          <TableCell className="whitespace-nowrap font-medium bg-[#FF7379] text-white">Flat Emboidary</TableCell>
                          <TableCell className='bg-white text-black'>$35.00</TableCell>
                          <TableCell className='bg-white text-black'>$46.00</TableCell>
                          <TableCell className='bg-white text-black'>$52.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table> */}
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeadCell>QUANTITY</TableHeadCell>
                        {uniquePricingTiers.map((tier, index) => (
                          <TableHeadCell key={tier.id || index}>
                            {tier.minQty}-{tier.maxQty}
                          </TableHeadCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                      {singleProList?.data?.decorationMethods?.map((method, methodIndex) => (
                        <TableRow key={method.id || methodIndex} className="bg-white border-white">
                          <TableCell className="whitespace-nowrap font-medium bg-[#FF7379] text-white">
                            {method.decorationMethod}
                          </TableCell>
                          {uniquePricingTiers.map((tier, tierIndex) => {
                            // Find matching price for this tier in current decoration method
                            const matchingTier = method.pricingTiers?.find(
                              pt => pt.minQty === tier.minQty && pt.maxQty === tier.maxQty
                            );
                            
                            return (
                              <TableCell key={tierIndex} className='bg-white text-black'>
                                {matchingTier 
                                  ? `$${matchingTier.perUnitPrice.toFixed(2)}` 
                                  : '-'}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  
                  
                  
                  
                  </div>

                  <div>
                     <p className='text-sm text-[#808080] mb-1'><span className='text-black font-medium'>Category:</span> Flex Fit</p>
                     <p className='text-sm text-[#808080] mb-1'><span className='text-black font-medium'>Article Number:</span> 187400-1</p>
                     <p className='text-sm text-[#808080] mb-1'><span className='text-black font-medium'>Material:</span> 63% Polyester, 34% Cotton, 3% Elastane</p>
                  </div>

              </div>
           </div>

           <h3 className='text-[#1A1A1A] text-2xl font-bold pb-4'>Color & Sizing</h3>
           <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10'>
              {
                singleProList?.data?.productVariants?.map((vari)=>(
                   <div className='border border-[#A3A3A3] rounded-[15px] bg-white p-5'>
                 <div className='text-center mb-5'>
                    {/* <Image src={yellow_cap} alt='yellow_cap' className="inline-block" /> */}
                    {
                      vari?.images?(
                        <Image src={getValidImageUrl(vari?.images)} height={50} width={50} alt='yellow_cap' className="inline-block" />
                      ):(
                        <div className="w-full h-[100px] bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">No Image</span>
                            </div>
                      )
                    }
                    
                    
                    <p className='text-black text-[18px] font-medium'>{vari?.color}</p>
                 </div>
                 <div className='grid grid-cols-5 gap-2'>
                  {
                    vari?.variantSizes?.map((sizes)=>(

                         <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number"
                      disabled={sizes?.inventory?.[0]?.qtyAvailable===0 || sizes?.inventory?.length<=0}
                      min={0}
                       max={sizes?.inventory?.[0]?.qtyAvailable}
                        className='w-full h-[60px] text-center disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed'
                       placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>{sizes?.size}</p>
                      </div>
                    </div>
                    ))
                  }
           
                 </div>
              </div>

                ))
              }
             

              {/* <div className='border border-[#A3A3A3] rounded-[15px] bg-white p-5'>
                 <div className='text-center mb-5'>
                    <Image src={orange_cap} alt='yellow_cap' className="inline-block" />
                    <p className='text-black text-[18px] font-medium'>Orange</p>
                 </div>
                 <div className='grid grid-cols-5 gap-2'>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>S</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>M</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>L</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>XL</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>XXL</p>
                      </div>
                    </div>
                 </div>
              </div>

              <div className='border border-[#A3A3A3] rounded-[15px] bg-white p-5'>
                 <div className='text-center mb-5'>
                    <Image src={purple_cap} alt='yellow_cap' className="inline-block" />
                    <p className='text-black text-[18px] font-medium'>Purple</p>
                 </div>
                 <div className='grid grid-cols-5 gap-2'>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>S</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>M</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>L</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>XL</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>XXL</p>
                      </div>
                    </div>
                 </div>
              </div>

              <div className='border border-[#A3A3A3] rounded-[15px] bg-white p-5'>
                 <div className='text-center mb-5'>
                    <Image src={cream_cap} alt='cream_cap' className="inline-block" />
                    <p className='text-black text-[18px] font-medium'>Cream</p>
                 </div>
                 <div className='grid grid-cols-5 gap-2'>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>S</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>L</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>XL</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>XXL</p>
                      </div>
                    </div>
                 </div>
              </div>

              <div className='border border-[#A3A3A3] rounded-[15px] bg-white p-5'>
                 <div className='text-center mb-5'>
                    <Image src={brown_cap} alt='brown_cap' className="inline-block" />
                    <p className='text-black text-[18px] font-medium'>Brown</p>
                 </div>
                 <div className='grid grid-cols-5 gap-2'>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>S</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>M</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>L</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>XL</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>XXL</p>
                      </div>
                    </div>
                 </div>
              </div>

              <div className='border border-[#A3A3A3] rounded-[15px] bg-white p-5'>
                 <div className='text-center mb-5'>
                    <Image src={black_cap} alt='black_cap' className="inline-block" />
                    <p className='text-black text-[18px] font-medium'>Black</p>
                 </div>
                 <div className='grid grid-cols-5 gap-2'>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>S</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>M</p>
                      </div>
                    </div>
                    <div className='border border-[#A2A2A2] rounded-[4px] number_box'>
                      <input type="number" className='w-full h-[60px] text-center' placeholder='0' />
                      <div className='bg-[#FF7C7C] py-2 text-center'>
                        <p className='text-white text-base font-semibold uppercase'>L</p>
                      </div>
                    </div>
                 </div>
              </div> */}

           </div>

           <div className='border-t border-[#e5e5e5] py-4 flex items-center gap-2'>
              <button onClick={handleOrderNowClick} className='bg-[#ED1C24] hover:bg-black text-white text-base rounded-full w-full py-3 cursor-pointer flex justify-center items-center gap-2'>
                Order Now <PiHandbag className='text-2xl' />
              </button>
              <button className='bg-[#ffffff] hover:bg-black border border-[#ED1C24] text-[#ED1C24] text-base rounded-full w-full py-3 cursor-pointer flex justify-center items-center gap-2'>
                Get Quote <PiHandbag className='text-2xl' />
              </button>
              <button className='bg-[#FFEEEE] hover:bg-black text-[#ED1C24] text-base rounded-full w-[115px] h-[55px] cursor-pointer flex justify-center items-center gap-2'>
                <CiHeart className='text-3xl' />
              </button>
           </div>

        </div>
        
      </div>
      {/* Who We Are section ends here */}

       
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-0'>
        <div className='bg-[#9f9f9f] py-6 flex justify-center items-center lg:border-r-2 border-[#000000] item_area'>
          <div className='flex items-center gap-2 relative z-20'>
            <div>
              <IoIosColorPalette className='text-white text-5xl' />
            </div>
            <div>
              <p className='text-white text-base font-medium'>12+ Items</p>
              <p className='text-white text-base font-medium'>Free Artwork Setup</p>
            </div>
          </div>
        </div>
        <div className='bg-[#9f9f9f] py-6 flex justify-center items-center lg:border-r-2 border-[#000000]'>
          <div className='flex items-center gap-2'>
            <div>
              <TbTruckDelivery className='text-white text-5xl' />
            </div>
            <div>
              <p className='text-white text-base font-medium'>24+ Items</p>
              <p className='text-white text-base font-medium'>Free Shipping</p>
            </div>
          </div>
        </div>
        <div className='bg-[#9f9f9f] py-6 flex justify-center items-center'>
          <div className='flex items-center gap-2'>
            <div>
              <IoMdTrophy className='text-white text-5xl' />
            </div>
            <div>
              <p className='text-white text-base font-medium'>48+ Items</p>
              <p className='text-white text-base font-medium'>Free Premium Setup</p>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  )
}

export default page