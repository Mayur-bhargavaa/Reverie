"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, color) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === size &&
            item.selectedColor === color
        );
        if (existingIndex >= 0) {
          const updated = [...items];
          updated[existingIndex].quantity += 1;
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [...items, { product, quantity: 1, selectedSize: size, selectedColor: color }],
            isOpen: true,
          });
        }
      },

      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        });
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    { name: "reverie-cart" }
  )
);
