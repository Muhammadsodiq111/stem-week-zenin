import { useEffect, useState } from "react";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  initialDelay?: number;
  charDelay?: number;
  charDuration?: number;
  style?: React.CSSProperties;
}

const AnimatedHeading = ({
  text,
  className = "",
  initialDelay = 200,
  charDelay = 30,
  charDuration = 500,
  style,
}: AnimatedHeadingProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  const lines = text.split("\n");

  return (
    <h1 className={className} style={style} aria-label={text}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block" aria-hidden="true">
          {Array.from(line).map((ch, charIndex) => {
            const delay =
              lineIndex * line.length * charDelay + charIndex * charDelay;
            return (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  opacity: show ? 1 : 0,
                  transform: show ? "translateX(0)" : "translateX(-18px)",
                  transition: `opacity ${charDuration}ms ease, transform ${charDuration}ms ease`,
                  transitionDelay: `${delay}ms`,
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedHeading;
