'use client';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Avatar, AvatarGroup, AvatarGroupCounter, Label, FileInput, Checkbox, Textarea } from "flowbite-react";

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

import cap_left from "../assets/imagesource/hat-logo2.jpg";
import cap_front from "../assets/imagesource/hat-logo1.jpg";
import cap_right from "../assets/imagesource/hat-logo3.jpg";
import cap_back from "../assets/imagesource/cap_back.png";

import on_progress from "../assets/imagesource/on_progress.png";

import right_icon from "../assets/imagesource/smallCheck.png";
import blue_icon from "../assets/imagesource/smallCheckBlue.png";
import back_stitching from "../assets/imagesource/stitching1.jpg";
import left_stitching from "../assets/imagesource/stitching2.jpg";
import right_stitching from "../assets/imagesource/stitching3.jpg";

import standard_flat from "../../public/images/stem.png";
import puff from "../../public/images/3dem.png";
import patch1 from "../../public/images/patch5.png"



import { useRouter, useSearchParams } from 'next/navigation';


import { GoHome } from "react-icons/go";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { HiMiniPlusCircle } from "react-icons/hi2";

import { IoIosColorPalette } from "react-icons/io";
import { IoMdTrophy } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";

import Image from 'next/image';


import { FaCheck, FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { cartList, dropDownToggle, getDecorationType, uploadLogo } from '../reducers/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addArtWork, addOnPrice, getPatchOptions, setUpPlanList, updateAddOn } from '../reducers/ArtWorkSlice';
import { useRef } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import CartProgressBar from '../components/CartProgressBar';

// color 
import c1 from "../assets/imagesource/c1.jpg";
import c2 from "../assets/imagesource/c2.jpg";
import c3 from "../assets/imagesource/c3.jpg";
import c4 from "../assets/imagesource/c4.jpg";
import c5 from "../assets/imagesource/c5.jpg";
import c6 from "../assets/imagesource/c6.jpg";
import c7 from "../assets/imagesource/c7.jpg";
import c8 from "../assets/imagesource/c8.jpg";
import c9 from "../assets/imagesource/c9.jpg";
import c10 from "../assets/imagesource/c10.jpg";
import c11 from "../assets/imagesource/c11.jpg";
import c12 from "../assets/imagesource/c12.jpg";
import c13 from "../assets/imagesource/c13.jpg";
import c14 from "../assets/imagesource/c14.jpg";
import c15 from "../assets/imagesource/c15.jpg";
import c16 from "../assets/imagesource/c16.jpg";
import c17 from "../assets/imagesource/c17.jpg";
import c18 from "../assets/imagesource/c18.jpg";
import c19 from "../assets/imagesource/c19.jpg";
import c20 from "../assets/imagesource/c20.jpg";
import c21 from "../assets/imagesource/c21.jpg";
import c22 from "../assets/imagesource/c22.jpg";






const page = () => {
  const router = useRouter();
  const { cartListItem } = useSelector((state) => state?.cart);
  const { decorationList } = useSelector((state) => state?.cart)
  const { loading, adonPriceData, setUpPlanListData, patchOptionsData } = useSelector((state) => state?.art)
  const searchParams = useSearchParams();
  const supName = atob(searchParams.get('name'))
  const [logoId, setLogoId] = useState()
  const [deviceId, setDeviceId] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const dispatch = useDispatch()
  const [isUploading, setIsUploading] = useState(false);
  const [decorationMethod, setDecorationMethod] = useState("Embroidery");
  const [selectedStyle, setSelectedStyle] = useState("Embroidery");  // default selected
  const [selectedPrice, setSelectedPrice] = useState("flat");

  const [selectedStitch, setSelectedStitch] = useState([]);
  const [backFile, setBackFile] = useState(null);
  const [leftFile, setLeftFile] = useState(null);
  const [rightFile, setRightFile] = useState(null);
  const [logoNotes, setLogoNotes] = useState()
  const [open, setOpen] = useState(false);
  const [patchOption, setPatchOption] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [imageToggle, setImageToggle] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setImageToggle((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const initialItems = 5;
  const visiblePatches = showMore ? patchOptionsData : patchOptionsData.slice(0, initialItems);


  const toggleStitch = (id) => {
    setSelectedStitch((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  console.log('decorationList', decorationList)

  // Decoration states
  const [selectedDecorationId, setSelectedDecorationId] = useState("");
  const [embroideryType, setEmbroideryType] = useState("standard_flat");
  const [patchShape, setPatchShape] = useState("");
  const [patchColor, setPatchColor] = useState("");
  const [logoPlacement, setLogoPlacement] = useState("front_center");


  // Additional options
  const [placementSizeNotes, setPlacementSizeNotes] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  const [colorNotes, setColorNotes] = useState("")

  // Back stitching states
  const [backStitching, setBackStitching] = useState(false);
  const [backStitchDetails, setBackStitchDetails] = useState("");
  const [backStitchingFile, setBackStitchingFile] = useState(null);

  // Left stitching states
  const [leftStitching, setLeftStitching] = useState(false);
  const [leftSideDetails, setLeftSideDetails] = useState("");
  const [leftStitchingFile, setLeftStitchingFile] = useState(null);

  // Right stitching states
  const [rightStitching, setRightStitching] = useState(false);
  const [rightSideDetails, setRightSideDetails] = useState("");
  const [rightStitchingFile, setRightStitchingFile] = useState(null);

  const cartId = sessionStorage.getItem("id");
  const sessionUUid = sessionStorage.getItem('uuid');
  const [agree, setAgree] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const checkboxRef = useRef(null);

  useEffect(() => {
    dispatch(addOnPrice())
    dispatch(setUpPlanList())
    dispatch(getPatchOptions())
  }, [])
  console.log("adonPriceData", adonPriceData);
  console.log("setUpPlanListData", setUpPlanListData);

  const logoColors = [
    { img: c1, name: "Black" },
    { img: c2, name: "White" },
    { img: c3, name: "Silver" },
    { img: c4, name: "Gray" },
    { img: c5, name: "Light Blue" },
    { img: c6, name: "Neon Blue" },
    { img: c7, name: "Blue" },
    { img: c8, name: "Navy" },
    { img: c9, name: "Purple" },
    { img: c10, name: "Neon Green" },
    { img: c11, name: "Green" },
    { img: c12, name: "Olive Green" },
    { img: c13, name: "Neon Yellow" },
    { img: c14, name: "Yellow" },
    { img: c15, name: "Neon Orange" },
    { img: c16, name: "Gold" },
    { img: c17, name: "Tan" },
    { img: c18, name: "Brown" },
    { img: c19, name: "Dark Brown" },
    { img: c20, name: "Neon Pink" },
    { img: c21, name: "Red" },
    { img: c22, name: "Dark Red" },
  ];

  const stitchingOptions = [
    {
      id: "back",
      label: "Back Stitching",
      img: back_stitching,
      addon_id: 2,
    },
    {
      id: "left",
      label: "Left Side Stitching",
      img: left_stitching,
      addon_id: 3,
    },
    {
      id: "right",
      label: "Right Side Stitching",
      img: right_stitching,
      addon_id: 4,
    },
  ];


  const placements = [
    { id: "left", label: "right_side", img: cap_right, heading: "Right Eye" },
    { id: "front", label: "front_center", img: cap_front, heading: "Centered" },
    { id: "right", label: "left_side", img: cap_left, heading: "Left Eye" },

  ];

  const [selectedPlacement, setSelectedPlacement] = useState("");



  const getDeviceId = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    setDeviceId(result.visitorId); // Store device ID in state
    console.log("Device ID:", result.visitorId);
  };
  useEffect(() => {
    getDeviceId()
  }, [])


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
    formData.append('session_uuid', deviceId); // Your device/session ID
    formData.append('logo', file);
    formData.append('notes', "N/A")

    try {
      const result = await dispatch(uploadLogo(formData)).unwrap();
      console.log('result', result)
      if (result.status_code === 201) {
        // Handle success - store the imagePath
        setLogoId(result?.data?.id)

        setUploadedFile(prev => ({
          ...prev,
          serverPath: result.data?.original_file_url,
          sessionUUID: result.data?.session_uuid
        }));
        // const uploadedImagePath = result.imagePaths[0];
        // console.log('Uploaded:', uploadedImagePath);
        // Update your UI state here
        //  setIsUploading(false)
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // const cartId = sessionStorage.getItem("id")

  // const sessionUUid = sessionStorage.getItem('uuid')
  // console.log('cartId', sessionUUid)


  const [selected, setSelected] = useState("flat");

  const [selectedOption, setSelectedOption] = useState({
    id: "",
    name: ""
  });

  useEffect(() => {
    dispatch(getDecorationType())
  }, [])

  // useEffect(() => {
  //   if (decorationList?.data?.length > 0) {
  //     const first = decorationList.data[0];

  //     setSelectedOption({
  //       id: first.id,
  //       name: first.name
  //     });
  //   }
  // }, [decorationList]);



  const handleStitchingFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    // Here you would upload the file similar to main logo
    // For now, just storing the file object
    if (type === 'back') setBackStitchingFile(file);
    if (type === 'left') setLeftStitchingFile(file);
    if (type === 'right') setRightStitchingFile(file);
  };

  const toggleStitching = (option) => {
    let currentValue = false;

    if (option.id === "back") currentValue = backStitching;
    if (option.id === "left") currentValue = leftStitching;
    if (option.id === "right") currentValue = rightStitching;

    const newValue = !currentValue;

    if (option.id === "back") setBackStitching(newValue);
    if (option.id === "left") setLeftStitching(newValue);
    if (option.id === "right") setRightStitching(newValue);

    handleArtworkUpdate({
      addonId: option.addon_id,
      enabled: newValue,
    });
  };



  const savedCardId = sessionStorage.getItem('cartId')
  const cart_id = sessionStorage.getItem('cart_id')
  // Prepare final payload
  const preparePayload = () => {
    const selectedDecoration = decorationList?.data?.find(
      item => item.recordId === selectedDecorationId
    );

    const payload = {
      sessionUuid: sessionUUid || deviceId,
      // cart_id: cartId,
      cart_id: cart_id,
      logo_id: logoId,
      primary_decoration_type_id: selectedOption.id,
      embroidery_type: selectedOption?.name === "Embroidery" ? embroideryType : "",
      patch_shape: selectedOption?.name === "Leather Patch" ? patchShape : "",
      patch_color: selectedOption?.name === "Leather Patch" ? patchColor : "",
      logo_placement: Array.isArray(logoPlacement) ? logoPlacement.join(",") : logoPlacement,
      placement_size_notes: placementSizeNotes,
      order_notes: orderNotes,
      color_notes: colorNotes,
      back_stitching: backStitching,
      back_stitch_details: backStitching ? backStitchDetails : "",
      back_stitching_file: backStitching && backStitchingFile ? backStitchingFile : null,
      left_stitching: leftStitching,
      left_side_details: leftStitching ? leftSideDetails : "",
      left_stitching_file: leftStitching && leftStitchingFile ? leftStitchingFile : null,
      right_stitching: rightStitching,
      right_side_details: rightStitching ? rightSideDetails : "",
      right_stitching_file: rightStitching && rightStitchingFile ? rightStitchingFile : null,
    };

    return payload;
  };
  const handleCheckoutClick = async () => {
    if (!agree) {
      setErrorMsg("You must agree to copyright/ownership permission.");
      checkboxRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const payload = preparePayload();
    console.log('Checkout Payload:', payload);

    // Create FormData for file uploads
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (payload[key] !== null && payload[key] !== "") {
        if (key.includes('_file') && payload[key] instanceof File) {
          formData.append(key, payload[key]);
        } else if (typeof payload[key] === 'boolean') {
          formData.append(key, payload[key].toString());
        } else {
          formData.append(key, payload[key]);
        }
      }
    });

    // Here you would dispatch your API call
    await dispatch(addArtWork(formData)).then((res) => {
      console.log("addartwork", res);
      // if (res?.payload?.status_code === 201) {
      //   router.push("/checkout")
      // }

      if (res?.payload?.status_code === 201) {

        const artworkId = res?.payload?.data?.id;
        router.push(`/checkout?artwork_id=${artworkId}`);
      }

    });


  };

  const totalQty = cartListItem?.data?.cart?.total_items || 0;

  const threeDPuffTiers =
    adonPriceData?.data?.threeDPuff?.[0]?.price_tiers || [];

  const activeTier = threeDPuffTiers.find(tier => {
    if (tier.max_qty === null) {
      return totalQty >= tier.min_qty;
    }
    return totalQty >= tier.min_qty && totalQty <= tier.max_qty;
  });


  const backStitchingTiers =
    adonPriceData?.data?.backStitching?.[0]?.price_tiers || [];

  const activeBackStitchingTier = backStitchingTiers.find(tier => {
    if (tier.max_qty === null) {
      return totalQty >= tier.min_qty;
    }
    return totalQty >= tier.min_qty && totalQty <= tier.max_qty;
  });



  const handleArtworkUpdate = async ({
    setupPlanId = null,
    addonId = null,
    enabled = null,
    notes = "",
    logoPlacement = null,
  }) => {
    const payload = {
      session_uuid: sessionUUid,
      primary_decoration_type_id: selectedOption.id,
    };

    // CASE 1: Setup Plan update
    if (setupPlanId !== null) {
      payload.setup_plan_id = setupPlanId;
    }

    // CASE 2 / 3 / 4: Addon enable / disable
    if (addonId !== null && enabled !== null) {
      payload.addon = {
        decoration_addon_id: addonId,
        is_enabled: enabled ? 1 : 0,
        ...(notes && { notes })
      };
    }

    if (logoPlacement && logoPlacement.length > 0) {
      payload.logo_placements = logoPlacement.map(p => p.toUpperCase());
      const cart_id = sessionStorage.getItem("cart_id");
      if (cart_id) payload.cart_id = cart_id;
    }

    console.log("Final Payload", payload);

    try {
      await dispatch(updateAddOn(payload))
        .then((res) => {
          console.log('ss', res)
          if (res.payload.status_code === 200) {
            dispatch(
              cartList({
                id: sessionUUid
              })
            )
          }
        })
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // logoPlacement ekhon string, tai length check korar dorkar nei
    if (!logoPlacement || !selectedOption.id) return;

    handleArtworkUpdate({
      // Backend-er jonno string-ke array-te convert kore pathano hoche
      logoPlacement: [logoPlacement],
    });
  }, [logoPlacement, selectedOption.id]);



  const hatQuantities = JSON.parse(
    sessionStorage.getItem("hatQuantities") || "{}"
  );
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

  const handleDecorationClick = async (deco) => {
    const sessionUUID = sessionStorage.getItem("uuid");
    sessionStorage.setItem("selectedDecorationId", deco.id);
    setSelectedOption({ id: deco.id, name: deco.name });
    setSelectedDecorationId(deco.id);

    if (deco.name === "Embroidery") {
      setSelectedStyle("Embroidery");
    } else if (deco.name === "Leather Patch") {
      setSelectedStyle("Leather Patch");
    }

    setOpen(false);

    const res = await dispatch(
      dropDownToggle({
        session_uuid: sessionUUID,
        decoration_type_id: deco.id,
      })
    );

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

        setSelectedDecorationId(selected.id);
        setSelectedStyle(selected.name);
      }
    }
  }, [decorationList]);

  const handleLogoPlacement = (label) => {
    setLogoPlacement(label); // Sudhu ekta value select hobe
  };


  return (
    <div>
      <ToastContainer />
      <div className='banner_area py-0 lg:p-0'>
        <div className="relative">
          <Image src={list_banner} alt='list_banner' className="w-full" />
        </div>
      </div>

      <div className="py-10 lg:pb-20 lg:pt-10">
        <div className='mb-10'>
          <div className='max-w-6xl mx-auto px-5 lg:px-0 py-0 mb-10 flex justify-between items-center'>
            <ul className='flex items-center gap-2'>
              <li><Link href="/"><GoHome className='text-[#666666] text-2xl' /></Link></li>
              <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
              <li className='text-[#666666] text-base'><Link href="/product-list" passHref>Caps</Link></li>
              {/* <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
              <li className='text-[#666666] text-base'>{supName}</li> */}
              <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
              <li className='text-[#ED1C24] text-base'><Link href="/upload-artwork" passHref>Artwork</Link></li>
            </ul>
          </div>
        </div>

        <div className='max-w-6xl mx-auto px-5 lg:px-0'>
          {/* Upload Artwork Section */}
          <div className='team_wrap mb-8'>
            <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Upload Artwork</h3>
            <p className='text-[#1A1A1A] text-sm mb-4'>Optional, But Encouraged</p>

            {!uploadedFile && (
              <div className='border border-[#E6E6E6] rounded-[10px] p-3 mb-5'>
                <Label htmlFor="dropzone-file" className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-1 border-dashed border-[#FF0000] bg-white hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <HiMiniPlusCircle className='text-[#FF0000] text-5xl mb-4' />
                    <p className="mb-2 text-xl text-black"><span className="font-semibold">Upload Artwork</span></p>
                    <p className="text-base text-black">10MB file size limit</p>
                  </div>
                  <FileInput id="dropzone-file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                </Label>
              </div>
            )}

            {uploadedFile && (
              <div className='border border-[#E6E6E6] rounded-[10px] p-3 mb-5'>
                <div className='bg-[#eeeeee] p-4 flex items-center gap-3 justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12'>
                      <img src={uploadedFile.previewUrl} alt={uploadedFile.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <div>
                      <p className='text-[#000000] text-base pb-1'>{uploadedFile.name}</p>
                      {!isUploading && uploadedFile.serverPath && (
                        <p className='text-xs text-green-600 mt-1'>✓ Upload complete</p>
                      )}
                    </div>
                  </div>
                  {!isUploading && (
                    <button onClick={removeFile} className='text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition' type='button'>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Logo Notes */}
            {/* <div className='mb-8 form_area'>
              <p className='text-[#7E7E7E] text-sm font-normal pb-2'><strong>Optional:</strong> Use the Placement & Size Notes below to give us any specific sizing or placement you may want.</p>
              <p className='text-[#7E7E7E] text-sm font-normal pb-2'><strong>Note:</strong> Add Notes</p>
              <Textarea className='!text-black' rows={3} value={logoNotes} onChange={(e) => setLogoNotes(e.target.value)} placeholder="Any specific notes about placement or size" />
            </div> */}
            <div ref={checkboxRef} className="flex items-center gap-2 check_area">
              <div>
                <Checkbox id="promotion"
                  checked={agree}
                  onChange={() => {
                    setAgree(!agree);
                    setErrorMsg("");
                  }}
                />
              </div>
              <Label className='text-[#615E5E] text-base' htmlFor="promotion">
                I own the rights to this artwork being used or have permission from the owner to use it.
              </Label>
            </div>
            {errorMsg && <p className="text-red-600 text-sm mt-1">{errorMsg}</p>}
          </div>

          {/* Decoration Method Dropdown */}
          {/* <div className="decoration_type_area w-[250px] mb-3 lg:mb-0 fixed top-[85px] md:top-[95px] left-1/2 -translate-x-1/2 z-49 ">
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
                relative
              "
            >
              {selectedOption?.name || "Select Decoration Type"}
              <span className="absolute right-3 top-1/2 -translate-y-1/2">▼</span>
            </button>
            {open && (
              <div className="absolute w-full bg-white shadow-lg mt-1 rounded-md overflow-hidden z-50">
                {decorationList?.data?.map((deco) => (
                  <button
                    key={deco.id}
                    type="button"
                    onClick={() => handleDecorationClick(deco)}
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


          {/* Hat selector Section */}
          {/* <div className="my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <label
                className={`relative border rounded-xl cursor-pointer transition overflow-hidden min-h-[300px]
        ${selectedStyle === decorationList?.data?.[0]?.name ? "border-[#ff0000] shadow-lg" : "border-gray-300"}
      `}
              >

                <div
                  className={`absolute top-0 left-0 w-full px-4 py-2 text-white font-semibold text-2xl
          ${selectedStyle === decorationList?.data?.[0]?.name ? "bg-[#ff0000]" : "bg-black/70"}
        `}
                >
                  {decorationList?.data?.[0]?.name}
                </div>

                <input
                  type="radio"
                  name="embroideryType"
                  value={decorationList?.data?.[0]?.name}
                  checked={selectedStyle === decorationList?.data?.[0]?.name}
                  onChange={() => handleDecorationClick(decorationList?.data?.[0])}
                  className="hidden"
                />


                <ul className="mt-10 space-y-1 p-4 bg-[#f1e3e3]">
                  <li className="flex gap-2 items-center">
                    <Image src={right_icon} width={20} height={20}
                      className={`${selectedStyle === decorationList?.data?.[0]?.name ? "opacity-100" : "opacity-40"}`}
                    />
                    24 Minimum Order
                  </li>

                  <li className="flex gap-2 items-center">
                    <Image src={right_icon} width={20} height={20}
                      className={`${selectedStyle === decorationList?.data?.[0]?.name ? "opacity-100" : "opacity-40"}`}
                    />
                    Vibrant Colors
                  </li>

                  <li className="flex gap-2 items-center">
                    <Image src={right_icon} width={20} height={20}
                      className={`${selectedStyle === decorationList?.data?.[0]?.name ? "opacity-100" : "opacity-40"}`}
                    />
                    Most Popular
                  </li>
                </ul>

                {selectedStyle === decorationList?.data?.[0]?.name && (
                  <div className="absolute bottom-0 left-0 w-full bg-[#ff0000] text-white text-center py-1 text-sm font-semibold">
                    SELECTED
                  </div>
                )}
              </label>

              <label
                className={`relative border rounded-xl cursor-pointer transition overflow-hidden min-h-[300px]
        ${selectedStyle === decorationList?.data?.[1]?.name ? "border-[#ff0000] shadow-lg" : "border-gray-300"}
      `}
              >
                <div
                  className={`absolute top-0 left-0 w-full px-4 py-2 text-white font-semibold text-2xl
          ${selectedStyle === decorationList?.data?.[1]?.name ? "bg-[#ff0000]" : "bg-black/70"}
        `}
                >
                  {decorationList?.data?.[1]?.name}
                </div>

                <input
                  type="radio"
                  name="embroideryType"
                  value={decorationList?.data?.[1]?.name}
                  checked={selectedStyle === decorationList?.data?.[1]?.name}
                  onChange={() => handleDecorationClick(decorationList?.data?.[1])}
                  className="hidden"
                />


                <ul className="mt-10 space-y-1 p-4 bg-[#f1e3e3]">
                  <li className="flex gap-2 items-center">
                    <Image src={right_icon} width={20} height={20}
                      className={`${selectedStyle === decorationList?.data?.[1]?.name ? "opacity-100" : "opacity-40"}`}
                    />
                    24 Minimum Order
                  </li>
                  <li className="flex gap-2 items-center">
                    <Image src={right_icon} width={20} height={20}
                      className={`${selectedStyle === decorationList?.data?.[1]?.name ? "opacity-100" : "opacity-40"}`}
                    />
                    Synthetic Water Resistant Leather
                  </li>
                  <li className="flex gap-2 items-center">
                    <Image src={right_icon} width={20} height={20}
                      className={`${selectedStyle === decorationList?.data?.[1]?.name ? "opacity-100" : "opacity-40"}`}
                    />
                    Great For Small Details
                  </li>
                </ul>

                {selectedStyle === decorationList?.data?.[1]?.name && (
                  <div className="absolute bottom-0 left-0 w-full bg-[#ff0000] text-white text-center py-1 text-sm font-semibold">
                    SELECTED
                  </div>
                )}
              </label>

            </div>
          </div> */}

          {/* Artwork Setup section */}
          <div className="mt-8">
            <div className='p-4 bg-[#ff0000]'>
              <h2 className='text-2xl font-bold text-white'>Artwork Setup</h2>
            </div>
            <div className='bg-[#eee] p-4 rounded-2xl my-4'>
              <p>
                {selectedStyle === decorationList?.data?.[0]?.name &&
                  `Every logo must be hand converted by one of our designers into a new file that works for our machines. We test and tweak every logo until the output meets or exceeds our very high quality standards.
                  You will receive a digital stitch preview for feedback and approval before your order goes into production.
                  We keep your artwork on file for all future orders.`}

                {selectedStyle === decorationList?.data?.[1]?.name &&
                  `Every logo must be hand converted by one of our designers into a new file that works for our machines. We test and tweak every logo until the output meets or exceeds our very high quality standards.
                  You will receive a digital preview for feedback and approval before your order goes into production.
                  We keep your artwork on file for all future orders.`}
                {!selectedStyle &&
                  `Every logo must be hand converted by one of our designers into a new file that works for our machines. We test and tweak every logo until the output meets or exceeds our very high quality standards.
                  You will receive a digital stitch preview for feedback and approval before your order goes into production.
                  We keep your artwork on file for all future orders.`}
              </p>
            </div>
          </div>


          {/* Pricing selector Section  */}
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[300px]">

              <label
                className={`relative border border-4 rounded-xl cursor-pointer transition overflow-hidden p-4
                   ${selectedPrice === "flat" ? "border-[#ff0000] shadow-lg" : "border-gray-300"}
                 `}
              >
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Standard <br />

                  {totalQty >= 12 ? (
                    <>
                      <s>+$50</s> FREE
                    </>
                  ) : (
                    <>+$50</>
                  )}
                </h2>



                <input
                  type="radio"
                  name="embroideryType"
                  value="flat"
                  checked={selectedPrice === "flat"}
                  onChange={() => {
                    setSelectedPrice("flat");
                    handleArtworkUpdate({
                      setupPlanId: 1
                    });
                  }}
                  className="hidden"
                />

                <ul className="my-2 space-y-1">
                  {selectedStyle && (
                    <>
                      <li className="flex gap-2 items-center">
                        <Image
                          src={blue_icon}
                          width={20}
                          height={20}
                          className={`${selectedPrice === "flat" ? "opacity-100" : "opacity-40"}`}
                        />
                        {selectedStyle === decorationList?.data?.[0]?.name
                          ? "Digital Stitching Mockup"
                          : "Digital Patch Mockup"}
                      </li>
                      <li className="flex gap-2 items-center">
                        <Image
                          src={blue_icon}
                          width={20}
                          height={20}
                          className={`${selectedPrice === "flat" ? "opacity-100" : "opacity-40"}`}
                        />
                        One Round of Revisions
                      </li>
                      <li className="flex gap-2 items-center">
                        <Image
                          src={blue_icon}
                          width={20}
                          height={20}
                          className={`${selectedPrice === "flat" ? "opacity-100" : "opacity-40"}`}
                        />
                        {selectedStyle === decorationList?.data?.[0]?.name
                          ? "Physical test stitch out internally approved by us"
                          : "Physical patch test internally approved by us"}
                      </li>
                    </>
                  )}
                </ul>

                <button
                  className={`py-2 px-3 text-md rounded-2xl my-2
               ${selectedPrice === "flat" ? "bg-[#ff0000] text-white" : "bg-[#eee] text-[#7f7f7f]"}
             `}
                >
                  Standard Setup
                </button>
                <p>Included FREE for orders of 24+ hats</p>
              </label>

              <label
                className={`relative border rounded-xl cursor-pointer transition overflow-hidden p-4
                   ${selectedPrice === "puff" ? "border-[#ff0000] border-4 shadow-lg" : "border-gray-300"}
                 `}
              >
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Premium<br />
                  {totalQty >= 100 ? (
                    <>
                      <s>+$100</s> FREE
                    </>
                  ) : (
                    <>+$100</>
                  )}
                </h2>

                <input
                  type="radio"
                  name="embroideryType"
                  value="puff"
                  checked={selectedPrice === "puff"}
                  onChange={() => {
                    if (totalQty < 48) {
                      toast.error("Premium Setup is only available for orders of 48 hats or more.", {
                        duration: 2000
                      });
                      return;
                    }
                    setSelectedPrice("puff");
                    handleArtworkUpdate({
                      setupPlanId: 2
                    });
                  }}
                  className={`hidden ${totalQty < 48 ? "pointer-events-none opacity-50" : ""}`}
                />

                <ul className="my-2 space-y-1">
                  {selectedStyle && (
                    <>
                      <li className="flex gap-2 items-center">
                        <Image
                          src={blue_icon}
                          width={20}
                          height={20}
                          className={`${selectedPrice === "puff" ? "opacity-100" : "opacity-40"}`}
                        />
                        {selectedStyle === decorationList?.data?.[0]?.name
                          ? "Digital Stitching Mockup"
                          : "Digital Patch Mockup"}
                      </li>
                      <li className="flex gap-2 items-center">
                        <Image
                          src={blue_icon}
                          width={20}
                          height={20}
                          className={`${selectedPrice === "puff" ? "opacity-100" : "opacity-40"}`}
                        />
                        Unlimited Revisions
                      </li>
                      <li className="flex gap-2 items-center">
                        <Image
                          src={blue_icon}
                          width={20}
                          height={20}
                          className={`${selectedPrice === "puff" ? "opacity-100" : "opacity-40"}`}
                        />
                        {selectedStyle === decorationList?.data?.[0]?.name
                          ? "Physical test stitch out photo(s) sent to you for approval"
                          : "Physical patch hat photo(s) sent to you for approval"}
                      </li>
                    </>
                  )}
                </ul>

                <button
                  className={`py-2 px-3 text-md rounded-2xl my-2
               ${selectedPrice === "puff" ? "bg-[#ff0000] text-white" : "bg-[#eee] text-[#7f7f7f]"}
             `}
                >
                  Premium Setup
                </button>

                <p>Only Available for orders of 48+ hats</p>
              </label>

            </div>
          </div>

          {/* Embroidery Options */}
          {/* {selectedOption?.name === "Embroidery" && (
            <div className="mb-8 mt-4">
              <div className='p-4 bg-[#ff0000]'>
                <h2 className='text-2xl font-bold text-white'>Embroidery Option</h2>
              </div>
              <p className="text-sm text-gray-600 my-4">
                Standard Flat Embroidery is included at no extra cost.
                You may optionally upgrade to <span className="font-semibold text-black">3D Puff Embroidery</span> for a raised, dimensional look at <span className="font-semibold text-black">+$3.50</span>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className={`relative border-4 rounded-xl p-5 cursor-pointer transition
  ${embroideryType === "standard_flat"
                      ? "border-[#ff0000] shadow-md"
                      : "border-gray-300"
                    }`}
                >
                  {embroideryType === "standard_flat" && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2">
                      <FaCheck size={12} />
                    </div>
                  )}

                  <input
                    type="radio"
                    name="embroidery"
                    value="standard_flat"
                    checked={embroideryType === "standard_flat"}
                    onChange={(e) => {
                      setEmbroideryType(e.target.value);
                      handleArtworkUpdate({ addonId: 1, enabled: false });
                    }}

                    className="hidden"
                  />

                  <h3 className="text-lg font-semibold mb-1">
                    Standard Flat Embroidery
                  </h3>

                  <p className="text-sm text-gray-600 mb-3">
                    Most common embroidery type. Works well for smaller details.
                  </p>
                  <div className="flex justify-center mb-3">
                    <Image
                      src={standard_flat}
                      alt="Standard Flat Embroidery"
                      className="w-32 h-24 object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                      No Extra Cost
                    </div>
                  </div>

                  <div
                    className={`w-full py-2 rounded-full font-medium text-center
    ${embroideryType === "standard_flat"
                        ? "bg-[#ed1c24] text-white"
                        : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    Flat Embroidery
                  </div>
                </label>
                <label
                  className={`relative border-4 rounded-xl p-5 cursor-pointer transition
  ${embroideryType === "3D_puff"
                      ? "border-[#ff0000] shadow-md"
                      : "border-gray-300"
                    }`}
                >
                  {embroideryType === "3D_puff" && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2">
                      <FaCheck size={12} />
                    </div>
                  )}

                  <input
                    type="radio"
                    name="embroidery"
                    value="3D_puff"
                    checked={embroideryType === "3D_puff"}
                    onChange={(e) => {
                      setEmbroideryType(e.target.value);
                      handleArtworkUpdate({ addonId: 1, enabled: true });
                    }}
                    className="hidden"
                  />

                  <h3 className="text-lg font-semibold mb-1">
                    3D Puff Embroidery
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    Creates a raised, bold 3D look. Best for simple logos.
                  </p>

                  <div className="flex justify-center mb-3">
                    <Image
                      src={puff}
                      alt="3d puff"
                      className="w-32 h-24 object-contain rounded-lg"
                    />
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
                      +$3.50 Per item
                    </div>
                  </div>

                  <div
                    className={`w-full py-2 rounded-full font-medium text-center
    ${embroideryType === "3D_puff"
                        ? "bg-[#ed1c24] text-white"
                        : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    3D Puff Embroidery
                  </div>
                </label>


              </div>
            </div>
          )}
          <div className='mb-8 mt-4 transition-all duration-500'>
            <div className='px-5 py-7 w-full bg-[#eeeeee] rounded-[10px] mt-6 mb-6'>
              <h2 className='text-[#1A1A1A] text-[20px] font-semibold'>Select a Patch Style</h2>
              <p className='text-[#7E7E7E] text-sm font-normal'><strong>Note:</strong> Minimum order for patches is 48 total units. Lead times for patches is 12-18 business days.</p>
              <ul className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
                <li className="flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                  <FaCheck className="text-green-600" /> Professional, Premium Look
                </li>
                <li className="flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                  <FaCheck className="text-green-600" /> Built to Last
                </li>
                <li className="flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                  <FaCheck className="text-green-600" /> Bold Brand Visibility
                </li>
                <li className="flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                  <FaCheck className="text-green-600" /> More Design Flexibility
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {visiblePatches.map((item) => {
                const currentImage = imageToggle
                  ? `/images/patch${item.id}.1.png`
                  : `/images/patch${item.id}.png`;
                console.log('currentImage', currentImage)
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (totalQty < 48) {
                        toast.error("Minimum order for patches is 48 total units.", {
                          autoClose: 2000,
                          position: "top-right"
                        });
                        return;
                      }
                      setPatchOption(item.id);
                      handleArtworkUpdate({ addonId: item.id, enabled: true });
                    }}
                    className={`relative cursor-pointer rounded-2xl border-4 transition-all duration-500 overflow-hidden bg-white shadow-sm hover:shadow-md
                  ${patchOption === item.id ? "border-[#ed1c24] scale-[1.02]" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="aspect-square w-full bg-[#f9f9f9] overflow-hidden relative p-4 rounded-xl border border-gray-100">
                      <img
                        src={currentImage}
                        alt={item.name}
                        className="h-full w-full object-contain transition-all duration-700 ease-in-out"
                      />
                    </div>

                    <div className="absolute top-2 left-2 bg-black/70 text-white text-[12px] px-2 py-1 rounded-md z-2">
                      +${item.unit_price}
                    </div>

                    {patchOption === item.id && (
                      <div className="absolute top-2 right-2 bg-[#ed1c24] text-white rounded-full p-1.5 shadow-lg z-10">
                        <FaCheck size={10} />
                      </div>
                    )}

                    <div className="px-3 pb-3 text-center">
                      <h3 className={`text-sm font-bold leading-tight ${patchOption === item.id ? "text-[#ed1c24]" : "text-gray-700"}`}>
                        {item.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {patchOptionsData.length > initialItems && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#ed1c24] text-[#ed1c24] text-sm font-medium rounded-full hover:bg-[#ed1c24] hover:text-white transition-all duration-300 shadow-md"
                >
                  {showMore ? (
                    <>View Less <FaChevronUp /></>
                  ) : (
                    <>View More Patch Options <FaChevronDown /></>
                  )}
                </button>
              </div>
            )}
          </div> */}

          {/* Embroidery Options */}
          {selectedOption?.name === "Embroidery" && (
            <div className="mb-8 mt-4">
              <div className='p-4 bg-[#ff0000]'>
                <h2 className='text-2xl font-bold text-white'>Embroidery Option</h2>
              </div>
              <p className="text-sm text-gray-600 my-4">
                Standard Flat Embroidery is included at no extra cost.
                You may optionally upgrade to <span className="font-semibold text-black">3D Puff Embroidery</span> for a raised, dimensional look at <span className="font-semibold text-black">+$3.50</span>.
              </p>

              {/* ── 3 Cards Row ── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* ── Card 1: Standard Flat ── */}
                <label
                  className={`relative border-4 rounded-xl p-5 cursor-pointer transition-all duration-300
                    ${embroideryType === "standard_flat"
                      ? "border-[#ff0000] shadow-lg"
                      : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                  {embroideryType === "standard_flat" && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2">
                      <FaCheck size={12} />
                    </div>
                  )}
                  <input
                    type="radio"
                    name="embroidery"
                    value="standard_flat"
                    checked={embroideryType === "standard_flat"}
                    onChange={(e) => {
                      setEmbroideryType(e.target.value);
                      handleArtworkUpdate({ addonId: 1, enabled: false });
                      if (patchOption) {
                        handleArtworkUpdate({
                          addonId: patchOption,
                          enabled: false
                        });
                        setPatchOption(null);
                      }
                    }}
                    className="hidden"
                  />
                  <h3 className="text-lg font-semibold mb-1">Standard Flat Embroidery</h3>
                  <p className="text-sm text-gray-600 mb-3  min-h-[80px]">
                    Most common embroidery type. Works well for smaller details.
                  </p>
                  <div className="flex justify-center mb-3">
                    <Image
                      src={standard_flat}
                      alt="Standard Flat Embroidery"
                      className="w-32 h-24 object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                      No Extra Cost
                    </div>
                  </div>
                  <div
                    className={`w-full py-2 rounded-full font-medium text-center transition-all duration-300
                      ${embroideryType === "standard_flat"
                        ? "bg-[#ed1c24] text-white"
                        : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    Flat Embroidery
                  </div>
                </label>

                {/* ── Card 2: 3D Puff ── */}
                <label
                  className={`relative border-4 rounded-xl p-5 cursor-pointer transition-all duration-300
                    ${embroideryType === "3D_puff"
                      ? "border-[#ff0000] shadow-lg"
                      : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                  {embroideryType === "3D_puff" && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2">
                      <FaCheck size={12} />
                    </div>
                  )}
                  <input
                    type="radio"
                    name="embroidery"
                    value="3D_puff"
                    checked={embroideryType === "3D_puff"}
                    onChange={(e) => {
                      setEmbroideryType(e.target.value);
                      handleArtworkUpdate({ addonId: 1, enabled: true });
                      if (patchOption) {
                        handleArtworkUpdate({
                          addonId: patchOption,
                          enabled: false
                        });
                        setPatchOption(null);
                      }
                    }}
                    className="hidden"
                  />
                  <h3 className="text-lg font-semibold mb-1">3D Puff Embroidery</h3>
                  <p className="text-sm text-gray-600 mb-4 min-h-[80px]">
                    Creates a raised, bold 3D look. Best for simple logos.
                  </p>
                  <div className="flex justify-center mb-3">
                    <Image
                      src={puff}
                      alt="3d puff"
                      className="w-32 h-24 object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
                      +$3.50 Per item
                    </div>
                  </div>
                  <div
                    className={`w-full py-2 rounded-full font-medium text-center transition-all duration-300
                      ${embroideryType === "3D_puff"
                        ? "bg-[#ed1c24] text-white"
                        : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    3D Puff Embroidery
                  </div>
                </label>

                {/* ── Card 3: Patch ── */}
                <label
                  className={`relative border-4 rounded-xl p-5 cursor-pointer transition-all duration-300
                    ${embroideryType === "patch"
                      ? "border-[#ff0000] shadow-lg"
                      : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                  {embroideryType === "patch" && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2">
                      <FaCheck size={12} />
                    </div>
                  )}
                  <input
                    type="radio"
                    name="embroidery"
                    value="patch"
                    checked={embroideryType === "patch"}
                    onChange={(e) => {
                      setEmbroideryType(e.target.value);
                      handleArtworkUpdate({ addonId: 1, enabled: false });
                      setTimeout(() => {
                        document.getElementById("patch-options-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 400);
                    }}
                    className="hidden"
                  />
                  <h3 className="text-lg font-semibold mb-1">Patch</h3>
                  <p className="text-sm text-gray-600 mb-4 min-h-[80px]">
                    Select from one of our custom patch options. Price shown is in addition to standard pricing. Patch options &amp; pricing will populate when selected.
                  </p>

                  {/* Patch card image — empty for now, add src later */}
                  <div className="flex justify-center mb-3">
                    <Image
                      src={patch1}
                      alt="patch"
                      className="w-32 h-24 object-contain rounded-lg"
                    />
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
                      Price Varies
                    </div>
                  </div>
                  <div
                    className={`w-full py-2 rounded-full font-medium text-center transition-all duration-300
                      ${embroideryType === "patch"
                        ? "bg-[#ed1c24] text-white"
                        : "bg-gray-200 text-gray-700"
                      }`}
                  >
                    Patch
                  </div>
                </label>

              </div>

              {/* ── Patch Options — animated slide down ── */}
              <div
                id="patch-options-section"
                style={{
                  maxHeight: embroideryType === "patch" ? "2000px" : "0px",
                  opacity: embroideryType === "patch" ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.55s ease, opacity 0.4s ease",
                }}
              >
                <div className='mb-8 mt-6 border-4 p-4 !border-[#ed1c24] rounded-lg'>
                  <div className='px-5 py-7 w-full bg-[#eeeeee] rounded-[10px] mt-6 mb-6'>
                    <h2 className='text-[#1A1A1A] text-[20px] font-semibold'>Select a Patch Style</h2>
                    {/* <p className='text-[#7E7E7E] text-sm font-normal'><strong>Optional:</strong> Select your preferred patch style below..</p> */}
                    <p className='text-[#7E7E7E] text-sm font-normal'><strong>Note:</strong> Minimum order for patches is 48 total units. Lead times for patches is 12-18 business days.</p>
                    <ul className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
                      <li className="flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                        <FaCheck className="text-green-600" /> Professional, Premium Look
                      </li>
                      <li className="flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                        <FaCheck className="text-green-600" /> Built to Last
                      </li>
                      <li className="flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                        <FaCheck className="text-green-600" /> Bold Brand Visibility
                      </li>
                      <li className="flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                        <FaCheck className="text-green-600" /> More Design Flexibility
                      </li>
                    </ul>
                  </div>

                  {/* Patch Grid System */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {visiblePatches.map((item) => {
                      const currentImage = imageToggle
                        ? `/images/patch${item.id}.1.png`
                        : `/images/patch${item.id}.png`;
                      console.log('currentImage', currentImage)
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (totalQty < 48) {
                              toast.error("Minimum order for patches is 48 total units.", {
                                autoClose: 2000,
                                position: "top-right"
                              });
                              return;
                            }
                            setPatchOption(item.id);
                            handleArtworkUpdate({ addonId: item.id, enabled: true });
                          }}
                          // onClick={() => {
                          //   setPatchOption(item.id);
                          //   handleArtworkUpdate({ addonId: item.id, enabled: true });
                          // }}
                          className={`relative cursor-pointer rounded-2xl border-4 transition-all duration-500 overflow-hidden bg-white shadow-sm hover:shadow-md
                            ${patchOption === item.id ? "border-[#ed1c24] scale-[1.02]" : "border-gray-200 hover:border-gray-300"}`}
                        >
                          {/* Rotating Image Container */}
                          <div className="aspect-square w-full bg-[#f9f9f9] overflow-hidden relative p-4 rounded-xl border border-gray-100">
                            <img
                              src={currentImage}
                              alt={item.name}
                              className="h-full w-full object-contain transition-all duration-700 ease-in-out"
                            />
                          </div>

                          {/* Price Tag Overlay */}
                          <div className="absolute top-2 left-2 bg-black/70 text-white text-[12px] px-2 py-1 rounded-md z-2">
                            +${item.unit_price}
                          </div>

                          {/* Selection Tick */}
                          {patchOption === item.id && (
                            <div className="absolute top-2 right-2 bg-[#ed1c24] text-white rounded-full p-1.5 shadow-lg z-10">
                              <FaCheck size={10} />
                            </div>
                          )}

                          <div className="px-3 pb-3 text-center">
                            <h3 className={`text-sm font-bold leading-tight ${patchOption === item.id ? "text-[#ed1c24]" : "text-gray-700"}`}>
                              {item.name}
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* View More / View Less Button */}
                  {patchOptionsData.length > initialItems && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => setShowMore(!showMore)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#ed1c24] text-[#ed1c24] text-sm font-medium rounded-full hover:bg-[#ed1c24] hover:text-white transition-all duration-300 shadow-md"
                      >
                        {showMore ? (
                          <>View Less <FaChevronUp /></>
                        ) : (
                          <>View More Patch Options <FaChevronDown /></>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Logo Placement */}
          <div className='flex justify-center'>
            <div className='team_wrap mb-8'>
              <div className='p-4 bg-[#ff0000] mb-4'>
                <h2 className='text-2xl font-bold text-white'>Logo Placement</h2>
              </div>
              {/* <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Logo Placement</h3> */}

              {/* <div className='grid grid-cols-3 gap-2'>
                {placements.map((item) => (
                  <div
                    key={item.id}
                    className='product_list_box text-center cursor-pointer'
                    onClick={() => setLogoPlacement(item.label)}
                  >
                    <div
                      className={`mb-3 border-4 rounded-[8px] overflow-hidden 
          ${logoPlacement === item.label ? "border-[#ed1c24]" : "border-[#E2E2E2]"} `}
                    >
                      <Image src={item.img} alt={item.label} />
                    </div>

                    <p className='text-[18px] text-[#353535] font-medium'>{item.heading}</p>
                  </div>
                ))}
              </div> */}
              <div className='grid grid-cols-3 gap-2'>
                {placements.map((item) => (
                  <div
                    key={item.id}
                    className='product_list_box text-center cursor-pointer'
                    onClick={() => handleLogoPlacement(item.label)}
                  >
                    <div
                      className={`mb-3 border-4 rounded-[8px] overflow-hidden 
          ${logoPlacement === item.label // Ekhane direct comparison hobe
                          ? "border-[#ed1c24]"
                          : "border-[#E2E2E2]"
                        }`}
                    >
                      <Image src={item.img} alt={item.label} />
                    </div>

                    <p className='text-[18px] text-[#353535] font-medium'>
                      {item.heading}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Placement Size Notes */}
          <div className='mb-8 form_area'>
            <p className='text-[#7E7E7E] text-sm font-normal pb-2'><strong>Optional:</strong> Use the Placement & Size Notes below to give us any specific sizing or placement you may want.</p>
            <p className='text-[#7E7E7E] text-sm font-normal pb-2'><strong>Note:</strong> Placement can only change 1 time for every 6 or more hats ordered and must stay the same size.</p>
            <Textarea className='!text-black' rows={3} value={placementSizeNotes} onChange={(e) => setPlacementSizeNotes(e.target.value)} placeholder="Any specific notes about placement or size" />
          </div>


          {/* <div className="mt-8">
            <div className='p-4 bg-[#ff0000] mb-4'>
              <h2 className='text-2xl font-bold text-white'>Logo Colors</h2>
            </div>
            <div>
              <h3 className="text-lg font-semibold">These are the thread colors we use:</h3>
              <p className='text-sm font-normal pb-2'>Designs can have up to 15 different colors in them. We recommend keeping designs to the fewest numbers of colors possible.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              {logoColors.map((color, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-md overflow-hidden">
                    <Image
                      src={color.img}
                      alt={color.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-700">{color.name}</p>
                </div>
              ))}
            </div>

            <div className='my-8  form_area'>
              <p className='text-[#7E7E7E] text-sm font-normal pb-2'><strong>Optional:</strong> Let us know in the color notes below any specific colors you would like us to use in your design.</p>
              <p className='text-[#7E7E7E] text-sm font-normal pb-2'><strong>Note:</strong> Color can only change 1 time for every 6 or more hats ordered.</p>
              <Textarea className='!text-black' rows={3} value={colorNotes} onChange={(e) => setColorNotes(e.target.value)} placeholder="Color Notes" />
            </div>
          </div> */}

          {/* Additional Addons */}
          <div className="mt-8 mb-8">
            <div className="px-4 py-3 bg-[#ff0000]">
              <h2 className="text-2xl font-bold text-white">Additional Addons</h2>
            </div>
            <div className="w-full lg:w-1/2 mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
              <div className="rounded-xl bg-[#f5f5f5] p-4 text-sm text-gray-800">
                <h3 className="mb-2 text-lg font-semibold">Back & Side Stitching</h3>
                <p>You can add back, left side and right side stitching to your hats.</p>
              </div>

              <div className="bg-white rounded-xl shadow p-4 mt-4">
                <h3 className="text-center bg-[#e0e0e0] font-semibold p-2 rounded">
                  Back & Side Stitching Price
                </h3>

                <div className="mt-3 flex justify-center items-center">
                  <div className="flex items-center gap-2 bg-[#fff3cd] px-6 py-2 rounded-full border border-yellow-500 shadow-sm">
                    {/* Plus Icon/Text */}
                    <span className="text-yellow-700 font-bold text-lg">+</span>

                    {/* Price Value */}
                    <span className="text-yellow-800 font-extrabold text-xl">
                      ${Number(backStitchingTiers?.[0]?.unit_price).toFixed(2)}
                    </span>

                    {/* Unit Text (Optional) */}
                    <span className="text-yellow-700 text-xs font-semibold ml-1">
                      Per Item
                    </span>
                  </div>
                </div>
              </div>



              <div className="mt-4 grid grid-cols-3 gap-3">
                {stitchingOptions.map((option) => {
                  const isSelected =
                    (option.id === "back" && backStitching) ||
                    (option.id === "left" && leftStitching) ||
                    (option.id === "right" && rightStitching);

                  return (
                    <button key={option.id} className={`overflow-hidden rounded-xl border-4 ${isSelected ? "border-red-500 bg-[#f5f8ff]" : "border-gray-300 bg-white"}`} onClick={() => toggleStitching(option)}>
                      <Image
                        src={option.img}
                        alt={option.label}
                        className="w-full object-cover"
                        width={300}
                        height={200}
                      />

                      <div className={`py-2 text-center text-sm font-semibold ${isSelected ? "bg-[#ed1c24] text-white" : "text-gray-600 bg-white"}`}>
                        {option.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 space-y-3">
                {backStitching && (
                  <div className="mt-4">
                    <label className="mb-1 block font-semibold text-sm">Back Stitch Details:</label>
                    <input
                      type="text"
                      value={backStitchDetails}
                      onChange={(e) => setBackStitchDetails(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Enter details here..."
                    />

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {/* UPLOAD BUTTON */}
                      <label className="rounded-md bg-[#ff7379] px-3 py-2 text-xs font-semibold text-white cursor-pointer shrink-0">
                        Upload Back Design
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleStitchingFileUpload(e, 'back')}
                          accept="image/*"
                        />
                      </label>

                      {/* PREVIEW + NAME CONTAINER */}
                      <div className="flex items-center gap-2">
                        {backStitchingFile && (
                          <div className="w-8 h-8 rounded border border-gray-200 overflow-hidden shrink-0">
                            <img
                              src={URL.createObjectURL(backStitchingFile)}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                            />
                          </div>
                        )}
                        <span className="text-xs text-gray-500  max-w-[150px]">
                          {backStitchingFile ? backStitchingFile.name : "No File Selected"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {leftStitching && (
                  <div className="mt-4">
                    <label className="mb-1 block font-semibold text-sm">Left Side Details:</label>
                    <input
                      type="text"
                      value={leftSideDetails}
                      onChange={(e) => setLeftSideDetails(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Enter details here..."
                    />

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {/* UPLOAD BUTTON */}
                      <label className="rounded-md bg-[#ff7379] px-3 py-2 text-xs font-semibold text-white cursor-pointer shrink-0">
                        Upload Left Side Design
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleStitchingFileUpload(e, 'left')}
                          accept="image/*"
                        />
                      </label>

                      {/* PREVIEW + NAME CONTAINER */}
                      <div className="flex items-center gap-2">
                        {leftStitchingFile && (
                          <div className="w-8 h-8 rounded border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                            <img
                              src={URL.createObjectURL(leftStitchingFile)}
                              alt="Left Preview"
                              className="w-full h-full object-cover"
                              // Preview URL revoke kora memory-r jonno bhalo
                              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                            />
                          </div>
                        )}
                        <span className="text-xs text-gray-500 truncate max-w-[150px]">
                          {leftStitchingFile ? leftStitchingFile.name : "No File Selected"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {rightStitching && (
                  <div className="mt-4">
                    <label className="mb-1 block font-semibold text-sm">Right Side Details:</label>
                    <input
                      type="text"
                      value={rightSideDetails}
                      onChange={(e) => setRightSideDetails(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Enter details here..."
                    />

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {/* UPLOAD BUTTON */}
                      <label className="rounded-md bg-[#ff7379] px-3 py-2 text-xs font-semibold text-white cursor-pointer shrink-0">
                        Upload Right Side Design
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleStitchingFileUpload(e, 'right')}
                          accept="image/*"
                        />
                      </label>

                      {/* PREVIEW + NAME CONTAINER */}
                      <div className="flex items-center gap-2">
                        {rightStitchingFile && (
                          <div className="w-8 h-8 rounded border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                            <img
                              src={URL.createObjectURL(rightStitchingFile)}
                              alt="Right Preview"
                              className="w-full h-full object-cover"
                              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                            />
                          </div>
                        )}
                        <span className="text-xs text-gray-500 truncate max-w-[150px]">
                          {rightStitchingFile ? rightStitchingFile.name : "No File Selected"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* General Notes */}
          <div className='mb-10 form_area'>
            <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>General Notes</h3>
            <p className='text-[#7E7E7E] text-sm font-normal pb-2'><strong>Optional:</strong> Please use this space to let us know any other special details about this order.</p>
            <Textarea className='!text-black' value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} placeholder="Order Notes" rows={4} />
          </div>

          <button
            onClick={() => handleCheckoutClick()}
            disabled={loading}
            className={`text-white text-base rounded-full w-full py-3 cursor-pointer
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#ED1C24] hover:bg-black"}
  `}
          >
            {loading ? "Waiting..." : "Checkout"}
          </button>

        </div>
      </div>
      <CartProgressBar
        progressPercent={progressPercent}
        totalCartItems={cartListItem?.data?.cart?.total_items}
        grandTotal={cartListItem?.data?.cart?.grand_total_amount}
      />
    </div>
  )
}

export default page