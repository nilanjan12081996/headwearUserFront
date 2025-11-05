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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Refund & Cancellation Policy</h1>
               </div>
           </div>
        </div>
        </div>
      </div>



      {/* Who We Are section start here */}
      <div className="py-10 lg:py-20">
        <div className='max-w-6xl mx-auto px-5 lg:px-0'>
           <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-4">This Refund & Cancellation Policy (“Policy”) applies to all paid services, 
            subscriptions, and sessions booked through the Website and Mobile Application (collectively, the “Platform”) operated Good Mood Mental Health App.</p>
          <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-4">By purchasing or booking services on our Platform, you agree to the terms of 
            this Policy, in addition to our <strong>Terms & Conditions</strong> and <strong>Privacy Policy</strong>.</p>

          <div className='mb-4'>
              <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">1. General Principles</h3>
              <ul className='pl-5'>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Fees for services will be displayed transparently before purchase.</li>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Payments are processed through secure gateways in compliance with <strong>RBI guidelines</strong>.</li>
              </ul>
          </div>

          <div className='mb-4'>
              <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">2. User Cancellations</h3>
              <ul className='pl-5'>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">1.Counselling / Therapy Sessions
                    <ul className='mt-2'>
                       <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 font-semibold">Cancellation made at least <strong>24 hours before</strong> the scheduled session:
                         <ul className='mt-2'>
                            <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 font-normal">Option of <strong>half refund</strong> or <stroong>free reschedule</stroong>.</li>
                         </ul>
                       </li>
                       <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 font-semibold">Cancellation made <strong>less than 24 hours</strong> before the session:
                         <ul className='mt-2'>
                            <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 font-normal"><strong>No refund</strong> will be issued. Reschedule may be provided at the discretion of the Professional/Platform.</li>
                         </ul>
                       </li>
                    </ul>
                  </li>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">2.Subscription Plans
                    <ul className='mt-2'>
                       <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2">Subscription fees for <srtong>used or partially used plans</srtong> are <strong>non-refundable</strong>.</li>
                       <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2">If you cancel a subscription before it is activated or used, you may request a <strong>full refund</strong>.</li>
                       <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2">Refunds for subscription cancellations are subject to provisions of the <strong>Consumer Protection Act, 2019.</strong></li>
                    </ul>
                  </li>
              </ul>
          </div>

          <div className='mb-4'>
              <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">3. Professional / Platform Cancellations</h3>
              <ul className='pl-5'>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">If a session is cancelled by the Professional or Platform due to unforeseen reasons (such as unavailability, technical issues, or emergencies):
                    <ul className='mt-2'>
                       <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2">You will have the option to receive a <strong>full refund</strong> or <strong>reschedule</strong> at no extra cost.</li>
                    </ul>
                  </li>
              </ul>
          </div>

          <div className='mb-4'>
              <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">4. Refund Processing</h3>
              <ul className='pl-5'>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Approved refunds will be processed to the <strong>original payment method</strong> only.</li>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Refund timelines: <strong>7–10 business days</strong> from the date of approval.</li>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Delays may occur due to payment gateway or banking procedures, for which the Platform shall not be held liable.</li>
              </ul>
          </div>

          <div className='mb-4'>
              <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">5. Non-Refundable Services</h3>
              <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2">The following are strictly <strong>non-refundable</strong> once purchased:</p>
              <ul className='pl-5'>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Digital self-help resources, downloadable materials, or assessments.</li>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Subscription plans already availed in part or full.</li>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Promotional offers, discounts, or bundled packages.</li>
              </ul>
          </div>

          <div className='mb-4'>
              <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">6. Technical Issues</h3>
              <ul className='pl-5'>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">If you experience technical difficulties preventing you from attending a scheduled session, please contact <strong>gourangoaich@gmail.com</strong> immediately.</li>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">The Platform will review such cases on a <strong>case-by-case basis</strong>, and may provide reschedule or refund at its sole discretion.</li>
              </ul>
          </div>

          <div className='mb-4'>
              <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">7. Force Majeure</h3>
              <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2">Refunds will not be applicable in cases where services are disrupted due to circumstances beyond our control, including but not limited to:</p>
              <ul className='pl-5'>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Natural disasters, strikes, lockdowns, or government restrictions.</li>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Internet or power outages at the user’s end.</li>
              </ul>
          </div>

          <div className='mb-4'>
              <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">8. How to Request a Refund or Cancellation</h3>
              <ul className='pl-5'>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Please email <strong>gourangoaich@gmail.com</strong> with the subject line: Refund/Cancellation Request.</li>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Include details such as:
                    <ul>
                       <li>Name of the registered user</li>
                       <li>Payment reference number / transaction ID</li>
                       <li>Service or subscription purchased</li>
                       <li>Reason for cancellation or refund request</li>
                    </ul>
                  </li>
              </ul>
              <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pt-2">-Our team will review your request and respond within <strong>7-10 business days.</strong></p>
          </div>

          <div className='mb-4'>
              <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">9. Governing Law & Dispute Resolution</h3>
              <ul className='pl-5'>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">This Policy shall be governed by and construed in accordance with the <strong>laws of India.</strong></li>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Any disputes shall be subject to the exclusive jurisdiction of the courts at Barasat, <strong>North 24 Parganas, West Bengal, India.</strong></li>
              </ul>
          </div>

          <div className='mb-4'>
              <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">10. Contact Us</h3>
              <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2">For questions or assistance regarding this Policy:</p>
              <ul className='pl-5'>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc"><strong>Email:</strong> gourangoaich@gmail.com</li>
                  <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc"><strong>Phone:</strong> +91-9062462268</li>
              </ul>
          </div>

          <div className='mb-4'>
              <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] font-semibold pb-2">By using our Platform, you acknowledge that you have read, understood, and agreed to these Refund & Cancellation Policy.</p>
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