'use client';

import Image from "next/image";

import banner01 from "../app/assets/imagesource/banner01.png";
import Strategic_Principles_img from "../app/assets/imagesource/Strategic_Principles_img.png";
import special01 from "../app/assets/imagesource/special01.png";
import special02 from "../app/assets/imagesource/special02.png";
import special03 from "../app/assets/imagesource/special03.png";

import post01 from "../app/assets/imagesource/post01.png";


import About_us from "../app/assets/imagesource/About_us.png";

import stethy from "../app/assets/imagesource/stethy.png";

import home from "../app/assets/imagesource/home.png";

import awareness_left from "../app/assets/imagesource/awareness_left.png";

import awareness_right from "../app/assets/imagesource/awareness_right.png";

import therapies_img from "../app/assets/imagesource/therapies_img.png";

import heart_icon from "../app/assets/imagesource/heart_icon.png";

import mental_experts_img from "../app/assets/imagesource/mental_experts_img.png";

import packages_img from "../app/assets/imagesource/packages_img.png";

import app_store from "../app/assets/imagesource/app_store.png";

import google_play from "../app/assets/imagesource/google_play.png";

import mobiles_01 from "../app/assets/imagesource/mobiles_01.png";

import blog_image from "../app/assets/imagesource/blog_image.png";

import blog_image_02 from "../app/assets/imagesource/blog_image_02.png";

import blog_image_03 from "../app/assets/imagesource/blog_image_03.png";

import wc_01 from "../app/assets/imagesource/wc_01.png";
import wc_02 from "../app/assets/imagesource/wc_02.png";
import wc_03 from "../app/assets/imagesource/wc_03.png";
import wc_04 from "../app/assets/imagesource/wc_04.png";
import wc_05 from "../app/assets/imagesource/wc_05.png";
import wc_06 from "../app/assets/imagesource/wc_06.png";

import home_image from "../app/assets/imagesource/home_image.png";


import offer_img_full from "../app/assets/imagesource/offer_img_full.png";


import { BiCalendar } from "react-icons/bi";

import { FaRegUser } from "react-icons/fa6";

import { IoMdCheckmarkCircle } from "react-icons/io";








import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

import Link from "next/link";

import { Poppins } from 'next/font/google';
import { Manrope } from 'next/font/google';
import { Inter } from 'next/font/google';
import { Bricolage_Grotesque } from "next/font/google";
import { Catamaran } from "next/font/google";

import Testimonial from "./testimonial/page";

import 'react-tabs/style/react-tabs.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPlans } from "./reducers/PlanSlice";
import { getCoins } from "./reducers/CoinSlice";
import { useRouter } from "next/navigation";
import LoginModal from "./modal/LoginModal";

import { CgFileDocument } from "react-icons/cg";
import { AiOutlinePieChart } from "react-icons/ai";   
import { PiTargetBold } from "react-icons/pi";
import { BiMap } from "react-icons/bi";

import { IoIosArrowForward } from "react-icons/io";

import { FaPlus } from "react-icons/fa";

import { BsArrowRight } from "react-icons/bs";
import OfferingSection from "./OfferingSection/page";




const manrope = Manrope({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700'], // specify desired weights
   display: 'swap',
});

const inter = Inter({
  subsets: ['latin'], // or ['latin-ext'] etc.
  weight: ['400', '500', '600', '700'], // specify desired weights
  variable: '--font-inter', // optional, for Tailwind usage
})

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"], // choose subsets
  weight: ["400", "500", "600", "700"], // choose weights you need
});

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"], // choose what you need
});


export default function Home() {
   const { plans } = useSelector((state) => state?.planst)
   const { coins } = useSelector((state) => state?.coinData)
   const dispatch = useDispatch()
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCurrency, setSelectedCurrency] = useState('USD');
   const [selectedCoin, setSelectedCoin] = useState('');
   const [selectedCoinSymbol, setSelectedCoinSymbol] = useState('');
   const [showDropdown, setShowDropdown] = useState(false);
   const router = useRouter();
   const [openLoginModal, setOpenLoginModal] = useState(false);

   const hanleloginModal = () => {
      setOpenLoginModal(true)
   }


   // useEffect(() => {
   //    dispatch(getPlans())
   // }, [])
   // console.log("plan", plans);
   // useEffect(() => {
   //    dispatch(getCoins())
   // }, [])
   // console.log("coinsd", coins)
   // const coinItems = coins?.coins?.map((coin) => coin.item) || [];

   // // Your filtering logic looks correct
   // const filteredCoins = coinItems.filter((coin) =>
   //    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
   // );

   // const coinItems = Array.isArray(coins?.coins)
   //    ? coins.coins.map((coin) => coin.item).filter(Boolean)
   //    : [];

   // // Filter coins based on search term
   // const filteredCoins = coinItems.filter((coin) =>
   //    coin?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
   //    coin?.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
   // );


   const handleCoinSelect = (coin) => {
      console.log(coin, "coin");

      setSelectedCoin(coin.name);
      setSelectedCoinSymbol(coin.symbol.toLowerCase());
      // setSearchTerm(''); // Clear search after selection
      setSearchTerm(coin.name);
      setShowDropdown(false);

   };
   // const handleTryForFree = async () => {
   //    console.log("select currency", selectedCoinSymbol);
   //    console.log("select coin symbol", selectedCoinSymbol);
   //    // router.push("/details")

   //    router.push({
   //       pathname: '/details',
   //       query: {
   //          coin: selectedCoinSymbol,
   //          currency: selectedCurrency
   //       }
   //    });



   // };
   useEffect(() => {
      console.log("currency", selectedCurrency);
   }, [selectedCurrency])


   return (
      <div className={`${inter.className} antialiased home_wrapper_arera`}>

         {/* home banner section start here */}
         <div className="home_banner_area relative">
            <Image src={home_image} alt='home_image' className='w-full' />
         </div>
         {/* home banner section ends here */}

      </div>

   );
}
