'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBannerList } from '../reducers/BannerLogoSlice';
import list_banner from "../assets/imagesource/list_banner.png";

const base_url = process.env.NEXT_PUBLIC_API_NEW_URL;

const Banner = () => {
  const dispatch = useDispatch();
  const { bannerList, bannerListLoading } = useSelector((state) => state.bannerLogo);

  useEffect(() => {
    dispatch(getBannerList());
  }, [dispatch]);

  const activeBanner = bannerList?.find(b => b.isActive) || bannerList?.[0];
  const bannerSrc = activeBanner ? `${base_url}${activeBanner.bannerUrl}` : null;

  return (
    <div className='banner_area pt-[28px]'>
      <div className="relative">
        {bannerSrc ? (
          <>
            <img
              src={bannerSrc}
              alt={activeBanner?.bannerName || 'banner'}
              className="hidden lg:block w-full max-h-[250px]"
            />
            <img
              src={bannerSrc}
              alt={activeBanner?.bannerName || 'banner'}
              className="block lg:hidden w-full  max-h-[100px]"
            />
          </>
        ) : (
          <>
            <Image src={list_banner} alt='list_banner' className="hidden lg:block w-full" />
            <Image src={list_banner} alt='list_banner' className="block lg:hidden w-full" />
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;