import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // how far it pulls (0–1), default 0.35
  as?: "button" | "a" | "div";
  [key: string]: unknown;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as: Tag = "div",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.5 });

  // inner text shifts slightly more for a layered depth feel
  const tx = useSpring(0, { stiffness: 250, damping: 20, mass: 0.4 });
  const ty = useSpring(0, { stiffness: 250, damping: 20, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    x.set(dx * strength);
    y.set(dy * strength);
    tx.set(dx * (strength * 0.6));
    ty.set(dy * (strength * 0.6));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    tx.set(0);
    ty.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-flex" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/* The actual element */}
      <Tag className={className} {...(props as Record<string, unknown>)}>
        <motion.span
          style={{ x: tx, y: ty, display: "inline-flex", alignItems: "center", gap: "inherit" }}
        >
          {children}
        </motion.span>
      </Tag>
    </motion.div>
  );
}
