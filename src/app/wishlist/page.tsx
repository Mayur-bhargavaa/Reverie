"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { items, clear } = useWishlistStore();

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14">
      {/* Header */}
      <div className="text-center mb-12 border-b border-gray-100 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">Saved Items</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light">My Wishlist</h1>
        {mounted && items.length > 0 && (
          <p className="text-sm text-gray-400 mt-3">{items.length} item{items.length !== 1 ? "s" : ""}</p>
        )}
      </div>

      {!mounted ? null : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
          <Heart size={52} strokeWidth={1} className="text-gray-300" />
          <div>
            <p className="font-serif text-2xl font-light text-gray-600 mb-2">Your wishlist is empty</p>
            <p className="text-sm text-gray-400">Save pieces you love by tapping the heart icon.</p>
          </div>
          <Link
            href="/products"
            className="mt-2 bg-black text-white text-xs tracking-widest uppercase px-8 py-4 hover:bg-black/80 transition-colors"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={clear}
              className="text-xs tracking-widest uppercase underline underline-offset-4 text-gray-400 hover:text-black transition-colors"
            >
              Clear Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  );
}
