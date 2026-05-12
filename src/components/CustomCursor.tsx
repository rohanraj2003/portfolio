import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // Spotlight — lazy spring so it drifts behind the cursor
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const springX = useSpring(spotX, { stiffness: 60, damping: 20 });
  const springY = useSpring(spotY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      spotX.set(e.clientX);
      spotY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    window.addEventListener("mousemove", move);

    const interactives = document.querySelectorAll("a, button, [id='tilt']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [visible, spotX, spotY]);

  const bg = useSpringBackground(springX, springY);

  if (!visible) return null;

  return (
    <>
      {/* Spotlight glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9990]"
        style={{ background: bg }}
      />

      {/* Main dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-teal-400"
        animate={{
          x: pos.x - (hovered ? 20 : 6),
          y: pos.y - (hovered ? 20 : 6),
          width: hovered ? 40 : 12,
          height: hovered ? 40 : 12,
          opacity: hovered ? 0.3 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
        style={{
          boxShadow: "0 0 12px 3px rgba(45,212,191,0.6)",
        }}
      />
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full border border-teal-400/50"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          width: 40,
          height: 40,
          opacity: hovered ? 0 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
      />
    </>
  );
}

function useSpringBackground(
  x: ReturnType<typeof useSpring>,
  y: ReturnType<typeof useSpring>
) {
  const [bg, setBg] = useState("none");

  useEffect(() => {
    const unsub = x.on("change", () => {
      setBg(
        `radial-gradient(600px circle at ${x.get()}px ${y.get()}px, rgba(45,212,191,0.07), transparent 70%)`
      );
    });
    const unsub2 = y.on("change", () => {
      setBg(
        `radial-gradient(600px circle at ${x.get()}px ${y.get()}px, rgba(45,212,191,0.07), transparent 70%)`
      );
    });
    return () => { unsub(); unsub2(); };
  }, [x, y]);

  return bg;
}
