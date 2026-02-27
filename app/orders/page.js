'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { GoHome } from "react-icons/go";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FiSearch, FiFilter } from "react-icons/fi";

import list_banner from "../assets/imagesource/list_banner.png";

// ── Static mock data ──────────────────────────────────────────
const allOrders = [
  {
    id: "ORD-2024-001",
    status: "Shipped",
    statusColor: "bg-blue-100 text-blue-700",
    created: "Jan 15, 2024",
    items: "Classic Snapback Hat, Trucker Cap",
    quantity: 75,
    tracking: "1Z999AA10123456784",
    total: "$1,245.00",
    canReorder: true,
  },
  {
    id: "ORD-2024-002",
    status: "In Production",
    statusColor: "bg-purple-100 text-purple-700",
    created: "Feb 1, 2024",
    items: "Premium Fitted Hat, Beanie",
    quantity: 150,
    tracking: null,
    total: "$2,850.00",
    canReorder: false,
  },
  {
    id: "ORD-2024-003",
    status: "Awaiting Proof",
    statusColor: "bg-yellow-100 text-yellow-700",
    created: "Feb 20, 2024",
    items: "Dad Hat",
    quantity: 50,
    tracking: null,
    total: "$980.00",
    canReorder: false,
  },
];

export default function OrdersPage() {
  const [search, setSearch] = useState('');

  const filtered = allOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <div className='banner_area pt-[28px]'>
        <div className="relative">
          <Image src={list_banner} alt='list_banner' className="hidden lg:block w-full" />
          <Image src={list_banner} alt='list_banner' className="block lg:hidden w-full" />
        </div>
      </div>

      {/* Breadcrumb + CTA */}
      <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-5 flex justify-between items-center">
        <ul className="flex items-center gap-2">
          <li>
            <Link href="/" passHref>
              <GoHome className="text-[#666666] text-xl" />
            </Link>
          </li>
          <li><MdOutlineArrowForwardIos className="text-[#666666] text-xs" /></li>
          <li className="text-[#ED1C24] text-sm font-medium">Orders</li>
        </ul>
        <Link
          href="/product-list"
          className="bg-[#ed1c24] hover:bg-black transition-colors duration-200 text-white text-sm font-semibold px-5 py-2.5 rounded-full"
        >
          Start New Order
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-6 pb-20">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900">All Orders</h2>
              <p className="text-xs text-gray-400 mt-0.5">Showing {filtered.length} of {allOrders.length} orders</p>
            </div>

            {/* Search + Filter */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by order number or product..."
                  className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] w-[260px] placeholder-gray-400"
                />
              </div>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:border-[#ed1c24] hover:text-[#ed1c24] transition-colors">
                <FiFilter size={15} />
              </button>
            </div>
          </div>

          {/* Order list */}
          <div className="divide-y divide-gray-100">
            {filtered.length === 0 && (
              <p className="text-sm text-gray-400 py-6 text-center">No orders found.</p>
            )}
            {filtered.map((order) => (
              <div key={order.id} className="py-5 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

                {/* Left info */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-gray-900">{order.id}</span>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">Created:</span> {order.created}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">Items:</span> {order.items}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">Quantity:</span> {order.quantity} units
                  </p>
                  {order.tracking && (
                    <p className="text-xs text-gray-500">
                      <span className="font-medium text-gray-700">Tracking:</span>{" "}
                      <span className="text-[#ed1c24] hover:underline cursor-pointer">{order.tracking}</span>
                    </p>
                  )}
                </div>

                {/* Right — amount + buttons */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Total Amount</p>
                    <p className="text-xl font-bold text-gray-900">{order.total}</p>
                  </div>
                  <div className="flex gap-2">
                    {order.canReorder && (
                      <button className="bg-[#ed1c24] hover:bg-black transition-colors duration-200 text-white text-xs font-semibold px-4 py-2 rounded-full">
                        Reorder
                      </button>
                    )}
                    <button className="border border-[#ed1c24] text-[#ed1c24] hover:bg-[#ed1c24] hover:text-white transition-colors duration-200 text-xs font-semibold px-4 py-2 rounded-full">
                      View Details
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}