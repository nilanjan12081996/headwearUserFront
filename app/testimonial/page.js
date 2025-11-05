'use client';

import React from 'react'

import Slider from "react-slick";


import quote_icon from "../assets/imagesource/quote_icon.png";
import rating_icon from "../assets/imagesource/rating_icon.png";

import testi_pic from "../assets/imagesource/testi_pic.png";
import comma_img from "../assets/imagesource/comma_img.png";

import testi_face1 from "../assets/imagesource/rajkumari_basu_01.png";
import testi_face2 from "../assets/imagesource/kathakali_chakraborty_02.png";
import testi_face3 from "../assets/imagesource/sumana_das_03.png";
import testi_face4 from "../assets/imagesource/abhinandan_dasgupta_04.png";
import testi_face5 from "../assets/imagesource/shivanki_jain_05.png";
import testi_face6 from "../assets/imagesource/swapna_bhattacharyya_06.png";
import testi_face7 from "../assets/imagesource/rajat_baran_08.png";
import testi_face8 from "../assets/imagesource/wasim_raja_10.png";



import Image from 'next/image';

const Testimonial = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
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

            <div className='px-4 pb-4'>
                <div className='text-center'>
                    <div className='lg:flex'>
                        <div className='lg:w-full p-5 lg:p-8 relative'>
                            <div className='flex items-center justify-center'>
                                <Image src={rating_icon} alt='rating_icon' className='mb-8' />
                            </div>
                            <p className='text-[#ffffff] text-sm lg:text-[28px] leading-[20px] lg:leading-[45px] font-semibold pb-10'>This platform completely transformed how I create resumes and LinkedIn content. The AI suggestions are spot-on, and the community tips are incredibly helpful&#34;</p>
                            <div className=''>
                                <p className='text-[20px] leading-[45px] text-[#ffffff] font-medium mb-1'>Ananya R </p>
                                <p className='text-[14px] leading-[16px] text-[#A1A1A1] font-normal mb-1'>Marketing Professional</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-4 pb-4'>
                <div className='text-center'>
                    <div className='lg:flex'>
                        <div className='lg:w-full p-5 lg:p-8 relative'>
                            <div className='flex items-center justify-center'>
                                <Image src={rating_icon} alt='rating_icon' className='mb-8' />
                            </div>
                            <p className='text-[#ffffff] text-sm lg:text-[28px] leading-[20px] lg:leading-[45px] font-semibold pb-10'>This platform completely transformed how I create resumes and LinkedIn content. The AI suggestions are spot-on, and the community tips are incredibly helpful&#34;</p>
                            <div className=''>
                                <p className='text-[20px] leading-[45px] text-[#ffffff] font-medium mb-1'>Ananya R R</p>
                                <p className='text-[14px] leading-[16px] text-[#A1A1A1] font-normal mb-1'>Marketing Professional</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-4 pb-4'>
                <div className='text-center'>
                    <div className='lg:flex'>
                        <div className='lg:w-full p-5 lg:p-8 relative'>
                            <div className='flex items-center justify-center'>
                                <Image src={rating_icon} alt='rating_icon' className='mb-8' />
                            </div>
                            <p className='text-[#ffffff] text-sm lg:text-[28px] leading-[20px] lg:leading-[45px] font-semibold pb-10'>This platform completely transformed how I create resumes and LinkedIn content. The AI suggestions are spot-on, and the community tips are incredibly helpful&#34;</p>
                            <div className=''>
                                <p className='text-[20px] leading-[45px] text-[#ffffff] font-medium mb-1'>Ananya R R R</p>
                                <p className='text-[14px] leading-[16px] text-[#A1A1A1] font-normal mb-1'>Marketing Professional</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Slider>
    </div>
  )
}

export default Testimonial