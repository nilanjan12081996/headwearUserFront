'use client';

import { useSelector } from 'react-redux';
import { FiRefreshCw } from 'react-icons/fi';

export default function ReorderSummary({ orderLoading }) {
  const { reorderPreview, reorderPreviewLoading } = useSelector((state) => state.order ?? {});

  const orderDetails = reorderPreview?.orderDetails ?? null;
  const groups       = orderDetails?.groups       ?? [];
  const grandTotal   = orderDetails?.grandTotalAmount ?? 0;

  return (
    <div className="lg:w-4/12 shrink-0">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-6">

        <h3 className="text-base font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
          Order Summary
        </h3>

        {reorderPreviewLoading && (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-[#ED1C24] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!reorderPreviewLoading && groups.length > 0 && (
          <div className="space-y-3 mb-4">
            {groups.map((group, idx) => {
              const totalQty     = (group.items || []).reduce((s, i) => s + (i.quantity || 0), 0);
              const unitPrice    = group.items?.[0]?.unitPrice ?? 0;
              const lineSubtotal = (group.items || []).reduce((s, i) => s + (i.lineSubtotal || 0), 0);
              const colorNames   = (group.hatColors || []).map((c) => c.name);

              return (
                <div
                  key={group.id ?? idx}
                  className="flex justify-between items-start pb-3 border-b border-gray-50 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{group.hatName || `Group ${idx + 1}`}</p>
                    {colorNames.length > 0 && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {colorNames.slice(0, 3).join(', ')}
                        {colorNames.length > 3 && (
                          <span className="text-[#ED1C24]"> +{colorNames.length - 3} more</span>
                        )}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">{totalQty} × ${Number(unitPrice).toFixed(2)}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 shrink-0">
                    ${Number(lineSubtotal).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {!reorderPreviewLoading && (
          <div className="flex justify-between items-center pt-3 border-t border-gray-100 mb-5">
            <p className="text-sm font-semibold text-gray-700">Grand Total</p>
            <p className="text-xl font-bold text-gray-900">${Number(grandTotal).toFixed(2)}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={orderLoading || reorderPreviewLoading || !reorderPreview}
          className="w-full flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-white text-sm font-semibold px-6 py-3 rounded-full"
        >
          {orderLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Placing Reorder…
            </>
          ) : (
            <>
              <FiRefreshCw size={14} /> Place Reorder
            </>
          )}
        </button>

      </div>
    </div>
  );
}