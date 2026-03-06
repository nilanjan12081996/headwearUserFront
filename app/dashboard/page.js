'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { GoHome } from "react-icons/go";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FiClock, FiFileText } from "react-icons/fi";
import { BsCurrencyDollar, BsGraphUpArrow, BsBoxSeam } from "react-icons/bs";

import { getAllOrders, getSpendSummary } from '../reducers/OrdersSlice';
import Banner from '../ui/Banner';
import DashboardStats from './Dashboardstats';

// ── Order status stages ──────────────────────────────────────
const ALL_STAGES = [
  'Order received from customer',
  'Order submitted',
  'Customer Invoice sent',
  'Payment Received',
  'Terms Given',
  'Order Shipped',
  'Order delivered',
];

// ── Status badge color helper ─────────────────────────────────
const getStatusColor = (status) => {
  const s = (status || '').toLowerCase();
  if (s.includes('received'))   return 'bg-orange-100 text-orange-700';
  if (s.includes('submitted'))  return 'bg-blue-100 text-blue-700';
  if (s.includes('invoice'))    return 'bg-indigo-100 text-indigo-700';
  if (s.includes('payment'))    return 'bg-green-100 text-green-700';
  if (s.includes('terms'))      return 'bg-yellow-100 text-yellow-700';
  if (s.includes('shipped'))    return 'bg-purple-100 text-purple-700';
  if (s.includes('delivered'))  return 'bg-teal-100 text-teal-700';
  return 'bg-gray-100 text-gray-700';
};



// ── Open invoices mock data ───────────────────────────────────
const openInvoices = [
  { id: "INV-2024-002", due: "Mar 1, 2024", amount: "$2,850.00", status: "Pending", statusColor: "bg-yellow-100 text-yellow-700" },
];

// ── Components ────────────────────────────────────────────────
const StatusBadge = ({ status, colorClass }) => (
  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${colorClass}`}>
    {status}
  </span>
);

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router   = useRouter();
  const { orders = [], loading = false } = useSelector((state) => state.order ?? {});

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // ── Derive current orders: NOT "Order delivered", latest 3 ──
  const currentOrders = orders
    .filter((o) => (o.orderStatus || '').toLowerCase() !== 'order delivered')
    .slice(0, 3);

  // ── Derive past orders: only "Order delivered", latest 3 ────
  const pastOrders = orders
    .filter((o) => (o.orderStatus || '').toLowerCase() === 'order delivered')
    .slice(0, 3);

  // ── Format date ──────────────────────────────────────────────
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    let d;
    if (typeof dateStr === 'string' && dateStr.match(/^\d{2}-\d{2}-\d{4}/)) {
      const [datePart] = dateStr.split(' ');
      const [dd, mm, yyyy] = datePart.split('-');
      d = new Date(`${yyyy}-${mm}-${dd}`);
    } else {
      d = new Date(dateStr);
    }
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // ── Items summary for an order ───────────────────────────────
  const getOrderSummary = (order) => {
    const totalQty = (order.groups || []).reduce(
      (sum, g) => sum + (g.items || []).reduce((s, i) => s + (i.quantity || 0), 0), 0
    );
    const total = `$${Number(order.grandTotalAmount ?? 0).toFixed(2)}`;
    return { totalQty, total };
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Banner */}
      <Banner />

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

       <DashboardStats/>

        {/* ── Current Orders (dynamic) ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-1">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Current Orders</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {loading ? 'Loading…' : `Showing last ${currentOrders.length} active order${currentOrders.length !== 1 ? 's' : ''}`}
              </p>
            </div>
            <button
              onClick={() => router.push('/orders')}
              className="border border-[#ed1c24] text-[#ed1c24] hover:bg-[#ed1c24] hover:text-white transition-colors duration-200 text-sm font-medium px-4 py-1.5 rounded-full"
            >
              View All
            </button>
          </div>

          <div className="mt-4 divide-y divide-gray-100">
            {loading && (
              <p className="text-sm text-gray-400 py-4 text-center animate-pulse">Loading orders…</p>
            )}
            {!loading && currentOrders.length === 0 && (
              <p className="text-sm text-gray-400 py-4 text-center">No active orders found.</p>
            )}
            {!loading && currentOrders.map((order) => {
              const { totalQty, total } = getOrderSummary(order);
              const stageIdx = ALL_STAGES.findIndex(
                (s) => s.toLowerCase() === (order.orderStatus || '').toLowerCase()
              );
              const progress = stageIdx >= 0
                ? Math.round(((stageIdx + 1) / ALL_STAGES.length) * 100)
                : 0;

              return (
                <div key={order.id} className="py-4 flex justify-between items-start">
                  <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{order.orderNumber}</span>
                      <StatusBadge
                        status={order.orderStatus}
                        colorClass={getStatusColor(order.orderStatus)}
                      />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <FiClock size={11} />
                      <span>Created {formatDate(order.createdAt)}</span>
                    </div>
                    <p className="text-xs text-gray-500">{totalQty} unit(s) — {total}</p>

                    {/* Progress bar */}
                    {/* <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-400">
                          Step {stageIdx + 1} of {ALL_STAGES.length}
                        </span>
                        <span className="text-[10px] font-medium text-[#ed1c24]">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-[#ed1c24] h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div> */}
                  </div>

                  <button
                    onClick={() => router.push(`/orders/${order.id}`)}
                    className="text-sm text-gray-700 hover:text-[#ed1c24] font-medium transition-colors duration-200 shrink-0 mt-1"
                  >
                    View Details
                  </button>
                </div>
              );
            })}
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

        {/* ── Recent Past Orders (dynamic — only "Order delivered") ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-1">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Recent Past Orders</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {loading ? 'Loading…' : `Last ${pastOrders.length} delivered order${pastOrders.length !== 1 ? 's' : ''}`}
              </p>
            </div>
            <button
              onClick={() => router.push('/orders')}
              className="border border-[#ed1c24] text-[#ed1c24] hover:bg-[#ed1c24] hover:text-white transition-colors duration-200 text-sm font-medium px-4 py-1.5 rounded-full"
            >
              View All
            </button>
          </div>

          <div className="mt-4 divide-y divide-gray-100">
            {loading && (
              <p className="text-sm text-gray-400 py-4 text-center animate-pulse">Loading orders…</p>
            )}
            {!loading && pastOrders.length === 0 && (
              <p className="text-sm text-gray-400 py-4 text-center">No delivered orders yet.</p>
            )}
            {!loading && pastOrders.map((order) => {
              const { total } = getOrderSummary(order);
              return (
                <div key={order.id} className="py-3.5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <BsBoxSeam size={14} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{order.orderNumber}</p>
                      <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-gray-900">{total}</p>
                    <StatusBadge
                      status={order.orderStatus}
                      colorClass={getStatusColor(order.orderStatus)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}