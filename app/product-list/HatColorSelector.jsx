import React from 'react';
import Image from 'next/image';
import { FiPlusCircle } from "react-icons/fi";

const HatColorSelector = ({ colorName, colorImage, value, onIncrease, onDecrease, onChange }) => {
    // console.log('colorName',colorName)
    return (
        <div className='border-2 border-[#dddddd] rounded-[15px] text-center p-4'>
            <div className='flex items-center justify-center mb-2 relative w-[110px] mx-auto'>
                <Image src={colorImage} width={50}  height={50} alt={colorName} className="" />
                <div className='absolute left-[5px] bottom-[-7px]'>
                    <button className='text-[#ed1c24] hover:text-[#ff7379] cursor-pointer'>
                        <FiPlusCircle className='text-xl' />
                    </button>
                </div>
            </div>
            <p className='text-base text-black font-medium pb-4'>{colorName}</p>

            <div className='border-1 border-[#dddddd] rounded-[10px] text-center p-2 w-[180px] mx-auto'>
                <p className='text-base text-black font-normal pb-4'>OSFA</p>
                <div className="flex items-center gap-2 number_section">
                    <button
                        type="button"
                        onClick={onDecrease}
                        className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                    >
                        –
                    </button>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="w-20 text-center border border-gray-300 rounded-md p-2"
                    />
                    <button
                        type="button"
                        onClick={onIncrease}
                        className="w-10 h-10 flex items-center justify-center bg-[#ed1c24] hover:bg-black text-white text-xl rounded-md cursor-pointer"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HatColorSelector;
