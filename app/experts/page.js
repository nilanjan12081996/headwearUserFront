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
import expert_04 from "../assets/imagesource/expert_04.png";
import expert_05 from "../assets/imagesource/expert_05.png";
import expert_06 from "../assets/imagesource/expert_06.png";
import team_06 from "../assets/imagesource/team_06.png";

import expert_01 from "../assets/imagesource/expert_01.png";



import Image from 'next/image';


import { FaPlus } from "react-icons/fa";



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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Expert?</h1>
               </div>
           </div>
        </div>
        </div>
      </div>


      {/* Who We Are section start here */}
      <div className="py-10 lg:py-20">
        <div className='max-w-6xl mx-auto px-5 lg:px-0'>
           <div className='lg:flex gap-5'>
              <div className='lg:w-5/12'>
                 <Image src={expert_01} alt='expert_01' className='' />
              </div>
              <div className='lg:w-7/12 lg:pl-14'>

                  <div className="mt-10">

                    <div className='mb-0'>
                        <div className='w-full'>
                            <div className="mb-2 flex items-center">
                            <FaPlus className="text-[#FFA250] text-base lg:text-[20px] mr-1" />
                            <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Expert? </p>
                            </div>
                            <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] leading-[26px] lg:leading-[48px] font-semibold pb-2 lg:pb-4">Are You a Mental Health Expert?</h2>
                        </div>
                        <div className='w-full'>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Join Good Mood’s Expert Hub and become part of a trusted network of 
                                professionals dedicated to making mental health support accessible to everyone.</p>
                        </div>
                    </div>

                    <div className='mb-0'>
                        <div className='w-full'>
                            <h2 className="text-[#031E2D] text-[20px] lg:text-[24px] leading-[48px] font-semibold pb-2">How You Can Connect With Us</h2>
                        </div>
                        <div className='w-full'>
                            <ul className='pl-5'>
                                <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-3 list-disc">Simple Registration – Sign up online and create your expert profile.</li>
                                <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-3 list-disc">Verification Process – Our team validates your credentials to ensure trust and quality.</li>
                                <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-3 list-disc">Start Connecting – Once approved, you’ll be matched with individuals seeking your expertise.</li>
                            </ul>
                        </div>
                    </div>

                  </div>

              </div>
           </div>
        </div>
      </div>
      {/* Who We Are section ends here */}


      {/* Who We Are section start here */}
      <div className="py-10 lg:py-20">
        <div className='max-w-6xl mx-auto px-5 lg:px-0'>
           <div className='mb-8'>
              <div className='w-8/12 mx-auto text-center'>
                <div className="mb-2 flex items-center justify-center">
                  <FaPlus className="text-[#FFA250] text-base lg:text-[20px] mr-1" />
                  <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Expert? </p>
                </div>
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold lg:pb-4">Features We Provide for Experts</h2>
              </div>
           </div>
           <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={expert_02} alt='expert_02' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Appointment Management</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Easy scheduling and calendar integration.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={expert_03} alt='expert_03' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Secure Communication</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Video, chat, and call options to consult with clients safely.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={expert_04} alt='expert_04' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Digital Records</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Access to case notes, progress tracking, and reports.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='pt-12 text-center w-8/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={expert_05} alt='expert_05' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Growth & Visibility</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Get featured in our expert hub and expand your reach to a larger audience.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={expert_06} alt='expert_06' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Seamless Payment</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Hassle-free and transparent payment system.</p>
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