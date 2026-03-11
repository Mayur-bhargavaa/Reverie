"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim().length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white w-full shadow-xl">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-6">
          {/* Input row */}
          <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for styles, collections…"
              className="flex-1 text-lg outline-none placeholder-gray-300 bg-transparent"
            />
            <button onClick={onClose} className="hover:opacity-60 transition-opacity">
              <X size={20} />
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="py-6">
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-5">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] bg-[#f5f2ef] overflow-hidden mb-2">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="180px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-xs font-medium truncate">{product.name}</p>
                    <p className="text-xs text-gray-400">${product.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {query.trim().length > 1 && results.length === 0 && (
            <div className="py-10 text-center text-gray-400 text-sm">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}

          {/* Popular suggestions */}
          {query.trim().length <= 1 && (
            <div className="py-6 flex flex-wrap gap-2">
              <p className="w-full text-xs tracking-widest uppercase text-gray-400 mb-3">
                Popular
              </p>
              {["Dresses", "New Arrivals", "Tops", "Linen", "Sale"].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs tracking-wide border border-gray-200 px-4 py-2 hover:border-black hover:text-black transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
