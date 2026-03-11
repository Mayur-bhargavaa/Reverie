"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 250 ? 0 : 12;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1500);
  };

  if (items.length === 0 && !submitting) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 gap-5">
        <h1 className="font-serif text-3xl font-light">Your cart is empty</h1>
        <p className="text-sm text-gray-400">Add some items before checking out.</p>
        <Link
          href="/products"
          className="mt-2 bg-black text-white text-xs tracking-widest uppercase px-8 py-4 hover:bg-black/80 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16">

          {/* ── Left: Form ── */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Logo */}
            <Link href="/" className="block font-serif text-2xl tracking-[0.25em] uppercase font-light mb-8">
              Reverie
            </Link>

            {/* Contact */}
            <section className="bg-white p-6 md:p-8 space-y-5">
              <h2 className="font-serif text-xl font-light">Contact</h2>
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                />
              </div>
            </section>

            {/* Shipping */}
            <section className="bg-white p-6 md:p-8 space-y-5">
              <h2 className="font-serif text-xl font-light">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">First Name</label>
                  <input
                    name="firstName"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">Last Name</label>
                  <input
                    name="lastName"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">Address</label>
                <input
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">City</label>
                  <input
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">State</label>
                  <input
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">ZIP</label>
                  <input
                    name="zip"
                    required
                    value={form.zip}
                    onChange={handleChange}
                    className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white p-6 md:p-8 space-y-5">
              <h2 className="font-serif text-xl font-light">Payment</h2>
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">Card Number</label>
                <input
                  name="cardNumber"
                  required
                  maxLength={19}
                  value={form.cardNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
                    setForm((p) => ({ ...p, cardNumber: val }));
                  }}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">Expiry</label>
                  <input
                    name="expiry"
                    required
                    maxLength={5}
                    value={form.expiry}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1/$2").slice(0, 5);
                      setForm((p) => ({ ...p, expiry: val }));
                    }}
                    placeholder="MM/YY"
                    className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">CVV</label>
                  <input
                    name="cvv"
                    required
                    maxLength={4}
                    value={form.cvv}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setForm((p) => ({ ...p, cvv: val }));
                    }}
                    placeholder="123"
                    className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">Name on Card</label>
                <input
                  name="nameOnCard"
                  required
                  value={form.nameOnCard}
                  onChange={handleChange}
                  className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                />
              </div>
            </section>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white text-xs tracking-widest uppercase py-5 font-medium hover:bg-black/80 transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
            >
              <Lock size={13} />
              {submitting ? "Processing…" : `Pay $${total.toFixed(2)}`}
            </button>

            <p className="text-xs text-center text-gray-400">
              This is a demo checkout — no real payment is processed.
            </p>
          </form>

          {/* ── Right: Order Summary ── */}
          <div className="lg:sticky lg:top-24 h-fit">
            {/* Mobile toggle */}
            <button
              onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
              className="lg:hidden w-full flex items-center justify-between bg-white px-6 py-4 border border-gray-100 mb-4"
            >
              <span className="text-xs tracking-widest uppercase font-medium">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <div className="flex items-center gap-3">
                <span className="font-medium">${total.toFixed(2)}</span>
                {orderSummaryOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </div>
            </button>

            <div className={`bg-white p-6 md:p-8 space-y-6 ${!orderSummaryOpen ? "hidden lg:block" : ""}`}>
              <h2 className="font-serif text-xl font-light hidden lg:block">Order Summary</h2>

              {/* Items */}
              <ul className="divide-y divide-gray-100 space-y-0">
                {items.map((item) => (
                  <li key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 py-4">
                    <div className="relative w-16 h-20 flex-shrink-0 bg-[#f5f2ef] overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 bg-gray-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.selectedSize} · {item.selectedColor}</p>
                      <p className="text-sm font-medium mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-base border-t border-gray-100 pt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <p className="text-xs text-green-700 bg-green-50 px-3 py-2">
                  You qualify for free shipping!
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
