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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-semibold mb-2 lg:mb-4">Terms & Conditions</h1>
               </div>
           </div>
        </div>
        </div>
      </div>



      {/* Who We Are section start here */}
      <div className="py-10 lg:py-20">
        <div className='max-w-6xl mx-auto px-5 lg:px-0'>
            <div className="w-full lg:pb-8">
                <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-4">These Terms & Conditions (“Terms”) govern the use of the Website, 
                Mobile Application, and related digital services (collectively the “Platform”) operated by Good Mood Mental Health App.</p>
                <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-8">By accessing or using our Platform, you (“User”, “Client”, “You”, “Your”) agree 
                    to be bound by these Terms, our Privacy Policy, and any additional guidelines or policies made available on the Platform. If you do not agree, please 
                    discontinue use immediately.</p>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">1. Definitions</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">User / Client / You / Your: Any individual using or accessing our Services.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Professional / Therapist / Wellness Professional: Licensed or qualified individuals providing mental health or wellness services via the Platform.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Content: All materials, self-help tools, resources, assessments, and user-generated content.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Platform / Services: Our Website, Mobile Application, and related features including chat, video/audio sessions, assessments, and tools.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Privacy Policy: Our policy governing how we collect, use, store, and protect personal data.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">2. Eligibility</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">You must be at least 18 years of age to register.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">If you are under 18, you must use the Services under parental/guardian consent.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">You must be legally competent to enter into a contract under the Indian Contract Act, 1872.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">3. Nature of Services & Disclaimer</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">The Platform provides mental wellness, counselling, therapy, self-help tools, and assessments.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Services are not a substitute for medical diagnosis, emergency care, or hospitalization.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Effectiveness of services may vary by individual. No outcome is guaranteed.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Services are delivered by professionals as per their qualifications and licensing under the Mental Healthcare Act, 2017, Rehabilitation Council of India (RCI) norms, and if applicable, Telemedicine Practice Guidelines (2020).</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Attending sessions or using self-help resources does not qualify you as a certified professional.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">4. Accounts & User Responsibilities</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">You must provide accurate, complete, and updated information when creating an account.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">You are responsible for maintaining confidentiality of your login credentials.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">All activity under your account is deemed authorized by you.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Impersonation, fraudulent registration, or illegal activity is strictly prohibited.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">5. Use of Professionals & Consultations</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Professionals listed on the Platform are required to hold valid licenses/certifications.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Consultations may be conducted via video, audio, or text.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">A Professional may decline or cancel a session if the issue is outside their scope of practice, and you may be referred to offline/in-person care.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">6. User Content, Community & Feedback</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">You are solely responsible for the content you post (reviews, feedback, or community interactions).</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">You must not post offensive, illegal, defamatory, or harmful material.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">We may remove such content without notice.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Feedback may be used to improve services, but no obligation exists to act upon it.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">7. Privacy & Data Protection</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">We collect and process personal data in accordance with the Information Technology Act, 2000 (SPDI Rules) and the Digital Personal Data Protection Act, 2023 (DPDP Act).</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Counselling sessions are confidential, subject to exceptions required by law (e.g., risk of harm to self/others, court orders).</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Only minimal data required to provide services is collected.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Aggregated or anonymized data may be used for analytics and reporting.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">8. Payments, Subscriptions & Refunds</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">All paid services will display fees clearly before purchase. Prices are inclusive of applicable Goods & Services Tax (GST) unless otherwise stated.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Payments can be made via approved payment gateways in compliance with RBI guidelines.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Subscription renewals will be billed as per the plan selected.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Refund Policy:
                            <ul className='pl-5 pt-2'>
                                <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc font-semibold">1.User Cancellation:
                                    <ul className='pl-5 pt-2'>
                                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc font-normal">Cancellation at least 24 hours prior to a session: half refund or free reschedule.</li>
                                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc font-normal">Cancellation within 24 hours: no refund.</li>
                                    </ul>
                                </li>
                                <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc font-semibold">2.Professional/Platform Cancellation:
                                    <ul className='pl-5 pt-2'>
                                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc font-normal">If a session is cancelled by the Professional/Platform, you may choose a full refund or reschedule.</li>
                                    </ul>
                                </li>
                                <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc font-semibold">3.Subscriptions:
                                    <ul className='pl-5 pt-2'>
                                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc font-normal">Once a subscription is activated and partially used, it is non-refundable, except where required under the Consumer Protection Act, 2019.</li>
                                    </ul>
                                </li>
                                <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc font-semibold">4.Refunds (if approved) will be processed to the original payment method within 7–10 business days.</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">9. Intellectual Property</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">All Platform content, software, and resources are owned/licensed by us.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">You may not copy, distribute, or commercially exploit any part without written consent.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">By posting content, you grant us a limited license to use it for service improvement.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">10. Limitations of Liability</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Services are provided “as is” and “as available”.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">We do not warrant uninterrupted, error-free service.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">We are not liable for indirect, incidental, or consequential damages.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Your sole remedy for dissatisfaction is discontinuing use of the Services.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">11. Termination / Suspension</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">We may suspend or terminate accounts for violations of these Terms, fraudulent activity, or misuse.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Certain clauses (confidentiality, indemnity, IP rights, limitation of liability) will survive termination.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">12. Indemnification</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">You agree to indemnify and hold harmless the Company, its affiliates, and its Professionals from any claims, damages, or expenses arising from your breach of these Terms or misuse of the Services.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">13. Governing Law & Dispute Resolution</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">These Terms shall be governed by and construed in accordance with the laws of India.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">All disputes shall be subject to the exclusive jurisdiction of the courts at Barasat, North 24 Parganas, West Bengal, India.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Disputes may first be attempted to be resolved amicably via mediation before court proceedings.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">14. Technical Issues & Force Majeure</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">While we strive for uninterrupted access, downtime or technical issues may occur.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">We are not liable for service delays or failures caused by events beyond our control, including natural disasters, network failures, government restrictions, or pandemics.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">15. Communication & Notifications</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">By using the Platform, you consent to receive transactional messages via email, SMS, or in-app notifications regarding your sessions, payments, or updates.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">You may opt out of non-essential promotional communications at any time.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">16. Third-Party Links & Services</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Our Platform may include links to third-party websites or services.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">We are not responsible for the content, accuracy, or data handling practices of such third parties.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">17. Changes to Terms</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">We reserve the right to modify these Terms. Updates will be posted on this page with a “Last Updated” date.</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Continued use of the Platform after changes constitutes acceptance of the revised Terms.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">18. Severability</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">If any provision of these Terms is held invalid, the remaining provisions shall remain in full effect.</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">19. Contact Information</h3>
                    <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2">For queries, suggestions, or disputes:</p>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Email: gourangoaich@gmail.com</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Phone: +91-9062462268</li>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">Kolkata - 700129</li>
                    </ul>
                </div>

                <div className='mb-4'>
                    <h3 className="text-[#031E2D] text-xl lg:text-[24px] leading-[32px] font-medium pb-2">20. Acceptance of Terms</h3>
                    <ul className='pl-5'>
                        <li className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-2 list-disc">By using our Platform, you acknowledge that you have read, understood, and agreed to these Terms & Conditions and our Privacy Policy.</li>
                    </ul>
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