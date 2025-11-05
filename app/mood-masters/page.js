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

import mood_masters_small_01 from "../assets/imagesource/mood_masters_small_01.png";
import mood_masters_small_02 from "../assets/imagesource/mood_masters_small_02.png";
import mood_masters_small_03 from "../assets/imagesource/mood_masters_small_03.png";
import mood_masters_small_04 from "../assets/imagesource/mood_masters_small_04.png";
import mood_masters_small_05 from "../assets/imagesource/mood_masters_small_05.png";
import mood_masters_small_06 from "../assets/imagesource/mood_masters_small_06.png";
import mood_masters_small_07 from "../assets/imagesource/mood_masters_small_07.png";
import mood_masters_small_08 from "../assets/imagesource/mood_masters_small_08.png";

import mood_masters_big from "../assets/imagesource/mood_masters_big.png";



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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Mood Masters </h1>
               </div>
           </div>
        </div>
        </div>
      </div>


      {/* Who We Are section start here */}
      <div className="py-10 lg:py-20">
        <div className='max-w-6xl mx-auto px-5 lg:px-0'>
           <div className='lg:flex gap-5'>
              <div className='lg:w-7/12 lg:pr-20'>
                  <div className="lg:mt-10">
                    <div className='mb-0'>
                        <div className='w-full'>
                            <div className="mb-2 flex items-center">
                            <FaPlus className="text-[#FFA250] text-base lg:text-[20px] mr-1" />
                            <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Awareness </p>
                            </div>
                            <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-4">Mood Masters</h2>
                        </div>
                        <div className='w-full'>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Mood Masters is your guide to building a stronger, healthier mind. From understanding 
                                your mental health and boosting positivity to overcoming procrastination, managing emotions, and nurturing healthy relationships — each resource 
                                is designed to help you grow with confidence.</p>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Discover simple ways to uplift your mood, say no to self-harm, and find balance in daily life. With practical tips and self-assessments, 
                                Mood Masters empowers you to take charge of your well-being and create lasting positive change.</p>
                        </div>
                    </div>
                  </div>
              </div>
              <div className='lg:w-5/12'>
                 <Image src={mood_masters_big} alt='mood_masters_big' className='' />
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
                  <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Awareness </p>
                </div>
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-4">List of Mood Masters</h2>
              </div>
           </div>
           <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mood_masters_small_01} alt='mood_masters_small_01' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Know your mental health</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Understand where you stand and give your mind the care it deserves.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mood_masters_small_02} alt='mood_masters_small_02' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Mood Boost</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Lift your spirits with small steps that brighten your day.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mood_masters_small_03} alt='mood_masters_small_03' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Say No to Self-Harm</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'> Find safe ways to cope when pain feels overwhelming. </p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mood_masters_small_04} alt='mood_masters_small_04' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Care</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Learn gentle ways to nurture yourself in tough times.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mood_masters_small_05} alt='mood_masters_small_05' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Self-Assessment</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Reflect on how you’re doing and discover what you need.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mood_masters_small_06} alt='mood_masters_small_06' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Positivity Booster</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Invite hope, gratitude, and light into your everyday. </p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mood_masters_small_07} alt='mood_masters_small_07' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Anti-Procrastination</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Break free from delays and take small, doable actions. </p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mood_masters_small_08} alt='mood_masters_small_08' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Healthy Love & Sex life</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Build closeness, trust, and joy in your relationships. </p>
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