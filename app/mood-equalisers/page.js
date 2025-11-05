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

import mood_equalisers_small_01 from "../assets/imagesource/mood_equalisers_small_01.png";
import mood_equalisers_small_02 from "../assets/imagesource/mood_equalisers_small_02.png";
import mood_equalisers_small_03 from "../assets/imagesource/mood_equalisers_small_03.png";
import mood_equalisers_small_04 from "../assets/imagesource/mood_equalisers_small_04.png";
import mood_equalisers_small_05 from "../assets/imagesource/mood_equalisers_small_05.png";
import mood_equalisers_small_06 from "../assets/imagesource/mood_equalisers_small_06.png";

import mood_equalisers_big from "../assets/imagesource/mood_equalisers_big.png";



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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Mood Equalisers</h1>
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
                 <Image src={mood_equalisers_big} alt='mood_equalisers_big' className='' />
              </div>
              <div className='lg:w-7/12 lg:pl-20'>
                  <div className="mt-10">
                    <div className='mb-0'>
                        <div className='w-full'>
                            <div className="mb-2 flex items-center">
                            <FaPlus className="text-[#FFA250] text-base lg:text-[20px] mr-1" />
                            <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Awareness </p>
                            </div>
                            <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-2 lg:pb-4">Mood Equalisers</h2>
                        </div>
                        <div className='w-full'>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Finally, your calming corner when emotions feel heavy or unsteady. Here, you’ll find 
                              gentle practices, simple tools, resources and small steps that can bring balance to your day.</p>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Whether you’re feeling anxious, low, or just 
                              out of rhythm, this space is here to guide you back to calm. Think of it as a set of little anchors: easy, soothing ways to help you steady 
                              your mind and heart whenever you need it most.</p>
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
                  <FaPlus className="text-[#FFA250] text-[20px] mr-1" />
                  <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Awareness </p>
                </div>
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-4">List of Mood Equalisers</h2>
              </div>
           </div>
           <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={mood_equalisers_small_01} alt='mood_equalisers_small_01' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Music</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Ever noticed how a song can change your whole mood in minutes? Music has a way of reaching places words cannot. 
                      A melody can calm your mind after a long day, lift your spirit when you feel low, or make you feel understood without explanation. The right song can carry memories, 
                      spark energy, or wrap you in comfort when you need it most. Whether you’re seeking motivation, peace, or simple joy, let the rhythm guide your emotions and help you 
                      rediscover balance.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={mood_equalisers_small_02} alt='mood_equalisers_small_02' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Videos</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Sometimes all it takes is a short video to transform your state of mind. A burst of laughter from something lighthearted, the calm of watching 
                      soothing visuals, or even a story told through moving images can reset the tone of your entire day. Videos connect quickly; they grab your attention, stir emotions, 
                      and give your mind a momentary escape. What if just a few minutes of watching could help ease the heaviness inside and open the door to a brighter mood?</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={mood_equalisers_small_03} alt='mood_equalisers_small_03' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Meditation & Yoga</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>What if a single deep breath could change the course of your day? Meditation and yoga invite you to
                       pause, slow down, and reconnect with yourself in a world that rarely stops moving. These practices quiet the mental chatter, release tension from the body, and 
                       create space for peace. They don’t ask you to be perfect; only to show up for yourself, even for a few moments. With steady breath and gentle movement, you 
                       may find clarity, strength, and a renewed sense of calm within. </p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={mood_equalisers_small_04} alt='mood_equalisers_small_04' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Art</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Can colors, lines, and shapes speak louder than words? Art is an outlet where feelings flow freely, 
                      even the ones too heavy to put into sentences. Painting, sketching, or simply observing art can release stress, awaken creativity, and shift your emotional state. 
                      Each stroke or color tells a story your heart already knows but your lips may struggle to say. Whether you create or simply witness it, art offers a safe and 
                      meaningful space to process emotions and find beauty even in chaos. </p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={mood_equalisers_small_05} alt='mood_equalisers_small_05' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Story</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Have you ever lost yourself so completely in a story that the world around you faded away? Stories hold the power to comfort, 
                      inspire, and heal. They connect us to struggles and triumphs bigger than our own, while also reflecting the emotions we often struggle to name. A single tale can spark 
                      imagination, remind you of resilience, or bring the soothing comfort of knowing you’re not alone. Through words and characters, stories open doors to new ways of seeing 
                      life and sometimes, to new ways of seeing yourself. </p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-0 flex justify-center items-center'>
                        <Image src={mood_equalisers_small_06} alt='mood_equalisers_small_06' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Games</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>When was the last time you played simply for the joy of it? Games aren’t just distractions; they engage your mind, 
                      challenge your focus, and spark creativity. Whether solving puzzles, testing strategy, or diving into playful fun, games give your brain a refreshing break from 
                      routine. They remind us that joy doesn’t always have to be serious or planned, sometimes, it’s found in laughter, curiosity, and challenge. Playing can shift your perspective, energize your mood, and bring back the lightness we often forget in daily life. </p>
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