'use client';
import Image from "next/image"
import Link from "next/link"
import product_01 from "../assets/imagesource/product_01.png";
import product_02 from "../assets/imagesource/product_02.png";
import product_03 from "../assets/imagesource/product_03.png";
import product_04 from "../assets/imagesource/product_04.png";
import rating_icon from "../assets/imagesource/rating_icon.png";

import red_icon from "../assets/imagesource/red_icon.png";
import yellow_icon from "../assets/imagesource/yellow_icon.png";
import gray_icon from "../assets/imagesource/gray_icon.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, getProduct } from "../reducers/ProductSlice";
import { Pagination } from "flowbite-react";

const CapList=({ selectedSupplierId })=>{

    const [totalPage, setTotalPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const{productList,allProList}=useSelector((state)=>state?.prod)
    const dispatch=useDispatch()

      useEffect(() => {
        setCurrentPage(1);
    }, [selectedSupplierId]);
    useEffect(()=>{
      dispatch(getAllProduct({
        page:currentPage,
        limit:limit
      })).then((res)=>{
        console.log("res",res);
        const total=res?.payload?.pagination?.totalPages
        setTotalPage(Number.isInteger(total)&&total>0?total:1)
        
      })
    },[currentPage,limit])

      const onPageChange = (page) => {
    setCurrentPage(page);
  };
useEffect(()=>{
 console.log("selectedSupplierId",selectedSupplierId);
},[selectedSupplierId])   
    
  const displayProducts = selectedSupplierId=="Supplier" ? allProList?.data:productList?.data?.data
  
    console.log("productList",productList);
      console.log("allProList",allProList);
    
    return(
        <>
         <div className='team_wrap'>
              <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
                {
                  displayProducts?.map((allPro)=>(
                       <div className='product_list_box border border-[#E2E2E2] rounded-[8px]'>
                    <div>
                      <Link href={`/product-details?id=${btoa(allPro?.id)}`} passHref>
                         <Image src={product_01} alt='product_01' className="w-full" />
                      </Link>
                    </div>
                    <div className='p-4 flex justify-between items-center'>
                        <div>
                          <p className='text-[#1A1A1A] text-xl font-medium mb-1'>{allPro?.supplierStyleCode}</p>
                          <p className='text-[#4D4D4D] text-sm'>{allPro?.hatName}</p>
                          <p className='text-[#1A1A1A] text-base font-medium mb-1'>{allPro?.basePrice}</p>
                          <Image src={rating_icon} alt='rating_icon' className="" />
                        </div>
                        <div>
                           <div className='flex items-center justify-end'>
                              <div>
                                  <Image src={red_icon} alt='red_icon' className="" />
                              </div>
                              <div className='left-[-15px] relative'>
                                  <Image src={yellow_icon} alt='yellow_icon' className="" />
                              </div>
                              <div className='left-[-30px] relative'>
                                  <Image src={gray_icon} alt='gray_icon' className="" />
                              </div>
                              <p className='left-[-20px] relative'>+ 12</p>
                           </div>
                        </div>
                    </div>
                 </div>
                  ))
                }
              </div>
              {
                allProList?.pagination?.totalPages>0&&(
                <div className="flex justify-center items-center mt-4 pagination_sec">
                <Pagination
                  layout="pagination"
                  currentPage={currentPage}
                  totalPages={totalPage}
                  onPageChange={onPageChange}
                  previousLabel=""
                  nextLabel=""
                  showIcons
                />
                </div>
                )
              }
           </div>
        </>
    )
}
export default CapList