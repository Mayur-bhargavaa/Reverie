"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 gap-6">
      <CheckCircle size={56} strokeWidth={1.2} className="text-green-600" />
      <div>
        <h1 className="font-serif text-4xl font-light mb-3">Order Confirmed!</h1>
        <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
          Thank you for your order. A confirmation has been sent to your email.
          Your items will be shipped within 2–3 business days.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link
          href="/products"
          className="bg-black text-white text-xs tracking-widest uppercase px-8 py-4 hover:bg-black/80 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="border border-black text-black text-xs tracking-widest uppercase px-8 py-4 hover:bg-black hover:text-white transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
