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


import offer_01 from "../assets/imagesource/offer_01.png";
import offer_02 from "../assets/imagesource/offer_02.png";
import offer_03 from "../assets/imagesource/offer_03.png";



import Image from 'next/image';
import Link from 'next/link';

const OfferingSection = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:true,
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
                <div className=''>
                    <div className='border border-[#686868] bg-white'>
                        <div className='lg:w-full relative'>
                            <div className='flex items-center justify-center'>
                                <Image src={offer_01} alt='offer_01' className='mb-0' />
                            </div>
                            <div className='px-5 py-6'>
                                <h3 className='text-[22px] leading-[28px] text-[#000000] font-semibold pb-2 text-left'>Resume Builder</h3>
                                <p className='text-[#686868] text-sm lg:text-[14px] leading-[20px] lg:leading-[23px] font-medium pb-6 text-left'>
                                    Build a polished, professional resume effortlessly and get noticed by top recruiters.
                                </p>
                                <Link className="text-white text-center bg-[#800080] block font-medium text-xs lg:text-[16px] rounded-[0] px-5 py-2.5 lg:px-8 lg:py-3 hover:bg-black" href="https://resumebuilder.hiringeye.ai/" target='_blank' passHref>
                                   Start Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='px-4 pb-4'>
                <div className=''>
                    <div className='border border-[#686868] bg-white'>
                        <div className='lg:w-full relative'>
                            <div className='flex items-center justify-center'>
                                <Image src={offer_02} alt='offer_02' className='mb-0' />
                            </div>
                            <div className='px-5 py-6'>
                                <h3 className='text-[22px] leading-[28px] text-[#000000] font-semibold pb-2 text-left'>LinkedIn Content Generator</h3>
                                <p className='text-[#686868] text-sm lg:text-[14px] leading-[20px] lg:leading-[23px] font-medium pb-6 text-left'>
                                    Create engaging LinkedIn posts, comments, and updates with AI in seconds.
                                </p>
                                <Link className="text-white text-center bg-[#800080] block font-medium text-xs lg:text-[16px] rounded-[0] px-5 py-2.5 lg:px-8 lg:py-3 hover:bg-black" href="https://linkedinscraper.hiringeye.ai/" target='_blank' passHref>
                                   Start Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='px-4 pb-4'>
                <div className=''>
                    <div className='border border-[#686868] bg-white'>
                        <div className='lg:w-full relative'>
                            <div className='flex items-center justify-center'>
                                <Image src={offer_03} alt='offer_03' className='mb-0' />
                            </div>
                            <div className='px-5 py-6'>
                                <h3 className='text-[22px] leading-[28px] text-[#000000] font-semibold pb-2 text-left'>Video JD Maker</h3>
                                <p className='text-[#686868] text-sm lg:text-[14px] leading-[20px] lg:leading-[23px] font-medium pb-6 text-left'>
                                    Generate video job descriptions with key insights, expert tips, and engaging visuals.
                                </p>
                                <Link className="text-white text-center bg-[#800080] block font-medium text-xs lg:text-[16px] rounded-[0] px-5 py-2.5 lg:px-8 lg:py-3 hover:bg-black" href="#" passHref>
                                   Start Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Slider>
    </div>
  )
}

export default OfferingSection