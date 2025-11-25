'use client';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Avatar, AvatarGroup, AvatarGroupCounter, Label, Select, FileInput, Checkbox, Textarea } from "flowbite-react";

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

import print_01 from "../assets/imagesource/print_01.png";
import print_02 from "../assets/imagesource/print_02.png";
import print_03 from "../assets/imagesource/print_03.png";
import print_04 from "../assets/imagesource/print_04.png";

import cap_left from "../assets/imagesource/cap_left.png";
import cap_front from "../assets/imagesource/cap_front.png";
import cap_right from "../assets/imagesource/cap_right.png";
import cap_back from "../assets/imagesource/cap_back.png";

import on_progress from "../assets/imagesource/on_progress.png";

import { useRouter, useSearchParams } from 'next/navigation';


import { GoHome } from "react-icons/go";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { HiMiniPlusCircle } from "react-icons/hi2";

import { IoIosColorPalette } from "react-icons/io";
import { IoMdTrophy } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";



import Image from 'next/image';


import { FaCheck, FaPlus } from "react-icons/fa";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { uploadLogo } from '../reducers/CartSlice';
import { useDispatch } from 'react-redux';



const page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const supName=atob(searchParams.get('name'))
    const [deviceId, setDeviceId] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);
    const dispatch=useDispatch()
    const [isUploading, setIsUploading] = useState(false);
    const [decorationMethod, setDecorationMethod] = useState("Embroidery");

  const handleCheckoutClick = () => {
    router.push('/checkout');
  };
    const getDeviceId = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    setDeviceId(result.visitorId); // Store device ID in state
    console.log("Device ID:", result.visitorId);
  };
  useEffect(()=>{
getDeviceId()
  },[])


  const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  
  if (!file) return;
  
  // Validate file size (10MB limit as per your UI)
  if (file.size > 10 * 1024 * 1024) {
    toast.error('File size exceeds 10MB limit');
    return;
  }

   if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }


        const previewUrl = URL.createObjectURL(file);

    // Set file with preview
    setUploadedFile({
      name: file.name,
      size: file.size,
      previewUrl: previewUrl,
      file: file,
      serverPath: null
    });

    setIsUploading(true);

  // Create FormData
  const formData = new FormData();
  formData.append('uuid', deviceId); // Your device/session ID
  formData.append('image', file);

  try {
    const result = await dispatch(uploadLogo(formData)).unwrap();
    
    if (result.status_code === 200) {
      // Handle success - store the imagePath
         setUploadedFile(prev => ({
          ...prev,
          serverPath: result.imagePaths[0],
          sessionUUID: result.Session_UUID
        }));
      const uploadedImagePath = result.imagePaths[0];
      console.log('Uploaded:', uploadedImagePath);
      // Update your UI state here
    //  setIsUploading(false)
    }
  } catch (error) {
    console.error('Upload failed:', error);
  }
};


  const [selected, setSelected] = useState("flat");

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
                  <li className='text-[#666666] text-base'>{supName}</li>
                  <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                  <li className='text-[#ED1C24] text-base'>Artwork</li>
               </ul>
            </div>
          </div>

        </div>


        <div className='max-w-6xl mx-auto px-5 lg:px-0'>

            <div className='team_wrap mb-8'>

              <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Upload Artwork</h3>
              <div className="w-full">
                <p className='text-[#1A1A1A] text-sm mb-4'>Optional , But Encouraged</p>
                {
                  !uploadedFile&&(

                      <div className='border border-[#E6E6E6] rounded-[10px] p-3 mb-5'>
                  <Label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-1 border-dashed border-[#FF0000] bg-white hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <div className='mb-4'>
                        <HiMiniPlusCircle className='text-[#FF0000] text-5xl' />
                      </div>
                      <p className="mb-2 text-xl text-black dark:text-gray-400">
                        <span className="font-semibold">Upload Artwork</span>
                      </p>
                      <p className="text-base text-black dark:text-gray-400">10MB file size limit</p>
                    </div>
                    <FileInput id="dropzone-file" className="hidden" 
                     onChange={handleFileUpload}
                      accept="image/*"
                      />
                  </Label>
                </div>

                  )
                }
              
                {/* <div className='border border-[#E6E6E6] rounded-[10px] p-3 mb-5'>
                  <div className='bg-[#eeeeee] p-4 flex items-center gap-3'>
                     <div>
                        <Image src={on_progress} alt='on_progress' className="" />
                     </div>
                     <div>
                        <p className='text-[#000000] text-base pb-1'>SandTime.png</p>
                        <p className='text-sm text-[#868686]'>15.7 Kb</p>
                     </div>
                  </div>
                </div> */}

                   {uploadedFile && (
                <div className='border border-[#E6E6E6] rounded-[10px] p-3 mb-5'>
                  <div className='bg-[#eeeeee] p-4 flex items-center gap-3 justify-between'>
                    <div className='flex items-center gap-3'>
                      {/* Show uploaded image preview */}
                      <div className='w-12 h-12'>
                        <img 
                          src={uploadedFile.previewUrl} 
                          alt={uploadedFile.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className='text-[#000000] text-base pb-1'>{uploadedFile.name}</p>
                        {/* <p className='text-sm text-[#868686]'>{formatFileSize(uploadedFile.size)}</p> */}
                        {/* {isUploading && (
                          <p className='text-xs text-blue-600 mt-1'>Uploading...</p>
                        )} */}
                        {!isUploading && uploadedFile.serverPath && (
                          <p className='text-xs text-green-600 mt-1'>✓ Upload complete</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Remove button */}
                    {!isUploading && (
                      <button
                        onClick={removeFile}
                        className='text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition'
                        type='button'
                      >
                        Remove
                      </button>
                    )}

                    {/* Loading spinner */}
                    {/* {isUploading && (
                      <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-[#FF0000]'></div>
                    )} */}
                  </div>
                </div>
              )}

                <div className="lg:flex items-center gap-2 check_area">
                  <Checkbox id="promotion" className='' />
                  <Label className='text-[#615E5E] text-base' htmlFor="promotion">I own the rights to this artwork being used or have permission from the owner to use it.</Label>
                </div>
                <div className='mt-5 decoration_type_area'>
                  <Label className='text-[#615E5E] text-base'>Decoration Method</Label>
                  <Select value={decorationMethod}
                     onChange={(e) => setDecorationMethod(e.target.value)}>
                     <option value="Embroidery">Embroidery</option>
                     <option value="Leather Patch">Leather Patch</option>
                  </Select>
                </div>
              </div>

           </div>
           {
            decorationMethod === "Embroidery"&&(
                <div>

                  {/* <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Embroidery Option</h3>
                  <div className='flex justify-between gap-3'>
                    <div className='h-[300px] w-[700px] border-2 border-[#ff0000]'>
                        <h2 className='mt-3 ml-3 text-[#1A1A1A] text-[20px] font-semibold'>Standard Flat Embroidery</h2>
                        <p className='mt-2 ml-3 text-[15px]'>This method is the most common embroidery type. It is what most customers choose and works well for smaller details and intricate designs.</p>
                        <div className='bg-blue-600 ml-9 mr-9 rounded-xl mt-3'>
                          <p className='text-center mt-2 text-white '>Flat Embroidery</p>
                        </div> 
                        <p className='text-[#4c4b4b] mt-5 ml-3 text-[12px]'>*This is the default pricing option and included in the prices shown on the item select step.</p>
                    </div>
                    <div className='h-[300px] w-[700px] border-2 border-blue-500'>
                        <h2 className='mt-3 ml-3 text-[#1A1A1A] text-[20px] font-semibold'>3D Puff Embroidery</h2>
                        <p className='mt-2 ml-3 text-[15px]'>This method creates a raised look that makes the design pop off the panel of the hat. Only certain designs or larger blocky elements inside a design are able to be puffed.</p>
                        <div className='bg-blue-600 ml-9 mr-9 rounded-xl mt-3'>
                          <p className='text-center mt-2 text-white '>3D Puff Embroidery</p>
                        </div> 
                      </div>
                  </div> */}


                  <div className="my-8">
                    <h2 className="text-2xl font-semibold mb-4">Embroidery Option</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {/* Flat Embroidery */}
                      <label
                        className={`border rounded-xl p-5 cursor-pointer transition ${
                          selected === "flat" ? "border-[#ff0000] shadow-md" : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="embroidery"
                          value="flat"
                          checked={selected === "flat"}
                          onChange={() => setSelected("flat")}
                          className="hidden"
                        />

                        <h3 className="text-lg font-semibold mb-2">Standard Flat Embroidery</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          This method is the most common embroidery type. Works well for smaller details and intricate designs.
                        </p>

                        <button
                          type="button"
                          className="w-full py-2 rounded-full bg-[#ed1c24] hover:bg-black text-white font-medium cursor-pointer"
                        >
                          Flat Embroidery
                        </button>
                        <p className='text-[#4c4b4b] mt-5 ml-3 text-[11px]'>*This is the default pricing option and included in the prices shown on the item select step.</p>
                      </label>

                      {/* 3D Puff Embroidery */}
                      <label
                        className={`border rounded-xl p-5 cursor-pointer transition ${
                          selected === "puff" ? "border-[#ff0000] shadow-md" : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="embroidery"
                          value="puff"
                          checked={selected === "puff"}
                          onChange={() => setSelected("puff")}
                          className="hidden"
                        />

                        <h3 className="text-lg font-semibold mb-2">3D Puff Embroidery</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Creates a raised 3D look. Only certain designs or blocky elements can be puffed.
                        </p>

                        <button
                          type="button"
                          className="w-full py-2 rounded-full bg-[#ed1c24] hover:bg-black text-white font-medium cursor-pointer"
                        >
                          3D Puff Embroidery
                        </button>
                      </label>
                    </div>
                  </div>


                </div>
            )
           }
           

           {
            decorationMethod === "Leather Patch" &&(
              <div>
                  <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Patch Options</h3>
                  <div className='px-5 py-7 w-full bg-[#eeeeee] rounded-[10px]'>
                    <h2 className='py-0 ml-3 text-[#1A1A1A] text-[20px] font-semibold pb-2'>Select a Patch Shape & Color</h2>
                    <p className='ml-3 text-[15px]'>We will convert your artwork and send you mockups of what the patch will look like for approval and feedback before we begin production of your order.</p>
                  </div>
                  <div className='flex justify-between gap-3 decoration_type_area'>
                    <div className='mt-3 w-[700px] border-1 border-[#ed1c24] px-5 py-7 rounded-xl mb-4'>
                        <h2 className='mb-3 ml-3 text-[#1A1A1A] text-[20px] font-semibold'>Leather Patch</h2>
                        <ul className='ml-3 mt-2 flex items-center gap-4'>
                            <li className='flex items-center gap-1'>
                            <FaCheck/>  Synthetic Leather
                            </li>
                              <li className='flex items-center gap-1'>
                            <FaCheck/>  Very Classy Look
                            </li>
                              <li className='flex items-center gap-1'>
                            <FaCheck/>   Best For Simple Designs
                            </li>
                        </ul>
                        <div className='mt-3'>
                            <Select >
                              <option>Select Patch Option</option>
                              <option>Circle</option>
                              <option>Square</option>
                              <option>Oval</option>
                              <option>Diamond</option>
                              <option>Hexagon</option>
                              <option>Custom</option>
                            </Select>
                        </div>
                        <div className='mt-3'>
                          <Select>
                            <option>Select Patch Color</option>
                            <option>Brown</option>
                            <option>Black</option>
                            <option>Red</option>
                            <option>Blue</option>
                          </Select>
                        </div>
                        
                    </div>
            
                  </div>
              </div>
            )
           }
          
          
           <div className='team_wrap mb-8'>

              <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Print Style</h3>

              <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>

                 <div className='product_list_box text-center'>
                    <div className='mb-3 border border-[#E2E2E2] rounded-[8px]'>
                      <Image src={print_01} alt='print_01' className="" />
                    </div>
                    <p className='text-[18px] text-[#353535] font-medium'>Standard Print</p>
                 </div>

                 <div className='product_list_box text-center'>
                    <div className='mb-3 border border-[#E2E2E2] rounded-[8px]'>
                      <Image src={print_02} alt='print_02' className="" />
                    </div>
                    <p className='text-[18px] text-[#353535] font-medium'>Leather Patch Print</p>
                 </div>

                 <div className='product_list_box text-center'>
                    <div className='mb-3 border border-[#E2E2E2] rounded-[8px]'>
                      <Image src={print_03} alt='print_03' className="" />
                    </div>
                    <p className='text-[18px] text-[#353535] font-medium'>3d Embroidery Print</p>
                 </div>

                 <div className='product_list_box text-center'>
                    <div className='mb-3 border border-[#E2E2E2] rounded-[8px]'>
                      <Image src={print_04} alt='print_04' className="" />
                    </div>
                    <p className='text-[18px] text-[#353535] font-medium'>Flat Embroidery Print</p>
                 </div>


              </div>
           </div>

           <div className='team_wrap mb-8'>

              <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Logo Placement</h3>

              <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>

                 <div className='product_list_box text-center'>
                    <div className='mb-3 border border-[#E2E2E2] rounded-[8px]'>
                      <Image src={cap_left} alt='cap_left' className="" />
                    </div>
                    <p className='text-[18px] text-[#353535] font-medium'>Left Side</p>
                 </div>

                 <div className='product_list_box text-center'>
                    <div className='mb-3 border border-[#E2E2E2] rounded-[8px]'>
                      <Image src={cap_front} alt='cap_front' className="" />
                    </div>
                    <p className='text-[18px] text-[#353535] font-medium'>Front Side</p>
                 </div>

                 <div className='product_list_box text-center'>
                    <div className='mb-3 border border-[#E2E2E2] rounded-[8px]'>
                      <Image src={cap_right} alt='cap_right' className="" />
                    </div>
                    <p className='text-[18px] text-[#353535] font-medium'>Right Side</p>
                 </div>

                 <div className='product_list_box text-center'>
                    <div className='mb-3 border border-[#E2E2E2] rounded-[8px]'>
                      <Image src={cap_back} alt='cap_back' className="" />
                    </div>
                    <p className='text-[18px] text-[#353535] font-medium'>Back Side</p>
                 </div>

              </div>

           </div>


           <div className='mb-10 form_area'>
              <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>General Notes</h3>
              <p className='text-[#7E7E7E] text-sm font-normal pb-2'><strong>Optional:</strong> Please use this space to let us know any other special details about this order that you think we should know.</p>
              <Textarea id="comment" placeholder="Order Notes" required rows={4} />
           </div>

           <button onClick={handleCheckoutClick} className='bg-[#ED1C24] hover:bg-black text-white text-base rounded-full w-full py-3 cursor-pointer'>
              Checkout
            </button>

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
        <div className='bg-[#9f9f9f] py-6 flex justify-center items-center lg:border-r-2 border-[#000000] item_area'>
          <div className='flex items-center gap-2 relative z-20'>
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