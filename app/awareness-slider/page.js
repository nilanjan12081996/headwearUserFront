'use client';

import React from 'react'

import Slider from "react-slick";

import awareness_slide_01 from "../assets/imagesource/awareness_slide_01.png";
import awareness_slide_02 from "../assets/imagesource/awareness_slide_02.png";
import awareness_slide_03 from "../assets/imagesource/awareness_slide_03.png";
import awareness_slide_04 from "../assets/imagesource/awareness_slide_04.png";
import quote_icon from "../assets/imagesource/quote_icon.png";
import rating_icon from "../assets/imagesource/rating_icon.png";

import testi_pic from "../assets/imagesource/testi_pic.png";
import comma_img from "../assets/imagesource/comma_img.png";

import { IoIosArrowForward } from "react-icons/io";


import Image from 'next/image';
import Link from 'next/link';

const AwarenessSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows:false,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
  };
  return (
    <div>
        <Slider {...settings}>
                <div className='px-2'>
                    <div className='awareness_wrap_box'>
                        <Image src={awareness_slide_01} alt='awareness_slide_01' className='w-full' />
                        <div className='awareness_wrap_box_cont'>
                            <div className='text-left px-6 pt-32'>
                                <h3 className='text-[20px] leading-[24px] text-[#ffffff] font-bold pb-2'>Mood Meters</h3>
                                <p className='text-[14px] leading-[22px] text-[#ffffff] font-normal pb-4'>Understanding your emotions is the first step toward managing them. Our Mood Meters allow you to track how you’re 
                                    feeling throughout the day, whether calm, anxious, energized, or low.</p>
                                <Link className='text-[16px] leading-[24px] text-[#ffffff] hover:text-black font-medium inline-flex items-center gap-1' href="/mood-meters" passHref>Learn More <IoIosArrowForward /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-2'>
                 <div className='awareness_wrap_box'>
                    <Image src={awareness_slide_02} alt='awareness_slide_02' className='w-full' />
                    <div className='awareness_wrap_box_cont'>
                        <div className='text-left px-6 pt-32'>
                            <h3 className='text-[20px] leading-[24px] text-[#ffffff] font-bold pb-2'>Mood Masters</h3>
                            <p className='text-[14px] leading-[22px] text-[#ffffff] font-normal pb-4'>Mood Masters is your guide to building a stronger, healthier mind. 
                                From understanding your mental health and boosting positivity to overcoming procrastination, managing emotions, and nurturing</p>
                            <Link className='text-[16px] leading-[24px] text-[#ffffff] hover:text-black font-medium inline-flex items-center gap-1' href="/mood-masters" passHref>Learn More <IoIosArrowForward /></Link>
                        </div>
                    </div>
                 </div>
                </div>
                <div className='px-2'>
                 <div className='awareness_wrap_box'>
                    <Image src={awareness_slide_03} alt='awareness_slide_03' className='w-full' />
                    <div className='awareness_wrap_box_cont'>
                        <div className='text-left px-6 pt-32'>
                            <h3 className='text-[20px] leading-[24px] text-[#ffffff] font-bold pb-2'>Moodz Matter</h3>
                            <p className='text-[14px] leading-[22px] text-[#ffffff] font-normal pb-4'>Moodz Matter is your space to explore how emotions shape different parts of life 
                                — from student stress and workplace pressure to relationships, identity, aging, and special education.</p>
                            <Link className='text-[16px] leading-[24px] text-[#ffffff] hover:text-black font-medium inline-flex items-center gap-1' href="/moodz-matter" passHref>Learn More <IoIosArrowForward /></Link>
                        </div>
                    </div>
                 </div>
                </div>
                <div className='px-2'>
                 <div className='awareness_wrap_box'>
                    <Image src={awareness_slide_04} alt='awareness_slide_04' className='w-full' />
                    <div className='awareness_wrap_box_cont'>
                        <div className='text-left px-6 pt-32'>
                            <h3 className='text-[20px] leading-[24px] text-[#ffffff] font-bold pb-2'>Mood Equalizers</h3>
                            <p className='text-[14px] leading-[22px] text-[#ffffff] font-normal pb-4'>Finally, your calming corner when emotions feel heavy or unsteady. Here, 
                                you’ll find gentle practices, simple tools, resources and small steps that can bring balance to your day...</p>
                            <Link className='text-[16px] leading-[24px] text-[#ffffff] hover:text-black font-medium inline-flex items-center gap-1' href="/mood-equalisers" passHref>Learn More <IoIosArrowForward /></Link>
                        </div>
                    </div>
                 </div>
                </div>
        </Slider>
    </div>
  )
}

export default AwarenessSlider