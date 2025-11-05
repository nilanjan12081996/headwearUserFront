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

import mental_big_01 from "../assets/imagesource/mental_big_01.png";



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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Mental Health Experts</h1>
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
                 <Image src={mental_big_01} alt='mental_big_01' className='' />
              </div>
              <div className='lg:w-7/12 lg:pl-20'>
                  <div className="mt-10">
                    <div className='mb-0'>
                        <div className='w-full'>
                            <div className="mb-2 flex items-center">
                            <FaPlus className="text-[#FFA250] text-[20px] mr-1" />
                            <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Support </p>
                            </div>
                            <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-2 lg:pb-4">Guidance From Trusted Mental Health Experts</h2>
                        </div>
                        <div className='w-full'>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Where do you go when your mind feels heavy and your thoughts feel tangled? 
                              Mental health experts are trained to guide you through the confusion, offering care that is compassionate, confidential, and 
                              tailored to your needs. They listen without judgment, help you understand what you’re going through, and provide tools to cope better. 
                              Sometimes, all it takes is the right conversation with the right person to begin seeing hope again.</p>
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
                  <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Support </p>
                </div>
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold lg:pb-4">List of Mental Health Experts</h2>
              </div>
           </div>
           <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mental_small_01} alt='mental_small_01' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Psychiatrists</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>When emotions become overwhelming and daily life feels impossible, medical support 
                      may be needed. Psychiatrists specialize in diagnosing mental health conditions and prescribing medicines that restore balance to brain chemistry. 
                      Medication isn’t about “changing who you are”; it’s about helping you feel stable enough to heal and function again. With careful monitoring and guidance, 
                      psychiatrists work alongside you to make life manageable, one step at a time.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mental_small_02} alt='mental_small_02' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Marriage Counseling</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Every relationship has ups and downs, but sometimes the distance feels too wide to 
                      bridge alone. Marriage counselling creates a safe space for couples to talk openly, understand each other’s needs, and resolve conflicts with guidance. 
                      It isn’t about blame — it’s about rediscovering connection, respect, and partnership. With the right support, relationships can heal, grow stronger, and 
                      regain harmony.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mental_small_03} alt='mental_small_03' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Old age Counseling</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>What does it feel like to age with dignity and emotional strength? Old age brings 
                      wisdom but also challenges like loneliness, grief, or health concerns. Counselling for elders offers a compassionate space to share feelings, manage 
                      transitions, and find renewed purpose. With the right guidance, aging can be less about loss and more about rediscovering joy, connection, and meaning.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mental_small_04} alt='mental_small_04' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>General Counseling</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Do you ever wish you had a safe place to share your deepest thoughts without fear of 
                      being judged? Individual counselling offers exactly that — a private, supportive space where you can explore your emotions, challenges, and goals with a 
                      trained professional. Whether you’re dealing with stress, low mood, or simply seeking clarity, counselling helps you uncover insights and build healthier 
                      ways of coping. It’s your time, your story, and your journey toward healing.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mental_small_05} alt='mental_small_05' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Family Counseling</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Families are a source of love, but they can also become places of misunderstanding, 
                      conflict, or silence. Family counselling brings everyone together in a safe environment to talk, listen, and heal. It helps members understand each other’s 
                      perspectives, build healthier communication, and create balance in relationships. A stronger family bond can bring comfort, stability, and joy back into 
                      everyday life.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mental_small_06} alt='mental_small_06' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Child and Youth Counseling</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Growing up comes with unique challenges — from school stress and peer pressure to 
                      identity struggles and family conflicts. Children and adolescents often find it hard to express what they feel, and that’s where counselling helps. 
                      In a safe and gentle space, young people can share their worries, learn coping skills, and build confidence. Early support can shape resilience, 
                      ensuring they grow into emotionally healthy and balanced adults.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mental_small_07} alt='mental_small_07' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Workplace Counseling</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Does your job sometimes leave you feeling drained, stressed, or undervalued? Workplace 
                      counselling addresses these struggles by focusing on stress management, conflict resolution, and work-life balance. It provides employees with the tools 
                      to cope better and helps organizations build healthier, more supportive environments. A workplace where minds are cared for is one where both people and 
                      productivity thrive.</p>
                </div>
              </div>
              <div className='border border-[#DADADA] rounded-[10px] flex justify-center items-center'>
                <div className='py-12 text-center w-10/12'>
                    <div className='mb-6 flex justify-center items-center'>
                        <Image src={mental_small_08} alt='mental_small_08' className='' />
                    </div>
                    <h3 className='text-[#454545] text-[16px] leading-[28px] font-bold pb-2'>Career Counseling</h3>
                    <p className='text-[14px] leading-[20px] text-[#949494] font-medium'>Are you unsure about which path to take in studies or work? Education and career 
                      counselling helps clear the confusion by exploring your strengths, interests, and values. Whether you’re choosing subjects, planning higher studies, 
                      or switching careers, expert guidance can save you from stress and uncertainty. With the right direction, you can make choices that align with who you 
                      are and where you want to go.</p>
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