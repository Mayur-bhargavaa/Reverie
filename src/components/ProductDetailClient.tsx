"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/data/products";
import { Minus, Plus, Star, ChevronDown, ChevronUp } from "lucide-react";
import SizeGuideModal from "./SizeGuideModal";
import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";

type Props = {
  product: Product;
};

export default function ProductDetailClient({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addedMsg, setAddedMsg] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addItem } = useCartStore();
  const { add: addToRecentlyViewed } = useRecentlyViewedStore();

  useEffect(() => { addToRecentlyViewed(product); }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, selectedColor);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 tracking-wide mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-black transition-colors">Products</Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
        {/* Images */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f2ef]">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-white text-black text-[10px] tracking-widest uppercase px-3 py-1.5 font-medium">
                New
              </span>
            )}
            {product.isSale && (
              <span className="absolute top-4 left-4 bg-black text-white text-[10px] tracking-widest uppercase px-3 py-1.5 font-medium">
                Sale
              </span>
            )}
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 aspect-[3/4] overflow-hidden bg-[#f5f2ef] border-2 transition-colors ${
                    selectedImage === i ? "border-black" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-2">
              {product.category}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-light mb-3">{product.name}</h1>
            {/* Price */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl font-medium">${product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-base">${product.originalPrice}</span>
              )}
              {product.isSale && product.originalPrice && (
                <span className="text-xs text-red-600 font-medium">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={13}
                    className={
                      star <= Math.round(product.rating)
                        ? "fill-black text-black"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Color selector */}
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase text-gray-600 mb-3">
              Color: <span className="text-black font-medium">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  title={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? "border-black scale-110"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-widest uppercase text-gray-600">Size</p>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs underline underline-offset-2 text-gray-500 hover:text-black transition-colors"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] h-12 px-3 border text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-200 text-gray-700 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-xs text-gray-400 mt-2">Please select a size</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase text-gray-600 mb-3">Quantity</p>
            <div className="inline-flex items-center border border-gray-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <Minus size={13} />
              </button>
              <span className="px-5 text-sm font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full py-4 text-xs tracking-widest uppercase font-medium transition-all ${
              selectedSize
                ? addedMsg
                  ? "bg-green-700 text-white"
                  : "bg-black text-white hover:bg-black/80"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {addedMsg ? "Added to Cart ✓" : "Add to Cart"}
          </button>

          {/* Description */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Details accordion */}
          <div className="mt-4 border-t border-gray-100">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full flex items-center justify-between py-4 text-xs tracking-widest uppercase font-medium hover:opacity-70 transition-opacity"
            >
              Product Details
              {detailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {detailsOpen && (
              <ul className="pb-4 space-y-2">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
