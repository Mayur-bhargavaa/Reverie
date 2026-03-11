"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show only once per session
    const dismissed = sessionStorage.getItem("newsletter-dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("newsletter-dismissed", "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    sessionStorage.setItem("newsletter-dismissed", "1");
    setTimeout(() => setVisible(false), 2500);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50" onClick={dismiss} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
        <div className="relative bg-white w-full max-w-lg overflow-hidden shadow-2xl">
          {/* Close */}
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 hover:opacity-60 transition-opacity z-10"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Image panel */}
            <div
              className="hidden sm:block bg-cover bg-center min-h-[320px]"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80')" }}
            />

            {/* Content */}
            <div className="px-8 py-10 flex flex-col justify-center">
              {submitted ? (
                <div className="text-center space-y-3">
                  <p className="font-serif text-2xl font-light">Thank you!</p>
                  <p className="text-sm text-gray-500">
                    You're on the list. Expect beautiful things in your inbox soon.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">Exclusive Access</p>
                  <h2 className="font-serif text-2xl font-light mb-2 leading-snug">
                    Be the first to know.
                  </h2>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    Sign up for new arrivals, member-only offers, and 10% off your first order.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white text-xs tracking-widest uppercase py-3.5 font-medium hover:bg-black/80 transition-colors"
                    >
                      Subscribe &amp; Save 10%
                    </button>
                  </form>
                  <button
                    onClick={dismiss}
                    className="mt-4 text-xs text-gray-400 underline underline-offset-2 hover:text-black transition-colors text-center"
                  >
                    No thanks
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
