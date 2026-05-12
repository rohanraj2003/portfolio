import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollTo } from "@/lib/utils";

const sections = [
  { id: "home",           label: "Home"          },
  { id: "about",          label: "About"         },
  { id: "projects",       label: "Projects"      },
  { id: "services",       label: "Services"      },
  { id: "timeline",       label: "Journey"       },
  { id: "certifications", label: "Certifications"},
  { id: "contact",        label: "Contact"       },
];

export default function SectionDots() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      for (const { id } of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(id);
          break;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (el) scrollTo(el);
  }

  return (
    <div className="fixed right-6 top-1/2 z-[9985] hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex">
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <div
            key={id}
            className="relative flex items-center justify-end"
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* label tooltip */}
            <AnimatePresence>
              {hovered === id && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  className="mr-3 rounded-md border border-white/10 bg-[#0d0d1a]/90 px-2.5 py-1 text-xs tracking-tight text-slate-300 backdrop-blur-md whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* dot */}
            <button
              onClick={() => handleClick(id)}
              aria-label={`Go to ${label}`}
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{
                  width:  isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  opacity: isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.25 }}
                className="rounded-full bg-primary"
              />
              {isActive && (
                <motion.div
                  layoutId="active-dot-ring"
                  className="absolute rounded-full border border-primary/60"
                  style={{ width: 18, height: 18 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
