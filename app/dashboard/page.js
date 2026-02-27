'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GoHome } from "react-icons/go";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FiClock, FiPackage, FiFileText } from "react-icons/fi";
import { BsCurrencyDollar, BsGraphUpArrow, BsBoxSeam } from "react-icons/bs";

import list_banner from "../assets/imagesource/list_banner.png";

// ── Static mock data ──────────────────────────────────────────
const stats = [
  { label: "Last 30 Days", value: "$0.00", icon: <BsCurrencyDollar size={16} />, iconBg: "bg-red-50 text-[#ed1c24]" },
  { label: "Last 90 Days", value: "$0.00", icon: <BsGraphUpArrow size={14} />, iconBg: "bg-orange-50 text-orange-400" },
  { label: "Last 365 Days", value: "$0.00", icon: <BsGraphUpArrow size={14} />, iconBg: "bg-pink-50 text-pink-400" },
  { label: "Lifetime Spend", value: "$5,074.00", icon: <BsCurrencyDollar size={16} />, iconBg: "bg-red-50 text-[#ed1c24]" },
];

const currentOrders = [
  { id: "ORD-2024-001", status: "Shipped", statusColor: "bg-blue-100 text-blue-700", date: "Jan 15, 2024", items: 2, total: "$1,245.00" },
  { id: "ORD-2024-002", status: "In Production", statusColor: "bg-purple-100 text-purple-700", date: "Feb 1, 2024", items: 2, total: "$2,850.00" },
  { id: "ORD-2024-003", status: "Awaiting Proof", statusColor: "bg-yellow-100 text-yellow-700", date: "Feb 20, 2024", items: 1, total: "$980.00" },
];

const openInvoices = [
  { id: "INV-2024-002", due: "Mar 1, 2024", amount: "$2,850.00", status: "Pending", statusColor: "bg-yellow-100 text-yellow-700" },
];

const pastOrders = [
  { id: "ORD-2024-001", date: "Jan 15, 2024", amount: "$1,245.00", status: "Shipped", statusColor: "bg-blue-100 text-blue-700" },
  { id: "ORD-2024-002", date: "Feb 1, 2024", amount: "$2,850.00", status: "In Production", statusColor: "bg-purple-100 text-purple-700" },
  { id: "ORD-2024-003", date: "Feb 20, 2024", amount: "$980.00", status: "Awaiting Proof", statusColor: "bg-yellow-100 text-yellow-700" },
];

// ── Components ────────────────────────────────────────────────
const StatusBadge = ({ status, colorClass }) => (
  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${colorClass}`}>
    {status}
  </span>
);

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Banner */}
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
          <li className="text-[#ED1C24] text-sm font-medium">Dashboard</li>
        </ul>
        <Link
          href="/product-list"
          className="bg-[#ed1c24] hover:bg-black transition-colors duration-200 text-white text-sm font-semibold px-5 py-2.5 rounded-full"
        >
          Start New Order
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-6 pb-20 space-y-6">

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.iconBg}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ── Current Orders ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-1">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Current Orders</h2>
              <p className="text-xs text-gray-400 mt-0.5">Track your open orders and their status</p>
            </div>
            <button className="border border-[#ed1c24] text-[#ed1c24] hover:bg-[#ed1c24] hover:text-white transition-colors duration-200 text-sm font-medium px-4 py-1.5 rounded-full">
              View All
            </button>
          </div>

          <div className="mt-4 divide-y divide-gray-100">
            {currentOrders.map((order) => (
              <div key={order.id} className="py-4 flex justify-between items-start">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold text-gray-900">{order.id}</span>
                    <StatusBadge status={order.status} colorClass={order.statusColor} />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <FiClock size={11} />
                    <span>Created {order.date}</span>
                  </div>
                  <p className="text-xs text-gray-500">{order.items} item(s) - {order.total}</p>
                </div>
                <button className="text-sm text-gray-700 hover:text-[#ed1c24] font-medium transition-colors duration-200 shrink-0 mt-1">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Open Invoices ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full border-2 border-orange-400 flex items-center justify-center">
              <span className="text-orange-400 text-xs font-bold leading-none">!</span>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Open Invoices</h2>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 ml-8">Invoices requiring payment</p>

          <div className="divide-y divide-gray-100">
            {openInvoices.map((inv) => (
              <div key={inv.id} className="py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiFileText size={15} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{inv.id}</p>
                    <p className="text-xs text-gray-400">Due {inv.due}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{inv.amount}</p>
                  <StatusBadge status={inv.status} colorClass={inv.statusColor} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent Past Orders ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="mb-1">
            <h2 className="text-base font-semibold text-gray-900">Recent Past Orders</h2>
            <p className="text-xs text-gray-400 mt-0.5">Your order history</p>
          </div>

          <div className="mt-4 divide-y divide-gray-100">
            {pastOrders.map((order) => (
              <div key={order.id} className="py-3.5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BsBoxSeam size={14} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{order.id}</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-bold text-gray-900">{order.amount}</p>
                  <StatusBadge status={order.status} colorClass={order.statusColor} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}