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

import packages_big_01 from "../assets/imagesource/packages_big_01.png";

import { Button, Checkbox, Label, Select, Textarea, TextInput } from 'flowbite-react';



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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Packages</h1>
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
                            <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px] font-semibold pb-4">Specialized Packages for Institutions, Workplaces & Care</h2>
                        </div>
                        <div className='w-full'>
                            <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Good Mood’s Expert Hub offers specialized mental health support programs designed to 
                                meet the unique needs of different groups:</p>
                        <ul className='pl-5'>
                            <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Educational Institutions – An interactive space where students and teachers learn about mental health, emotional resilience, and the importance of seeking help early. These camps break stigma, build empathy, and empower young minds to care for themselves and others. Join us soon.</li>
                            <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc" >Corporate Training – Expert-led sessions to improve workplace mental health, boost productivity, and foster a culture of empathy and balance.</li>
                            <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Employee Wellbeing – A dedicated program designed to reduce stress, prevent burnout, and create healthier work environments. By focusing on mental health, balance, and support, it helps employees thrive both personally and professionally. Join us soon.</li>
                            <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Old-Age Mental Care – Dedicated support for seniors, focusing on cognitive health, emotional wellbeing, and reducing feelings of isolation.</li>
                        </ul>
                        </div>
                    </div>
                  </div>
              </div>
              <div className='lg:w-5/12'>
                 <Image src={packages_big_01} alt='packages_big_01' className='' />
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
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] lg:leading-[48px]font-semibold pb-2 lg:pb-4">We’d Love to Hear From You</h2>
                <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Have a question, need support, or want to explore how we can work together? Fill out the form 
                    below and our team will get back to you as soon as possible. Whether it’s about partnerships, product assistance, or general inquiries, we’re here to help.</p>
              </div>
           </div>
           <div className="lg:w-full bg-[#ffffff] rounded-[10px] shadow-xl p-5 lg:p-10">
                <div className='my-5'>
                    <h3 className='text-[#0B8843] text-xl lg:text-[24px] leading-[26px] font-semibold pb-3'>Get In Touch</h3>
                    <p className='text-[#424242] text-sm lg:text-[14px] leading-[20px]'>We&lsquo;re here to help! If you have any questions or would like to discuss how our automation tools can enhance your product and streamline your operations, feel free to reach out.</p>
                </div>
                <div className='w-full'>
                    <div className='form_area'>
                        <div className='lg:flex gap-4 mb-3'>
                            <div className='w-full mb-2'>
                                <TextInput id="base" type="text" placeholder='First Name' sizing="md" />
                            </div>
                            <div className='w-full mb-2'>
                                <TextInput id="base" type="text" placeholder='Last Name' sizing="md" />
                            </div>
                        </div>
                        <div className='lg:flex gap-4 mb-3'>
                            <div className='w-full mb-2'>
                                <TextInput id="base" type="email" placeholder='Email Address' sizing="md" />
                            </div>
                            <div className='w-full mb-2'>
                                <TextInput id="base" type="text" placeholder="Phone Number" sizing="md" />
                            </div>
                        </div>
                        <div className='lg:flex gap-4 mb-3'>
                            <div className='w-full mb-2'>
                                <TextInput id="base" type="email" placeholder='Company / Organization' sizing="md" />
                            </div>
                            <div className='w-full mb-2'>
                                <Select required>
                                  <option>Package</option>
                                  <option>Package 1</option>
                                  <option>Package 2</option>
                                  <option>Package 3</option>
                                </Select>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <Textarea id="comment" placeholder="Your massage" required rows={6} />
                        </div>
                        <div className='mb-5'>
                            <div className="flex items-center gap-2">
                                <Checkbox className='checkmark' id="remember" />
                                <p className='text-[#7E7E7E] text-[12px]' htmlFor="remember">I agree to the privacy policy and terms of service.</p>
                            </div>
                        </div>
                        
                        <Button type="submit">Submit </Button>
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