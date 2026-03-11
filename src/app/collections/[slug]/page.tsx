import { notFound } from "next/navigation";
import Image from "next/image";
import { getCollectionBySlug, getProductsByCollection, collections } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  return {
    title: `${collection.name} — Reverie`,
    description: collection.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const collectionProducts = getProductsByCollection(slug);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-[#e8e3dd]">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="font-serif text-4xl md:text-6xl font-light mb-2">{collection.name}</h1>
          <p className="text-sm text-white/75 max-w-md">{collection.description}</p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-400">{collectionProducts.length} styles</p>
        </div>

        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {collectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl font-light text-gray-400 mb-2">
              No products in this collection yet.
            </p>
            <p className="text-sm text-gray-400">Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
