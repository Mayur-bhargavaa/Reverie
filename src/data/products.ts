export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  collection: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
};

export type Collection = {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
};

export const collections: Collection[] = [
  {
    id: 1,
    name: "New Arrivals",
    slug: "new-arrivals",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
    description: "The latest additions to our curated collection.",
    productCount: 6,
  },
  {
    id: 2,
    name: "Dresses",
    slug: "dresses",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    description: "Effortlessly elegant dresses for every occasion.",
    productCount: 5,
  },
  {
    id: 3,
    name: "Tops",
    slug: "tops",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
    description: "Refined tops crafted with intention.",
    productCount: 4,
  },
  {
    id: 4,
    name: "Bottoms",
    slug: "bottoms",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    description: "Trousers, shorts and skirts for every story.",
    productCount: 4,
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Aria Wrap Dress",
    slug: "aria-wrap-dress",
    price: 248,
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800&q=80",
    ],
    category: "Dresses",
    collection: "dresses",
    description:
      "An effortlessly elegant wrap dress that transitions seamlessly from day to evening. Crafted in a fluid, lightweight fabric with an adjustable tie waist.",
    details: [
      "100% Viscose",
      "Wrap silhouette with adjustable tie",
      "V-neckline",
      "Long sleeves",
      "Machine washable",
      "Model is 5'9\" wearing size XS",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Dusty Rose", hex: "#DCAE96" },
    ],
    isNew: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: 2,
    name: "Celeste Slip Dress",
    slug: "celeste-slip-dress",
    price: 198,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
    ],
    category: "Dresses",
    collection: "dresses",
    description:
      "A minimalist slip dress with a satin finish. The streamlined silhouette makes it your ultimate wardrobe foundation — wear alone or layer under a blazer.",
    details: [
      "100% Silk Satin",
      "Adjustable spaghetti straps",
      "Bias-cut silhouette",
      "Side slit",
      "Dry clean only",
      "Model is 5'10\" wearing size S",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne", hex: "#F7E7CE" },
      { name: "Midnight Blue", hex: "#191970" },
      { name: "Forest", hex: "#228B22" },
    ],
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: 3,
    name: "Maison Blazer",
    slug: "maison-blazer",
    price: 325,
    originalPrice: 425,
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    category: "Tops",
    collection: "tops",
    description:
      "A tailored blazer with a relaxed drape. Structured shoulders meet a slightly oversized body — the perfect balance of polish and ease.",
    details: [
      "55% Linen, 45% Cotton",
      "Single-button closure",
      "Notch lapel",
      "Two front pockets",
      "Fully lined",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ecru", hex: "#C2B280" },
      { name: "Black", hex: "#000000" },
      { name: "Sage", hex: "#B2AC88" },
    ],
    isSale: true,
    rating: 4.7,
    reviewCount: 56,
  },
  {
    id: 4,
    name: "Soleil Wide Leg Pant",
    slug: "soleil-wide-leg-pant",
    price: 185,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    ],
    category: "Bottoms",
    collection: "bottoms",
    description:
      "Effortlessly flattering wide leg trousers with a high waist and fluid drape. Equally stunning for a beach day or a city stroll.",
    details: [
      "100% Linen",
      "High-rise waist",
      "Wide leg silhouette",
      "Side pockets",
      "Elasticated back waistband",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sand", hex: "#C2B280" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#000080" },
    ],
    isNew: true,
    rating: 4.6,
    reviewCount: 73,
  },
  {
    id: 5,
    name: "Élise Silk Blouse",
    slug: "elise-silk-blouse",
    price: 215,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
    ],
    category: "Tops",
    collection: "tops",
    description:
      "A luxuriously soft silk blouse with a relaxed, slightly oversized fit. Features a classic button-front closure and subtle point collar.",
    details: [
      "100% Mulberry Silk",
      "Point collar",
      "Button-front closure",
      "Long sleeves with button cuffs",
      "Relaxed fit",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Blush", hex: "#FFB6C1" },
      { name: "Cobalt", hex: "#0047AB" },
    ],
    rating: 4.9,
    reviewCount: 102,
  },
  {
    id: 6,
    name: "Riviera Mini Skirt",
    slug: "riviera-mini-skirt",
    price: 145,
    images: [
      "https://images.unsplash.com/photo-1561861422-a549073e547a?w=800&q=80",
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80",
    ],
    category: "Bottoms",
    collection: "bottoms",
    description:
      "A playful mini skirt with a tailored A-line silhouette. Features a clean, minimal front and subtle back kick pleat for easy movement.",
    details: [
      "70% Cotton, 30% Linen",
      "A-line silhouette",
      "Side zip closure",
      "Back kick pleat",
      "Lined",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Black", hex: "#000000" },
    ],
    isNew: true,
    rating: 4.5,
    reviewCount: 48,
  },
  {
    id: 7,
    name: "Lune Midi Dress",
    slug: "lune-midi-dress",
    price: 268,
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
    ],
    category: "Dresses",
    collection: "new-arrivals",
    description:
      "A romantic midi dress with a fitted bodice and flowing skirt. The square neckline and delicate puff sleeves give it an elevated, editorial feel.",
    details: [
      "100% Cotton Poplin",
      "Square neckline",
      "Puff sleeves",
      "Fitted bodice",
      "Full midi skirt",
      "Back zipper closure",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Ecru", hex: "#C2B280" },
      { name: "Sky Blue", hex: "#87CEEB" },
    ],
    isNew: true,
    rating: 4.8,
    reviewCount: 35,
  },
  {
    id: 8,
    name: "Noir Turtleneck",
    slug: "noir-turtleneck",
    price: 125,
    originalPrice: 165,
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    ],
    category: "Tops",
    collection: "new-arrivals",
    description:
      "A timeless ribbed turtleneck knit in a fine merino blend. The slim silhouette works perfectly tucked into wide-leg trousers or under a midi skirt.",
    details: [
      "80% Merino Wool, 20% Cashmere",
      "Ribbed turtleneck",
      "Slim fit",
      "Long sleeves",
      "Machine washable (gentle cycle)",
      "Available in 3 colors",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Burgundy", hex: "#800020" },
    ],
    isSale: true,
    rating: 4.7,
    reviewCount: 91,
  },
  {
    id: 9,
    name: "Palazzo Trousers",
    slug: "palazzo-trousers",
    price: 195,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    ],
    category: "Bottoms",
    collection: "bottoms",
    description:
      "Statement palazzo trousers with an ultra-wide leg and flowing silhouette. Cut in a luxe crepe fabric that moves beautifully.",
    details: [
      "100% Polyester Crepe",
      "Ultra-wide leg",
      "High-rise waist",
      "Side pockets",
      "Concealed zip closure",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne", hex: "#F7E7CE" },
      { name: "Onyx", hex: "#353935" },
    ],
    rating: 4.6,
    reviewCount: 44,
  },
  {
    id: 10,
    name: "Etoile Halter Top",
    slug: "etoile-halter-top",
    price: 98,
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    ],
    category: "Tops",
    collection: "new-arrivals",
    description:
      "A sleek halter top with a scooped neck and open back. The minimalist design makes it incredibly versatile — dress up or down with ease.",
    details: [
      "95% Silk, 5% Elastane",
      "Halter neckline",
      "Open back with tie",
      "Cropped length",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Sand", hex: "#C2B280" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
    ],
    isNew: true,
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: 11,
    name: "Florentine Maxi Dress",
    slug: "florentine-maxi-dress",
    price: 295,
    images: [
      "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    ],
    category: "Dresses",
    collection: "dresses",
    description:
      "A sweeping maxi dress with a draped bodice and full skirt. Inspired by Florentine artistry, this dress commands attention in every room.",
    details: [
      "100% Chiffon",
      "Draped one-shoulder bodice",
      "Empire waist",
      "Full sweep skirt",
      "Lined",
      "Dry clean only",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Terra Cotta", hex: "#E2725B" },
      { name: "Ivory", hex: "#FFFFF0" },
    ],
    rating: 4.9,
    reviewCount: 28,
  },
  {
    id: 12,
    name: "Capri Linen Set",
    slug: "capri-linen-set",
    price: 285,
    originalPrice: 340,
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
    ],
    category: "Dresses",
    collection: "new-arrivals",
    description:
      "A coordinated linen co-ord set comprising a relaxed cropped button-up and matching wide-leg shorts. The ultimate summer uniform.",
    details: [
      "100% Belgian Linen",
      "Includes top and shorts",
      "Button-front top",
      "Elasticated shorts waist",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Warm White", hex: "#FAF9F6" },
      { name: "Caramel", hex: "#AF6E4D" },
    ],
    isSale: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 53,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
