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

import right_icon from "../assets/imagesource/smallCheck.png";
import blue_icon from "../assets/imagesource/smallCheckBlue.png";
import back_stitching from "../assets/imagesource/stitching1.jpg";
import left_stitching from "../assets/imagesource/stitching2.jpg";
import right_stitching from "../assets/imagesource/stitching3.jpg";



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
import { getDecorationType, uploadLogo } from '../reducers/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addArtWork, addOnPrice, setUpPlanList } from '../reducers/ArtWorkSlice';
import { useRef } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";





const page = () => {
  const router = useRouter();
  const { cartListItem } = useSelector((state) => state?.cart);
  const { decorationList } = useSelector((state) => state?.cart)
  const { loading,adonPriceData,setUpPlanListData } = useSelector((state) => state?.art)
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


  const toggleStitch = (id) => {
    setSelectedStitch((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  console.log('decorationList', decorationList)

  // Decoration states
  const [selectedDecorationId, setSelectedDecorationId] = useState("");
  const [embroideryType, setEmbroideryType] = useState("flat");
  const [patchShape, setPatchShape] = useState("");
  const [patchColor, setPatchColor] = useState("");
  const [logoPlacement, setLogoPlacement] = useState("Front Center");

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

useEffect(()=>{
dispatch(addOnPrice())
dispatch(setUpPlanList())
  },[])
console.log("adonPriceData",adonPriceData);
console.log("setUpPlanListData",setUpPlanListData);


  const stitchingOptions = [
    {
      id: "back",
      label: "Back Stitching",
      img: back_stitching,
      color: "#0046ff",
    },
    {
      id: "left",
      label: "Left Side Stitching",
      img: left_stitching,
      color: "#0046ff",
    },
    {
      id: "right",
      label: "Right Side Stitching",
      img: right_stitching,
      color: "gray",
    },
  ];

  const placements = [
    { id: "left", label: "left_side", img: cap_left },
    { id: "front", label: "front_center", img: cap_front },
    { id: "right", label: "right_side", img: cap_right },

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
    formData.append('notes',"N/A")

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

  useEffect(() => {
    if (decorationList?.data?.length > 0) {
      const first = decorationList.data[0];

      setSelectedOption({
        id: first.id,
        name: first.name
      });
    }
  }, [decorationList]);
  console.log("selectedOption", selectedOption)


  const handleStitchingFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    // Here you would upload the file similar to main logo
    // For now, just storing the file object
    if (type === 'back') setBackStitchingFile(file);
    if (type === 'left') setLeftStitchingFile(file);
    if (type === 'right') setRightStitchingFile(file);
  };

  const toggleStitching = (id) => {
    if (id === "back") setBackStitching(!backStitching);
    if (id === "left") setLeftStitching(!leftStitching);
    if (id === "right") setRightStitching(!rightStitching);
  };

  // Prepare final payload
  const preparePayload = () => {
    const selectedDecoration = decorationList?.data?.find(
      item => item.recordId === selectedDecorationId
    );

    const payload = {
      sessionUuid: sessionUUid || deviceId,
      // cart_id: cartId,
      cart_id: 1,
      logo_id: logoId,
      primary_decoration_type_id: selectedOption.id,
      embroidery_type: selectedOption?.name === "Embroidery" ? embroideryType : "",
      patch_shape: selectedOption?.name === "Leather Patch" ? patchShape : "",
      patch_color: selectedOption?.name === "Leather Patch" ? patchColor : "",
      logo_placement: logoPlacement,
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
      if (res?.payload?.status_code === 201) {
        router.push("/checkout")
      }

    });


  };

  const totalQty = cartListItem?.data?.data?.summary?.totalQuantity || 0;


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
              <li className='text-[#666666] text-base'>Caps</li>
              <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
              <li className='text-[#666666] text-base'>{supName}</li>
              <li><MdOutlineArrowForwardIos className='text-[#666666] text-sm' /></li>
              <li className='text-[#ED1C24] text-base'>Artwork</li>
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
          <div className='mt-5 mb-8 decoration_type_area'>
            <Label className='text-[#615E5E] text-base mb-2 block'>Decoration Method</Label>
            <Select
              required
              value={selectedOption.id}
              onChange={(e) => {
                const selected = decorationList?.data?.find(d => d.id === e.target.value);
                if (selected) {
                  setSelectedOption({ id: selected.id, name: selected.name });
                  setSelectedDecorationId(selected.id);

                  if (selected.name === "Embroidery") {
                    setSelectedStyle("Embroidery");
                  } else if (selected.name === "Leather Patch") {
                    setSelectedStyle("Leather Patch");
                  }
                }
              }}
            >
              <option value="">Select Decoration Type</option>
              {decorationList?.data?.map((deco) => (
                <option key={deco.id} value={deco.id}>{deco.name}</option>
              ))}
            </Select>

          </div>

          {/* Hat selector Section */}
          <div className="my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* BOX 1 — decorationList.data[0] */}
              <label
                className={`relative border rounded-xl cursor-pointer transition overflow-hidden min-h-[300px]
        ${selectedStyle === decorationList?.data?.[0]?.name ? "border-[#ff0000] shadow-lg" : "border-gray-300"}
      `}
              >
                {/* Dynamic Title */}
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
                  onChange={() => {
                    const selected = decorationList?.data?.[0];
                    setSelectedStyle(selected?.name);
                    setSelectedOption({ id: selected?.id, name: selected?.name });
                    setSelectedDecorationId(selected?.id);
                  }}
                  className="hidden"
                />


                <ul className="mt-10 space-y-1 p-4 bg-[#f1e3e3]">
                  <li className="flex gap-2 items-center">
                    <Image src={right_icon} width={20} height={20}
                      className={`${selectedStyle === decorationList?.data?.[0]?.name ? "opacity-100" : "opacity-40"}`}
                    />
                    No Minimum Order
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



              {/* BOX 2 — decorationList.data[1] */}
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
                  onChange={() => {
                    const selected = decorationList?.data?.[1];
                    setSelectedStyle(selected?.name);
                    setSelectedOption({ id: selected?.id, name: selected?.name });
                    setSelectedDecorationId(selected?.id);
                  }}
                  className="hidden"
                />


                <ul className="mt-10 space-y-1 p-4 bg-[#f1e3e3]">
                  <li className="flex gap-2 items-center">
                    <Image src={right_icon} width={20} height={20}
                      className={`${selectedStyle === decorationList?.data?.[1]?.name ? "opacity-100" : "opacity-40"}`}
                    />
                    No Minimum Order
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
          </div>

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
                  Standard<br /><s>+$50</s>FREE
                </h2>


                <input
                  type="radio"
                  name="embroideryType"
                  value="flat"
                  checked={selectedPrice === "flat"}
                  onChange={() => setSelectedPrice("flat")}
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


                <p>Included FREE for orders of 12+ hats</p>

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
                  Premimum<br />+$50</h2>

                <input
                  type="radio"
                  name="embroideryType"
                  value="puff"
                  checked={selectedPrice === "puff"}
                  onChange={() => {
                    if (totalQty < 12) {
                      toast.error("Premium Setup not is only available for orders of 12 hats or more.", {
                        duration: 2000
                      });
                      return;
                    }
                    setSelectedPrice("puff");
                  }}
                  className={`hidden ${totalQty < 12 ? "pointer-events-none opacity-50" : ""}`}
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


                <p> Only Available for orders of 12+ hats</p>

              </label>

            </div>
          </div>

          {/* Embroidery Options */}
          {selectedOption?.name === "Embroidery" && (
            <div className="mb-8 mt-4">
              <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Embroidery Option</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`border-4 rounded-xl p-5 cursor-pointer transition ${embroideryType === "standard_flat" ? "border-[#ff0000] shadow-md" : "border-gray-300"}`}>
                  <input type="radio" name="embroidery" value="standard_flat" checked={embroideryType === "standard_flat"} onChange={(e) => setEmbroideryType(e.target.value)} className="hidden" />
                  <h3 className="text-lg font-semibold mb-2">Standard Flat Embroidery</h3>
                  <p className="text-sm text-gray-600 mb-4">Most common embroidery type. Works well for smaller details.</p>
                  <button type="button" className="w-full py-2 rounded-full bg-[#ed1c24] hover:bg-black text-white font-medium">
                    Flat Embroidery
                  </button>
                </label>

                <label className={`border-4 rounded-xl p-5 cursor-pointer transition ${embroideryType === "3D_puff" ? "border-[#ff0000] shadow-md" : "border-gray-300"}`}>
                  <input type="radio" name="embroidery" value="3D_puff" checked={embroideryType === "3D_puff"} onChange={(e) => setEmbroideryType(e.target.value)} className="hidden" />
                  <h3 className="text-lg font-semibold mb-2">3D Puff Embroidery</h3>
                  <p className="text-sm text-gray-600 mb-4">Creates a raised 3D look. Only certain designs can be puffed.</p>
                  <button type="button" className="w-full py-2 rounded-full bg-[#ed1c24] hover:bg-black text-white font-medium">
                    3D Puff Embroidery
                  </button>
                  
                </label>
              </div>
            </div>
          )}

          {/* Leather Patch Options */}
          {selectedOption?.name === "Leather Patch" && (
            <div className='mb-8 mt-4'>
              <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Patch Options</h3>
              <div className='px-5 py-7 w-full bg-[#eeeeee] rounded-[10px] mb-4'>
                <h2 className='text-[#1A1A1A] text-[20px] font-semibold pb-2'>Select a Patch Shape & Color</h2>
                <p className='text-[15px]'>We will convert your artwork and send you mockups.</p>
              </div>
              <div className='border-1 border-[#ed1c24] px-5 py-7 rounded-xl'>
                <h2 className='mb-3 text-[#1A1A1A] text-[20px] font-semibold'>Leather Patch</h2>
                <ul className='flex items-center gap-4 mb-4'>
                  <li className='flex items-center gap-1'><FaCheck /> Synthetic Leather</li>
                  <li className='flex items-center gap-1'><FaCheck /> Very Classy Look</li>
                  <li className='flex items-center gap-1'><FaCheck /> Best For Simple Designs</li>
                </ul>
                <div className='mb-3'>
                  <Select value={patchShape} onChange={(e) => setPatchShape(e.target.value)}>
                    <option value="">Select Patch Shape</option>
                    <option value="Circle">Circle</option>
                    <option value="Rectangle">Rectangle</option>
                    <option value="Shield">Shield</option>
                  </Select>
                </div>
                <div>
                  <Select value={patchColor} onChange={(e) => setPatchColor(e.target.value)}>
                    <option value="">Select Patch Color</option>
                    <option value="Brown">Brown</option>
                    <option value="Black">Black</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Logo Placement */}
          <div className='flex justify-center'>
            <div className='team_wrap mb-8'>
              <h3 className='text-[27px] font-semibold text-[#1A1A1A] pb-4'>Logo Placement</h3>

              <div className='grid grid-cols-3 gap-2'>
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

                    <p className='text-[18px] text-[#353535] font-medium'>{item.label}</p>
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


          <div className="mt-8">
            <div className='p-4 bg-[#ff0000]'>
              <h2 className='text-2xl font-bold text-white'>Logo Colors</h2>
            </div>
            <div className='my-8  form_area'>
              <p className='text-[#7E7E7E] text-sm font-normal pb-2'><strong>Optional:</strong> Let us know in the color notes below any specific colors you would like us to use in your design.</p>
              <p className='text-[#7E7E7E] text-sm font-normal pb-2'><strong>Note:</strong> Color can only change 1 time for every 6 or more hats ordered.</p>
              <Textarea className='!text-black' rows={3} value={colorNotes} onChange={(e) => setColorNotes(e.target.value)} placeholder="Color Notes" />
            </div>
          </div>

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

              <div className="mt-4 grid grid-cols-3 gap-3">
                {stitchingOptions.map((option) => {
                  const isSelected =
                    (option.id === "back" && backStitching) ||
                    (option.id === "left" && leftStitching) ||
                    (option.id === "right" && rightStitching);

                  return (
                    <button key={option.id} className={`overflow-hidden rounded-xl border-4 ${isSelected ? "border-red-500 bg-[#f5f8ff]" : "border-gray-300 bg-white"}`} onClick={() => toggleStitching(option.id)}>
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
                  <div>
                    <label className="mb-1 block font-semibold text-sm">Back Stitch Details:</label>
                    <input type="text" value={backStitchDetails} onChange={(e) => setBackStitchDetails(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Enter details here..." />
                    <div className="mt-2 flex items-center gap-2">
                      <label className="rounded-md bg-[#0046ff] px-3 py-2 text-xs font-semibold text-white cursor-pointer">
                        Upload Back Design
                        <input type="file" className="hidden" onChange={(e) => handleStitchingFileUpload(e, 'back')} accept="image/*" />
                      </label>
                      <span className="text-xs text-gray-500">{backStitchingFile ? backStitchingFile.name : "No File Selected"}</span>
                    </div>
                  </div>
                )}

                {leftStitching && (
                  <div>
                    <label className="mb-1 block font-semibold text-sm">Left Side Details:</label>
                    <input type="text" value={leftSideDetails} onChange={(e) => setLeftSideDetails(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Enter details here..." />
                    <div className="mt-2 flex items-center gap-2">
                      <label className="rounded-md bg-[#0046ff] px-3 py-2 text-xs font-semibold text-white cursor-pointer">
                        Upload Left Side Design
                        <input type="file" className="hidden" onChange={(e) => handleStitchingFileUpload(e, 'left')} accept="image/*" />
                      </label>
                      <span className="text-xs text-gray-500">{leftStitchingFile ? leftStitchingFile.name : "No File Selected"}</span>
                    </div>
                  </div>
                )}

                {rightStitching && (
                  <div>
                    <label className="mb-1 block font-semibold text-sm">Right Side Details:</label>
                    <input type="text" value={rightSideDetails} onChange={(e) => setRightSideDetails(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Enter details here..." />
                    <div className="mt-2 flex items-center gap-2">
                      <label className="rounded-md bg-[#0046ff] px-3 py-2 text-xs font-semibold text-white cursor-pointer">
                        Upload Right Side Design
                        <input type="file" className="hidden" onChange={(e) => handleStitchingFileUpload(e, 'right')} accept="image/*" />
                      </label>
                      <span className="text-xs text-gray-500">{rightStitchingFile ? rightStitchingFile.name : "No File Selected"}</span>
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

      {/* <div className='grid grid-cols-1 lg:grid-cols-3 gap-0'>
        <div className='bg-[#9f9f9f] py-6 flex justify-center items-center lg:border-r-2 border-[#000000] item_area'>
          <div className='flex items-center gap-2 relative z-20'>
            <IoIosColorPalette className='text-white text-5xl' />
            <div>
              <p className='text-white text-base font-medium'>12+ Items</p>
              <p className='text-white text-base font-medium'>Free Artwork Setup</p>
            </div>
          </div>
        </div>
        <div className='bg-[#9f9f9f] py-6 flex justify-center items-center lg:border-r-2 border-[#000000] item_area'>
          <div className='flex items-center gap-2 relative z-20'>
            <TbTruckDelivery className='text-white text-5xl' />
            <div>
              <p className='text-white text-base font-medium'>24+ Items</p>
              <p className='text-white text-base font-medium'>Free Shipping</p>
            </div>
          </div>
        </div>
        <div className='bg-[#9f9f9f] py-6 flex justify-center items-center'>
          <div className='flex items-center gap-2'>
            <IoMdTrophy className='text-white text-5xl' />
            <div>
              <p className='text-white text-base font-medium'>48+ Items</p>
              <p className='text-white text-base font-medium'>Free Premium Setup</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default page