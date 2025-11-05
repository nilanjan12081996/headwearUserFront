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

import mental_small_01 from "../assets/imagesource/mental_small_01.png";
import mental_small_02 from "../assets/imagesource/mental_small_02.png";
import mental_small_03 from "../assets/imagesource/mental_small_03.png";
import mental_small_04 from "../assets/imagesource/mental_small_04.png";
import mental_small_05 from "../assets/imagesource/mental_small_05.png";
import mental_small_06 from "../assets/imagesource/mental_small_06.png";
import mental_small_07 from "../assets/imagesource/mental_small_07.png";
import mental_small_08 from "../assets/imagesource/mental_small_08.png";

import awareness_top_01 from "../assets/imagesource/awareness_top_01.png";



import Image from 'next/image';


import { FaPlus } from "react-icons/fa";
import AwarenessSlider from '../awareness-slider/page';



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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Awareness</h1>
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
                 <Image src={awareness_top_01} alt='awareness_top_01' className='' />
              </div>
              <div className='lg:w-7/12 lg:pl-20'>
                  <div className="mt-10">
                    <div className='mb-0'>
                        <div className='w-full'>
                            <div className="mb-2 flex items-center">
                            <FaPlus className="text-[#FFA250] text-base lg:text-[20px] mr-1" />
                            <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Awareness </p>
                            </div>
                            <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-4">Your Gateway to Mental Wellbeing</h2>
                        </div>
                        <div className='w-full'>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Mental health disorders affect over one billion people worldwide and rank among the 
                              leading causes of long-term disability (WHO, 2025). Depression and anxiety alone cost the global economy about US$1 trillion annually, with suicide
                               remaining a major concern.</p>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">In India, one in seven individuals has experienced a mental disorder, yet treatment gaps exceed 80%, contributing 
                              to high suicide rates and projected economic losses of over US$1 trillion (Gururaj et al., 2020; WHO, 2025). In this context, Good Mood is here to spread 
                              awareness and provide all the resources, crucial for a world at the pink of mental health.  </p>
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
              <div className='lg:w-8/12 mx-auto text-center'>
                <div className="mb-2 flex items-center justify-center">
                  <FaPlus className="text-[#FFA250] text-base lg:text-[20px] mr-1" />
                  <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Awareness </p>
                </div>
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-4">Discover Pathways to Better Mental Health</h2>
              </div>
           </div>
           <div className='awareness_slider'>
              <AwarenessSlider />
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