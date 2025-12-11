'use client';
import Image from "next/image"
import { CgFileDocument } from "react-icons/cg"
import small_cap from "../assets/imagesource/small_cap.png";
const OrderSummary=()=>{
    return(
        <>
         <div className='lg:w-4/12 border border-[#E6E6E6] rounded-[10px] p-4'>
              <h3 className='text-[22px] font-semibold text-[#1A1A1A] pb-4'>Order Summery</h3>

              <div>

                <div className='mb-4 flex items-center gap-2'>
                  <div className='w-10/12 flex items-center gap-1'>
                    <div className='w-3/12'>
                      <Image src={small_cap} alt='small_cap' className='' />
                    </div>
                    <div className='w-9/12'>
                      <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>Wooly Combed Black x48</p>
                      <div className='flex items-center gap-4'>
                        <p className='text-[12px] text-[#1A1A1A]'>Size: S</p>
                        <p className='text-[12px] text-[#1A1A1A]'>Color: Black</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-2/12'>
                    <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>$70.00</p>
                  </div>
                </div>

                <div className='mb-4 flex items-center gap-2'>
                  <div className='w-10/12 flex items-center gap-1'>
                    <div className='w-3/12'>
                      <Image src={small_cap} alt='small_cap' className='' />
                    </div>
                    <div className='w-9/12'>
                      <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>Wooly Combed Black x48</p>
                      <div className='flex items-center gap-4'>
                        <p className='text-[12px] text-[#1A1A1A]'>Size: S</p>
                        <p className='text-[12px] text-[#1A1A1A]'>Color: Black</p>
                      </div>
                    </div>
                  </div>
                  <div className='w-2/12'>
                    <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>$70.00</p>
                  </div>
                </div>

                <div className='mb-4 flex items-center gap-2'>
                  <div className='w-10/12 flex items-center gap-1'>
                    <div className='w-3/12 flex justify-center items-center'>
                      <CgFileDocument className='text-[#ed1c24] text-3xl' />
                    </div>
                    <div className='w-9/12'>
                      <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>Artwork Setup/Digitizing x96</p>
                    </div>
                  </div>
                  <div className='w-2/12'>
                    <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>$120.00</p>
                  </div>
                </div>

              </div>

              <div>
                <div className='flex items-center justify-between border-b border-[#e9e9e9] py-2 mb-2'>
                  <p className='text-[14px] text-[#1A1A1A] pb-1 font-normal'>Subtotal:</p>
                  <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>$260.00</p>
                </div>
                <div className='flex items-center justify-between border-b border-[#e9e9e9] py-2 mb-2'>
                  <p className='text-[14px] text-[#1A1A1A] pb-1 font-normal'>Subtotal:</p>
                  <p className='text-[14px] text-[#1A1A1A] pb-1 font-medium'>$260.00</p>
                </div>
                <div className='flex items-center justify-between py-2 mb-2'>
                  <p className='text-[18px] text-[#1A1A1A] pb-1 font-normal'>Total:</p>
                  <p className='text-[18px] text-[#1A1A1A] pb-1 font-bold'>$260.00</p>
                </div>
              </div>

              <button className='bg-[#ED1C24] hover:bg-black text-white text-base rounded-full w-full py-3 cursor-pointer'>
                Get Quote
              </button>


            </div>
        </>
    )
}
export default OrderSummary