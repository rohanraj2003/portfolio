import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "@/styles/Container.module.css";

const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#@$%&";

const slideUp = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

export default function Preloader() {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const target = "ROHAN RAJ SR";

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    let iter = 0;
    const interval = setInterval(() => {
      iter += 0.5;
      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iter) return target[i]!;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]!;
          })
          .join("")
      );
      if (iter >= target.length) {
        setDisplay(target);
        setDone(true);
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath  = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: { d: initialPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
    exit:    { d: targetPath,  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 } },
  };

  return (
    <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
      {dimension.width > 0 && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.12em",
              color: done ? "rgb(226 232 240)" : "#2dd4bf",
              textShadow: done
                ? "none"
                : "2px 0 #f43f5e, -2px 0 #2dd4bf, 0 0 16px #2dd4bf",
              transition: "color 0.3s, text-shadow 0.3s",
            }}
          >
            <span></span>
            {display}
          </motion.p>
          <svg>
            <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
