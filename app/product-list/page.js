'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Avatar, AvatarGroup, AvatarGroupCounter, Label, Select, Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";

import app_store from "../assets/imagesource/app_store.png";

import google_play from "../assets/imagesource/google_play.png";

import mobiles_01 from "../assets/imagesource/mobiles_01.png";

import about_01 from "../assets/imagesource/about_01.png";

import about_02 from "../assets/imagesource/about_02.png";

import stethy from "../assets/imagesource/stethy.png";

import logoBlack from "../assets/imagesource/logoBlack.png";

import preview_01 from "../assets/imagesource/preview_01.jpg";
import preview_02 from "../assets/imagesource/preview_02.jpg";
import preview_03 from "../assets/imagesource/preview_03.jpg";


import Black from "../assets/imagesource/Black.png";
import White from "../assets/imagesource/White.png";
import Moss from "../assets/imagesource/Moss.png";
import Buck from "../assets/imagesource/Buck.png";

import list_banner from "../assets/imagesource/list_banner.png";

import product_01 from "../assets/imagesource/product_01.png";
import product_02 from "../assets/imagesource/product_02.png";
import product_03 from "../assets/imagesource/product_03.png";
import product_04 from "../assets/imagesource/product_04.png";

import rating_icon from "../assets/imagesource/rating_icon.png";

import red_icon from "../assets/imagesource/red_icon.png";
import yellow_icon from "../assets/imagesource/yellow_icon.png";
import gray_icon from "../assets/imagesource/gray_icon.png";


import { GoHome } from "react-icons/go";
import { MdOutlineArrowForwardIos } from "react-icons/md";


import { IoIosColorPalette } from "react-icons/io";
import { IoMdTrophy } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";

import { FiPlusCircle } from "react-icons/fi";



import Image from 'next/image';


import { FaPlus } from "react-icons/fa";
import CapList from './CapList';
import { useDispatch, useSelector } from 'react-redux';
import { getSuppliers } from '../reducers/SupplierSlice';
import { getAllProduct, getProduct } from '../reducers/ProductSlice';



