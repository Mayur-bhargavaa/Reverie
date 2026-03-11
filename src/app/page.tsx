import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, collections } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Collections */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">Explore</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-[#f0ece7]"
            >
              <Image
                src={col.image}
                alt={col.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-white text-center px-4">
                <h3 className="font-serif text-2xl md:text-3xl font-light mb-1">{col.name}</h3>
                <p className="text-xs tracking-widest opacity-80">{col.productCount} styles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">Just In</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">New Arrivals</h2>
          </div>
          <Link
            href="/collections/new-arrivals"
            className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            View All <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden my-8">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85"
          alt="The Summer Edit"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-xs tracking-[0.35em] uppercase mb-4 opacity-80">Limited Time</p>
          <h2 className="font-serif text-5xl md:text-7xl font-light tracking-wide mb-6">
            The Summer Edit
          </h2>
          <p className="text-sm text-white/75 max-w-sm leading-relaxed mb-8">
            Curated pieces for warm days and long evenings. Up to 40% off.
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 border border-white text-white text-xs tracking-widest uppercase px-8 py-4 font-medium hover:bg-white hover:text-black transition-all"
          >
            Shop the Edit
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">Curated For You</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Best Sellers</h2>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            Shop All <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 border border-black text-black text-xs tracking-widest uppercase px-10 py-4 font-medium hover:bg-black hover:text-white transition-all"
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Shop the Look — editorial split */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-20">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">Styled For You</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Shop the Look</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
              label: "The City Look",
              sub: "Tailored & effortless",
              href: "/collections/tops",
            },
            {
              img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
              label: "Weekend Ready",
              sub: "Casual sophistication",
              href: "/collections/dresses",
            },
            {
              img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
              label: "Evening Out",
              sub: "Dressed to impress",
              href: "/collections/new-arrivals",
            },
          ].map((look) => (
            <Link key={look.label} href={look.href} className="group relative aspect-[3/4] overflow-hidden block bg-[#f0ece7]">
              <Image src={look.img} alt={look.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs tracking-widest uppercase opacity-70 mb-1">{look.sub}</p>
                <h3 className="font-serif text-2xl font-light mb-3">{look.label}</h3>
                <span className="text-xs tracking-widest uppercase underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sustainability — full-width split */}
      <section className="bg-[#2d2926] text-white overflow-hidden">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80"
              alt="Sustainability"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-10 md:px-16 py-16 md:py-24">
            <p className="text-xs tracking-[0.35em] uppercase text-white/50 mb-5">Our Commitment</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-snug mb-6">
              Fashion shouldn&apos;t cost the Earth
            </h2>
            <p className="text-white/70 leading-relaxed mb-4 text-sm">
              We believe getting dressed shouldn&apos;t be a choice between looking good and doing good. That&apos;s why every fabric we use, every factory we work with, and every decision we make is guided by sustainability.
            </p>
            <p className="text-white/70 leading-relaxed mb-8 text-sm">
              From TENCEL™ to deadstock fabrics, we source responsibly. Our factories are audited for fair wages and safe conditions. And we offset 100% of our shipping emissions.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-10 border-t border-white/20 pt-8">
              {[["75%", "Sustainable fabrics"], ["100%", "Carbon offset shipping"], ["B Corp", "Certified since 2015"]].map(([stat, label]) => (
                <div key={label}>
                  <div className="font-serif text-2xl font-light mb-1">{stat}</div>
                  <div className="text-xs text-white/50 leading-snug">{label}</div>
                </div>
              ))}
            </div>
            <Link href="/products" className="self-start inline-flex items-center gap-3 border border-white/60 text-white text-xs tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-black transition-all">
              Shop Responsibly <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-10 bg-[#faf9f7]">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">What They Say</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">Customer Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "I wore the Aria Wrap Dress to three events in one week and got compliments every single time. The fabric is incredibly soft and the fit is perfect.",
                name: "Sophia R.",
                location: "New York, NY",
                product: "Aria Wrap Dress",
              },
              {
                quote: "Finally a brand that makes me feel good about what I'm buying. The quality is outstanding and knowing it's sustainably made makes me love it even more.",
                name: "Camille D.",
                location: "Los Angeles, CA",
                product: "Celeste Slip Dress",
              },
              {
                quote: "The Maison Blazer is my go-to for everything — meetings, dinners, weekends. It looks expensive and it lasts. Worth every penny.",
                name: "Isabelle M.",
                location: "Chicago, IL",
                product: "Maison Blazer",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white p-8 border border-gray-100 flex flex-col">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-black text-xs">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm flex-1 mb-6 italic">&quot;{t.quote}&quot;</p>
                <div className="border-t border-gray-100 pt-5">
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.location} · {t.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Guide teasers */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">From the Journal</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">Style Guides</h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase underline underline-offset-4 hover:opacity-60 transition-opacity">
            Read All <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
              tag: "Styling Tips",
              title: "10 Ways to Style a Slip Dress",
              desc: "The slip dress is the most versatile piece in your wardrobe. Here's how to make it work from morning to midnight.",
              date: "March 5, 2026",
            },
            {
              img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
              tag: "Trend Report",
              title: "The Colors Defining Spring 2026",
              desc: "From warm terracottas to soft lavenders — we break down the season's most wearable palette.",
              date: "Feb 28, 2026",
            },
            {
              img: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800&q=80",
              tag: "Sustainability",
              title: "What Makes a Fabric Truly Sustainable?",
              desc: "We go behind the scenes of our fabric sourcing process and explain why not all \"eco\" labels are created equal.",
              date: "Feb 14, 2026",
            },
          ].map((post) => (
            <Link key={post.title} href="/products" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f0ece7] mb-5">
                <Image src={post.img} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">{post.tag} · {post.date}</p>
              <h3 className="font-serif text-xl font-light mb-2 group-hover:underline underline-offset-4 transition-all">{post.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{post.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Press / As Seen In */}
      <section className="border-y border-gray-100 py-14 px-6 md:px-10">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-center text-xs tracking-[0.35em] uppercase text-gray-400 mb-10">As Seen In</p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {["Vogue", "Harper's Bazaar", "Elle", "The New York Times", "Refinery29", "Who What Wear"].map((pub) => (
              <span key={pub} className="font-serif text-xl md:text-2xl font-light text-gray-300 hover:text-gray-700 transition-colors duration-300 cursor-default tracking-wide">
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram / Community grid */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-20">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">@wearreverie</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">Join the Community</h2>
          <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">Tag us in your looks for a chance to be featured. Use #WearReverie.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=600&q=80",
            "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80",
            "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=80",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
            "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80",
            "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=600&q=80",
            "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=600&q=80",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
          ].map((src, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden bg-[#f0ece7] cursor-pointer">
              <Image src={src} alt={`Community photo ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  #WearReverie
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/products" className="inline-flex items-center gap-3 text-xs tracking-widest uppercase underline underline-offset-4 hover:opacity-60 transition-opacity">
            Shop Their Looks <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* Values strip */}
      <section className="bg-[#f5f2ef] py-14 px-6 md:px-10 mt-8">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Sustainably Made",
              desc: "Every piece is crafted with the planet in mind using responsible materials.",
            },
            {
              title: "Free Returns",
              desc: "Changed your mind? Returns are free and easy within 30 days.",
            },
            {
              title: "Certified B Corp",
              desc: "We hold ourselves to the highest social and environmental standards.",
            },
          ].map((item) => (
            <div key={item.title} className="px-4">
              <h3 className="font-serif text-xl font-light mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
