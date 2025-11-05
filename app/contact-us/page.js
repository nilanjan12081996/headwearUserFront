import Link from 'next/link'
import React from 'react'

import aboutBanner from "../assets/imagesource/about_banner.png";
import bannerImg from "../assets/imagesource/banner_img.png";
import About_us from "../assets/imagesource/About_us.png";
import how_it_works_img from "../assets/imagesource/how_it_works_img.png";
import How_it_works from "../assets/imagesource/How_it_works.png";
import special01 from "../assets/imagesource/special01.png";
import special02 from "../assets/imagesource/special02.png";
import special03 from "../assets/imagesource/special03.png";
import team01 from "../assets/imagesource/team01.png";
import team02 from "../assets/imagesource/team02.png";
import team03 from "../assets/imagesource/team03.png";
import our_mission_img from "../assets/imagesource/our_mission_img.png";
import our_vision_img from "../assets/imagesource/our_vision_img.png";

import app_store from "../assets/imagesource/app_store.png";

import google_play from "../assets/imagesource/google_play.png";

import mobiles_01 from "../assets/imagesource/mobiles_01.png";

import about_01 from "../assets/imagesource/about_01.png";

import about_02 from "../assets/imagesource/about_02.png";

import stethy from "../assets/imagesource/stethy.png";

import home from "../assets/imagesource/home.png";

import expert_02 from "../assets/imagesource/expert_02.png";
import expert_03 from "../assets/imagesource/expert_03.png";
import expert_04 from "../assets/imagesource/expert_03.png";
import expert_05 from "../assets/imagesource/expert_04.png";
import expert_06 from "../assets/imagesource/expert_05.png";
import team_06 from "../assets/imagesource/team_06.png";

import expert_01 from "../assets/imagesource/expert_01.png";

import { Button, Label, Textarea, TextInput } from 'flowbite-react';



import Image from 'next/image';


import { FaPlus } from "react-icons/fa";


import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { RiMapPin2Line } from "react-icons/ri";


import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidPhone } from "react-icons/bi";
import { BiLogoGmail } from "react-icons/bi";



