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

import therapies_img_head from "../assets/imagesource/therapies_img_head.png";



import about_01 from "../assets/imagesource/about_01.png";

import about_02 from "../assets/imagesource/about_02.png";

import stethy from "../assets/imagesource/stethy.png";

import support_01 from "../assets/imagesource/support_01.png";
import support_02 from "../assets/imagesource/support_02.png";
import support_03 from "../assets/imagesource/support_03.png";
import support_04 from "../assets/imagesource/support_04.png";

import expert_02 from "../assets/imagesource/expert_02.png";
import expert_03 from "../assets/imagesource/expert_03.png";
import expert_04 from "../assets/imagesource/expert_03.png";
import expert_05 from "../assets/imagesource/expert_04.png";
import expert_06 from "../assets/imagesource/expert_05.png";
import team_06 from "../assets/imagesource/team_06.png";

import expert_01 from "../assets/imagesource/expert_01.png";



import Image from 'next/image';


import { FaPlus } from "react-icons/fa";
import { RiPsychotherapyLine } from "react-icons/ri";
import { PiStethoscopeBold } from "react-icons/pi";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { BiRightArrowAlt } from "react-icons/bi";



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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Support</h1>
               </div>
           </div>
        </div>
        </div>
      </div>


      {/* Who We Are section start here */}
      <div className="py-10 lg:py-20">
        <div className='max-w-6xl mx-auto px-5 lg:px-0'>
           <div className='lg:flex justify-between gap-5'>
              <div className='lg:w-6/12 lg:pl-14'>
                  <div className="lg:mt-10">
                    <div className='mb-0'>
                        <div className='w-full'>
                            <div className="mb-2 flex items-center">
                            <FaPlus className="text-[#FFA250] text-[20px] mr-1" />
                            <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Support </p>
                            </div>
                            <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-4">Your Pathway to Mental Health Support</h2>
                        </div>
                        <div className='w-full'>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Good Mood’s Support Hub connects you with resources and guidance to help manage 
                                your mental well being. From expert consultations and therapy options to self-assessments and wellness programs, we provide the 
                                right tools to support you at every step. Whether you’re seeking help for yourself or someone you care about, reliable support is always within reach.</p>
                        </div>
                    </div>
                  </div>
              </div>
              <div className='lg:w-5/12'>
                 <Image src={support_01} alt='support_01' className='' />
              </div>
           </div>
        </div>
      </div>
      {/* Who We Are section ends here */}


      {/* Who We Are section start here */}
      <div className="py-10 lg:py-20">
        <div className='max-w-6xl mx-auto px-5 lg:px-0'>
           <div className='mb-8'>
              <div className='lg:w-6/12 mx-auto text-center'>
                <div className="mb-2 flex items-center justify-center">
                  <FaPlus className="text-[#FFA250] text-[20px] mr-1" />
                  <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Support </p>
                </div>
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-4">Connecting You to the Right Help</h2>
              </div>
           </div>
           <div className='grid grid-cols-1 lg:grid-cols-3 gap-0'>
              <div className='border border-[#DADADA] rounded-0'>
                <div>
                    <Image src={support_02} alt='support_02' className='' />
                </div>
                <div className='min-h-[288px] py-8 px-4'>
                    <div className='mb-4'>
                      <RiPsychotherapyLine className='text-[#F39C33] text-4xl' />
                    </div>
                    <h3 className='text-[25px] leading-[34px] font-bold text-[#262626] pb-2'>Therapies</h3>
                    <p className="text-[#424242] text-[14px] leading-[22px] font-medium pb-4">Explore effective, evidence-based approaches designed to improve mental health and emotional wellbeing.</p>
                    <Link className='text-[14px] leading-[20px] text-[#0B8843] hover:text-black font-semibold flex items-center' href="/therapies" passHref> Read More <BiRightArrowAlt className='text-xl' /> </Link>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-0'>
                <div className='min-h-[288px] py-8 px-4'>
                    <div className='mb-4'>
                      <PiStethoscopeBold className='text-[#F39C33] text-4xl' />
                    </div>
                    <h3 className='text-[25px] leading-[34px] font-bold text-[#262626] pb-2'>Mental Health Experts</h3>
                    <p className="text-[#424242] text-[14px] leading-[22px] font-medium pb-4">Where do you go when your mind feels heavy and your thoughts feel tangled? Mental health experts are trained to guide you through the confusion...</p>
                    <Link className='text-[14px] leading-[20px] text-[#0B8843] hover:text-black font-semibold flex items-center' href="/mental-health-experts" passHref> Read More <BiRightArrowAlt className='text-xl' /> </Link>
                </div>
                <div>
                    <Image src={support_03} alt='support_03' className='' />
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-0'>
                <div>
                    <Image src={support_04} alt='support_04' className='' />
                </div>
                <div className='min-h-[288px] py-8 px-4'>
                    <div className='mb-4'>
                      <MdOutlineDocumentScanner className='text-[#F39C33] text-4xl' />
                    </div>
                    <h3 className='text-[25px] leading-[34px] font-bold text-[#262626] pb-2'>Packages</h3>
                    <p className="text-[#424242] text-[14px] leading-[22px] font-medium pb-4">Tailored solutions for educational institutions, corporate training, and employee wellbeing programs.</p>
                    <Link className='text-[14px] leading-[20px] text-[#0B8843] hover:text-black font-semibold flex items-center' href="/packages" passHref> Read More <BiRightArrowAlt className='text-xl' /> </Link>
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