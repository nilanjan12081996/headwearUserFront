'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Roboto } from 'next/font/google';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Catamaran } from "next/font/google";
import Link from 'next/link';

import { IoLocationSharp } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa6";
import { MdPhone } from "react-icons/md";
import { BiLogoFacebook } from "react-icons/bi";
import { AiFillInstagram } from "react-icons/ai";
import { BsChatLeftDots, BsYoutube } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { BiLogoLinkedin } from "react-icons/bi";

import { FaFacebook } from "react-icons/fa6";

import { IoMdSend } from "react-icons/io";

import footerLogo from "../assets/imagesource/footer_logo.png";
import chat_icon from "../assets/imagesource/chat_icon.png";
import Image from 'next/image';

import { ImLocation } from "react-icons/im";

import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidPhone } from "react-icons/bi";
import { BiLogoGmail } from "react-icons/bi";
import { MdOutlineChat } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { chats } from '../reducers/chatSlice';
import ReactMarkdown from 'react-markdown'; 



const roboto = Roboto({
  subsets: ['latin'],
  weight: ['700'], // optional: define font weights
  variable: '--font-roboto', // optional: for CSS variables
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // specify desired weights
  display: 'swap',
});

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"], // choose what you need
});

const Footer = () => {

  const [isOpen, setIsOpen] = useState(false);
  // const [messages, setMessages] = useState([
  //   { id: 1, from: 'bot', text: 'Hi there! How can I help you today?' },
  //   { id: 2, from: 'user', text: 'I want to know more about your product.' },
  // ]);
  // const [input, setInput] = useState('');
  // const inputRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
   const [sessionId, setSessionId] = useState(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const dispatch = useDispatch();
  const { loading, chatsData, error } = useSelector((state) => state.cht);


    useEffect(() => {
    const getOrCreateSessionId = () => {
      // Check if session ID exists in sessionStorage
      let existingSessionId = sessionStorage.getItem('chat_session_id');
      
      if (!existingSessionId) {
        // Generate new UUID using browser's crypto API
        existingSessionId = crypto.randomUUID();
        // Store in sessionStorage
        sessionStorage.setItem('chat_session_id', existingSessionId);
      }
      
      return existingSessionId;
    };

    const id = getOrCreateSessionId();
    setSessionId(id);
    console.log('Current Session ID:', id);
  }, []);

  // Listen for bot response
  useEffect(() => {
    if (chatsData?.data) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), from: "bot", text: chatsData.data.reply }, // adjust key according to API
      ]);
    }
  }, [chatsData]);
