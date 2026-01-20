'use client'

import Link from "next/link"
import { FaCheckCircle } from "react-icons/fa"


const page = () => {

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f0e2e2] px-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div
                        className="flex items-center justify-center w-28 h-28 rounded-full bg-green-500"
                        style={{
                            animation: "scaleIn 0.6s ease-out forwards",
                            transform: "scale(0)"
                        }}
                    >
                        <span
                            className="text-white text-6xl font-bold"
                            style={{
                                animation: "popIn 0.4s ease-out 0.4s forwards",
                                transform: "scale(0)"
                            }}
                        >
                            ✓
                        </span>

                        <style jsx>{`
            @keyframes scaleIn {
                to {
                    transform: scale(1);
                }
            }

            @keyframes popIn {
                to {
                    transform: scale(1);
                }
            }
        `}</style>
                    </div>
                </div>


                <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-3 tracking-[2px]">
                    Order Received!
                </h1>

                <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                    We’ll review and email your invoice shortly.
                    <br />
                    Production starts once it’s paid.
                </p>
                <div className="flex flex-col gap-3">
                    <Link
                        href="/"
                        className="w-full py-3 rounded-xl bg-[#ff7379] hover:bg-[#ee8d92] transition text-white font-semibold"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page
