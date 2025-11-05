'use client';
import Image from "next/image"
import Link from "next/link"
import product_01 from "../assets/imagesource/product_01.png";
import product_02 from "../assets/imagesource/product_02.png";
import product_03 from "../assets/imagesource/product_03.png";
import product_04 from "../assets/imagesource/product_04.png";
import rating_icon from "../assets/imagesource/rating_icon.png";

import red_icon from "../assets/imagesource/red_icon.png";
import yellow_icon from "../assets/imagesource/yellow_icon.png";
import gray_icon from "../assets/imagesource/gray_icon.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, getProduct } from "../reducers/ProductSlice";

const CapList=({ selectedSupplierId })=>{

    const{productList,allProList}=useSelector((state)=>state?.prod)
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(getAllProduct({
        page:1,
        limit:10
      }))
    },[])
  const displayProducts = selectedSupplierId 
    ? productList?.data?.data
    : allProList?.data
    console.log("productList",productList);
      console.log("allProList",allProList);
    
    return(
        <>
         <div className='team_wrap'>
              <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
                {
                  displayProducts?.map((allPro)=>(
                       <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Link href="/product-details" passHref>
                         <Image src={product_01} alt='product_01' className="w-full" />
                      </Link>
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>{allPro?.supplierStyleCode}</p>
                          <p className='text-[#4D4D4D] text-sm'>{allPro?.hatName}</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>{allPro?.basePrice}</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                  ))
                }

                 {/* <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Link href="/product-details" passHref>
                         <Image src={product_01} alt='product_01' className="w-full" />
                      </Link>
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i1002</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div> */}
                 {/* <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_02} alt='product_02' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2005</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_03} alt='product_03' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2006</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_04} alt='product_04' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2011</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div> */}

{/* 
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_01} alt='product_01' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i1002</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_02} alt='product_02' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2005</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_03} alt='product_03' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2006</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_04} alt='product_04' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2011</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div> */}

{/* 
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_01} alt='product_01' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i1002</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_02} alt='product_02' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2005</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_03} alt='product_03' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2006</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_04} alt='product_04' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2011</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div> */}


                 {/* <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_01} alt='product_01' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i1002</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_02} alt='product_02' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2005</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_03} alt='product_03' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2006</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                 <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Image src={product_04} alt='product_04' className="w-full" />
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>i2011</p>
                          <p className='text-[#4D4D4D] text-sm'>New Era</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>$14.99</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div> */}

              </div>
           </div>
        </>
    )
}
export default CapList