console.log("chatsData",chatsData);

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
  scrollToBottom();
}, [messages]);

  useEffect(() => {
  if (chatsData?.response) {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "bot", text: chatsData.response },
    ]);
  }
}, [chatsData]);



  useEffect(() => {
   if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);


  const openChat = () =>{
    setIsOpen(!isOpen)
  }
  const closeChat = () => setIsOpen(false);


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          from: "bot",
          text: "👋 Hi! I’m your support assistant. How can I help you today?",
        },
      ]);
    }
  }, [isOpen]);


  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Prepare payload for API
    const payload = {
      query: input,
      use_agent: true,
     // user_id: "user123", // can make this dynamic
     user_id:sessionId
    };

    dispatch(chats(payload));

    setInput("");
  };

  return (
    <div className='footer_area'>


         <div className="fixed bottom-3 right-6 z-49 bg-[#ff7379] rounded-full w-[59px] h-[59px] flex items-center justify-center">
        <button
          onClick={openChat}
          aria-expanded={isOpen}
          aria-controls="chat-popup"
          >
         {/* <Image src={chat_icon} alt='chat_icon' className='shadow-xl w-[59px] h-[59px] rounded-full cursor-pointer' /> */}
         <MdOutlineChat className='text-3xl cursor-pointer text-white'/>
        </button>
      </div>


      <AnimatePresence>
        {isOpen && (
          <motion.div
          id="chat-popup"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[92vw]"
          >
            <div className="flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#ed1c24] to-[#ed1c24] text-white">
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-semibold">HeadWear Chat</div>
                  <div className="text-xs opacity-80 flex items-center gap-[3px]">
                    <div className='w-[8px] h-[8px] rounded-full bg-green-400'>&nbsp;</div>Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                onClick={() => {
                // minimize to bottom-left small bar instead of fully close (demo)
                setIsOpen(false);
                }}
                aria-label="Minimize chat"
                className="p-1 rounded-md hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                </button>
                <button onClick={closeChat} aria-label="Close chat" className="p-1 rounded-md hover:bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 max-h-[320px] overflow-y-auto px-4 py-3 space-y-3 bg-slate-50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`${
                      m.from === "user"
                        ? "bg-[#ed1c24] text-white rounded-tl-xl rounded-bl-xl rounded-br-xl"
                        : "bg-white rounded-tr-xl rounded-br-xl rounded-bl-xl ring-1 ring-black/5"
                    } max-w-[78%] p-3`}
                  >
                    {
                      m.from==="bot"?(
                        <ReactMarkdown 
                       
                          // components={{
                           
                          //   p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                          //   ol: ({ node, ...props }) => <ol className="mb-2 list-decimal list-inside space-y-1 last:mb-0" {...props} />,
                          //   ul: ({ node, ...props }) => <ul className="mb-2 list-disc list-inside space-y-1 last:mb-0" {...props} />,
                          //   li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                          //   strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                          //   em: ({ node, ...props }) => <em className="italic" {...props} />,
                           
                          // }}


                          components={{
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0 text-sm leading-relaxed" {...props} />,
                        ol: ({ node, ...props }) => (
                          <ol 
                            className="mb-2 list-decimal list-inside space-y-1 last:mb-0 text-gray-500 text-sm" 
                            {...props} 
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul 
                            className="mb-2 list-disc list-inside space-y-1 last:mb-0 text-gray-500 text-sm" 
                            {...props} 
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="ml-2 text-gray-500 text-sm leading-relaxed" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong className="font-semibold text-gray-800" {...props} />
                        ),
                        em: ({ node, ...props }) => (
                          <em className="italic" {...props} />
                        ),
                        a: ({ node, ...props }) => (
                          <a className="text-blue-600 hover:underline font-medium" {...props} />
                        ),
                      }}
                        >
                          {m.text}
                        </ReactMarkdown>

                      ):(
                         <div className="text-sm leading-relaxed text-justify">{m.text}</div>
                      )
                    }
                    {/* <div className="text-sm leading-relaxed text-justify">{m.text}</div> */}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-xs text-gray-500 italic">Bot is Typing...</div> 
              )}
              <div ref={messagesEndRef} />
            </div>


            {/* Input area */}
            <form onSubmit={sendMessage} className="px-4 py-3 bg-white flex items-center gap-3">
            <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
              <button type="submit" className="inline-flex items-center gap-2 bg-[#ed1c24] hover:bg-[#000000] text-white px-3 py-2 rounded-xl cursor-pointer">
                  <IoMdSend className='text-xl' />
              </button>
            </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='footer_top pt-18 pb-6 px-6 lg:px-0'>
        <div className='max-w-6xl mx-auto px-0 lg:px-0'>
          <div className='footer_top_container'>
            <div className='pb-6'>
               <div className='lg:w-full mb-6 lg:mb-0 text-center'>
                <Image src={footerLogo} alt='footerLogo' className='inline-block mb-10 w-[141px]' />
                <div className='mb-10 text-center'>
                  <p className='text-white text-sm leading-[24px] font-normal'>The leading provider of premium custom headwear for industry leaders</p>
                </div>
                <div>
                  <ul className='lg:flex items-center justify-center gap-4'>
                    <li>
                      <Link className='text-[#CECECE] hover:text-[#b90405] uppercase text-[13px] leading-[16px] font-normal mb-4 inline-block' href="#" passHref>Join The Club</Link>
                    </li>
                    <li>
                      <Link className='text-[#CECECE] hover:text-[#b90405] uppercase text-[13px] leading-[16px] font-normal mb-4 inline-block' href="#" passHref>Get Started</Link>
                    </li>
                    <li>
                      <Link className='text-[#CECECE] hover:text-[#b90405] uppercase text-[13px] leading-[16px] font-normal mb-4 inline-block' href="#" passHref>Benefits</Link>
                    </li>
                    <li>
                      <Link className='text-[#CECECE] hover:text-[#b90405] uppercase text-[13px] leading-[16px] font-normal mb-4 inline-block' href="#" passHref>Why Choose Us</Link>
                    </li>
                    <li>
                      <Link className='text-[#CECECE] hover:text-[#b90405] uppercase text-[13px] leading-[16px] font-normal mb-4 inline-block' href="#" passHref>Example Work</Link>
                    </li>
                    <li>
                      <Link className='text-[#CECECE] hover:text-[#b90405] uppercase text-[13px] leading-[16px] font-normal mb-4 inline-block' href="#" passHref>FAQ</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='border-t border-[#4c4c4c] pt-5 text-center'>
          <p className='text-white text-sm leading-[24px] font-normal'>Copyright ⓒ 2025 Show Me Headwear. All Rights Reserved.</p>
        </div>
      </div>

    </div>
  )
}

export default Footer