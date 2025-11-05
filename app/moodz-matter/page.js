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

import moodz_matter_small_01 from "../assets/imagesource/moodz_matter_small_01.png";
import moodz_matter_small_02 from "../assets/imagesource/moodz_matter_small_02.png";
import moodz_matter_small_03 from "../assets/imagesource/moodz_matter_small_03.png";
import moodz_matter_small_04 from "../assets/imagesource/moodz_matter_small_04.png";
import moodz_matter_small_05 from "../assets/imagesource/moodz_matter_small_05.png";
import moodz_matter_small_06 from "../assets/imagesource/moodz_matter_small_06.png";

import moodz_matter_big from "../assets/imagesource/moodz_matter_big.png";



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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Moodz Matter</h1>
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
                 <Image src={moodz_matter_big} alt='moodz_matter_big' className='' />
              </div>
              <div className='lg:w-7/12 lg:pl-20'>
                  <div className="mt-10">
                    <div className='mb-0'>
                        <div className='w-full'>
                            <div className="mb-2 flex items-center">
                            <FaPlus className="text-[#FFA250] text-base lg:text-[20px] mr-1" />
                            <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Awareness </p>
                            </div>
                            <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-4">Moodz Matter</h2>
                        </div>
                        <div className='w-full'>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Moodz Matter is your space to explore how emotions shape different parts of 
                                life — from student stress and workplace pressure to relationships, identity, aging, and special education.</p>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Here, you’ll find insights to recognize common challenges, understand emotional well-being in each context, and learn ways to navigate 
                                them with awareness and care. Whatever stage of life you’re in, Moodz Matter helps you build understanding and find support where it matters most.</p>
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
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold lg:pb-4">List of Moodz Matter</h2>
              </div>
           </div>
           <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={moodz_matter_small_01} alt='moodz_matter_small_01' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Student</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Being a student is exciting but also stressful.
                       Alongside learning and growing, they often face pressure to perform academically, make future career decisions, 
                       and fit into social circles. Many also struggle with loneliness, financial worries, or uncertainty about their path. 
                       These challenges can weigh heavily on their mental health. </p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={moodz_matter_small_02} alt='moodz_matter_small_02' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Love & Sex</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Love and intimacy can bring happiness but also deep challenges. Miscommunication, insecurity, and unmet 
                      expectations often create tension. Many people feel pressure to match societal standards of romance or sexuality, which can lead to frustration. Intimacy issues, 
                      heartbreak, or trust concerns can affect both emotional and physical closeness. </p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={moodz_matter_small_03} alt='moodz_matter_small_03' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Old Age</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Old age comes with wisdom, but also with many struggles. As health declines, mobility reduces, and loved ones drift apart, 
                      many elderly people face loneliness. Financial concerns, dependence on others, and feeling undervalued in society can make them vulnerable emotionally and physically. </p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={moodz_matter_small_04} alt='moodz_matter_small_04' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>LGBTQ+</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>For LGBTQ+ individuals, acceptance and belonging are constant struggles. Stigma, discrimination, and rejection often make them hide 
                      their true identity. Many deal with fear of judgment, isolation, and even harassment. These challenges can deeply affect their mental well-being and access to safe spaces, relationships, and opportunities. </p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={moodz_matter_small_05} alt='moodz_matter_small_05' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>WorkPlace</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Workplaces can bring growth and purpose, but also stress and conflict. Heavy workloads, 
                      deadlines, or lack of recognition often affect morale. Toxic environments, discrimination, and job insecurity add to the strain. Many also struggle to balance 
                      work and personal life, leading to burnout and dissatisfaction. </p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={moodz_matter_small_06} alt='moodz_matter_small_06' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Special Education</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Children in special education need extra care and support, but they often face barriers beyond their 
                      learning needs. Misunderstanding, stigma, and lack of proper resources can make them feel excluded. With patience, acceptance, and inclusive teaching, 
                      their strengths can shine, but without it, they face constant struggles. </p>
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