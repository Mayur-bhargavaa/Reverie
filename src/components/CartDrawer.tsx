"use client";

import { useEffect, useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transform transition-transform duration-400 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-sm tracking-widest uppercase font-medium">
            Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
          </h2>
          <button onClick={closeCart} className="hover:opacity-60 transition-opacity">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-5">
              <ShoppingBag size={48} strokeWidth={1} className="text-gray-300" />
              <div>
                <p className="text-sm font-medium text-gray-700 tracking-wide">Your cart is empty</p>
                <p className="text-xs text-gray-400 mt-1">Add something beautiful to get started.</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 text-xs tracking-widest uppercase underline underline-offset-4 hover:opacity-60 transition-opacity"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="py-5 flex gap-4"
                >
                  {/* Image */}
                  <div className="relative w-20 h-28 flex-shrink-0 bg-[#f5f2ef] overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="text-sm font-medium hover:underline underline-offset-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Size: {item.selectedSize} · {item.selectedColor}
                      </p>
                      <p className="text-sm font-medium mt-1">${item.product.price}</p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.selectedSize, item.selectedColor)
                        }
                        className="text-gray-400 hover:text-black transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-wide text-gray-600">Subtotal</span>
              <span className="text-sm font-medium">${getTotalPrice().toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400 -mt-2">
              Shipping and taxes calculated at checkout.
            </p>
            <a
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-black text-white text-xs tracking-widest uppercase py-4 font-medium hover:bg-black/80 transition-colors text-center"
            >
              Checkout
            </a>
            <button
              onClick={closeCart}
              className="w-full text-xs tracking-widest uppercase underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
