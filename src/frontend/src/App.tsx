import { ArrowRight, Award, Package, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Hero3D } from "./components/Hero3D";
import { NavBar } from "./components/NavBar";
import { ProductCard, ProductCardSkeleton } from "./components/ProductCard";
import { SectionReveal } from "./components/SectionReveal";
import { useActor } from "./hooks/useActor";
import {
  useFeaturedProducts,
  useInitialize,
  useShoeProducts,
  useWatchProducts,
} from "./hooks/useQueries";

// Fallback sample products for instant first load
const SAMPLE_WATCHES = [
  {
    id: "w1",
    name: "Royal Complication",
    brand: "Audemars Piguet",
    price: 42000,
    description:
      "A masterpiece of horological complexity with perpetual calendar and moonphase display, encased in 18k rose gold.",
    category: "watch" as never,
    imageUrl: "",
    featured: true,
  },
  {
    id: "w2",
    name: "Submariner Heritage",
    brand: "Rolex",
    price: 18500,
    description:
      "Iconic diving watch with ceramic bezel and Oystersteel case. Water resistant to 300 metres. Automatic movement.",
    category: "watch" as never,
    imageUrl: "",
    featured: true,
  },
  {
    id: "w3",
    name: "Calatrava Tourbillon",
    brand: "Patek Philippe",
    price: 95000,
    description:
      "The pinnacle of watchmaking art. A flying tourbillon at 6 o'clock with hand-engraved gold case and sapphire caseback.",
    category: "watch" as never,
    imageUrl: "",
    featured: false,
  },
];

const SAMPLE_SHOES = [
  {
    id: "s1",
    name: "Optic Blanc Stiletto",
    brand: "Christian Louboutin",
    price: 1250,
    description:
      "The iconic red-sole stiletto reimagined in supple white nappa leather. The ultimate expression of feminine elegance.",
    category: "shoe" as never,
    imageUrl: "",
    featured: true,
  },
  {
    id: "s2",
    name: "Weston Oxford Prestige",
    brand: "J.M. Weston",
    price: 2100,
    description:
      "Handcrafted in Limoges, France over 100 steps. Burgundy calf leather with double-leather sole. A lifetime investment.",
    category: "shoe" as never,
    imageUrl: "",
    featured: true,
  },
  {
    id: "s3",
    name: "Atlas Runner Exclusive",
    brand: "Balenciaga",
    price: 890,
    description:
      "Luxury athletic silhouette in premium white leather with hand-finished gold hardware. Edition limitée.",
    category: "shoe" as never,
    imageUrl: "",
    featured: false,
  },
];

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-16">
      <SectionReveal>
        <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
          {title}
        </h2>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
          <div className="w-2 h-2 rotate-45 bg-primary" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
        </div>
        {subtitle && (
          <p className="font-body text-muted-foreground tracking-[0.15em] uppercase text-sm">
            {subtitle}
          </p>
        )}
      </SectionReveal>
    </div>
  );
}

