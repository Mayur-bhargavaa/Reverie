"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";

const leftLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Dresses", href: "/collections/dresses" },
  { label: "Tops", href: "/collections/tops" },
];

const rightLinks = [
  { label: "Bottoms", href: "/collections/bottoms" },
  { label: "Sale", href: "/products" },
  { label: "All", href: "/products" },
];

const allLinks = [...leftLinks, ...rightLinks];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();

  useEffect(() => { setMounted(true); }, []);
  const totalItems = mounted ? getTotalItems() : 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navLinkClass =
    "text-xs tracking-widest uppercase text-gray-800 hover:text-black font-medium transition-colors duration-200 relative group whitespace-nowrap";
  const underline =
    "absolute -bottom-0.5 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full";

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2.5 text-xs tracking-widest uppercase font-light">
        Complimentary shipping on orders over $250 — Use code{" "}
        <span className="font-medium">REVERIE</span>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="h-16 md:h-20 flex items-center">

            {/* ── Mobile: hamburger left, logo center, icons right ── */}
            <div className="flex md:hidden items-center justify-between w-full">
              {/* Left — hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-1 -ml-1 w-16"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              {/* Center — logo */}
              <Link
                href="/"
                className="font-serif text-2xl tracking-[0.25em] uppercase text-black font-light"
              >
                Reverie
              </Link>

              {/* Right — wishlist + cart grouped */}
              <div className="flex items-center gap-4 w-16 justify-end">
                <Link href="/wishlist" className="hover:opacity-60 transition-opacity" aria-label="Wishlist">
                  <Heart size={19} />
                </Link>
                <button
                  onClick={toggleCart}
                  className="relative hover:opacity-60 transition-opacity"
                  aria-label="Cart"
                >
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* ── Desktop: 3-column grid so logo is perfectly centered ── */}
            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center w-full">

              {/* Left nav */}
              <nav className="flex items-center gap-7">
                {leftLinks.map((link) => (
                  <Link key={link.href + link.label} href={link.href} className={navLinkClass}>
                    {link.label}
                    <span className={underline} />
                  </Link>
                ))}
              </nav>

              {/* Logo — truly centered */}
              <Link
                href="/"
                className="font-serif text-2xl lg:text-3xl tracking-[0.25em] uppercase text-black font-light px-8"
              >
                Reverie
              </Link>

              {/* Right nav + icons */}
              <div className="flex items-center justify-end gap-7">
                {rightLinks.map((link) => (
                  <Link key={link.href + link.label} href={link.href} className={navLinkClass}>
                    {link.label}
                    <span className={underline} />
                  </Link>
                ))}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hover:opacity-60 transition-opacity ml-1"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
                <Link href="/wishlist" className="hover:opacity-60 transition-opacity" aria-label="Wishlist">
                  <Heart size={18} />
                </Link>
                <button
                  onClick={toggleCart}
                  className="relative hover:opacity-60 transition-opacity"
                  aria-label="Cart"
                >
                  <ShoppingBag size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="px-6 py-6 flex flex-col gap-5">
              {allLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm tracking-widest uppercase text-gray-800 hover:text-black transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