const page = ({ min = 0, max = 100, step = 1 }) => {
  const [selectedSupplier, setSelectedSupplier] = useState('Supplier')
  const{suppliersList}=useSelector((state)=>state?.suppliers)
  const{productList,allProList}=useSelector((state)=>state?.prod)

const dispatch=useDispatch()
  useEffect(()=>{
dispatch(getSuppliers({
  page:1,
  limit:10
}))
  },[])
  console.log("suppliersList",suppliersList);

    const handleSupplierChange = (e) => {
      
      
    const supplierId = e.target.value
    setSelectedSupplier(supplierId)
    console.log("Supplier", supplierId)
    
    // Dispatch getProduct with selected supplier ID
    if (supplierId && supplierId!=="Supplier" ) {
      dispatch(getProduct({ id: supplierId }))
    } else if(supplierId=="Supplier"){
      // If no supplier selected, fetch all products
      dispatch(getAllProduct({
        page: 1,
        limit: 10
      }))
    }
    else{
       dispatch(getAllProduct({
        page: 1,
        limit: 10
      }))
    }
  }


  const [value, setValue] = useState(min);

  const decrease = () => {
    setValue(prev => Math.max(prev - step, min));
  };

  const increase = () => {
    setValue(prev => Math.min(prev + step, max));
  };
  
  return (
    <div>
      <div className='banner_area py-0 lg:p-0'>
        
        <div className="relative">
          <Image src={list_banner} alt='list_banner' className="hidden lg:block w-full" />
          <Image src={list_banner} alt='list_banner' className="block lg:hidden w-full" />
        </div>
      </div>

      <div className="py-10 lg:pb-20 lg:pt-10">

        <div className='mb-10'>
          

          <div className='max-w-6xl mx-auto px-5 lg:px-0 py-0 mb-10 flex justify-between items-center'>
            <div>
               <ul className='flex items-center gap-2'>
                  <li>
                    <Link href="/" passHref><GoHome className='text-[#666666] text-2xl' /></Link>
                  </li>
                  <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                  <li className='text-[#ED1C24] text-base'>Caps</li>
               </ul>
            </div>
            <div className='w-full lg:w-2/12 mb-3 lg:mb-0 form_area'>
                <Select required>
                  <option>Emboidary</option>
                  <option>Patch</option>
                </Select>
              </div>
          </div>
          
          <div className='max-w-6xl mx-auto px-5 lg:px-0 py-0 lg:flex justify-between items-center'>
            <div className='form_area lg:w-8/12 lg:flex items-center gap-4 mb-3 lg:mb-0'>
              <div className='w-full lg:w-3/12 mb-3 lg:mb-0'>
                <Select  
                value={selectedSupplier}
                onChange={handleSupplierChange}>
                  <option>Supplier</option>
                  {
                    suppliersList?.data?.map((sup)=>(
                      <option value={sup?.id}>{sup?.supplierName}</option>
                    ))
                  }
                  
                 
                </Select>
              </div>
              <div className='w-full lg:w-2/12 mb-3 lg:mb-0'>
                <Select required>
                  <option>Color</option>
                  <option>Color 01</option>
                  <option>Color 02</option>
                  <option>Color 03</option>
                </Select>
              </div>
              <div className='w-full lg:w-2/12 mb-3 lg:mb-0'>
                <Select required>
                  <option>Size</option>
                  <option>Size 01</option>
                  <option>Size 02</option>
                  <option>Size 03</option>
                </Select>
              </div>
              <div className='w-full lg:w-2/12 mb-3 lg:mb-0'>
                <Select required>
                  <option>Price</option>
                  <option>Price 01</option>
                  <option>Price 02</option>
                  <option>Price 03</option>
                </Select>
              </div>
            </div>
            <div className='form_area lg:w-4/12 flex items-center gap-4'>
               <div className='w-6/12'>
                  <Select required>
                    <option>Sort by: Latest</option>
                    <option> 01</option>
                    <option> 02</option>
                    <option> 03</option>
                  </Select>
                </div>
                <div className='w-6/12'>
                  <Select required>
                    <option>Show: 16</option>
                    <option> 01</option>
                    <option> 02</option>
                    <option> 03</option>
                  </Select>
                </div>
            </div>
          </div>
        </div>

        <div className='border-t border-[#ebebeb] border-b mb-10'>
          <div className='max-w-6xl mx-auto px-5 lg:px-0 py-4 lg:flex justify-between items-center'>
            <div className='pb-2 lg:pb-0'>
              <p className='text-sm text-[#808080] font-medium'>Active Filters: <span className='text-black'>Min $300 - Max 500</span></p>
            </div>
            <div>
               <p className='text-sm text-[#808080] font-medium'><span className='text-black'>{selectedSupplier!=="Supplier"?productList?.data?.pagination?.totalRecords: allProList?.pagination?.totalRecords}</span> Results found.</p>
            </div>
          </div>
        </div>

        {/* <div className='max-w-6xl mx-auto px-5 lg:px-0'>
          
          <CapList selectedSupplierId={selectedSupplier}/>
        </div> */}
      </div>
      {/* Who We Are section ends here */}



      <div className='product_list_section mb-20'>

        
        <div className='max-w-6xl mx-auto'>
          <div className='product_details_area'>
            <div className='bg-[#efefef] p-4'>
              <Image src={logoBlack} alt='logoBlack' className="w-[200px]" />
            </div>
            <div className='product_details_area_box'>
              <Accordion>
                <AccordionPanel>
                  <AccordionTitle>
                     <div className='flex items-center gap-3'>
                        <Image src={preview_01} alt='preview_01' className="w-[80px]" />
                        <p className='text-xl text-[#ff7379] font-semibold'>The 636 Performance Rope Snapback</p>
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
                        <div className='bg-[#eeeeee] text-center mb-1 font-medium text-base py-2 text-black'>OSFA</div>
                        <div className='text-center mb-4'>
                          <p>6 5/8"-7 7/8"</p>
                        </div>
                        <div>
                          <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>
                            Total Items Price Break
                          </div>
                          <div className="mb-1">
                            <div className='flex gap-2 mb-1'>
                              <div className='w-3/12 bg-[#ff7379] flex items-center justify-center text-black font-medium text-base'>EMBROIDERY</div>
                              <div className='w-9/12 grid grid-cols-8 gap-1'>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
                                  </div>
                              </div>
                            </div>
                            <div className='flex gap-2'>
                              <div className='w-3/12 bg-[#eeeeee] flex items-center justify-center text-black font-medium text-base'>PATCH</div>
                              <div className='w-9/12 grid grid-cols-8 gap-1'>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
                                  </div>
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
                               
                                <button
                                  type="button"
                                  onClick={decrease}
                                  className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                >
                                  –
                                </button>

                           
                                <input
                                  type="number"
                                  value={value}
                                  onChange={(e) => setValue(Number(e.target.value))}
                                  className="w-20 text-center border border-gray-300 rounded-md p-2"
                                />

                              
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
                               
                                <button
                                  type="button"
                                  onClick={decrease}
                                  className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                >
                                  –
                                </button>

                            
                                <input
                                  type="number"
                                  value={value}
                                  onChange={(e) => setValue(Number(e.target.value))}
                                  className="w-20 text-center border border-gray-300 rounded-md p-2"
                                />

                              
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
                               
                                <button
                                  type="button"
                                  onClick={decrease}
                                  className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                >
                                  –
                                </button>

                                
                                <input
                                  type="number"
                                  value={value}
                                  onChange={(e) => setValue(Number(e.target.value))}
                                  className="w-20 text-center border border-gray-300 rounded-md p-2"
                                />

                               
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
                              
                                <button
                                  type="button"
                                  onClick={decrease}
                                  className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                >
                                  –
                                </button>

                              
                                <input
                                  type="number"
                                  value={value}
                                  onChange={(e) => setValue(Number(e.target.value))}
                                  className="w-20 text-center border border-gray-300 rounded-md p-2"
                                />

                                
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
                </AccordionPanel>
                <AccordionPanel>
                  <AccordionTitle>
                     <div className='flex items-center gap-3'>
                        <Image src={preview_02} alt='preview_02' className="w-[80px]" />
                        <p className='text-xl text-[#ff7379] font-semibold'>The 618 Performance Trucker Snapback</p>
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
                        <div className='bg-[#eeeeee] text-center mb-1 font-medium text-base py-2 text-black'>OSFA</div>
                        <div className='text-center mb-4'>
                          <p>6 5/8"-7 7/8"</p>
                        </div>
                        <div>
                          <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>
                            Total Items Price Break
                          </div>
                          <div className="mb-1">
                            <div className='flex gap-2 mb-1'>
                              <div className='w-3/12 bg-[#ff7379] flex items-center justify-center text-black font-medium text-base'>EMBROIDERY</div>
                              <div className='w-9/12 grid grid-cols-8 gap-1'>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
                                  </div>
                              </div>
                            </div>
                            <div className='flex gap-2'>
                              <div className='w-3/12 bg-[#eeeeee] flex items-center justify-center text-black font-medium text-base'>PATCH</div>
                              <div className='w-9/12 grid grid-cols-8 gap-1'>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
                                  </div>
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
                               
                                <button
                                  type="button"
                                  onClick={decrease}
                                  className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                >
                                  –
                                </button>

                             
                                <input
                                  type="number"
                                  value={value}
                                  onChange={(e) => setValue(Number(e.target.value))}
                                  className="w-20 text-center border border-gray-300 rounded-md p-2"
                                />

                    
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
                               
                                <button
                                  type="button"
                                  onClick={decrease}
                                  className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                >
                                  –
                                </button>

                              
                                <input
                                  type="number"
                                  value={value}
                                  onChange={(e) => setValue(Number(e.target.value))}
                                  className="w-20 text-center border border-gray-300 rounded-md p-2"
                                />

                           
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
                                
                                <button
                                  type="button"
                                  onClick={decrease}
                                  className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                >
                                  –
                                </button>

                              
                                <input
                                  type="number"
                                  value={value}
                                  onChange={(e) => setValue(Number(e.target.value))}
                                  className="w-20 text-center border border-gray-300 rounded-md p-2"
                                />

                              
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
                                
                                <button
                                  type="button"
                                  onClick={decrease}
                                  className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                                >
                                  –
                                </button>

                              
                                <input
                                  type="number"
                                  value={value}
                                  onChange={(e) => setValue(Number(e.target.value))}
                                  className="w-20 text-center border border-gray-300 rounded-md p-2"
                                />

                             
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
                </AccordionPanel>
                <AccordionPanel>
                  <AccordionTitle>
                    <div className='flex items-center gap-3'>
                        <Image src={preview_03} alt='preview_03' className="w-[80px]" />
                        <p className='text-xl text-[#ff7379] font-semibold'>The 314 Snapback</p>
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
                        <div className='bg-[#eeeeee] text-center mb-1 font-medium text-base py-2 text-black'>OSFA</div>
                        <div className='text-center mb-4'>
                          <p>6 5/8"-7 7/8"</p>
                        </div>
                        <div>
                          <div className='bg-[#ff7379] text-center mb-1 font-bold text-base py-2 text-white'>
                            Total Items Price Break
                          </div>
                          <div className="mb-1">
                            <div className='flex gap-2 mb-1'>
                              <div className='w-3/12 bg-[#ff7379] flex items-center justify-center text-black font-medium text-base'>EMBROIDERY</div>
                              <div className='w-9/12 grid grid-cols-8 gap-1'>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
                                  </div>
                              </div>
                            </div>
                            <div className='flex gap-2'>
                              <div className='w-3/12 bg-[#eeeeee] flex items-center justify-center text-black font-medium text-base'>PATCH</div>
                              <div className='w-9/12 grid grid-cols-8 gap-1'>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>1</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$28</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>12</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$24</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>24</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$22</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>48</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$20</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>96</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$19</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>144</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$18</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>288</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$16</div>
                                  </div>
                                  <div className='text-center'>
                                    <p className='bg-[#eeeeee] p-1 text-sm'>432</p>
                                    <div className='bg-[#ffffff] p-1 text-sm'>$14</div>
                                  </div>
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
                </AccordionPanel>
              </Accordion>
            </div>
          </div>
        </div>


      </div>



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

      <div className='bg-[#ed1c24] py-4 text-center'>
        <p className='text-xl text-white font-bold pb-0'>Current Total: $0</p>
        <p className='text-[18px] text-white font-medium pb-0'>0 items</p>
      </div>





    </div>
  )
}

export default page