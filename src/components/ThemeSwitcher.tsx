import { useTheme, type Theme } from "./ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";
import { useState } from "react";

const options: { theme: Theme; color: string; label: string; gradient?: string }[] = [
  { theme: "teal",      color: "#2dd4bf", label: "Teal"       },
  { theme: "purple",   color: "#a78bfa", label: "Purple"    },
  { theme: "orange",   color: "#fb923c", label: "Orange"    },
  { theme: "rose",     color: "#fb6f92", label: "Rose"      },
  { theme: "blue",     color: "#60a5fa", label: "Blue"      },
  { theme: "yellow",   color: "#fbbf24", label: "Yellow"    },
  { theme: "green",    color: "#4ade80", label: "Green"     },
  { theme: "spiderman",color: "#e52222", label: "Spider-Man", gradient: "linear-gradient(135deg, #e52222 50%, #1a3a8f 50%)" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);


  return (
    <div className="fixed bottom-24 left-6 z-[9989] flex flex-col items-center gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-[#0d0d1a]/90 p-3 backdrop-blur-xl shadow-2xl"
          >
            {options.map(({ theme: t, color, label, gradient }) => (
              <motion.button
                key={t}
                onClick={() => { setTheme(t); setOpen(false); }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                title={label}
                className="relative flex h-7 w-7 items-center justify-center rounded-full transition"
                style={{ background: gradient ?? color }}
              >
                {theme === t && (
                  <motion.span
                    layoutId="active-ring"
                    className="absolute inset-0 rounded-full ring-2 ring-white/70 ring-offset-2 ring-offset-[#0d0d1a]"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0d0d1a]/90 text-primary shadow-lg backdrop-blur-xl transition hover:scale-110"
        title="Change theme"
      >
        <Palette className="h-5 w-5" />
      </motion.button>

    </div>
  );
}
