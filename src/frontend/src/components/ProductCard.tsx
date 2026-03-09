import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Category, type Product } from "../hooks/useQueries";

interface ProductCardProps {
  product: Product;
  index: number;
  scope: string;
}

const watchImages = [
  "/assets/generated/watch-1.dim_600x600.jpg",
  "/assets/generated/watch-2.dim_600x600.jpg",
  "/assets/generated/watch-3.dim_600x600.jpg",
];

const shoeImages = [
  "/assets/generated/shoe-1.dim_600x600.jpg",
  "/assets/generated/shoe-2.dim_600x600.jpg",
  "/assets/generated/shoe-3.dim_600x600.jpg",
];

function getProductImage(product: Product, index: number): string {
  if (product.imageUrl?.startsWith("http")) {
    return product.imageUrl;
  }
  if (product.category === Category.watch) {
    return watchImages[index % watchImages.length];
  }
  return shoeImages[index % shoeImages.length];
}

export function ProductCard({ product, index, scope }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: -y * 8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const isWatch = product.category === Category.watch;
  const imageUrl = getProductImage(product, index);

  return (
    <motion.div
      ref={cardRef}
      data-ocid={`${scope}.item.${index + 1}`}
      className="relative group cursor-pointer"
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.1s ease" : "transform 0.5s ease",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card */}
        <div className="glass-card overflow-hidden relative">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 50%, rgba(8,6,4,0.9) 100%)",
              }}
            />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`font-body text-xs tracking-[0.3em] uppercase px-3 py-1.5 ${
                  isWatch
                    ? "bg-primary/20 text-gold border border-primary/30"
                    : "bg-secondary/40 text-foreground/70 border border-border"
                }`}
              >
                {isWatch ? "WATCH" : "SHOES"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">
              {product.brand}
            </p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2 leading-tight">
              {product.name}
            </h3>
            <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-4">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-bold text-gold">
                ${product.price.toLocaleString()}
              </span>
              <button
                type="button"
                className="font-body text-xs tracking-[0.2em] uppercase px-5 py-2.5 border border-primary/50 text-gold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-gold-sm"
              >
                View Details
              </button>
            </div>
          </div>

          {/* Gold shimmer on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(185, 150, 80, 0.04) 0%, transparent 50%, rgba(185, 150, 80, 0.04) 100%)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden" data-ocid="loading_state">
      <div
        className="aspect-square"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.15 0.01 60) 25%, oklch(0.20 0.02 60) 50%, oklch(0.15 0.01 60) 75%)",
          backgroundSize: "1000px 100%",
          animation: "shimmer 2s infinite linear",
        }}
      />
      <div className="p-5 space-y-3">
        <div
          className="h-3 w-20 rounded"
          style={{ background: "oklch(0.20 0.02 60)" }}
        />
        <div
          className="h-6 w-4/5 rounded"
          style={{ background: "oklch(0.20 0.02 60)" }}
        />
        <div
          className="h-4 w-full rounded"
          style={{ background: "oklch(0.15 0.01 60)" }}
        />
        <div
          className="h-4 w-3/4 rounded"
          style={{ background: "oklch(0.15 0.01 60)" }}
        />
        <div className="flex justify-between items-center pt-2">
          <div
            className="h-8 w-24 rounded"
            style={{ background: "oklch(0.20 0.02 60)" }}
          />
          <div
            className="h-10 w-28 rounded"
            style={{ background: "oklch(0.18 0.02 60)" }}
          />
        </div>
      </div>
    </div>
  );
}
