'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef, useMemo } from 'react';
import { GoHome } from 'react-icons/go';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { FiSearch, FiFilter, FiX, FiChevronDown, FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import list_banner from '../assets/imagesource/list_banner.png';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getAllOrders, searchOrders, getReorderPreview } from '../reducers/OrdersSlice';
import Banner from '../ui/Banner';

// Map orderStatus string → badge color classes
const getStatusColor = (status) => {
  const s = (status || '').toLowerCase();
  if (s.includes('shipped')) return 'bg-blue-100 text-blue-700';
  if (s.includes('production')) return 'bg-purple-100 text-purple-700';
  if (s.includes('proof')) return 'bg-yellow-100 text-yellow-700';
  if (s.includes('submitted')) return 'bg-green-100 text-green-700';
  if (s.includes('received')) return 'bg-orange-100 text-orange-700';
  if (s.includes('delivered')) return 'bg-teal-100 text-teal-700';
  if (s.includes('invoice')) return 'bg-indigo-100 text-indigo-700';
  if (s.includes('payment')) return 'bg-pink-100 text-pink-700';
  if (s.includes('terms')) return 'bg-cyan-100 text-cyan-700';
  return 'bg-gray-100 text-gray-700';
};

// Debounce hook
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ── Pagination component ─────────────────────────────────────
function Pagination({ currentPage, totalPages, totalElements, pageSize, onPageChange }) {
  if (totalPages <= 1) return null;

  const from = currentPage * pageSize + 1;
  const to = Math.min((currentPage + 1) * pageSize, totalElements);

  // Build page numbers with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i);
    const pages = [];
    if (currentPage <= 3) {
      pages.push(0, 1, 2, 3, 4, '...', totalPages - 1);
    } else if (currentPage >= totalPages - 4) {
      pages.push(0, '...', totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
    } else {
      pages.push(0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1);
    }
    return pages;
  };

  return (
    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
      <p className="text-xs text-gray-400">
        Showing <span className="font-medium text-gray-700">{from}–{to}</span> of{' '}
        <span className="font-medium text-gray-700">{totalElements}</span> orders
      </p>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500
            hover:border-[#ed1c24] hover:text-[#ed1c24] disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors duration-150"
        >
          <FiChevronLeft size={14} />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors duration-150
                ${page === currentPage
                  ? 'bg-[#ed1c24] text-white border border-[#ed1c24]'
                  : 'border border-gray-200 text-gray-600 hover:border-[#ed1c24] hover:text-[#ed1c24]'
                }`}
            >
              {page + 1}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500
            hover:border-[#ed1c24] hover:text-[#ed1c24] disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors duration-150"
        >
          <FiChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [expandedColors, setExpandedColors] = useState({});
  const [reorderingId, setReorderingId] = useState(null);
  // Pagination page state (for search pagination)
  const [searchPage, setSearchPage] = useState(0);

  const toggleColors = (id) =>
    setExpandedColors((prev) => ({ ...prev, [id]: !prev[id] }));

  const filterRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    orders = [],
    searchResults,
    loading = false,
    currentPage,
    totalPages,
    totalElements,
    pageSize,
    searchTotalPages,
    searchTotalElements,
  } = useSelector((state) => state.order ?? {});

  // Dynamically build status options from loaded orders
  const statusOptions = useMemo(
    () => [...new Set(orders.map((o) => o.orderStatus).filter(Boolean))],
    [orders]
  );
  const debouncedSearch = useDebounce(search, 500);

  // Initial load (page 0)
  useEffect(() => {
    dispatch(getAllOrders({ page: 0, size: 10 }));
  }, [dispatch]);

  // Close filter panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilterPanel(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Search API — re-runs on filter change or search page change
  useEffect(() => {
    const hasSearch = debouncedSearch.trim();
    const hasDate = dateFilter.trim();
    const hasStatus = statusFilter.trim();
    if (!hasSearch && !hasDate && !hasStatus) return;

    let dateParam = hasDate;
    const ddmmyyyy = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (ddmmyyyy.test(hasDate)) {
      const [, dd, mm, yyyy] = hasDate.match(ddmmyyyy);
      dateParam = `${yyyy}-${mm}-${dd}`;
    }

    dispatch(searchOrders({
      orderNumber: hasSearch || undefined,
      status: hasStatus || undefined,
      date: dateParam || undefined,
      page: searchPage,
      size: 10,
    }));
  }, [debouncedSearch, dateFilter, statusFilter, searchPage, dispatch]);

  // Reset search page when filters change
  useEffect(() => {
    setSearchPage(0);
  }, [debouncedSearch, dateFilter, statusFilter]);

  const hasActiveFilter = debouncedSearch.trim() || dateFilter.trim() || statusFilter.trim();
  const rawList = hasActiveFilter ? (searchResults ?? []) : orders;

  const displayOrders = rawList.map((order) => {
    const hatNames = (order.groups || []).map((g) => g.hatName).join(', ');
    const totalQty = (order.groups || []).reduce((sum, g) =>
      sum + (g.items || []).reduce((s, i) => s + (i.quantity || 0), 0), 0);
    const allColors = [];
    const seen = new Set();
    (order.groups || []).forEach((g) => {
      (g.hatColors || []).forEach((c) => {
        if (!seen.has(c.name)) { seen.add(c.name); allColors.push(c.name); }
      });
    });
    return {
      id: order.orderNumber,
      rawId: order.id,
      status: order.orderStatus,
      statusColor: getStatusColor(order.orderStatus),
      created: order.createdAt,
      items: hatNames,
      quantity: totalQty,
      colors: allColors,
      tracking: order.trackingNumber ?? null,
      total: `$${Number(order.grandTotalAmount ?? 0).toFixed(2)}`,
      couponAmount: Number(order.couponAddAmount ?? 0),  // ✅ ADD THIS
    };
  });

  const clearAll = () => {
    setSearch('');
    setDateFilter('');
    setStatusFilter('');
    setSearchPage(0);
  };

  const activeFilterCount = [debouncedSearch, dateFilter, statusFilter].filter(Boolean).length;

  // Page change handlers
  const handlePageChange = (newPage) => {
    dispatch(getAllOrders({ page: newPage, size: 10 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchPageChange = (newPage) => {
    setSearchPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reorder handler
  const handleReorder = async (rawId) => {
    setReorderingId(rawId);
    try {
      await dispatch(getReorderPreview(rawId)).unwrap();
      router.push(`/reorder-checkout?order_id=${rawId}`);
    } catch {
      // error handled in slice
    } finally {
      setReorderingId(null);
    }
  };

  // Pagination values depending on active filter
  const paginationProps = hasActiveFilter
    ? {
      currentPage: searchPage,
      totalPages: searchTotalPages ?? 1,
      totalElements: searchTotalElements ?? 0,
      pageSize: 10,
      onPageChange: handleSearchPageChange,
    }
    : {
      currentPage: currentPage ?? 0,
      totalPages: totalPages ?? 1,
      totalElements: totalElements ?? 0,
      pageSize: pageSize ?? 10,
      onPageChange: handlePageChange,
    };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <p className="text-xs text-gray-400 mt-0.5">
                Showing {displayOrders.length} of {paginationProps.totalElements} orders
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="ml-2 text-[#ed1c24] hover:underline font-medium"
                  >
                    Clear all
                  </button>
                )}
              </p>
            </div>

            {/* Search + Filter */}
            <div className="flex items-center gap-2">
              {/* Search box */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by order number..."
                  className="pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] w-[240px] placeholder-gray-400"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={13} />
                  </button>
                )}
              </div>

              {/* Filter button */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setShowFilterPanel((p) => !p)}
                  className={`flex items-center gap-1.5 px-3 h-9 text-xs font-medium border rounded-lg transition-colors
                    ${activeFilterCount > 0
                      ? 'border-[#ed1c24] text-[#ed1c24] bg-red-50'
                      : 'border-gray-200 text-gray-500 hover:border-[#ed1c24] hover:text-[#ed1c24]'
                    }`}
                >
                  <FiFilter size={13} />
                  Filter
                  {activeFilterCount > 0 && (
                    <span className="bg-[#ed1c24] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                  <FiChevronDown size={12} className={`transition-transform ${showFilterPanel ? 'rotate-180' : ''}`} />
                </button>

                {/* Filter dropdown panel */}
                {showFilterPanel && (
                  <div className="absolute right-0 top-11 z-20 bg-white border border-gray-100 rounded-xl shadow-lg p-4 w-64 space-y-4">

                    {/* Date filter */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Filter by Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] text-gray-700"
                        />
                        {dateFilter && (
                          <button
                            onClick={() => setDateFilter('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <FiX size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Status filter */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Filter by Status
                      </label>
                      <div className="relative">
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] text-gray-700 appearance-none bg-white"
                        >
                          <option value="">All Statuses</option>
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={13} />
                      </div>
                    </div>

                    {/* Clear filters */}
                    {(dateFilter || statusFilter) && (
                      <button
                        onClick={() => { setDateFilter(''); setStatusFilter(''); }}
                        className="w-full text-xs text-[#ed1c24] border border-[#ed1c24] rounded-lg py-1.5 hover:bg-red-50 transition-colors font-medium"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active filter tags */}
          {(dateFilter || statusFilter) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {dateFilter && (
                <span className="flex items-center gap-1 text-xs bg-red-50 text-[#ed1c24] border border-red-100 px-2.5 py-1 rounded-full font-medium">
                  📅 {dateFilter}
                  <button onClick={() => setDateFilter('')}><FiX size={11} /></button>
                </span>
              )}
              {statusFilter && (
                <span className="flex items-center gap-1 text-xs bg-red-50 text-[#ed1c24] border border-red-100 px-2.5 py-1 rounded-full font-medium">
                  {statusFilter}
                  <button onClick={() => setStatusFilter('')}><FiX size={11} /></button>
                </span>
              )}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <p className="text-sm text-gray-400 py-6 text-center animate-pulse">Loading orders…</p>
          )}

          {/* Order list */}
          {!loading && (
            <>
              <div className="divide-y divide-gray-100">
                {displayOrders.length === 0 && (
                  <p className="text-sm text-gray-400 py-6 text-center">No orders found.</p>
                )}
                {displayOrders.map((order) => (
                  <div
                    key={order.id}
                    className="py-5 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
                  >
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
                      {order.colors.length > 0 && (
                        <p className="text-xs text-gray-500">
                          <span className="font-medium text-gray-700">Colors:</span>{' '}
                          {expandedColors[order.id]
                            ? order.colors.join(', ')
                            : order.colors.slice(0, 5).join(', ')}
                          {order.colors.length > 5 && (
                            <button
                              onClick={() => toggleColors(order.id)}
                              className="ml-1 text-[#ed1c24] hover:underline font-medium"
                            >
                              {expandedColors[order.id]
                                ? ' Show less'
                                : ` +${order.colors.length - 5} more`}
                            </button>
                          )}
                        </p>
                      )}
                      {order.tracking && (
                        <p className="text-xs text-gray-500">
                          <span className="font-medium text-gray-700">Tracking:</span>{' '}
                          <span className="text-[#ed1c24] hover:underline cursor-pointer">
                            {order.tracking}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Right — amount + buttons */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Total Amount</p>
                        <p className="text-xl font-bold text-gray-900">
                          {order.couponAmount > 0
                            ? `$${order.couponAmount.toFixed(2)}`
                            : order.total}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReorder(order.rawId)}
                          disabled={reorderingId === order.rawId}
                          className="flex items-center gap-1.5 bg-[#ed1c24] hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 text-white text-xs font-semibold px-4 py-2 rounded-full"
                        >
                          {reorderingId === order.rawId ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Loading…
                            </>
                          ) : (
                            <><FiRefreshCw size={11} /> Reorder</>
                          )}
                        </button>

                        <button
                          onClick={() => router.push(`/orders/${order.rawId}`)}
                          className="border border-[#ed1c24] text-[#ed1c24] hover:bg-[#ed1c24] hover:text-white transition-colors duration-200 text-xs font-semibold px-4 py-2 rounded-full"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Pagination ── */}
              <Pagination {...paginationProps} />
            </>
          )}

        </div>
      </div>
    </div>
  );
}