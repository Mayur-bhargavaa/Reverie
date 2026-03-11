"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useWishlistStore } from "@/store/wishlistStore";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggle, isWishlisted } = useWishlistStore();

  useEffect(() => { setMounted(true); }, []);

  const wishlisted = mounted && isWishlisted(product.id);

  return (
    <div
      className="group block relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Wishlist button */}
      <button
        onClick={(e) => { e.preventDefault(); toggle(product); }}
        className={`absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200 ${
          hovered || wishlisted ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          size={15}
          className={wishlisted ? "fill-black text-black" : "text-gray-600"}
        />
      </button>

      <Link href={`/products/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f2ef]">
          <Image
            src={hovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-white text-black text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium">
                New
              </span>
            )}
            {product.isSale && (
              <span className="bg-black text-white text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium">
                Sale
              </span>
            )}
          </div>

          {/* Quick color swatches */}
          {product.colors.length > 1 && (
            <div className="absolute bottom-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.colors.map((color) => (
                <div
                  key={color.name}
                  title={color.name}
                  className="w-4 h-4 rounded-full border border-white/60 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-medium text-gray-900 tracking-wide">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <p className="text-xs text-gray-400 tracking-wide">
            {product.colors.length} color{product.colors.length > 1 ? "s" : ""}
          </p>
        </div>
      </Link>
    </div>
  );
}
