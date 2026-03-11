"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = ["All", "Dresses", "Tops", "Bottoms"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Sale", value: "sale" },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    switch (activeSort) {
      case "newest":       list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew)); break;
      case "price-asc":    list.sort((a, b) => a.price - b.price); break;
      case "price-desc":   list.sort((a, b) => b.price - a.price); break;
      case "sale":         list = list.filter((p) => p.isSale).concat(list.filter((p) => !p.isSale)); break;
    }
    return list;
  }, [activeCategory, activeSort]);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === activeSort)?.label;

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14">
      {/* Page header */}
      <div className="text-center mb-10 border-b border-gray-100 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">Shop</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light">All Products</h1>
        <p className="text-sm text-gray-400 mt-3">{filtered.length} styles</p>
      </div>

      {/* Filter + Sort bar */}
      <div className="flex items-center justify-between mb-8 gap-4">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
                activeCategory === cat
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-600 hover:border-black hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-xs tracking-widest uppercase border border-gray-200 px-4 py-2 hover:border-black transition-colors"
          >
            <SlidersHorizontal size={13} />
            {activeSortLabel}
          </button>
          {showFilters && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowFilters(false)} />
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg z-20 w-52">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setActiveSort(opt.value); setShowFilters(false); }}
                    className={`w-full text-left px-5 py-3 text-xs tracking-wide hover:bg-gray-50 transition-colors ${
                      activeSort === opt.value ? "font-semibold" : ""
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Active filter indicator */}
      {(activeCategory !== "All" || activeSort !== "featured") && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-xs text-gray-400 tracking-wide">Active filters:</span>
          {activeCategory !== "All" && (
            <span className="inline-flex items-center gap-1.5 bg-black text-white text-[11px] tracking-wide px-3 py-1">
              {activeCategory}
              <button onClick={() => setActiveCategory("All")}><X size={11} /></button>
            </span>
          )}
          {activeSort !== "featured" && (
            <span className="inline-flex items-center gap-1.5 bg-black text-white text-[11px] tracking-wide px-3 py-1">
              {activeSortLabel}
              <button onClick={() => setActiveSort("featured")}><X size={11} /></button>
            </span>
          )}
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="font-serif text-2xl font-light text-gray-400 mb-3">No results found</p>
          <button
            onClick={() => { setActiveCategory("All"); setActiveSort("featured"); }}
            className="text-xs tracking-widest uppercase underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

