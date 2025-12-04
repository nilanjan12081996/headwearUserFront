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
import ProductAccordion from './ProductAccordion';
import { addCartUUID, getDecorationType } from '../reducers/CartSlice';
import { v4 as uuidv4 } from "uuid";





const page = () => {
  const { cartListItem } = useSelector((state) => state?.cart);
  const [selectedSupplier, setSelectedSupplier] = useState('Supplier')
  const { suppliersList } = useSelector((state) => state?.suppliers)
  const { decorationList } = useSelector((state) => state?.cart)
  const { productList, allProList } = useSelector((state) => state?.prod)
  const [hatQuantities, setHatQuantities] = useState({});

  useEffect(() => {
    const savedId = sessionStorage.getItem("id");
    const savedUUID = sessionStorage.getItem("uuid");

    // If already present, DO NOT call API
    if (savedId && savedUUID) {
      console.log("UUID already exists, API not called");
      return;
    }

    // Otherwise generate new UUID and call API
    const cartUUID = uuidv4();

    dispatch(addCartUUID({ uuid: cartUUID })).then((res) => {
      console.log("res", res);

      if (res?.payload?.status_code === 201) {
        sessionStorage.setItem("id", res?.payload?.data?.id);
        sessionStorage.setItem("uuid", res?.payload?.data?.fields?.uuid);
      }
    });
  }, []);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSuppliers({
      page: 1,
      limit: 10
    }))
  }, [])
  console.log("suppliersList", suppliersList);

  const handleSupplierChange = (e) => {


    const supplierId = e.target.value
    setSelectedSupplier(supplierId)
    console.log("Supplier", supplierId)

    // Dispatch getProduct with selected supplier ID
    if (supplierId && supplierId !== "Supplier") {
      dispatch(getProduct({ id: supplierId }))
    } else if (supplierId == "Supplier") {
      // If no supplier selected, fetch all products
      dispatch(getAllProduct({
        page: 1,
        limit: 10
      }))
    }
    else {
      dispatch(getAllProduct({
        page: 1,
        limit: 10
      }))
    }
  }

  const [selectedOption, setSelectedOption] = useState({
    id: "",
    name: ""
  });

  // console.log('selectedOption', selectedOption)


  const totalItems = Object.values(hatQuantities).flatMap(h => Object.values(h)).reduce((a, b) => a + b, 0);
  const maxItems = 40;
  const progressPercent = Math.min((totalItems / maxItems) * 100, 100); // 0-100%

  useEffect(() => {
    dispatch(getDecorationType())
  }, [])
  useEffect(() => {
    if (decorationList?.data?.length > 0) {
      const first = decorationList.data[0];

      setSelectedOption({
        id: first.recordId,
        name: first.name
      });
    }
  }, [decorationList]);


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
              <Select
                required
                value={selectedOption.id}
                onChange={(e) => {
                  const selected = decorationList?.data?.find(
                    deco => deco.recordId === e.target.value
                  );

                  setSelectedOption({
                    id: selected?.recordId,
                    name: selected?.name
                  });
                }}
              >
                {decorationList?.data?.map((deco) => (
                  <option value={deco?.recordId}>{deco?.name}</option>
                ))}
              </Select>


            </div>
          </div>

          {/* <div className='max-w-6xl mx-auto px-5 lg:px-0 py-0 lg:flex justify-between items-center'>
            <div className='form_area lg:w-8/12 lg:flex items-center gap-4 mb-3 lg:mb-0'>
              <div className='w-full lg:w-3/12 mb-3 lg:mb-0'>
                <Select
                  value={selectedSupplier}
                  onChange={handleSupplierChange}>
                  <option>Supplier</option>
                  {
                    suppliersList?.data?.map((sup) => (
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
          </div> */}
        </div>

        {/* <div className='border-t border-[#ebebeb] border-b mb-10'>
          <div className='max-w-6xl mx-auto px-5 lg:px-0 py-4 lg:flex justify-between items-center'>
            <div className='pb-2 lg:pb-0'>
              <p className='text-sm text-[#808080] font-medium'>Active Filters: <span className='text-black'>Min $300 - Max 500</span></p>
            </div>
            <div>
              <p className='text-sm text-[#808080] font-medium'><span className='text-black'>{selectedSupplier !== "Supplier" ? productList?.data?.pagination?.totalRecords : allProList?.pagination?.totalRecords}</span> Results found.</p>
            </div>
          </div>
        </div> */}

        {/* <div className='max-w-6xl mx-auto px-5 lg:px-0'>

          <CapList selectedSupplierId={selectedSupplier} />
        </div> */}
      </div>
      {/* Who We Are section ends here */}


      {/* Start:: Product Accordion section  */}
      <div className='product_list_section mb-20 mt-10'>
        <div className='max-w-6xl mx-auto'>
          <ProductAccordion
            selectedDecoId={selectedOption.id}
            selectedDecoName={selectedOption.name}
            selectedOption={selectedOption}
            hatQuantities={hatQuantities}
            setHatQuantities={setHatQuantities}
          />
        </div>
      </div>
      {/* End:: Product Accordion section  */}



      <div className='fixed bottom-0 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-0 bg-[#9f9f9f] relative'>
          <div
            className='absolute top-0 left-0 h-full bg-[#ff7379] z-0'
            style={{ width: `${progressPercent}%`, transition: 'width 0.3s' }}
          />
          <div className='py-6 flex justify-center items-center lg:border-r-2 border-[#000000] item_area relative'>
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
          <div className='py-6 flex justify-center items-center lg:border-r-2 border-[#000000]'>
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
          <div className='py-6 flex justify-center items-center'>
            <div className='flex items-center gap-2 relative z-20'>
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
          <p className='text-xl text-white font-bold pb-0'>Current Total: {cartListItem?.data?.data?.summary?.formattedPrice?cartListItem?.data?.data?.summary?.formattedPrice:0}</p>
          <p className='text-[18px] text-white font-medium pb-0'>{cartListItem?.data?.data?.summary?.totalQuantity? cartListItem?.data?.data?.summary?.totalQuantity:0} items</p>
        </div>
      </div>





    </div>
  )
}

export default page