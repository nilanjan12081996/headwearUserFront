import Link from 'next/link'
import React from 'react'


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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">About <span>Us</span></h1>
               </div>
           </div>
        </div>
        </div>
      </div>



      {/* Who We Are section start here */}
      <div className="py-10 lg:py-20">
        <div className='max-w-6xl mx-auto px-5 lg:px-0'>
           <div className='lg:flex gap-5'>
              <div className='lg:w-7/12 lg:pr-28'>
                <div className="lg:mb-4 flex items-center">
                  <FaPlus className="text-[#FFA250] text-base lg:text-[20px] mr-1" />
                  <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">About Us </p>
                </div>
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] leading-[48px] font-semibold lg:pb-4">Who We Are</h2>
                <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Good Mood is India’s first dedicated mental health awareness and support Mobile App. 
                  We exist to break the stigma surrounding mental health, spread awareness, and provide care that is safe, affordable, and accessible. 
                  Our goal is to ensure that every individual, workplace, and community in India has the resources they need to nurture emotional well-being and live healthier lives.</p>
              </div>
              <div className='lg:w-5/12'>
                 <Image src={about_01} alt='about_01' className='' />
              </div>
           </div>
        </div>
      </div>
      {/* Who We Are section ends here */}

      {/* Who We Are section start here */}
      <div className="pb-10 lg:pb-20 pt-10">
        <div className='max-w-6xl mx-auto px-5 lg:px-0'>
           <div className='lg:flex gap-5'>
              <div className='lg:w-5/12'>
                 <Image src={about_02} alt='about_02' className='' />
              </div>
              <div className='lg:w-7/12 lg:pl-10'>
                  <div className="mt-10">
                    <div className="w-full lg:pb-8">
                      <div className="w-[64px] h-[64px] bg-[#FFF4E6] rounded-full mb-3 flex justify-center items-center">
                          <Image src={stethy} alt='stethy' className='' />
                      </div>
                      <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">Our Mission</h3>
                      <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">We aim to make mental health awareness and support easily accessible, stigma-free, 
                        and empowering for everyone in India, across all walks of life. We consider psychological counselling to be an accessible service to all. 
                        Good Mood does just that in this initiative.</p>
                    </div>
                    <div className="w-full lg:text-right">
                      <div className='flex items-end lg:justify-end'>
                         <div className="w-[64px] h-[64px] bg-[#FFF4E6] rounded-full mb-3 flex justify-center items-center">
                          <Image src={home} alt='home' className='' />
                        </div>
                      </div>
                      <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">Our Vision</h3>
                      <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">The very vision of Good Mood is constructing a society where mental well-being is prioritized 
                        just like physical health, where seeking support is seen as strength, and every person has the opportunity to thrive at every stage of life. 
                        They say, good health comes with both psychological and physical health.</p>
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
           <div className='lg:flex gap-5 mb-8'>
              <div className='lg:w-5/12 lg:pr-28'>
                <div className="mb-2   flex items-center">
                  <FaPlus className="text-[#FFA250] text-base lg:text-[20px] mr-1" />
                  <p className="text-[#FFA250] text-sm lg:text-[16px] leading-[22px] font-bold uppercase">Our Team </p>
                </div>
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] leading-[48px] font-semibold lg:pb-4">Meet Our Team</h2>
              </div>
              <div className='lg:w-7/12'>
                <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">We’re a group of passionate individuals—designers, strategists, and builders—united by a 
                  shared vision and a drive to create purposeful, human-centered experiences. Each of us brings a unique voice to the table, and together, we make it all happen.</p>
              </div>
           </div>
           <div className='team_wrap'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                 <div className='team_wrap_box'>
                    <Image src={team_01} alt='team_01' className='w-full' />
                    <div className='team_wrap_box_cont'>
                      <div className='text-center'>
                        <h3 className='text-[24px] leading-[24px] text-[#ffffff] font-bold pb-2'>Dr. Suddhendu Chakraborty </h3>
                        <p className='text-[18px] leading-[18px] text-[#ffffff] font-normal pb-6'>Chief Mentor</p>
                        <p className='text-[14px] leading-[20px] text-[#ffffff] font-normal px-4'>A renowned psychiatrist, psychotherapist, and mental health activist, 
                          Dr. Chakraborty blends clinical expertise with a deep commitment to social change. As a mentor and columnist, he inspires transformation through 
                          knowledge, compassion, and care.</p>
                      </div>
                    </div>
                 </div>
                 <div className='team_wrap_box'>
                    <Image src={team_02} alt='team_02' className='w-full' />
                    <div className='team_wrap_box_cont'>
                      <div className='text-center'>
                        <h3 className='text-[24px] leading-[24px] text-[#ffffff] font-bold pb-2'>Dr. Paramita Bhattacharyya</h3>
                        <p className='text-[18px] leading-[18px] text-[#ffffff] font-normal pb-6'>Chief Advisor</p>
                        <p className='text-[14px] leading-[20px] text-[#ffffff] font-normal px-4'>Faculty & Mental Health Professional, working on Positive Psychology 
                          in happiness and well-being. With a compassionate approach to mental health, Dr. Bhattacharyya combines her expertise in counselling, positive 
                          psychotherapy and community work to empower underserved populations, fostering resilience and positive mental health in challenging environments.</p>
                      </div>
                    </div>
                 </div>
                 <div className='team_wrap_box'>
                    <Image src={team_03} alt='team_03' className='w-full' />
                    <div className='team_wrap_box_cont'>
                      <div className='text-center'>
                        <h3 className='text-[24px] leading-[24px] text-[#ffffff] font-bold pb-2'>Dr. Ivan Das</h3>
                        <p className='text-[18px] leading-[18px] text-[#ffffff] font-normal pb-6'>Support Coordinator</p>
                        <p className='text-[14px] leading-[20px] text-[#ffffff] font-normal px-4'>A researcher, lecturer, and data-driven psychologist, Dr. Das focuses on love, 
                          intimacy, sexuality, and corporate well-being. His expertise helps individuals and organizations thrive under stress while nurturing healthier 
                          relationships and workplaces.</p>
                      </div>
                    </div>
                 </div>
                 <div className='team_wrap_box'>
                    <Image src={team_04} alt='team_04' className='w-full' />
                    <div className='team_wrap_box_cont'>
                      <div className='text-center'>
                        <h3 className='text-[24px] leading-[24px] text-[#ffffff] font-bold pb-2'>Dr. Gourango Aich</h3>
                        <p className='text-[18px] leading-[18px] text-[#ffffff] font-normal pb-6'>Facilitator</p>
                        <p className='text-[14px] leading-[20px] text-[#ffffff] font-normal px-4'>The visionary behind “GooD MooD”, Dr. Aich is dedicated to bridging the 
                          gap between people and mental health care. With a mission to spread awareness across all levels of society, he brings passion, empathy, 
                          and purpose to everything we do.</p>
                      </div>
                    </div>
                 </div>
                 <div className='team_wrap_box'>
                    <Image src={team_05} alt='team_05' className='w-full' />
                    <div className='team_wrap_box_cont'>
                      <div className='text-center'>
                        <h3 className='text-[24px] leading-[24px] text-[#ffffff] font-bold pb-2'>Mr. Suvendu Das</h3>
                        <p className='text-[18px] leading-[18px] text-[#ffffff] font-normal pb-6'>Technology Expert</p>
                        <p className='text-[14px] leading-[20px] text-[#ffffff] font-normal px-4'>Our digital wizard, Suvendu ensures that all programs run 
                          seamlessly online. His technical acumen and creativity drive the innovative backbone of our initiatives.</p>
                      </div>
                    </div>
                 </div>
                 <div className='team_wrap_box'>
                    <Image src={team_06} alt='team_06' className='w-full' />
                    <div className='team_wrap_box_cont'>
                      <div className='text-center'>
                        <h3 className='text-[24px] leading-[24px] text-[#ffffff] font-bold pb-2'>Afreen Zaman</h3>
                        <p className='text-[18px] leading-[18px] text-[#ffffff] font-normal pb-6'>Media & Communications Lead</p>
                        <p className='text-[14px] leading-[20px] text-[#ffffff] font-normal px-4'>With over 12 years of experience in Communications and Media across corporates, 
                          nonprofits, and MNCs, Afreen brings both expertise and empathy to her role. As the storyteller of our team, she shapes narratives that amplify 
                          our mission and ensure our vision reaches diverse audiences with clarity and impact. Currently pursuing her studies in psychology, Afreen combines 
                          her professional skills with a deep commitment to mental health awareness and advocacy.</p>
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