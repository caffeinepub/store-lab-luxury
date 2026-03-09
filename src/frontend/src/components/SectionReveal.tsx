import { useEffect, useRef, useState } from "react";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  id,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      id={id}
      className={`${className} section-reveal ${revealed ? "revealed" : ""}`}
    >
      {children}
    </div>
  );
}
