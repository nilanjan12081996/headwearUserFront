'use client';

import React, { useState } from 'react';
import { IoIosColorPalette } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdTrophy } from "react-icons/io";
import CartBottom from '../ui/CartBottom';

const CartProgressBar = ({
    progressPercent,
    totalCartItems,
    grandTotal
}) => {
    const [openCart, setOpenCart] = useState(false);
    return (
        <>
            <CartBottom
                open={openCart}
                onClose={() => setOpenCart(false)}
            />
            <div className='fixed bottom-0 w-full z-15'>
                <div className='grid grid-cols-3 gap-0 bg-[#9f9f9f] relative'>
                    <div
                        className='absolute top-0 left-0 h-full bg-[#ff7379] z-0'
                        style={{ width: `${progressPercent}%`, transition: 'width 0.3s' }}
                    />
                    <div className='py-2 flex justify-center items-center border-r-2 z-20 border-[#000000] item_area relative'>
                        <div className='flex items-center gap-2 relative '>
                            <div>
                                <IoIosColorPalette className='text-white text-2xl md:text-2xl lg:text-5xl' />
                            </div>
                            <div className='text-base text-[10px] sm:text-sm md:text-base lg:text-lg font-medium'>
                                <p className='text-white'>12+ Items</p>
                                <p className='text-white'>Free Artwork Setup</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center border-r-2 z-20 border-[#000000]'>
                        <div className='flex items-center gap-2 relative '>
                            <div>
                                <TbTruckDelivery className='text-white text-2xl  md:text-2xl lg:text-5xl' />
                            </div>
                            <div className='text-base text-[10px] sm:text-sm md:text-base lg:text-lg font-medium'>
                                <p className='text-white'>24+ Items</p>
                                <p className='text-white'>Free Shipping</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='flex items-center gap-2 relative z-20'>
                            <div>
                                <IoMdTrophy className='text-white text-2xl  md:text-3xl lg:text-5xl' />
                            </div>
                            <div className='text-base text-[10px] sm:text-sm md:text-base lg:text-lg font-medium'>
                                <p className='text-white'>48+ Items</p>
                                <p className='text-white'>Free Premium Setup</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='bg-[#ed1c24] py-2 text-center cursor-pointer'
                    onClick={() => setOpenCart(true)}
                >
                    <p className='text-xl text-white font-bold pb-0'>
                        Current Total: {totalCartItems > 0 ? grandTotal : 0}
                    </p>
                    <p className='text-[18px] text-white font-medium pb-0'>{totalCartItems || 0} items</p>
                </div>
            </div>
        </>
    );
};

export default CartProgressBar;
