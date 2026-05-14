'use client';
import { useState, useEffect, useRef } from 'react';

/**
 * HatSearchFilter — Search by name + Brand filter
 *
 * Props:
 *  - brandList        : { data: [{ id, name }] }
 *  - brandWiseHatList : { [brandId]: { list: [{ id, name }] } }
 *  - onFilter         : (filteredMap: { [brandId]: hat[] }) => void
 */
export default function HatSearchFilter({ brandList, brandWiseHatList, onFilter }) {
  const [query, setQuery]                   = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filtersOpen, setFiltersOpen]       = useState(false);
  const [resultCount, setResultCount]       = useState(null);
  const inputRef = useRef(null);

  const brands = brandList?.data || [];

  // ── Filter logic ─────────────────────────────────────────────────────────
  useEffect(() => {
    const q = query.trim().toLowerCase();
    let total = 0;
    const result = {};

    brands.forEach(brand => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(brand.id)) {
        result[brand.id] = [];
        return;
      }

      let filtered = brandWiseHatList?.[brand.id]?.list || [];

      if (q) {
        filtered = filtered.filter(hat => hat.name?.toLowerCase().includes(q));
      }

      result[brand.id] = filtered;
      total += filtered.length;
    });

    setResultCount(total);
    onFilter?.(result);
  }, [query, selectedBrands, brandWiseHatList]);

  const toggleBrand = id =>
    setSelectedBrands(p => p.includes(id) ? p.filter(b => b !== id) : [...p, id]);

  const clearAll = () => { setQuery(''); setSelectedBrands([]); };

  const activeCount = selectedBrands.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
        .hsf-wrap{font-family:'DM Sans',sans-serif;width:100%;margin-bottom:24px}
        .hsf-row{display:flex;align-items:center;gap:10px}
        .hsf-sbox{flex:1;position:relative}
        .hsf-icon{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:#ed1c24;pointer-events:none}
        .hsf-inp{width:100%;padding:13px 44px 13px 46px;border:2px solid #e5e7eb;border-radius:14px;font-size:14px;font-family:'DM Sans',sans-serif;color:#111;background:#fff;outline:none;box-sizing:border-box;transition:border-color .2s,box-shadow .2s}
        .hsf-inp:focus{border-color:#ed1c24;box-shadow:0 0 0 3px rgba(237,28,36,.1)}
        .hsf-inp::placeholder{color:#aaa}
        .hsf-xbtn{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:#f3f4f6;border:none;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6b7280;transition:background .15s}
        .hsf-xbtn:hover{background:#e5e7eb}
        .hsf-fbtn{display:flex;align-items:center;gap:7px;padding:11px 18px;background:#fff;border:2px solid #e5e7eb;border-radius:14px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;color:#374151;cursor:pointer;white-space:nowrap;transition:border-color .2s,color .2s;position:relative;flex-shrink:0}
        .hsf-fbtn:hover,.hsf-fbtn.on{border-color:#ed1c24;color:#ed1c24}
        .hsf-badge{position:absolute;top:-6px;right:-6px;background:#ed1c24;color:#fff;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center}
        .hsf-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
        .hsf-tag{display:flex;align-items:center;gap:5px;padding:4px 10px;background:#fff1f2;border:1px solid #fecdd3;border-radius:999px;font-size:12px;font-weight:500;color:#ed1c24}
        .hsf-tag button{background:none;border:none;cursor:pointer;color:#ed1c24;font-size:14px;line-height:1;padding:0;display:flex}
        .hsf-panel{margin-top:12px;background:#fff;border:2px solid #f0f0f0;border-radius:18px;padding:20px 22px;animation:hsfdown .2s ease}
        @keyframes hsfdown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .hsf-stitle{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9ca3af;margin-bottom:10px}
        .hsf-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:4px}
        .hsf-chip{padding:6px 14px;border:1.5px solid #e5e7eb;border-radius:999px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;color:#374151;background:#fff;user-select:none}
        .hsf-chip:hover{border-color:#ed1c24;color:#ed1c24}
        .hsf-chip.on{border-color:#ed1c24;background:#ed1c24;color:#fff}
        .hsf-foot{display:flex;justify-content:space-between;align-items:center;padding-top:14px;margin-top:14px;border-top:1px solid #f0f0f0}
        .hsf-count{font-size:13px;color:#6b7280}
        .hsf-count strong{color:#ed1c24}
        .hsf-reset{font-size:13px;font-weight:600;color:#9ca3af;background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;transition:color .15s}
        .hsf-reset:hover{color:#ed1c24}
        @media(max-width:480px){.hsf-fbtn span{display:none}.hsf-panel{padding:16px}}
      `}</style>

      <div className="hsf-wrap">

        {/* Search row */}
        <div className="hsf-row">
          <div className="hsf-sbox">
            <svg className="hsf-icon" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
            </svg>
            <input
              ref={inputRef}
              className="hsf-inp"
              type="text"
              placeholder="Search hats by name…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button className="hsf-xbtn" onClick={() => setQuery('')} aria-label="Clear">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* Brand filter button — only show if multiple brands */}
          {brands.length > 1 && (
            <button
              className={`hsf-fbtn ${(filtersOpen || activeCount > 0) ? 'on' : ''}`}
              onClick={() => setFiltersOpen(o => !o)}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Brand</span>
              {activeCount > 0 && <span className="hsf-badge">{activeCount}</span>}
            </button>
          )}
        </div>

        {/* Active brand tags */}
        {selectedBrands.length > 0 && (
          <div className="hsf-tags">
            {selectedBrands.map(id => {
              const b = brands.find(x => x.id === id);
              return b ? (
                <span key={id} className="hsf-tag">
                  {b.name}
                  <button onClick={() => toggleBrand(id)}>×</button>
                </span>
              ) : null;
            })}
          </div>
        )}

        {/* Brand filter panel */}
        {filtersOpen && brands.length > 1 && (
          <div className="hsf-panel">
            <p className="hsf-stitle">Filter by Brand</p>
            <div className="hsf-chips">
              {brands.map(brand => (
                <button
                  key={brand.id}
                  className={`hsf-chip ${selectedBrands.includes(brand.id) ? 'on' : ''}`}
                  onClick={() => toggleBrand(brand.id)}
                >
                  {brand.name}
                </button>
              ))}
            </div>

            <div className="hsf-foot">
              <p className="hsf-count">
                {resultCount !== null
                  ? <><strong>{resultCount}</strong> hat{resultCount !== 1 ? 's' : ''} found</>
                  : 'All hats shown'}
              </p>
              {(query || activeCount > 0) && (
                <button className="hsf-reset" onClick={clearAll}>Clear all</button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}