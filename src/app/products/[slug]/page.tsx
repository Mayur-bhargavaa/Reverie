import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Reverie`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <ProductDetailClient product={product} />

      {/* Related Products */}
      {related.length > 0 && (
        <section className="max-w-screen-xl mx-auto px-6 md:px-10 pb-20 border-t border-gray-100 pt-14">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">You May Also Like</p>
            <h2 className="font-serif text-3xl font-light">Complete the Look</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed excludeId={product.id} />
    </>
  );
}
