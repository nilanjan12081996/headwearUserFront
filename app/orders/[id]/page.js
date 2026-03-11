'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { GoHome } from 'react-icons/go';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { FiDownload, FiRefreshCw, FiPackage, FiMapPin, FiExternalLink, FiFile } from 'react-icons/fi';
import { HiOutlineClock } from 'react-icons/hi';

import list_banner from '../../assets/imagesource/list_banner.png';
import { getSingleOrder, getReorderPreview, getInvoiceByOrder, downloadInvoice } from '../../reducers/OrdersSlice';
import { FaPalette } from 'react-icons/fa';
import Banner from '../../ui/Banner';

const getStatusColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('received')) return 'bg-orange-100 text-orange-700';
    if (s.includes('submitted')) return 'bg-blue-100 text-blue-700';
    if (s.includes('invoice')) return 'bg-indigo-100 text-indigo-700';
    if (s.includes('payment')) return 'bg-green-100 text-green-700';
    if (s.includes('terms')) return 'bg-yellow-100 text-yellow-700';
    if (s.includes('shipped')) return 'bg-purple-100 text-purple-700';
    if (s.includes('delivered')) return 'bg-teal-100 text-teal-700';
    return 'bg-gray-100 text-gray-700';
};

const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    let d;
    if (typeof dateStr === 'string' && dateStr.match(/^\d{2}-\d{2}-\d{4}/)) {
        const [datePart, timePart] = dateStr.split(' ');
        const [dd, mm, yyyy] = datePart.split('-');
        d = new Date(`${yyyy}-${mm}-${dd}${timePart ? ' ' + timePart : ''}`);
    } else {
        d = new Date(dateStr);
    }
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
    }) + ' at ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const ALL_STAGES = [
    'Order received from customer',
    'Order submitted',
    'Customer Invoice sent',
    'Payment Received',
    'Terms Given',
    'Order Shipped',
    'Order delivered',
];

