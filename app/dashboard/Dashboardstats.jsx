'use client';

import { useDispatch, useSelector } from 'react-redux';
import { BsCurrencyDollar, BsGraphUpArrow } from 'react-icons/bs';
import { getSpendSummary } from '../reducers/OrdersSlice';
import { useEffect, useRef, useState } from 'react';

const STAT_CONFIG = [
    {
        key: 'last30Days',
        label: 'Last 30 Days',
        icon: <BsCurrencyDollar size={16} />,
        iconBg: 'bg-red-50 text-[#ed1c24]',
    },
    {
        key: 'last90Days',
        label: 'Last 90 Days',
        icon: <BsGraphUpArrow size={14} />,
        iconBg: 'bg-orange-50 text-orange-400',
    },
    {
        key: 'last365Days',
        label: 'Last 365 Days',
        icon: <BsGraphUpArrow size={14} />,
        iconBg: 'bg-pink-50 text-pink-400',
    },
    {
        key: 'lifetimeSpend',
        label: 'Lifetime Spend',
        icon: <BsCurrencyDollar size={16} />,
        iconBg: 'bg-red-50 text-[#ed1c24]',
    },
];

// ── Animated counter hook ─────────────────────────────────────
function useCountUp(target, duration = 1200) {
    const [display, setDisplay] = useState(0);
    const rafRef = useRef(null);
    const startRef = useRef(null);
    const prevTarget = useRef(null);

    useEffect(() => {
        if (target === null || target === undefined) return;
        if (target === prevTarget.current) return;
        prevTarget.current = target;

        const to = Number(target);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        startRef.current = null;

        const step = (timestamp) => {
            if (!startRef.current) startRef.current = timestamp;
            const elapsed = timestamp - startRef.current;
            const progress = Math.min(elapsed / duration, 1);
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(to * eased);
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step);
            } else {
                setDisplay(to);
            }
        };

        rafRef.current = requestAnimationFrame(step);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [target, duration]);

    return display;
}

// ── Single stat card ──────────────────────────────────────────
function StatCard({ stat, value, loading }) {
    const animated = useCountUp(loading ? 0 : (value ?? 0));

    const formatted = `$${animated.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.iconBg}`}>
                    {stat.icon}
                </div>
            </div>

            {loading ? (
                <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
            ) : (
                <p className="text-2xl font-bold text-gray-900 tabular-nums">
                    {formatted}
                </p>
            )}
        </div>
    );
}

// ── Main component ────────────────────────────────────────────
export default function DashboardStats() {
    const dispatch = useDispatch();
    const { spendSummary, spendSummaryLoading } = useSelector((state) => state.order ?? {});

    useEffect(() => {
        dispatch(getSpendSummary());
    }, [dispatch]);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_CONFIG.map((stat) => (
                <StatCard
                    key={stat.key}
                    stat={stat}
                    value={spendSummary?.[stat.key]}
                    loading={spendSummaryLoading}
                />
            ))}
        </div>
    );
}