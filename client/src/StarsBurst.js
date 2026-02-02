import { motion, AnimatePresence } from "framer-motion";

const StarsBurst = ({ show }) => {
  const stars = Array.from({ length: 8 });

  return (
    <AnimatePresence>
      {show &&
        stars.map((_, i) => {
          const x = Math.random() * 120 - 60;
          const y = Math.random() * -140 - 100;
          const size = Math.random() * 14 + 14;

          return (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: 0,
                scale: 1.4,
                x,
                y,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.4,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: size,
                height: size,
                backgroundColor: "#FFD84D",
                zIndex: 10,
                filter: "drop-shadow(0 0 8px rgba(255,216,77,0.9))",
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                pointerEvents: "none",
              }}
            />
          );
        })}
    </AnimatePresence>
  );
};

export default StarsBurst;
