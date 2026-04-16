import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "motion/react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const BlurText = ({ text, className = "", delay = 0 }: BlurTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: {
                duration: 0.6,
                delay: delay + i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
