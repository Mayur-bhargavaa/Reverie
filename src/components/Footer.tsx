import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-24">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-2xl md:text-3xl font-light tracking-wide">Stay in the know.</p>
            <p className="text-sm text-white/60 mt-1 tracking-wide">
              New arrivals, stories, and exclusive access — right to your inbox.
            </p>
          </div>
          <form className="flex w-full md:w-auto gap-0 max-w-sm">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm px-4 py-3 outline-none focus:border-white/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-black text-xs tracking-widest uppercase px-6 py-3 font-medium hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h4 className="text-xs tracking-widest uppercase text-white/50 mb-5">Shop</h4>
          <ul className="space-y-3">
            {["New Arrivals", "Dresses", "Tops", "Bottoms", "Sale"].map((item) => (
              <li key={item}>
                <Link
                  href={`/collections/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-widest uppercase text-white/50 mb-5">Help</h4>
          <ul className="space-y-3">
            {["Contact Us", "Shipping & Returns", "Size Guide", "FAQ", "Order Tracking"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-widest uppercase text-white/50 mb-5">About</h4>
          <ul className="space-y-3">
            {["Our Story", "Sustainability", "Careers", "Press", "Stores"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-widest uppercase text-white/50 mb-5">Follow Us</h4>
          <div className="flex gap-4 mb-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
          </div>
          <p className="text-xs text-white/40 leading-relaxed">
            @wearreverie
            <br />
            Share your style with us.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 tracking-wide">
            © {new Date().getFullYear()} Reverie. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((item) => (
              <Link key={item} href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
