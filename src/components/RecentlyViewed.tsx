"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";

export default function RecentlyViewed({ excludeId }: { excludeId?: number }) {
  const [mounted, setMounted] = useState(false);
  const { items } = useRecentlyViewedStore();
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  const list = items.filter((p) => p.id !== excludeId).slice(0, 4);
  if (list.length === 0) return null;

  return (
    <section className="max-w-screen-xl mx-auto px-6 md:px-10 pb-20 border-t border-gray-100 pt-14">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">Your History</p>
        <h2 className="font-serif text-3xl font-light">Recently Viewed</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
        {list.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f2ef]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="mt-3 space-y-0.5">
              <p className="text-sm font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