export default function OrderDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const { selectedOrder, detailLoading, reorderPreviewLoading, invoiceDownloading } = useSelector((state) => state.order ?? {});

    // Collapsible state for colors — per group (keyed by group.id)
    const [expandedColors, setExpandedColors] = useState({});
    const toggleColors = (groupId) =>
        setExpandedColors((prev) => ({ ...prev, [groupId]: !prev[groupId] }));

    // Collapsible state for decoration colors
    const [expandedDecoColors, setExpandedDecoColors] = useState(false);

    useEffect(() => {
        if (id) dispatch(getSingleOrder(id));
    }, [id, dispatch]);

    // Reorder: prefetch preview then navigate to reorder-checkout
    const handleReorderClick = async () => {
        await dispatch(getReorderPreview(id));
        router.push(`/reorder-checkout?order_id=${id}`);
    };

    if (detailLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-sm text-gray-400 animate-pulse">Loading order details…</p>
            </div>
        );
    }

    if (!detailLoading && !selectedOrder) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3">
                <p className="text-sm text-gray-400">Order not found.</p>
                <button
                    onClick={() => router.push('/orders')}
                    className="text-xs text-[#ed1c24] border border-[#ed1c24] px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
                >
                    Back to Orders
                </button>
            </div>
        );
    }

    const { order, stages, artwork, address } = selectedOrder;

    const orderNumber = order?.orderNumber ?? `ORD-${id}`;
    const orderStatus = order?.orderStatus ?? '';
    const createdAt = order?.createdAt ?? '';
    const grandTotal = order?.grandTotalAmount ?? 0;
    const groups = order?.groups ?? [];

    const stageData = stages?.data ?? null;
    const currentStage = stageData?.statusName ?? orderStatus;
    const stageUpdatedAt = stageData?.updatedAt ?? null;
    const currentStageIdx = ALL_STAGES.findIndex(
        (s) => s.toLowerCase() === (currentStage || '').toLowerCase()
    );

    const art = artwork ?? null;

    const addressList = Array.isArray(address) ? address : (Array.isArray(address?.data) ? address.data : []);
    const shippingAddr = addressList.find((a) => a.addressType === 'SHIPPING') ?? addressList[0] ?? null;

    const trackingNumber = order?.trackingNumber ?? null;

    const BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_URL;

    // All unique decoration colors across groups
    const allDecoColors = [...new Map(
        groups.flatMap((g) => g.hatColors || []).map((c) => [c.id, c])
    ).values()];


    const handleDownloadInvoice = async () => {

        const infoResult = await dispatch(getInvoiceByOrder(id));

        if (getInvoiceByOrder.fulfilled.match(infoResult)) {
            const invoiceId = infoResult.payload?.id ?? id;

            const downloadResult = await dispatch(downloadInvoice(invoiceId));

            if (downloadInvoice.fulfilled.match(downloadResult)) {
                const blob = downloadResult.payload.blob;
                const url = window.URL.createObjectURL(
                    new Blob([blob], { type: 'application/pdf' })
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Invoice-${orderNumber}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <Banner />
            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-5">
                <ul className="flex items-center gap-2">
                    <li>
                        <Link href="/" passHref>
                            <GoHome className="text-[#666666] text-xl" />
                        </Link>
                    </li>
                    <li><MdOutlineArrowForwardIos className="text-[#666666] text-xs" /></li>
                    <li>
                        <Link href="/orders" className="text-[#666666] text-sm hover:text-[#ed1c24]">
                            Orders
                        </Link>
                    </li>
                    <li><MdOutlineArrowForwardIos className="text-[#666666] text-xs" /></li>
                    <li className="text-[#ED1C24] text-sm font-medium">Order Details</li>
                </ul>
            </div>

            {/* Page header */}
            <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{orderNumber}</h1>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(orderStatus)}`}>
                            {orderStatus}
                        </span>
                        <span className="text-xs text-gray-400">Created {formatDate(createdAt)}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleDownloadInvoice}
                        disabled={invoiceDownloading}
                        className="flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:border-[#ed1c24] hover:text-[#ed1c24] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-xs font-semibold px-4 py-2.5 rounded-full"
                    >
                        {invoiceDownloading ? (
                            <>
                                <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Downloading…
                            </>
                        ) : (
                            <><FiDownload size={13} /> Download Invoice</>
                        )}
                    </button>
                    <button
                        onClick={handleReorderClick}
                        disabled={reorderPreviewLoading}
                        className="flex items-center gap-1.5 bg-[#ed1c24] hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white text-xs font-semibold px-4 py-2.5 rounded-full"
                    >
                        {reorderPreviewLoading ? (
                            <>
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Loading…
                            </>
                        ) : (
                            <><FiRefreshCw size={13} /> Reorder</>
                        )}
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-6 pb-20 space-y-5">

                {/* ── Order Timeline ── */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-5">
                        <HiOutlineClock className="text-[#ed1c24]" size={16} />
                        Order Timeline
                    </h2>
                    <div className="relative">
                        {ALL_STAGES.map((stageName, idx) => {
                            const isCompleted = idx <= currentStageIdx;
                            const isCurrent = idx === currentStageIdx;
                            const isLast = idx === ALL_STAGES.length - 1;
                            return (
                                <div key={stageName} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-3 h-3 rounded-full border-2 mt-0.5 shrink-0 transition-colors ${isCompleted
                                            ? 'bg-[#ed1c24] border-[#ed1c24]'
                                            : 'bg-white border-gray-300'
                                            }`} />
                                        {!isLast && (
                                            <div className={`w-0.5 flex-1 my-1 min-h-[20px] ${isCompleted && idx < currentStageIdx ? 'bg-[#ed1c24]' : 'bg-gray-200'}`} />
                                        )}
                                    </div>
                                    <div className="pb-5">
                                        <p className={`text-sm font-semibold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                            {stageName}
                                        </p>
                                        {isCurrent && stageUpdatedAt && (
                                            <p className="text-xs text-gray-400 mt-0.5">{formatDate(stageUpdatedAt)}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Shipping info (if tracking) ── */}
                {trackingNumber && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4">
                            <FiPackage className="text-[#ed1c24]" size={15} />
                            Shipping Information
                        </h2>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Tracking Number</p>
                                <p className="text-sm font-semibold text-gray-900">{trackingNumber}</p>
                            </div>
                            <button className="flex items-center gap-1.5 bg-gray-900 hover:bg-[#ed1c24] transition-colors text-white text-xs font-semibold px-4 py-2.5 rounded-full">
                                Track Package <FiExternalLink size={12} />
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Order Items + Shipping Address (2 col) ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    {/* Order Items */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4">
                            <FiPackage className="text-[#ed1c24]" size={15} />
                            Order Items
                        </h2>
                        <div className="space-y-3">
                            {groups.map((group) => {
                                const totalQty = (group.items || []).reduce((s, i) => s + (i.quantity || 0), 0);
                                const unitPrice = group.items?.[0]?.unitPrice ?? 0;
                                const lineSubtotal = (group.items || []).reduce((s, i) => s + (i.lineSubtotal || 0), 0);
                                const colorNames = (group.hatColors || []).map((c) => c.name);
                                const isExpanded = expandedColors[group.id];
                                const visibleColors = isExpanded ? colorNames : colorNames.slice(0, 3);

                                return (
                                    <div key={group.id} className="flex justify-between items-start pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{group.hatName}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {visibleColors.join(', ')}
                                                {colorNames.length > 3 && (
                                                    <button
                                                        onClick={() => toggleColors(group.id)}
                                                        className="ml-1 text-[#ed1c24] hover:underline font-medium"
                                                    >
                                                        {isExpanded
                                                            ? ' Show less'
                                                            : ` +${colorNames.length - 3} more`}
                                                    </button>
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-400">{totalQty} × ${unitPrice.toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">${lineSubtotal.toFixed(2)}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                            <p className="text-sm font-semibold text-gray-700">Total</p>
                            <p className="text-xl font-bold text-gray-900">${Number(grandTotal).toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4">
                            <FiMapPin className="text-[#ed1c24]" size={15} />
                            Shipping Address
                        </h2>
                        {shippingAddr ? (
                            <div className="text-sm text-gray-700 space-y-1">
                                {shippingAddr.line1 && <p>{shippingAddr.line1}</p>}
                                {shippingAddr.line2 && <p>{shippingAddr.line2}</p>}
                                {(shippingAddr.city || shippingAddr.state || shippingAddr.postalCode) && (
                                    <p>{[shippingAddr.city, shippingAddr.state, shippingAddr.postalCode].filter(Boolean).join(', ')}</p>
                                )}
                                {shippingAddr.country && <p>{shippingAddr.country}</p>}
                            </div>
                        ) : (
                            <p className="text-xs text-gray-400">No address on file.</p>
                        )}
                    </div>
                </div>

                {/* ── Decorations / Artwork ── */}
                {art && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
                        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4">
                            <FaPalette className="text-[#ed1c24]" size={15} />
                            Decorations
                        </h2>
                        <div className="border border-gray-100 rounded-lg p-3 sm:p-4 space-y-3">

                            {/* Top row: badges + file link */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">

                                {/* Left: all info */}
                                <div className="space-y-1.5 min-w-0">
                                    {art.DecorationTypeName && (
                                        <span className="inline-block text-xs font-bold bg-[#ed1c24] text-white px-2.5 py-0.5 rounded-full">
                                            {art.DecorationTypeName}
                                        </span>
                                    )}
                                    {art.embroideryType && (
                                        <p className="text-xs text-gray-400 break-words">
                                            <span className="font-medium text-gray-600">Embroidery Type: </span>
                                            {art.embroideryType.replace(/_/g, ' ')}
                                        </p>
                                    )}
                                    {art.logoPlacement && (
                                        <div>
                                            <p className="text-xs font-medium text-gray-600 mb-1">Placement:</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {art.logoPlacement.split(',').map((p) => (
                                                    <span
                                                        key={p}
                                                        className="text-xs font-semibold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-full capitalize"
                                                    >
                                                        {p.trim().replace(/_/g, ' ')}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {art.placementNotes && (
                                        <p className="text-xs text-gray-400 leading-relaxed break-words">
                                            <span className="font-medium text-gray-600">Placement Notes: </span>
                                            {art.placementNotes}
                                        </p>
                                    )}
                                    {art.setupPlanName && (
                                        <p className="text-xs text-gray-400 break-words">
                                            <span className="font-medium text-gray-600">Setup Plan: </span>
                                            {art.setupPlanName}
                                        </p>
                                    )}
                                    {art.orderNotes && (
                                        <p className="text-xs text-gray-400 leading-relaxed break-words">
                                            <span className="font-medium text-gray-600">Order Notes: </span>
                                            {art.orderNotes}
                                        </p>
                                    )}
                                </div>

                                {/* File link — full width on mobile, shrink on desktop */}
                                {art.originalFileUrl && (
                                    <a
                                        href={`${BASE_URL}${art.originalFileUrl}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-1.5 text-xs text-[#ed1c24] hover:underline
                                   border border-red-100 px-3 py-1.5 rounded-full
                                   w-full sm:w-auto sm:shrink-0 sm:self-start
                                   justify-center sm:justify-start"
                                    >
                                        <FiFile size={13} />
                                        <span className="truncate max-w-[180px] sm:max-w-[140px]">
                                            {art.originalFileUrl.split('/').pop()}
                                        </span>
                                        <FiExternalLink size={11} className="shrink-0" />
                                    </a>
                                )}
                            </div>

                            {/* Colors */}
                            {allDecoColors.length > 0 && (
                                <div>
                                    <p className="text-xs text-gray-400 leading-relaxed break-words">
                                        <span className="font-medium text-gray-600">Colors: </span>
                                        {(expandedDecoColors
                                            ? allDecoColors
                                            : allDecoColors.slice(0, 5)
                                        ).map((c) => c.name).join(', ')}
                                        {allDecoColors.length > 5 && (
                                            <button
                                                onClick={() => setExpandedDecoColors((p) => !p)}
                                                className="ml-1 text-[#ed1c24] hover:underline font-medium"
                                            >
                                                {expandedDecoColors
                                                    ? ' Show less'
                                                    : ` +${allDecoColors.length - 5} more`}
                                            </button>
                                        )}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Attached Files ── */}
                {art?.originalFileUrl && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4">
                            <FiFile className="text-[#ed1c24]" size={15} />
                            Attached Files
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[art.originalFileUrl].map((fileUrl) => {
                                const fileName = fileUrl.split('/').pop();
                                const fullUrl = `${BASE_URL}${fileUrl}`;
                                const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileName);
                                return (
                                    <div
                                        key={fileUrl}
                                        className="border border-gray-100 rounded-lg p-3 flex items-center justify-between gap-3 hover:border-red-200 transition-colors"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            {isImage ? (
                                                <div className="w-10 h-10 rounded-md overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                                                    <img
                                                        src={fullUrl}
                                                        alt={fileName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-md border border-gray-100 shrink-0 bg-gray-50 flex items-center justify-center">
                                                    <FiFile size={18} className="text-[#ed1c24]" />
                                                </div>
                                            )}
                                            <p className="text-xs text-gray-700 font-medium truncate">{fileName}</p>
                                        </div>
                                        <a
                                            href={fullUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="shrink-0 text-gray-400 hover:text-[#ed1c24] transition-colors"
                                        >
                                            <FiExternalLink size={14} />
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}