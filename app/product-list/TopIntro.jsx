'use client';
import { useState } from "react";

export default function TopIntro() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-0 py-6 mb-2">
      <div
        className="relative overflow-hidden rounded-2xl border border-[#ffd6d8]"
        style={{
          background: "linear-gradient(135deg, #fff5f5 0%, #ffffff 50%, #fff0f0 100%)",
          boxShadow: "0 4px 24px rgba(237,28,36,0.08)",
        }}
      >
        {/* Decorative accent bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ed1c24] via-[#ff7379] to-[#ed1c24]" />

        {/* Decorative background circle */}
        <div
          className="absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #ed1c24, transparent)" }}
        />
        <div
          className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #ff7379, transparent)" }}
        />

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #ed1c24, #ff7379)" }}
            >
              {/* Clipboard icon */}
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Ordering Instructions
            </h2>
          </div>

          {/* Always-visible top 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

            {/* Card 1 – Select Your Hats */}
            <div className="bg-white rounded-xl p-4 border border-[#ffd6d8] hover:border-[#ff7379] transition-colors duration-200 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#fff0f0] flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff7379] transition-colors duration-200">
                  <svg className="w-4 h-4 text-[#ed1c24] group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm text-gray-900">Select Your Hats</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Choose your hat style (SKU), then select color and enter quantity.
                Mix styles and colors to reach your minimum.
              </p>
            </div>

            {/* Card 2 – Minimum Order */}
            <div className="bg-white rounded-xl p-4 border border-[#ffd6d8] hover:border-[#ff7379] transition-colors duration-200 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#fff0f0] flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff7379] transition-colors duration-200">
                  <svg className="w-4 h-4 text-[#ed1c24] group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm text-gray-900">Minimum Order</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-bold text-[#ed1c24] text-sm">24 units</span> minimum per logo.
                Styles and colors may be mixed within the same logo order.
              </p>
            </div>

            {/* Card 3 – Pricing */}
            <div className="bg-white rounded-xl p-4 border border-[#ffd6d8] hover:border-[#ff7379] transition-colors duration-200 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#fff0f0] flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff7379] transition-colors duration-200">
                  <svg className="w-4 h-4 text-[#ed1c24] group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm text-gray-900">Pricing</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pricing includes up to <span className="font-semibold text-gray-800">10,000 stitches</span> and
                one embroidery location. Upgrades available on the next page.
              </p>
            </div>

            {/* Card 4 – Production & Guarantee */}
            <div className="bg-white rounded-xl p-4 border border-[#ffd6d8] hover:border-[#ff7379] transition-colors duration-200 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#fff0f0] flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff7379] transition-colors duration-200">
                  <svg className="w-4 h-4 text-[#ed1c24] group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm text-gray-900">Production & Guarantee</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Lead time: <span className="font-semibold text-gray-800">7–12 business days.</span> Backed by
                our <span className="font-semibold text-[#ed1c24]">100% Quality Guarantee</span>.
              </p>
            </div>
          </div>

          {/* Expanded section */}
          {expanded && (
            <div className="mt-5 border-t border-[#ffd6d8] pt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Multiple Logos */}
                <div className="bg-white rounded-xl p-5 border border-[#ffd6d8]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#fff0f0] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#ed1c24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900">Ordering Multiple Logos</h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Each logo requires its own separate 24-unit minimum.</p>
                  <div className="space-y-2">
                    {[
                      "Add all hats for Logo #1 to your cart (minimum 24 units)",
                      "Return and repeat the process for Logo #2",
                      "Each logo must meet the 24-unit minimum independently",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center mt-0.5"
                          style={{ background: "linear-gradient(135deg, #ed1c24, #ff7379)" }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Detail */}
                <div className="bg-white rounded-xl p-5 border border-[#ffd6d8]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[#fff0f0] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#ed1c24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900">What's Included in Pricing</h3>
                  </div>
                  <div className="space-y-2 mb-3">
                    {[
                      "Up to 10,000 stitches",
                      "One embroidery location",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ed1c24] flex-shrink-0" />
                        <p className="text-xs text-gray-600">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#fff5f5] rounded-lg p-3 border border-[#ffd6d8]">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <span className="font-semibold text-[#ed1c24]">Optional upgrades</span> — including patches,
                      second locations, and additional customization — can be selected on the next page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* See More / See Less */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ed1c24] hover:text-[#ff7379] transition-colors duration-200 group"
            >
              {expanded ? "See Less" : "See More Details"}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}