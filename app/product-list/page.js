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
import { addCartUUID, cartList, dropDownToggle, getDecorationType } from '../reducers/CartSlice';
import { v4 as uuidv4 } from "uuid";
import CartProgressBar from '../components/CartProgressBar';
import TopIntro from './TopIntro';





const page = () => {
  const { cartListItem } = useSelector((state) => state?.cart);
  const [selectedSupplier, setSelectedSupplier] = useState('Supplier')
  const { suppliersList } = useSelector((state) => state?.suppliers)
  const { decorationList } = useSelector((state) => state?.cart)
  const { productList, allProList } = useSelector((state) => state?.prod)
  const [hatQuantities, setHatQuantities] = useState({});
  const [open, setOpen] = useState(false);



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
  // useEffect(() => {
  //   dispatch(getSuppliers({
  //     page: 1,
  //     limit: 10
  //   }))
  // }, [])
  // console.log("suppliersList", suppliersList);
  useEffect(() => {
    const savedUUID = sessionStorage.getItem("uuid");
    dispatch(cartList({
      id: savedUUID
    }))
  }, [])
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


  const totalItems = Object.values(hatQuantities)
    .flatMap(h =>
      Object.values(h).flatMap(c =>
        Object.values(c)
      )
    )
    .reduce((sum, qty) => sum + Number(qty || 0), 0);

  let progressPercent = 0;
  if (totalItems <= 12) {
    progressPercent = (totalItems / 12) * 33.333;
  }
  else if (totalItems <= 24) {
    progressPercent = 33.333 + ((totalItems - 12) / 12) * 33.333;
  }
  else if (totalItems <= 48) {
    progressPercent = 66.666 + ((totalItems - 24) / 24) * 33.333;
  }
  else {
    progressPercent = 100;
  }


  useEffect(() => {
    dispatch(getDecorationType())
  }, [])
  const handleDecorationSelect = async (deco) => {
    const sessionUUID = sessionStorage.getItem("uuid");
    sessionStorage.setItem("selectedDecorationId", deco.id);
    const res = await dispatch(
      dropDownToggle({
        session_uuid: sessionUUID,
        decoration_type_id: deco.id,
      })
    );
    setSelectedOption({
      id: deco.id,
      name: deco.name,
    });

    setOpen(false);

    if (res?.payload?.status_code === 200) {
      dispatch(
        cartList({
          id: sessionUUID,
        })
      );
    }
  };

  useEffect(() => {
    if (decorationList?.data?.length > 0) {
      const savedId = sessionStorage.getItem("selectedDecorationId");

      const selected = savedId
        ? decorationList.data.find(item => item.id == savedId)
        : decorationList.data[0];

      if (selected) {
        setSelectedOption({
          id: selected.id,
          name: selected.name,
        });
      }
    }
  }, [decorationList]);



  const totalCartItems = cartListItem?.data?.cart?.total_items || 0;

  return (
    <div>
      <div className='banner_area pt-[28px]'>
        <div className="relative">
          <Image src={list_banner} alt='list_banner' className="hidden lg:block w-full" />
          <Image src={list_banner} alt='list_banner' className="block lg:hidden w-full" />
        </div>
      </div>

      <div>
        <div className='mt-4'>
          <div className='max-w-6xl mx-auto px-5 lg:px-0 py-0 flex justify-between items-center'>
            <div>
              <ul className='flex items-center gap-2'>
                <li>
                  <Link href="/" passHref><GoHome className='text-[#666666] text-2xl' /></Link>
                </li>
                <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
                <li className='text-[#ED1C24] text-base'>Caps</li>
              </ul>
            </div>
            {/* <div className="w-[167px] mb-3 lg:mb-0 fixed top-[85px] md:top-[95px] left-1/2 -translate-x-full ml-[25px] md:-ml-1 z-49">
              <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="
                  w-full
                  bg-[#ff7379]
                  text-white
                  font-semibold
                  text-center
                  py-3
                  rounded-b-md
                  cursor-pointer
                  flex
                  justify-center
                  items-center
                  relative
                "
              >
                {selectedOption?.name || "Select Decoration"}
                <span className="absolute right-3">▼</span>
              </button>
              {open && (
                <div className="bg-white shadow-lg rounded-b-md overflow-hidden">
                  {decorationList?.data?.map((deco) => (
                    <button
                      key={deco.id}
                      type="button"
                      onClick={() => handleDecorationSelect(deco)}
                      className="
                      w-full
                      text-[#ff7379]
                      font-medium
                      py-4
                      text-center
                      border-b
                      border-[#ff7379]
                      hover:bg-[#fff1f2]
                      last:border-b-0
                      cursor-pointer
                    "
                    >
                      {deco.name}
                    </button>
                  ))}
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
      {/* Who We Are section ends here */}

      <TopIntro />
      {/* Start:: Product Accordion section  */}
      <div className='product_list_section mb-20 mt-5'>
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


      <CartProgressBar
        progressPercent={progressPercent}
        totalCartItems={cartListItem?.data?.cart?.total_items}
        grandTotal={cartListItem?.data?.cart?.grand_total_amount}
      />

    </div>
  )
}

export default page