function FeaturedSection() {
  const { data: products, isLoading } = useFeaturedProducts();
  const displayProducts =
    products && products.length > 0
      ? products
      : [...SAMPLE_WATCHES.slice(0, 2), ...SAMPLE_SHOES.slice(0, 2)];

  return (
    <section id="featured" className="py-28 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="CURATED SELECTION"
          subtitle="Handpicked for the discerning"
        />

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="featured.loading_state"
          >
            {[1, 2, 3, 4].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : displayProducts.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="featured.empty_state"
          >
            <p className="font-display text-2xl">No featured products yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                scope="featured"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WatchesSection() {
  const { data: products, isLoading } = useWatchProducts();
  const displayProducts =
    products && products.length > 0 ? products : SAMPLE_WATCHES;

  return (
    <section
      id="watches"
      className="py-28 px-6"
      style={{ background: "oklch(0.10 0.01 60)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="TIMEPIECES" subtitle="Swiss & Haute Horlogerie" />

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="watches.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="watches.list"
          >
            {displayProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                scope="watches"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ShoesSection() {
  const { data: products, isLoading } = useShoeProducts();
  const displayProducts =
    products && products.length > 0 ? products : SAMPLE_SHOES;

  return (
    <section
      id="shoes"
      className="py-28 px-6"
      style={{ background: "oklch(0.13 0.015 60)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="FOOTWEAR" subtitle="Artisanal & Designer" />

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="shoes.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="shoes.list"
          >
            {displayProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                scope="shoes"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CollectionsSection() {
  const handleWatches = () => {
    const el = document.querySelector("#watches");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const handleShoes = () => {
    const el = document.querySelector("#shoes");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="collections" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.5em] text-gold uppercase mb-4">
            Explore
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground">
            THE COLLECTION
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Watches tile */}
          <SectionReveal delay={100}>
            <motion.div
              data-ocid="collections.item.1"
              className="relative h-80 glass-card overflow-hidden cursor-pointer group"
              onClick={handleWatches}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.08 0 0) 0%, oklch(0.18 0.04 75) 100%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(circle at 60% 40%, rgba(185, 150, 80, 0.15) 0%, transparent 70%)",
                }}
              />

              {/* Decorative watch face */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-primary/30 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-transparent border border-primary/30" />
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-48">
                <p className="font-body text-xs tracking-[0.4em] text-gold uppercase mb-2">
                  Collection
                </p>
                <h3 className="font-display text-4xl font-bold text-foreground mb-4">
                  WATCHES
                </h3>
                <div className="flex items-center gap-2 text-gold group-hover:gap-4 transition-all duration-300">
                  <span className="font-body text-xs tracking-[0.3em] uppercase">
                    Explore
                  </span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          </SectionReveal>

          {/* Shoes tile */}
          <SectionReveal delay={200}>
            <motion.div
              data-ocid="collections.item.2"
              className="relative h-80 glass-card overflow-hidden cursor-pointer group"
              onClick={handleShoes}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.08 0 0) 0%, oklch(0.16 0.02 220) 100%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(circle at 40% 60%, rgba(80, 120, 185, 0.15) 0%, transparent 70%)",
                }}
              />

              {/* Decorative heel silhouette */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <div
                  className="w-28 h-28 border border-muted/30"
                  style={{ transform: "rotate(15deg)" }}
                >
                  <div className="w-full h-full border border-muted/20 m-1" />
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-40">
                <p className="font-body text-xs tracking-[0.4em] text-gold uppercase mb-2">
                  Collection
                </p>
                <h3 className="font-display text-4xl font-bold text-foreground mb-4">
                  SHOES
                </h3>
                <div className="flex items-center gap-2 text-gold group-hover:gap-4 transition-all duration-300">
                  <span className="font-body text-xs tracking-[0.3em] uppercase">
                    Explore
                  </span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function BrandStorySection() {
  const stats = [
    { icon: Package, value: "50+", label: "Prestigious Brands" },
    { icon: Award, value: "1000+", label: "Curated Products" },
    { icon: Shield, value: "100%", label: "Authentic Guaranteed" },
  ];

  return (
    <section
      id="about"
      className="py-28 px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.08 0 0) 0%, oklch(0.10 0.01 60) 50%, oklch(0.08 0 0) 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <SectionReveal>
          <p className="font-body text-xs tracking-[0.5em] text-gold uppercase mb-6">
            Our Story
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
            CRAFTED FOR
            <br />
            <span className="gold-text-gradient">THE EXCEPTIONAL</span>
          </h2>
          <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
            Store Lab was born from a singular vision: to unite the world's most
            extraordinary timepieces with the finest artisanal footwear under
            one roof. We believe that true luxury is not merely an acquisition —
            it is an experience, a statement, a legacy.
          </p>
          <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
            Every piece in our collection is sourced directly from master
            craftsmen and authorized dealers, ensuring uncompromising
            authenticity and a provenance that tells a story worth wearing.
          </p>
          <p className="font-body text-base text-muted-foreground leading-relaxed mb-16">
            From the precise sweep of a tourbillon to the whisper of premium
            leather against stone floors — we exist for those who live beyond
            the ordinary.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 150}>
              <div className="glass-card p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                <stat.icon
                  className="w-6 h-6 text-gold mx-auto mb-3"
                  strokeWidth={1.5}
                />
                <div className="font-display text-3xl font-bold gold-text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    { label: "Watches", href: "#watches" },
    { label: "Shoes", href: "#shoes" },
    { label: "Collections", href: "#collections" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();
  const cafUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="py-16 px-6"
      style={{
        background: "oklch(0.06 0 0)",
        borderTop: "1px solid oklch(0.22 0.03 60)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-12">
          {/* Wordmark */}
          <div>
            <div className="font-display text-3xl font-bold tracking-[0.3em] uppercase mb-2">
              <span className="text-foreground">STORE</span>
              <span className="text-gold"> LAB</span>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent mb-3" />
            <p className="font-body text-xs text-muted-foreground tracking-[0.1em] max-w-xs">
              Premium watches & luxury footwear for those who define their own
              standard.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3 justify-center md:justify-end">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="footer.link"
                onClick={handleClick(link.href)}
                className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(0.15 0.02 60)" }}
        >
          <p className="font-body text-xs text-muted-foreground">
            &copy; {year} Store Lab. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Built with <span className="text-gold">♥</span> using{" "}
            <a
              href={cafUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-accent transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function AppInitializer() {
  useInitialize();
  return null;
}

export default function App() {
  const { actor } = useActor();

  useEffect(() => {
    if (actor) {
      actor.initialize().catch(console.warn);
    }
  }, [actor]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AppInitializer />
      <NavBar />
      <main>
        <Hero3D />
        <FeaturedSection />
        <WatchesSection />
        <ShoesSection />
        <CollectionsSection />
        <BrandStorySection />
      </main>
      <Footer />
    </div>
  );
}