const page = () => {
  return (
    <div>
      <div className='banner_area py-0 lg:p-0'>
        {/* home banner section start here */}
        <div className="inner_banner_area relative bg-[#ff0000] min-h-[160px] lg:min-h-[320px]">
          {/* <Image src={aboutBanner} alt='aboutBanner' className="hidden lg:block" />
          <Image src={bannerImg} alt='bannerImg' className="block lg:hidden" /> */}
          <div className="banner_content_area absolute w-full h-full left-0 top-0">
           <div className='max-w-6xl mx-auto flex justify-center items-center h-full'>
               <div className="w-full px-4 pt-10 lg:pt-10 text-center">
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Contact Us</h1>
               </div>
           </div>
        </div>
        </div>
      </div>


      {/* Who We Are section start here */}
      <div className="py-10 lg:py-20">
        <div className='max-w-6xl mx-auto'>
           <div className='mb-0 px-5 lg:px-0'>
              <div className='lg:w-8/12 mx-auto text-center'>
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] leading-[48px] font-semibold lg:pb-4">We’d Love to Hear From You</h2>
                <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Whether you&apos;re exploring automation for your product, need support integrating our tools, or just want to chat about making your workflows smarter—we're here to help.</p>
              </div>
           </div>
           <div className="certificate_completion_sec">
                <div className="max-w-6xl mx-auto lg:py-4 px-4 lg:px-0">
                    <div className="lg:flex gap-14">
                        
                        <div className="lg:w-5/12 bg-[#FFCE73] rounded-[10px] shadow-xl p-5 lg:p-10 mb-6 lg:mb-0">
                            <div className='mb-10 pb-8 border-b border-[#9A6220]'>
                                <h3 className='text-[#022A14] text-xl lg:text-[24px] leading-[26px] font-semibold pb-2 lg:pb-4'>Contact Info</h3>
                                <p className='text-[#022A14] text-sm lg:text-[14px] leading-[20px]'>We&apos;re here to help! If you have any questions or want to explore how our 
                                    automation tools can make your product more efficient and scalable, let’s talk.</p>
                            </div>
                            <div className='mb-4 pb-5 flex items-center'>
                                <div className='w-3/12'>
                                     <div className='w-[63px] h-[63px] bg-[#FDA501] rounded-full flex items-center justify-center'>
                                        <FaMapMarkerAlt className='text-[#ffffff] text-3xl' />
                                    </div>
                                </div>
                                <div className='w-9/12'>
                                    <div className='mb-2'>
                                        <p className='text-[#022A14] text-[18px] lg:text-[18px] leading-[26px] font-semibold pb-0'>Our Location</p>
                                    </div>
                                    <div className='text-[12px] lg:text-[12px] leading-[16px] font-medium text-[#022A14] pl-0'>Dn-21, DN Block, Sector V, Bidhannagar, West Bengal 700091, 7th floor, unit no - 4.</div>
                                </div>
                            </div>
                            <div className='mb-4 pb-5 flex items-center'>
                                <div className='w-3/12'>
                                     <div className='w-[63px] h-[63px] bg-[#FDA501] rounded-full flex items-center justify-center'>
                                        <BiSolidPhone className='text-[#ffffff] text-3xl' />
                                    </div>
                                </div>
                                <div className='w-9/12'>
                                    <div className='mb-2'>
                                        <p className='text-[#022A14] text-[18px] lg:text-[18px] leading-[26px] font-semibold pb-0'>Phone Number</p>
                                    </div>
                                    <div className='text-[12px] lg:text-[12px] leading-[16px] font-medium text-[#022A14] pl-0'>(+91) 9062462268</div>
                                </div>
                            </div>
                            <div className='mb-4 pb-5 flex items-center'>
                                <div className='w-3/12'>
                                     <div className='w-[63px] h-[63px] bg-[#FDA501] rounded-full flex items-center justify-center'>
                                        <BiLogoGmail className='text-[#ffffff] text-3xl' />
                                    </div>
                                </div>
                                <div className='w-9/12'>
                                    <div className='mb-2'>
                                        <p className='text-[#022A14] text-[18px] lg:text-[18px] leading-[26px] font-semibold pb-0'>Email Id</p>
                                    </div>
                                    <div className='text-[12px] lg:text-[12px] leading-[16px] font-medium text-[#022A14] pl-0'>gourangoaich@gmail.com</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-7/12 bg-[#ffffff] rounded-[10px] shadow-xl p-5 lg:p-10">
                            <div className='my-5'>
                                <h3 className='text-[#0B8843] text-xl lg:text-[24px] leading-[26px] font-semibold pb-3'>Get In Touch</h3>
                                <p className='text-[#424242] text-sm lg:text-[14px] leading-[20px]'>We&lsquo;re here to help! If you have any questions or would like to discuss how our automation tools can enhance your product and streamline your operations, feel free to reach out.</p>
                            </div>
                            <div className='w-full'>
                                <div className='form_area'>
                                    <div className='flex gap-4 mb-3'>
                                        <div className='w-full mb-2'>
                                            <TextInput id="base" type="text" placeholder='First Name' sizing="md" />
                                        </div>
                                        <div className='w-full mb-2'>
                                            <TextInput id="base" type="text" placeholder='Last Name' sizing="md" />
                                        </div>
                                    </div>
                                    <div className='flex gap-4 mb-3'>
                                        <div className='w-full mb-2'>
                                            <TextInput id="base" type="email" placeholder='Email Address' sizing="md" />
                                        </div>
                                        <div className='w-full mb-2'>
                                            <TextInput id="base" type="text" placeholder="Phone Number" sizing="md" />
                                        </div>
                                    </div>
                                    <div className='mb-5'>
                                        <Textarea id="comment" placeholder="Your massage" required rows={6} />
                                    </div>
                                    <Button type="submit">Get to Know </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      {/* Who We Are section ends here */}



      {/* Download section start here */}
      <div>
        <div className="support_section lg:pt-20">
          <div className='max-w-6xl mx-auto px-5 lg:px-0'>
              <div className="lg:flex gap-4">
                <div className="lg:w-6/12 py-10 lg:py-20">
                  <h2 className="text-[#ffffff] text-[23px] lg:text-[40px] leading-[48px] font-semibold lg:pb-6">App Coming Soon!</h2>
                  <p className="text-[#ffffff] text-sm lg:text-[16px] leading-[24px] pb-8">Discover mental health awareness resources and connect with expert 
                  support — all in one app for your well-being.</p>
                  <div className="flex gap-4">
                      <Image src={app_store} alt='app_store' className='' />
                      <Image src={google_play} alt='google_play' className='' />
                  </div>
                </div>
                <div className="lg:w-6/12">
                  <Image src={mobiles_01} alt='mobiles_01' className='' />
                </div>
              </div>
          </div>
        </div>
      </div>
      {/* Download section ends here */}





    </div>
  )
}

export default page