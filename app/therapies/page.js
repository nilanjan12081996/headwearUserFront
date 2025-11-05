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

import therapies_box_01 from "../assets/imagesource/therapies_box_01.png";
import therapies_box_02 from "../assets/imagesource/therapies_box_02.png";
import therapies_box_03 from "../assets/imagesource/therapies_box_03.png";
import therapies_box_04 from "../assets/imagesource/therapies_box_04.png";
import therapies_box_05 from "../assets/imagesource/therapies_box_05.png";
import team_06 from "../assets/imagesource/team_06.png";

import therapies_top from "../assets/imagesource/therapies_top.png";



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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Therapies</h1>
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
                            <FaPlus className="text-[#FFA250] text-[20px] mr-1" />
                            <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Support </p>
                            </div>
                            <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-4">Guidance From Trusted Mental Health Experts</h2>
                        </div>
                        <div className='w-full'>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Good Mood’s Expert Hub connects you with qualified professionals who can help you 
                                better understand and manage your mental health. From licensed therapists and counselors to experienced psychiatrists, our experts provide 
                                personalized consultations, evidence-based treatment plans, and ongoing guidance. Whether you’re taking your first step toward care or seeking 
                                specialized support, professional help is always within reach.</p>
                        </div>
                    </div>
                  </div>
              </div>
              <div className='lg:w-5/12'>
                 <Image src={therapies_top} alt='therapies_top' className='' />
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
                  <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Support </p>
                </div>
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold lg:pb-4">List of Therapies</h2>
              </div>
           </div>
           <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={therapies_box_01} alt='therapies_box_01' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Meditation Therapy</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Have you ever wished you could quiet the endless noise in your head? Meditation 
                      therapy helps you slow down, breathe deeply, and gently untangle your thoughts. By practicing awareness and stillness, you learn to let go of stress, 
                      reduce anxiety, and reconnect with yourself. It isn’t about emptying the mind, it’s about creating space for calm, clarity, and balance. Over time, 
                      meditation becomes more than a practice; it becomes a way of living with greater peace.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={therapies_box_02} alt='therapies_box_02' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Yoga Therapy</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>What if gentle movement and steady breath could heal both body and mind? Yoga 
                      therapy blends postures, breathing, and relaxation techniques to release tension, improve flexibility, and restore inner balance. It goes beyond 
                      exercise, it’s about building strength, awareness, and resilience. Whether you seek relief from stress, physical pain, or emotional heaviness, yoga 
                      therapy offers a holistic path to healing, guiding you toward harmony inside and out.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={therapies_box_03} alt='therapies_box_03' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Dance & Movement</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Can movement express what words cannot? Dance and movement therapy uses the body 
                      as a tool to release emotions, reduce stress, and build confidence. You don’t have to be a trained dancer, every gesture, big or small, is a form of 
                      expression. Through rhythm and motion, hidden feelings find a safe way out, leading to healing and self-discovery. Movement reconnects you with joy, 
                      freedom, and the natural rhythm of life.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={therapies_box_04} alt='therapies_box_04' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Music Therapy</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Have you felt the way a melody can instantly shift your mood? Music therapy uses sound, 
                      rhythm, and song to support emotional and mental well-being. Whether by listening, singing, or playing, music helps reduce stress, ease anxiety, 
                      and bring comfort in difficult times. It taps into memories, emotions, and connections that words often fail to reach. In moments when life feels 
                      heavy, music therapy can be the language that heals.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center expert_box'>
                <div className='py-12 text-center w-8/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={therapies_box_05} alt='therapies_box_05' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Art Therapy</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>What if a splash of color or a simple sketch could say what your heart is holding inside? 
                      Art therapy turns creativity into healing, allowing you to process emotions through painting, drawing, or crafting. It’s not about creating “perfect” art, it’s 
                      about expressing what words sometimes can’t. By translating feelings into shapes and colors, art therapy helps release pain, spark insight, and open doors to 
                      self-understanding. The canvas becomes a safe space to heal and grow.</p>
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