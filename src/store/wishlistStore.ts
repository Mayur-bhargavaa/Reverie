"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

type WishlistStore = {
  items: Product[];
  toggle: (product: Product) => void;
  isWishlisted: (id: number) => boolean;
  clear: () => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        set({
          items: exists
            ? get().items.filter((p) => p.id !== product.id)
            : [...get().items, product],
        });
      },
      isWishlisted: (id) => get().items.some((p) => p.id === id),
      clear: () => set({ items: [] }),
    }),
    { name: "reverie-wishlist" }
  )
);
